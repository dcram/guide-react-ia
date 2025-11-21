---
sidebar_position: 2
title: Setup avec Vite
description: Créer votre premier projet React
---

# Setup et Premier Projet avec Vite

## 🎯 Ce que vous allez apprendre

- Pourquoi utiliser Vite plutôt que Create React App
- Installer et configurer un projet React avec Vite
- Ajouter React-Bootstrap pour l'interface
- Configurer React Router pour la navigation
- Créer votre première page fonctionnelle

## Pourquoi Vite ?

:::info Contexte important
**Create React App (CRA) n'est plus maintenu** depuis 2023. La documentation officielle React recommande maintenant d'utiliser des outils modernes comme Vite ou Next.js.
:::

### Avantages de Vite

| Critère | Vite | Create React App |
|---------|------|------------------|
| Temps de démarrage | < 1 seconde | 10-30 secondes |
| Hot Module Replacement (HMR) | Instantané | 1-3 secondes |
| Build de production | Rapide (esbuild) | Lent (webpack) |
| Configuration | Simple | Complexe |
| Maintenance | Actif | ❌ Abandonné |

**En résumé** : Vite est plus rapide, plus moderne, et recommandé par l'équipe React.

:::tip Courbe d'apprentissage
Si vous connaissez déjà CRA, Vite est très similaire. La différence principale concerne les variables d'environnement.
:::

## Installation et création du projet

### Prérequis

Vérifiez votre version de Node.js :

```bash
node --version
# Doit afficher v18.x ou v20.x ou supérieur
```

Si Node.js n'est pas installé ou trop ancien, [téléchargez-le ici](https://nodejs.org/).

### Créer le projet

```bash
# Créer un nouveau projet React avec Vite
npm create vite@latest annotation-app -- --template react

# Entrer dans le dossier
cd annotation-app

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Vous devriez voir :

```
VITE v5.x.x  ready in 234 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

Ouvrez http://localhost:5173 dans votre navigateur. Vous devriez voir la page d'accueil par défaut de Vite + React.

:::tip Port différent
Vite utilise le port **5173** par défaut (et non 3000 comme CRA). Mémorisez-le !
:::

## Structure générée par Vite

Voici ce que Vite a créé :

```
annotation-app/
├── node_modules/          # Dépendances (ne pas modifier)
├── public/                # Fichiers statiques (images, favicon)
│   └── vite.svg
├── src/                   # Code source de l'application
│   ├── assets/           # Assets (images, CSS, etc.)
│   ├── App.css           # Styles du composant App
│   ├── App.jsx           # Composant principal
│   ├── index.css         # Styles globaux
│   └── main.jsx          # Point d'entrée de l'app
├── .gitignore            # Fichiers ignorés par Git
├── index.html            # Page HTML de base
├── package.json          # Dépendances et scripts
├── package-lock.json     # Lock file des dépendances
└── vite.config.js        # Configuration Vite
```

**Fichiers clés** :
- `src/main.jsx` : Bootstrap de l'application React
- `src/App.jsx` : Composant racine de votre app
- `index.html` : Page HTML qui charge votre app
- `vite.config.js` : Configuration de Vite

## Installation des dépendances

Installons les librairies dont nous aurons besoin :

```bash
# React-Bootstrap : composants UI prêts à l'emploi
npm install react-bootstrap bootstrap

# React Router : navigation entre les pages
npm install react-router-dom
```

## Configuration de base

### 1. Importer Bootstrap CSS

Éditez `src/main.jsx` pour importer les styles Bootstrap :

```jsx title="src/main.jsx"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// highlight-next-line
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

:::warning Ordre des imports
Importez Bootstrap CSS **avant** vos propres styles CSS pour pouvoir les surcharger si nécessaire.
:::

### 2. Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```bash title=".env.local"
VITE_API_URL=http://localhost:8000
```

:::note Différence avec CRA
- **Vite** : préfixe `VITE_`
- **CRA** : préfixe `REACT_APP_`

Toujours commencer par `VITE_` pour que Vite reconnaisse la variable !
:::

Utilisation dans le code :

```jsx
const apiUrl = import.meta.env.VITE_API_URL;
// ⚠️ Pas process.env comme en Node.js !

console.log(apiUrl); // http://localhost:8000
```

### 3. Configuration vite.config.js (optionnel)

Pour des configurations avancées, éditez `vite.config.js` :

```js title="vite.config.js"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,      // Port du serveur de dev
    open: true,      // Ouvrir le navigateur automatiquement
  },
  build: {
    outDir: 'build', // Dossier de sortie (par défaut: dist)
  },
})
```

## Premier composant : Page d'accueil simple

Remplaçons le contenu par défaut par une page d'accueil pour notre app d'annotation.

### App.jsx - Point d'entrée

```jsx title="src/App.jsx"
import { Container } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <Container className="my-5">
      <div className="text-center">
        <h1>AnnotaTool</h1>
        <p className="lead">
          Interface d'annotation de documents avec IA
        </p>
        <hr />
        <p>
          Bienvenue sur votre outil d'annotation intelligent.
          Validez ou corrigez les prédictions de votre modèle ML.
        </p>
      </div>
    </Container>
  );
}

export default App;
```

Sauvegardez et regardez le navigateur : la page se met à jour automatiquement !

:::tip Hot Module Replacement (HMR)
Vite recharge instantanément les modifications sans perdre l'état de l'application. C'est magique ! 🎩
:::

### Styles personnalisés (optionnel)

Éditez `src/App.css` pour personnaliser :

```css title="src/App.css"
.text-center {
  text-align: center;
}

h1 {
  color: #0d6efd;
  margin-bottom: 1rem;
}

.lead {
  font-size: 1.25rem;
  font-weight: 300;
  color: #6c757d;
}
```

## Setup React Router pour navigation multi-pages

Maintenant, ajoutons plusieurs pages avec navigation.

### 1. Créer la structure des pages

```bash
mkdir src/pages
touch src/pages/HomePage.jsx
touch src/pages/AnnotationPage.jsx
touch src/pages/DashboardPage.jsx
```

### 2. Créer les pages

```jsx title="src/pages/HomePage.jsx"
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <Container className="my-5">
      <div className="text-center">
        <h1>AnnotaTool</h1>
        <p className="lead">
          Interface d'annotation de documents avec IA
        </p>
        <hr />
        <div className="d-flex gap-3 justify-content-center">
          <Link to="/annotation">
            <Button variant="primary" size="lg">
              Annoter des documents
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline-secondary" size="lg">
              Voir les statistiques
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default HomePage;
```

```jsx title="src/pages/AnnotationPage.jsx"
import { Container } from 'react-bootstrap';

function AnnotationPage() {
  return (
    <Container className="my-4">
      <h1>Annotation de Documents</h1>
      <p>Ici, vous pourrez annoter vos documents.</p>
    </Container>
  );
}

export default AnnotationPage;
```

```jsx title="src/pages/DashboardPage.jsx"
import { Container } from 'react-bootstrap';

function DashboardPage() {
  return (
    <Container className="my-4">
      <h1>Dashboard</h1>
      <p>Ici, vous verrez les statistiques d'annotation.</p>
    </Container>
  );
}

export default DashboardPage;
```

### 3. Créer la barre de navigation

```bash
mkdir src/components
touch src/components/NavBar.jsx
```

```jsx title="src/components/NavBar.jsx"
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          AnnotaTool
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Accueil
            </Nav.Link>
            <Nav.Link as={Link} to="/annotation">
              Annotation
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
```

### 4. Configurer les routes dans App.jsx

```jsx title="src/App.jsx"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import AnnotationPage from './pages/AnnotationPage';
import DashboardPage from './pages/DashboardPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/annotation" element={<AnnotationPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Tester la navigation

Lancez `npm run dev` et testez :
- Cliquez sur "Annotation" dans la navbar → vous allez sur /annotation
- Cliquez sur "Dashboard" → vous allez sur /dashboard
- Cliquez sur "Accueil" → retour à /

La navigation se fait **sans rechargement de page** ! C'est une Single Page Application (SPA).

## Différences Vite vs Create React App

| Aspect | Vite | Create React App |
|--------|------|------------------|
| **Variables d'env** | `VITE_XXX` | `REACT_APP_XXX` |
| **Accès aux vars** | `import.meta.env.VITE_XXX` | `process.env.REACT_APP_XXX` |
| **Config** | `vite.config.js` | `react-scripts` (éjecté) |
| **Port par défaut** | 5173 | 3000 |
| **Build output** | `dist/` | `build/` |
| **Imports** | ESM natif | CommonJS + ESM |

:::note Migration CRA → Vite
Si vous migrez un projet CRA existant vers Vite, remplacez simplement :
- `process.env.REACT_APP_` par `import.meta.env.VITE_`
- `REACT_APP_` par `VITE_` dans vos `.env`
:::

## 🤖 Prompts Claude Code recommandés

```
Crée un projet Vite React avec :
- React-Bootstrap installé et configuré
- React Router avec 3 routes : Home, Annotation, Dashboard
- Une navbar Bootstrap avec navigation
- Une page d'accueil avec un titre et 2 boutons
- Structure de dossiers: src/pages, src/components
```

```
Crée une page d'accueil React avec React-Bootstrap qui :
- Affiche un titre "AnnotaTool" centré
- Un sous-titre expliquant l'outil
- Deux boutons : "Annoter" (primary) et "Dashboard" (outline)
- Utilise le composant Container de Bootstrap
- Liens vers /annotation et /dashboard avec React Router
```

```
Configure Vite pour :
- Démarrer le serveur sur le port 3000
- Ouvrir automatiquement le navigateur
- Utiliser "build" comme dossier de sortie au lieu de "dist"
```

## ⚠️ Pièges à éviter

**1. Oublier d'importer Bootstrap CSS**
```jsx
// ❌ Les composants Bootstrap ne s'affichent pas correctement
import { Button } from 'react-bootstrap';

// ✅ Importer le CSS dans main.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
```

**2. Confondre les variables d'environnement**
```jsx
// ❌ FAUX (syntaxe CRA)
const apiUrl = process.env.REACT_APP_API_URL;

// ✅ BON (syntaxe Vite)
const apiUrl = import.meta.env.VITE_API_URL;
```

**3. Ne pas wrapper les routes avec BrowserRouter**
```jsx
// ❌ FAUX
function App() {
  return <Routes>...</Routes>; // ❌ Routes sans BrowserRouter
}

// ✅ BON
function App() {
  return (
    <BrowserRouter>
      <Routes>...</Routes>
    </BrowserRouter>
  );
}
```

**4. Utiliser `<a>` au lieu de `<Link>` pour la navigation**
```jsx
// ❌ FAUX - recharge toute la page
<a href="/annotation">Annotation</a>

// ✅ BON - navigation SPA sans rechargement
<Link to="/annotation">Annotation</Link>
```

## 📝 Commandes utiles

```bash
# Développement local
npm run dev

# Build de production
npm run build

# Prévisualiser le build en local
npm run preview

# Nettoyer le cache
rm -rf node_modules/.vite
```

## 🔗 Ressources

- [Vite Documentation](https://vitejs.dev/)
- [React-Bootstrap Documentation](https://react-bootstrap.github.io/)
- [React Router Documentation](https://reactrouter.com/)
- [Migration CRA → Vite](https://vitejs.dev/guide/migration.html)

## ➡️ Prochaine étape

Maintenant que vous avez un projet React fonctionnel, apprenons à le connecter à une API FastAPI !

👉 [Section 3 : Intégration API FastAPI](/api-integration/section-3-fastapi)
