# Guide React UI pour Ingénieur IA/Data

Documentation Docusaurus pour apprendre à créer des interfaces d'annotation et de visualisation avec React, en utilisant l'IA (Claude Code) comme accélérateur.

## 🎯 Objectif

Permettre aux ingénieurs IA/Data de créer rapidement des interfaces professionnelles pour leurs projets ML, sans être experts en frontend.

## 📚 Contenu du guide

- **Fondamentaux** : Rappels React, setup avec Vite
- **Intégration API** : Connexion avec FastAPI
- **Interfaces spécialisées** : Annotation, tableaux, dashboards
- **Avancé** : Bonnes pratiques, workflow avec Claude Code

## 🚀 Démarrage rapide

### Prérequis

- Node.js >= 18
- npm ou yarn

### Installation

```bash
# Créer le projet Docusaurus
npx create-docusaurus@latest guide-react-ia classic

# Aller dans le dossier
cd guide-react-ia

# Installer les dépendances
npm install

# Lancer en mode dev
npm start
```

Le site sera disponible sur http://localhost:3000

## 📁 Structure du projet

```
guide-react-ia/
├── docs/                           # Fichiers markdown de la documentation
│   ├── intro.md
│   ├── fundamentals/
│   │   ├── section-1-rappels-react.md
│   │   └── section-2-setup-vite.md
│   ├── api-integration/
│   │   └── section-3-fastapi.md
│   ├── interfaces/
│   │   ├── section-4-annotation.md
│   │   ├── section-5-tables.md
│   │   └── section-6-dashboard.md
│   ├── advanced/
│   │   ├── section-7-best-practices.md
│   │   └── section-8-claude-workflow.md
│   └── conclusion.md
├── src/
│   ├── components/                 # Composants React de démo
│   │   └── Demo/
│   │       ├── AnnotationList.jsx
│   │       ├── Dashboard.jsx
│   │       └── DataTable.jsx
│   └── css/
│       └── custom.css              # Styles personnalisés
├── static/
│   └── img/                        # Images (wireframes, screenshots)
├── docusaurus.config.js            # Configuration Docusaurus
├── sidebars.js                     # Configuration de la sidebar
└── package.json
```

## 🛠️ Générer la documentation avec Claude Code

### Étape 1 : Lire les instructions

Avant de commencer, lis attentivement :
- `claude.md` : instructions complètes pour Claude Code
- `plan-detaillé.md` : plan de la documentation à générer

### Étape 2 : Setup initial

**Prompt pour Claude Code** :
```
Crée un projet Docusaurus nommé "guide-react-ia" avec la structure 
définie dans claude.md. 

Configure-le pour :
- Thème classic
- Docs à la racine (routeBasePath: '/')
- Sidebar avec les catégories : Fondamentaux, Intégration API, 
  Interfaces Spécialisées, Avancé
- GitHub Pages deployment
- Support MDX pour composants interactifs

Utilise la structure de dossiers exacte de plan-detaillé.md
```

### Étape 3 : Générer section par section

**Exemple pour la section 1** :
```
En te basant sur le contenu détaillé de plan-detaillé.md pour la 
section 1 "Rappels React et Structure de Projet", génère le fichier 
docs/fundamentals/section-1-rappels-react.md.

Suis strictement la structure définie dans claude.md :
- Frontmatter avec sidebar_position, title, description
- Section "Ce que vous allez apprendre"
- Explication concise des concepts (props, state, hooks)
- Exemple d'arborescence de projet commentée
- Diagramme Mermaid du flow de données
- Section "Prompts Claude Code recommandés"
- Admonitions (tips, warnings)
- Lien vers section suivante

Ton : pragmatique, direct, empathique pour un ingénieur backend.
```

**Répéter pour chaque section** en utilisant le plan détaillé.

### Étape 4 : Créer les composants de démo

**Exemple** :
```
Crée un composant React de démo dans 
src/components/Demo/AnnotationList.jsx

Le composant doit :
- Afficher 3 documents mockés avec prédictions IA
- Badges de confiance colorés (vert >80%, orange >60%, rouge sinon)
- Boutons "Valider" et "Corriger" (avec dropdown)
- État local pour tracker les modifications
- Être auto-suffisant (pas de props requises)
- Utiliser React-Bootstrap

Ce composant sera importé dans la doc pour démo interactive.
```

### Étape 5 : Configuration du déploiement

**Prompt** :
```
Configure le déploiement GitHub Pages :
1. Crée .github/workflows/deploy.yml avec le workflow défini dans claude.md
2. Mets à jour docusaurus.config.js avec :
   - url: 'https://[USERNAME].github.io'
   - baseUrl: '/guide-react-ia/'
   - organizationName: '[USERNAME]'
   - projectName: 'guide-react-ia'
```

## 📝 Commandes utiles

```bash
# Développement local
npm start

# Build de production
npm run build

# Servir le build localement
npm run serve

# Clear cache
npm run clear

# Déploiement (après push sur main, automatique via GitHub Actions)
```

## 🎨 Personnalisation

### Thème et couleurs

Éditer `src/css/custom.css` :

```css
:root {
  --ifm-color-primary: #2e8555;
  --ifm-color-primary-dark: #29784c;
  /* ... */
}
```

### Logo et favicon

Placer les images dans `static/img/` et mettre à jour `docusaurus.config.js`.

## 📦 Dépendances principales

- `@docusaurus/core` : Framework de documentation
- `@docusaurus/preset-classic` : Preset avec docs, blog, pages
- `react` : Librairie UI
- `react-dom` : Rendu React

## 🔗 Ressources

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [claude.md](./claude.md) : Instructions détaillées pour Claude Code
- [plan-detaillé.md](./plan-detaillé.md) : Plan complet de la documentation

## 📄 Licence

Ce guide est créé à usage interne pour l'équipe IA/Data.

## 🤝 Contribution

Pour améliorer ce guide :
1. Créer une branche depuis `main`
2. Faire vos modifications
3. Tester localement avec `npm start`
4. Créer une Pull Request

## 📧 Contact

Pour toute question sur ce guide, contacter l'équipe IA/Data.

---

**Version** : 1.0  
**Dernière mise à jour** : Novembre 2025
