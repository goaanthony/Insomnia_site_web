import { Database } from "bun:sqlite";

export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    confirm_password?: string;
    wallet?: number;
    skin_currency?: number;
    is_verified?: boolean;
    is_admin?: number;
    created_at?: string;
}

export class UserService {
    constructor(private db: Database) {}

    async addUser(user: User): Promise<User> {
        const query = this.db.query(`
            INSERT INTO Users (username, email, password, wallet, is_verified) 
            VALUES ($username, $email, $password, $wallet, $is_verified)
            RETURNING *
        `);

        return query.get({
            $username: user.username,
            $email: user.email,
            $password: user.password,
            $wallet: user.wallet ?? 10000,
            $is_verified: user.is_verified ? 1 : 0,
        }) as User;
    }

    async getUserByEmail(email: string) {
        const user = this.db.query(`SELECT * FROM Users WHERE email = ?`).get(email) as User | null;
        return user;
    }

    async getUserByUsername(username: string) {
        const user = this.db.query(`SELECT * FROM Users WHERE username = ?`).get(username) as User | null;
        return user;
    }

    async getUserById(id: number) {
        const user = this.db.query(`SELECT * FROM Users WHERE id = ?`).get(id) as User | null;
        return user;
    }

    async verifyPassword(email: string, password: string): Promise<boolean> {
        const user = await this.getUserByEmail(email);
        if (!user) return false;
        return await Bun.password.verify(password, user.password);
    }
}
