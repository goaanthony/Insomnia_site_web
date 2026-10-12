# 🏛️ Insomnia — Site Officiel

Site web du serveur Minecraft Bedrock **Insomnia** — Le 1er PvP Faction Modé basé sur les Civilisations. Ouvert depuis 2017.

Choisis ta civilisation : **Grecs**, **Égyptiens** ou **Romains** — chacune avec ses propres armes, armures et blocs custom.

---

## 🛠️ Stack technique

- **Vue 3** + **Vite** + **TypeScript**
- **Tailwind CSS** — styles utilitaires
- **GSAP** + **ScrollTrigger** — animations et scrollytelling
- **Lenis** — smooth scroll
- **skinview3d** — rendu 3D du skin Minecraft
- **tsparticles** — fond de particules

## 📁 Structure

```
frontend/
├── src/
│   ├── assets/          # Logo, images
│   ├── components/      # Sections de la page
│   │   ├── NavBar.vue
│   │   ├── HeroSection.vue
│   │   ├── UniverseSection.vue
│   │   ├── HorizontalCardsSection.vue
│   │   ├── FeaturesSection.vue
│   │   ├── CommunitySection.vue
│   │   ├── JoinSection.vue
│   │   └── FooterSection.vue
│   ├── composables/     # Logique réutilisable
│   │   ├── useScrollAnimations.ts
│   │   ├── useCountUp.ts
│   │   └── useCopyToClipboard.ts
│   ├── App.vue
│   ├── main.ts
│   └── style.css
└── package.json
```

## 🚀 Lancement

```bash
cd frontend

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

Le site sera disponible sur **http://localhost:5173**

## 📦 Build (production)

```bash
npm run build
```

Les fichiers compilés se trouvent dans `frontend/dist/`.

## 🎮 Serveur

- **IP :** `play.insomnia.mc`
- **Port :** `19132`
- **Édition :** Minecraft Bedrock
- **Ouvert depuis :** 2017
