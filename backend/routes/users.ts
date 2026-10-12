import { Elysia, t } from 'elysia'
import { jwt } from '@elysiajs/jwt'
import { UserService } from '../dbRoute/user';
import db from "../dbRoute/connection";


export const users = new Elysia({ prefix: '/user' })
    .decorate("dbuser", new UserService(db))
    .use(jwt({
        name: "jwt",
        secret: Bun.env.JWT_SECRET || 'development-secret',
        exp: "5d",
    }))

    .post('/login', async ({ body, set, dbuser, jwt, cookie }) => {
        const { email, password } = body;
        const auth = cookie?.auth;
        try {
            const passwordMatch = await dbuser.verifyPassword(email, password);
            if (!passwordMatch) {
                set.status = 401;
                return { error: "Invalid credentials" };
            }
            const user = await dbuser.getUserByEmail(email);
            if (!user) {
                set.status = 401;
                return { error: "Invalid credentials" };
            }
            const token = await jwt.sign({ id: user.id, email: user.email });
            auth?.set({
                value: token,
                httpOnly: true,
                maxAge: 86400 * 5,
                path: '/',
                sameSite: 'strict',
                secure: Bun.env.NODE_ENV === 'production',
            });
            return { message: "Signed in successfully" };
        } catch {
            set.status = 500;
            return { error: "Internal server error" };
        }
    }, {
        body: t.Object({
            email: t.String(),
            password: t.String(),
        })
    })

    .post('/register', async ({ body, set, dbuser }) => {
        const { username, email, password, confirm_password } = body;

        const testEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
        if (!testEmail) {
            set.status = 400;
            return { error: 'Invalid email format' };
        }
        if (password.length < 6) {
            set.status = 400;
            return { error: 'Password must be at least 6 characters' };
        }
        if (password !== confirm_password) {
            set.status = 400;
            return { error: "Password don't match" };
        }

        const hashedPassword = await Bun.password.hash(password, { algorithm: "bcrypt" });

        try {
            const existingUser = await dbuser.getUserByEmail(email);
            if (existingUser) {
                set.status = 400;
                return { error: 'User already exists' };
            }
            const newUser = await dbuser.addUser({ username, email, password: hashedPassword });
            return {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                created_at: newUser.created_at,
            };
        } catch {
            set.status = 500;
            return { error: 'Internal server error' };
        }
    }, {
        body: t.Object({
            username: t.String(),
            email: t.String(),
            password: t.String(),
            confirm_password: t.String(),
        })
    })

    .get('/profile', async ({ set, dbuser, jwt, cookie }) => {
        try {
            const auth = cookie?.auth;
            const token = typeof auth?.value === 'string' ? auth.value : '';
            if (!token) {
                set.status = 401;
                return { error: 'Unauthorized' };
            }
            const payload = await jwt.verify(token) as { id?: number; email?: string } | false;
            if (!payload || !payload.id) {
                set.status = 401;
                return { error: 'Unauthorized' };
            }
            const user = await dbuser.getUserById(payload.id);
            if (!user) {
                set.status = 404;
                return { error: 'User not found' };
            }
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                created_at: user.created_at,
            };
        } catch {
            set.status = 500;
            return { error: 'Internal server error' };
        }
    })


    .post('/logout', ({ cookie }) => {
        const auth = cookie?.auth;
        auth?.set({
            value: '',
            httpOnly: true,
            maxAge: 0,
            path: '/',
            sameSite: 'strict',
        });
        return { message: 'Déconnecté avec succès' };
    })