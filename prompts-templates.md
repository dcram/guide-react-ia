# Templates de Prompts pour Claude Code

Ce fichier contient des prompts prêts à l'emploi pour générer la documentation avec Claude Code. Il suffit de copier-coller et d'adapter si nécessaire.

---

## 🏗️ Setup Initial

### Prompt 1 : Créer le projet Docusaurus

```
Crée un projet Docusaurus nommé "guide-react-ia" avec cette configuration :

Structure :
docs/
├── intro.md
├── fundamentals/
│   ├── _category_.json
│   ├── section-1-rappels-react.md
│   └── section-2-setup-vite.md
├── api-integration/
│   ├── _category_.json
│   └── section-3-fastapi.md
├── interfaces/
│   ├── _category_.json
│   ├── section-4-annotation.md
│   ├── section-5-tables.md
│   └── section-6-dashboard.md
├── advanced/
│   ├── _category_.json
│   ├── section-7-best-practices.md
│   └── section-8-claude-workflow.md
└── conclusion.md

Configuration (docusaurus.config.js) :
- title: 'Guide React UI pour IA/Data'
- tagline: 'Créer des interfaces d\'annotation et de visualisation avec l\'aide de l\'IA'
- routeBasePath: '/' (docs à la racine)
- thème: classic
- prism: support pour bash, python, jsx

Crée aussi les fichiers _category_.json pour chaque dossier avec :
- fundamentals: label "Fondamentaux", position 1
- api-integration: label "Intégration API", position 2
- interfaces: label "Interfaces Spécialisées", position 3
- advanced: label "Avancé", position 4
```

---

## 📄 Génération des Sections

### Prompt 2 : Introduction (intro.md)

```
Génère docs/intro.md pour le guide React UI.

Frontmatter :
---
sidebar_position: 0
title: Introduction
slug: /
---

Contenu à inclure :
1. Présentation du guide (2 paragraphes)
   - Pour qui : ingénieurs IA/Data avec peu d'xp frontend
   - Pourquoi : créer des interfaces d'annotation/visualisation professionnelles
   
2. Ce que vous allez apprendre (liste à puces)
   - Setup React moderne (Vite)
   - Intégration FastAPI
   - Interfaces d'annotation
   - Tableaux interactifs
   - Dashboards de visualisation
   - Utilisation de Claude Code
   
3. Stack technique (cards visuelles avec MDX)
   - React + Vite
   - React-Bootstrap
   - FastAPI
   - Recharts
   - TanStack Table

4. Prérequis
   - Node.js >= 18
   - Notions Python/FastAPI
   - Concepts de base : API REST, JSON
   - Pas besoin d'être expert React

5. Structure du guide (présentation des 4 catégories)

6. Comment utiliser ce guide
   - Lire séquentiellement vs aller directement à une section
   - Utiliser les exemples de code
   - Tester localement
   - Adapter à vos besoins

Ton : accueillant, encourageant, pragmatique
Utilise des admonitions (:::tip, :::info) pour les points importants
```

### Prompt 3 : Section 1 - Rappels React

```
Génère docs/fundamentals/section-1-rappels-react.md en suivant le plan détaillé.

Frontmatter :
---
sidebar_position: 1
title: Rappels React et Structure
description: Concepts essentiels et organisation du code
---

Sections à inclure :

1. Introduction (🎯 Ce que vous allez apprendre)

2. Concepts React essentiels (concis, exemples simples)
   - Composants fonctionnels
   - Props (passage de données parent → enfant)
   - State (useState)
   - Hooks de base (useEffect)
   - Rendu conditionnel et listes

3. Structure de projet recommandée
   - Arborescence complète commentée (code block)
   - Explication de chaque dossier
   - Séparation : components/common, components/métier, pages, hooks, utils

4. Exemple : Arborescence d'une app d'annotation
   ```
   src/
   ├── components/
   │   ├── common/         # Composants réutilisables
   │   ├── layout/         # NavBar, Sidebar
   │   └── annotation/     # Composants métier
   ├── pages/              # Pages complètes
   ├── hooks/              # Custom hooks
   ├── utils/              # Utilitaires
   └── App.jsx             # Routes
   ```

5. Diagramme Mermaid : Flow de données React

6. 🤖 Prompts Claude Code recommandés (2-3 exemples)

7. ⚠️ Pièges à éviter (3-4 erreurs courantes)

8. 🔗 Ressources (liens vers React docs)

9. ➡️ Prochaine étape (transition vers section 2)

Style :
- Pragmatique et direct
- Exemples de code courts et commentés
- Admonitions pour tips/warnings
- Pas de jargon inutile
```

### Prompt 4 : Section 2 - Setup Vite

```
Génère docs/fundamentals/section-2-setup-vite.md

Frontmatter :
---
sidebar_position: 2
title: Setup avec Vite
description: Créer votre premier projet React
---

Contenu :

1. 🎯 Ce que vous allez apprendre

2. Pourquoi Vite ? (encadré :::info)
   - CRA n'est plus maintenu
   - Vite = nouveau standard (recommandé par React)
   - Avantages : démarrage instantané, HMR rapide
   - Courbe d'apprentissage minimale

3. Installation et création du projet
   ```bash
   # Vérifier Node.js
   node --version  # doit être >= 18
   
   # Créer le projet
   npm create vite@latest annotation-app -- --template react
   cd annotation-app
   npm install
   
   # Installer dépendances
   npm install react-bootstrap bootstrap
   npm install react-router-dom
   
   # Lancer
   npm run dev
   ```

4. Structure générée par Vite (explication)

5. Configuration de base
   - Imports Bootstrap CSS dans main.jsx
   - Configuration vite.config.js
   - Variables d'env (.env.local)

6. Différences Vite vs CRA (tableau comparatif en :::note)
   - Variables d'env : VITE_ vs REACT_APP_
   - Imports : ESM natif
   - Config : vite.config.js

7. Premier composant : Page d'accueil simple
   - Code complet HomePage.jsx
   - Utilisation de composants Bootstrap

8. Setup React Router
   - Code App.jsx avec routes
   - Navigation avec NavBar

9. 🤖 Prompts Claude Code
   - Générer structure complète
   - Créer pages avec Bootstrap

10. ⚠️ Pièges courants

11. ➡️ Prochaine étape

Inclure du code fonctionnel complet et commenté.
```

### Prompt 5 : Section 3 - API FastAPI

```
Génère docs/api-integration/section-3-fastapi.md

Suit la structure standard avec :

1. 🎯 Objectifs

2. Architecture (diagramme Mermaid)
   React (port 5173) <--> FastAPI (port 8000)

3. Backend FastAPI minimal (code complet main.py)
   - CORS configuration
   - Endpoints CRUD
   - Modèles Pydantic

4. Hook useFetch personnalisé
   - Code complet avec gestion loading/error/data
   - Explication ligne par ligne

5. Utilisation dans un composant
   - Exemple DocumentListPage.jsx
   - Affichage conditionnel (Spinner, Alert, Data)

6. Variables d'environnement Vite
   - .env.local
   - import.meta.env.VITE_API_URL

7. Gestion d'erreurs robuste

8. 🤖 Prompts Claude Code

9. ⚠️ Pièges (oublier CORS, dépendances useEffect, etc.)

10. ➡️ Prochaine étape

Tout le code doit être fonctionnel et testable.
```

### Prompt 6 : Section 4 - Interface Annotation

```
Génère docs/interfaces/section-4-annotation.md

C'est une section importante, sois très détaillé.

Structure :

1. 🎯 Objectifs

2. Conception de l'interface
   - Wireframe (décrire, image à ajouter après)
   - Flow utilisateur

3. Composants à créer
   - AnnotationList (container)
   - DocumentItem (ligne individuelle)
   - ConfidenceBadge (badge coloré)
   - CategorySelector (dropdown)

4. Backend : endpoint bulk update
   ```python
   @app.post("/api/annotations/bulk")
   ```

5. Frontend : Code complet
   - AnnotationPage.jsx (avec state management)
   - DocumentItem.jsx (avec actions)
   - Gestion optimistic updates
   - Sauvegarde bulk

6. UX et feedback utilisateur
   - Badges de confiance colorés
   - Toast de succès/erreur
   - Disabled states

7. Démo interactive (optionnel : créer composant dans src/components/Demo/)

8. 🤖 Prompts Claude Code (prompt complet pour générer tout)

9. ⚠️ Pièges (ne pas tracker état, pas de feedback, etc.)

10. 💡 Améliorations possibles

11. ➡️ Prochaine étape

Code complet, fonctionnel, commenté. C'est l'exemple phare du guide.
```

### Prompt 7 : Section 5 - Tableaux

```
Génère docs/interfaces/section-5-tables.md

Focus sur TanStack Table (moderne, headless).

1. 🎯 Objectifs

2. Pourquoi TanStack Table
   - Comparaison avec alternatives
   - Headless = contrôle total du style

3. Installation
   ```bash
   npm install @tanstack/react-table
   ```

4. Configuration de base
   - Définir les colonnes
   - useReactTable hook
   - Core features

5. Code complet AnnotationTable.jsx
   - Colonnes : ID, Document, Catégorie, Score, Statut, Actions
   - Tri (multi-colonnes)
   - Filtre global (search bar)
   - Pagination (20 items/page)
   - Style avec React-Bootstrap

6. Features avancées
   - Filtres par colonne
   - Export CSV (mention)

7. Pagination côté serveur vs client (discussion)

8. 🤖 Prompts Claude Code

9. ⚠️ Pièges

10. ➡️ Prochaine étape

Code complet et bien commenté.
```

### Prompt 8 : Section 6 - Dashboard

```
Génère docs/interfaces/section-6-dashboard.md

1. 🎯 Objectifs

2. Introduction Recharts
   - Composants React natifs
   - Responsive par défaut
   - Types de graphiques

3. Installation
   ```bash
   npm install recharts
   ```

4. Backend : endpoint /api/stats
   - Structure JSON complète

5. Dashboard complet (code DashboardPage.jsx)
   - Layout Grid 2x2 avec React-Bootstrap
   - 4 composants :
     * Cards métriques (total, avg confiance)
     * BarChart (annotations/catégorie)
     * LineChart (évolution temporelle)
     * PieChart (distribution scores)
   - Bouton refresh manuel
   - État loading

6. Configuration Recharts détaillée
   - ResponsiveContainer
   - CartesianGrid, XAxis, YAxis
   - Tooltip, Legend

7. Personnalisation
   - Couleurs
   - Formatage axes
   - Responsive

8. 🤖 Prompts Claude Code

9. ⚠️ Pièges (oublier ResponsiveContainer, graphiques trop petits)

10. ➡️ Prochaine étape

Code complet, visuellement clair, bien commenté.
```

### Prompt 9 : Section 7 - Best Practices

```
Génère docs/advanced/section-7-best-practices.md

1. 🎯 Objectifs

2. Composition de composants
   - Props drilling : le problème
   - Context API : la solution
   - Exemple avant/après

3. Gestion d'état
   - useState vs useReducer
   - Quand utiliser Context
   - Pattern Provider/Consumer

4. Performance
   - useMemo (calculs coûteux)
   - useCallback (fonctions stables)
   - Quand s'en préoccuper
   - Exemples concrets

5. Formulaires
   - Controlled components
   - Validation basique
   - Exemple complet

6. Accessibilité (a11y)
   - Labels sur inputs
   - ARIA attributes basiques
   - Navigation clavier

7. 🤖 Prompts Claude Code (refactoring, optimisation)

8. ⚠️ Pièges (sur-optimisation, Context partout)

9. ➡️ Prochaine étape

Exemples avant/après pour montrer l'amélioration.
```

### Prompt 10 : Section 8 - Workflow Claude

```
Génère docs/advanced/section-8-claude-workflow.md

1. 🎯 Objectifs

2. Méthodologie de prompts
   - Décomposer une feature
   - Séquence de prompts (général → spécifique)
   - Itération et debug

3. Exemple complet : Feature "Historique Annotations"
   - Prompt 1 : Structure
   - Prompt 2 : Fonctionnalités
   - Prompt 3 : Debug
   - Prompt 4 : Amélioration UI
   - Code résultant

4. Patterns de prompts efficaces
   - ✅ Bon prompt (contexte + objectif + contraintes)
   - ❌ Mauvais prompt (trop vague)

5. Claude Code vs Lovable
   - Tableau comparatif
   - Quand utiliser l'un ou l'autre
   - Exemple : même feature avec les deux

6. Debug assisté par IA
   - Partager erreurs console
   - Demander explications
   - Générer tests

7. 🤖 Best Practices de prompting

8. ⚠️ Pièges (prompts vagues, pas de contexte, accepter sans comprendre)

9. ➡️ Conclusion

Très pragmatique, avec des exemples de prompts réels.
```

### Prompt 11 : Conclusion

```
Génère docs/conclusion.md

Frontmatter :
---
sidebar_position: 10
title: Conclusion
---

Contenu :

1. Récapitulatif compétences acquises (checklist ✅)

2. Vous êtes maintenant capable de...
   - Setup projet React moderne
   - Intégrer API FastAPI
   - Créer interfaces d'annotation
   - Tableaux interactifs
   - Dashboards
   - Utiliser Claude Code efficacement

3. Pour aller plus loin (avec liens)
   - State management : Redux, Zustand
   - Testing : Jest, React Testing Library
   - TypeScript
   - Performance avancée
   - UI libraries : shadcn/ui, MUI
   - Animation : Framer Motion

4. Ressources recommandées (liens externes)

5. Quand faire appel à un frontend dev senior
   - Performance extrême
   - Design system custom
   - Architecture complexe
   - Accessibilité avancée

6. Message final inspirant
   "En tant qu'ingénieur IA/Data, vous avez maintenant les outils..."

Ton : encourageant, positif, ouverture vers l'apprentissage continu.
```

---

## 🎨 Composants de Démo

### Prompt 12 : Composant Démo - AnnotationList

```
Crée src/components/Demo/AnnotationList.jsx

Composant de démo pour Docusaurus, affichant une interface d'annotation simplifiée.

Requirements :
- 3 documents mockés hardcodés
- Props : predicted_category, confidence_score, text
- Badges colorés selon score (vert >80%, orange >60%, rouge sinon)
- Boutons "Valider" et "Corriger" (avec Dropdown de 4 catégories)
- État local pour tracker modifications
- Bouton "Sauvegarder" (simule API call avec alert)
- Utilise React-Bootstrap
- Auto-suffisant (pas de props externes)
- Responsive

Style :
- Cards pour chaque document
- Badges Bootstrap
- Buttons et Dropdowns Bootstrap
- Layout avec Container, Row, Col

Le composant sera importé dans la doc avec :
import AnnotationList from '@site/src/components/Demo/AnnotationList';

<AnnotationList />
```

### Prompt 13 : Composant Démo - Dashboard

```
Crée src/components/Demo/Dashboard.jsx

Dashboard miniature avec Recharts pour démo.

Requirements :
- Données mockées hardcodées
- 2 graphiques :
  * BarChart : annotations par catégorie (4 catégories)
  * LineChart : évolution sur 7 jours
- 2 cards métriques :
  * Total annotations : 1247
  * Confiance moyenne : 87%
- Layout Grid 2x2 responsive
- Bouton refresh (re-génère données aléatoires légèrement)
- Utilise React-Bootstrap + Recharts
- Auto-suffisant

Style :
- Cards Bootstrap
- ResponsiveContainer pour graphiques
- Couleurs cohérentes
- Compact (adapté sidebar Docusaurus)

Import :
import Dashboard from '@site/src/components/Demo/Dashboard';

<Dashboard />
```

---

## ⚙️ Configuration

### Prompt 14 : GitHub Actions Workflow

```
Crée .github/workflows/deploy.yml pour déployer sur GitHub Pages.

Utilise :
- Trigger : push sur main
- Node 18
- npm ci, npm run build
- actions/configure-pages@v4
- actions/upload-pages-artifact@v3
- actions/deploy-pages@v4

Le build Docusaurus est dans ./build

Permissions :
- contents: read
- pages: write
- id-token: write

Environment : github-pages
```

### Prompt 15 : Configuration Docusaurus complète

```
Mets à jour docusaurus.config.js avec :

title: 'Guide React UI pour IA/Data'
tagline: 'Créer des interfaces d\'annotation et de visualisation avec l\'aide de l\'IA'
url: 'https://[USERNAME].github.io'
baseUrl: '/guide-react-ia/'
organizationName: '[USERNAME]'
projectName: 'guide-react-ia'

themeConfig:
- navbar avec items : Documentation, GitHub
- footer avec liens vers React, FastAPI, Recharts docs
- prism avec langages : bash, python, jsx
- colorMode : light/dark toggle

presets:
- docs routeBasePath: '/'
- theme customCss

Remplace [USERNAME] par un placeholder que je remplacerai.
```

---

## 📝 Notes

Ces prompts sont conçus pour être utilisés séquentiellement. Chaque prompt génère une section complète suivant les standards définis dans `claude.md`.

**Tips** :
- Toujours commencer par lire `claude.md` et `plan-detaillé.md`
- Adapter les prompts si nécessaire (ajouter contexte spécifique)
- Tester chaque section générée localement
- Itérer avec Claude si le résultat n'est pas satisfaisant

**Commandes utiles après chaque génération** :
```bash
npm start          # Vérifier le rendu
npm run build      # Tester le build
```
