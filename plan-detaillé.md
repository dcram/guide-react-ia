# Guide de Création d'UI React pour Ingénieur IA/Data
## Création d'interfaces d'annotation et de visualisation avec l'aide de l'IA

---

## 📋 Informations générales

**Public cible** : Ingénieur IA/Data avec connaissances en développement logiciel mais peu d'expérience en frontend

**Format** : Documentation Docusaurus déployée sur GitHub Pages

**Stack technique** :
- React + Vite (recommandé par React depuis 2023)
- React-Bootstrap (personnalisation basique)
- FastAPI (backend)
- Recharts (visualisation)
- TanStack Table (tableaux interactifs)

**Objectifs pédagogiques** :
1. Comprendre les concepts React essentiels pour créer des UIs professionnelles
2. Maîtriser l'utilisation de Claude Code pour accélérer le développement frontend
3. Créer des interfaces d'annotation et de visualisation adaptées aux workflows IA
4. Intégrer proprement des APIs FastAPI dans une application React

---

## 🗂️ Structure Docusaurus

```
guide-react-ia/
├── docs/
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
│   └── components/Demo/  (composants démo interactifs)
└── static/img/  (wireframes, screenshots)
```

---

## 📄 Contenu des sections

### intro.md
- Présentation du guide et de son approche
- Pourquoi React pour des projets IA/Data
- Vue d'ensemble de l'architecture (React → FastAPI)
- Prérequis techniques (Node.js, notions Python/FastAPI)

---

### 📚 Section 1 : Rappels React et Structure de Projet
**Fichier** : `docs/fundamentals/section-1-rappels-react.md`

**Objectif** : Poser les fondations avant de coder

**Contenu** :
- Rappel rapide des concepts React essentiels
  - Composants fonctionnels (pas de classes)
  - Props : passer des données entre composants
  - State et hooks (useState, useEffect)
  - Rendu conditionnel et listes
- Structure d'un projet React multi-pages
  - Organisation des dossiers (pages, components, hooks, utils)
  - Routing avec React Router
  - Composants réutilisables vs composants page-specific
- Conventions de nommage et architecture

**Exemple pratique** :
```
src/
├── components/
│   ├── common/         # Composants réutilisables
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   └── Spinner.jsx
│   ├── layout/         # Layout et navigation
│   │   ├── NavBar.jsx
│   │   └── Sidebar.jsx
│   └── annotation/     # Composants métier
│       ├── DocumentList.jsx
│       └── AnnotationForm.jsx
├── pages/              # Pages complètes
│   ├── HomePage.jsx
│   ├── AnnotationPage.jsx
│   └── DashboardPage.jsx
├── hooks/              # Custom hooks
│   └── useFetch.js
├── utils/              # Utilitaires
│   └── api.js
└── App.jsx             # Point d'entrée avec routes
```

**Diagramme** : Flow de données (props down, events up)

**Prompts Claude Code suggérés** :
- "Explique-moi la différence entre props et state en React avec un exemple simple"
- "Crée une structure de dossiers pour une application d'annotation React"

---

### 🚀 Section 2 : Setup et Premier Projet avec Vite
**Fichier** : `docs/fundamentals/section-2-setup-vite.md`

**Objectif** : Mettre en place l'environnement et créer une première interface simple

**Contenu** :
- **Pourquoi Vite ?**
  - Contexte : Create React App n'est plus maintenu
  - Vite = nouveau standard recommandé par React
  - Avantages : démarrage instantané, HMR ultra-rapide
  - Courbe d'apprentissage minimale
- Installation et configuration
  - Node.js et npm (vérification versions)
  - Création projet : `npm create vite@latest`
  - Installation de React-Bootstrap
  - Structure générée par Vite
- **Différences Vite vs CRA** (encadré)
  - Variables d'env : `VITE_` au lieu de `REACT_APP_`
  - Imports : ESM natif
  - Config : `vite.config.js` au lieu de `react-scripts`
- Premier composant : page de liste simple
- Configuration React Router pour navigation multi-pages

**Exemple pratique** :
```bash
# Création du projet
npm create vite@latest annotation-app -- --template react
cd annotation-app
npm install

# Installation des dépendances
npm install react-bootstrap bootstrap
npm install react-router-dom

# Lancement
npm run dev
```

**Code** : 
- Configuration `vite.config.js` de base
- `App.jsx` avec React Router et routes
- Première page `HomePage.jsx` avec composants Bootstrap
- Page de liste affichant des données mockées

**Démonstration interactive** : Composant de liste simple avec données hardcodées

**Prompts Claude Code suggérés** :
```
Crée un projet Vite React avec :
- React-Bootstrap installé
- React Router configuré avec 3 routes : Home, Annotation, Dashboard
- Une navbar Bootstrap avec navigation
- Une page d'accueil simple avec un titre et un bouton
```

**Pièges à éviter** :
- Oublier d'importer le CSS Bootstrap dans `main.jsx`
- Confondre les variables d'env CRA et Vite
- Ne pas utiliser `<BrowserRouter>` pour React Router



---

### 🔌 Section 3 : Intégration API FastAPI
**Fichier** : `docs/api-integration/section-3-fastapi.md`

**Objectif** : Connecter le frontend au backend de manière robuste

**Contenu** :
- **Setup FastAPI minimal** (exemple backend de référence)
  - Endpoints CRUD classiques
  - CORS configuration pour développement local
  - Structure JSON des réponses
- **Côté React** :
  - Fetch API vs Axios (recommandation : fetch natif pour simplicité)
  - Gestion des états : loading, error, data
  - Hooks personnalisés pour réutilisabilité
  - Variables d'environnement avec Vite (`.env.local`)
- Pattern de gestion d'erreur robuste
- Affichage conditionnel (Spinner, Error, Success)

**Exemple pratique** :

**Backend FastAPI** (`main.py`) :
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# CORS pour dev local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Port Vite par défaut
    allow_methods=["*"],
    allow_headers=["*"],
)

class Document(BaseModel):
    id: int
    text: str
    predicted_category: str
    confidence_score: float
    status: str = "pending"

@app.get("/api/documents")
def get_documents():
    return [
        {
            "id": 1,
            "text": "Article sur l'IA...",
            "predicted_category": "Technology",
            "confidence_score": 0.95,
            "status": "pending"
        },
        # ...
    ]

@app.put("/api/documents/{doc_id}")
def update_document(doc_id: int, document: Document):
    return {"message": "Updated", "document": document}
```

**Frontend React** - Custom Hook `useFetch.js` :
```javascript
import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
```

**Utilisation** (`DocumentListPage.jsx`) :
```jsx
import { useFetch } from '../hooks/useFetch';
import { Spinner, Alert } from 'react-bootstrap';

function DocumentListPage() {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const { data, loading, error } = useFetch(`${apiUrl}/api/documents`);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">Error: {error}</Alert>;

  return (
    <div>
      {data.map(doc => (
        <div key={doc.id}>{doc.text}</div>
      ))}
    </div>
  );
}
```

**Configuration** (`.env.local`) :
```
VITE_API_URL=http://localhost:8000
```

**Démonstration interactive** : Composant qui fetch des données avec états de chargement

**Prompts Claude Code suggérés** :
```
Crée un custom hook React nommé useFetch qui :
- Prend une URL en paramètre
- Retourne { data, loading, error }
- Gère les erreurs proprement
- Utilise useEffect pour le fetch
```

**Pièges à éviter** :
- Oublier les dépendances dans useEffect
- Ne pas gérer les états de chargement/erreur
- Hardcoder l'URL de l'API au lieu d'utiliser les variables d'env

---

### 📝 Section 4 : Interface d'Annotation - Liste Scorée
**Fichier** : `docs/interfaces/section-4-annotation.md`

**Objectif** : Créer l'interface principale d'annotation avec validation/correction en masse

**Contenu** :
- **Conception de l'interface** (wireframe)
  - Liste de documents
  - Badges de confiance (couleur selon score)
  - Actions par ligne : Valider / Corriger
  - Action globale : Sauvegarder tout
- **Composants** :
  - `AnnotationList` : conteneur principal
  - `DocumentItem` : ligne individuelle
  - `CategorySelector` : dropdown de correction
  - `ConfidenceBadge` : badge coloré selon score
- **Gestion de l'état** :
  - État local pour modifications en cours
  - Optimistic updates
  - Sauvegarde bulk vers API
- **UX** :
  - Feedback visuel des modifications
  - Confirmation avant sauvegarde
  - Toast de succès/erreur

**Exemple pratique complet** :

**Backend** (`main.py` - endpoints) :
```python
@app.post("/api/annotations/bulk")
def save_annotations(annotations: list[Document]):
    # Sauvegarder en BDD
    return {"message": f"Saved {len(annotations)} annotations"}
```

**Frontend** - Composant principal :
```jsx
import { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import DocumentItem from '../components/DocumentItem';

function AnnotationPage() {
  const { data: documents, loading, error } = useFetch('/api/documents');
  const [annotations, setAnnotations] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleValidate = (docId) => {
    setAnnotations(prev => ({
      ...prev,
      [docId]: { action: 'validated' }
    }));
  };

  const handleCorrect = (docId, newCategory) => {
    setAnnotations(prev => ({
      ...prev,
      [docId]: { action: 'corrected', category: newCategory }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = Object.entries(annotations).map(([id, data]) => ({
        id: parseInt(id),
        ...data
      }));
      
      const response = await fetch('/api/annotations/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      
      if (response.ok) {
        setSaveSuccess(true);
        setAnnotations({});
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <h1>Annotation de documents</h1>
      {saveSuccess && <Alert variant="success">Annotations sauvegardées !</Alert>}
      
      <div className="document-list">
        {documents.map(doc => (
          <DocumentItem
            key={doc.id}
            document={doc}
            annotation={annotations[doc.id]}
            onValidate={() => handleValidate(doc.id)}
            onCorrect={(category) => handleCorrect(doc.id, category)}
          />
        ))}
      </div>
      
      <Button 
        onClick={handleSave} 
        disabled={Object.keys(annotations).length === 0 || saving}
      >
        {saving ? 'Sauvegarde...' : `Sauvegarder (${Object.keys(annotations).length})`}
      </Button>
    </div>
  );
}
```

**Composant** `DocumentItem.jsx` :
```jsx
import { Badge, Button, Dropdown } from 'react-bootstrap';

function DocumentItem({ document, annotation, onValidate, onCorrect }) {
  const { text, predicted_category, confidence_score } = document;
  
  const getBadgeVariant = (score) => {
    if (score >= 0.8) return 'success';
    if (score >= 0.6) return 'warning';
    return 'danger';
  };
  
  const categories = ['Technology', 'Finance', 'Sport', 'Politics'];
  
  return (
    <div className="document-item">
      <div className="document-text">{text}</div>
      <div className="document-meta">
        <Badge bg={getBadgeVariant(confidence_score)}>
          {predicted_category} ({(confidence_score * 100).toFixed(0)}%)
        </Badge>
        
        {!annotation && (
          <>
            <Button size="sm" variant="success" onClick={onValidate}>
              ✓ Valider
            </Button>
            <Dropdown>
              <Dropdown.Toggle size="sm" variant="warning">
                Corriger
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {categories.map(cat => (
                  <Dropdown.Item key={cat} onClick={() => onCorrect(cat)}>
                    {cat}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </>
        )}
        
        {annotation && (
          <Badge bg="info">
            {annotation.action === 'validated' ? 'Validé' : `Corrigé → ${annotation.category}`}
          </Badge>
        )}
      </div>
    </div>
  );
}
```

**Wireframe** : Schéma de l'interface dans `/static/img/wireframes/annotation-interface.png`

**Démonstration interactive** : Version simplifiée fonctionnelle dans Docusaurus

**Prompts Claude Code suggérés** :
```
Crée une interface d'annotation React avec :
- Une liste de documents avec prédictions IA
- Badges de confiance colorés (vert >80%, orange >60%, rouge sinon)
- Boutons "Valider" et "Corriger" (avec dropdown de catégories)
- État local pour traquer les modifications
- Bouton global "Sauvegarder" qui envoie en bulk à l'API
- Utilise React-Bootstrap pour l'UI
```

**Pièges à éviter** :
- Ne pas tracker l'état local des modifications
- Envoyer un appel API par document au lieu d'un bulk update
- Oublier le feedback utilisateur pendant la sauvegarde

---

### 📊 Section 5 : Tableaux Interactifs avec Pagination et Filtres
**Fichier** : `docs/interfaces/section-5-tables.md`

**Objectif** : Afficher et manipuler des données tabulaires professionnellement

**Contenu** :
- **Choix de la librairie** : TanStack Table (moderne, headless, flexible)
- **Configuration** :
  - Définition des colonnes
  - Tri (single et multi-colonnes)
  - Filtres (par colonne)
  - Pagination (contrôlée)
- **Pagination** : côté client vs côté serveur (discussion)
- **Styling** : Intégration avec React-Bootstrap
- **Actions par ligne** : boutons d'édition/suppression

**Exemple pratique** :

```jsx
import { useReactTable, getCoreRowModel, getSortedRowModel, 
         getFilteredRowModel, getPaginationRowModel, 
         flexRender } from '@tanstack/react-table';
import { Table, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

function AnnotationTable({ data }) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState('');
  
  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 60
    },
    {
      accessorKey: 'text',
      header: 'Document',
      cell: info => info.getValue().substring(0, 50) + '...'
    },
    {
      accessorKey: 'predicted_category',
      header: 'Catégorie',
      sortingFn: 'alphanumeric'
    },
    {
      accessorKey: 'confidence_score',
      header: 'Score',
      cell: info => `${(info.getValue() * 100).toFixed(1)}%`,
      sortingFn: 'basic'
    },
    {
      accessorKey: 'status',
      header: 'Statut',
      filterFn: 'includesString'
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Button size="sm" onClick={() => handleEdit(row.original.id)}>
          Éditer
        </Button>
      )
    }
  ];
  
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  });
  
  return (
    <div>
      <Form.Control
        type="text"
        placeholder="Rechercher..."
        value={filtering}
        onChange={e => setFiltering(e.target.value)}
        className="mb-3"
      />
      
      <Table striped bordered hover>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th 
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: 'pointer' }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{ asc: ' 🔼', desc: ' 🔽' }[header.column.getIsSorted()] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      
      <div className="d-flex justify-content-between align-items-center">
        <div>
          Page {table.getState().pagination.pageIndex + 1} sur{' '}
          {table.getPageCount()}
        </div>
        <div>
          <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Précédent
          </Button>
          <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
}
```

**Démonstration interactive** : Tableau avec données mockées

**Prompts Claude Code suggérés** :
```
Crée un tableau React avec TanStack Table qui affiche des annotations avec :
- Colonnes : ID, Document (tronqué), Catégorie, Score (%), Statut, Actions
- Tri sur toutes les colonnes
- Filtre global (barre de recherche)
- Pagination (20 items/page)
- Style avec React-Bootstrap
- Indicateurs de tri (flèches)
```

**Pièges à éviter** :
- Oublier les hooks de tri/filtrage/pagination
- Ne pas mémoïser les colonnes (re-render inutiles)
- Pagination côté serveur sans feedback loading

---

### 📈 Section 6 : Dashboard de Visualisation
**Fichier** : `docs/interfaces/section-6-dashboard.md`

**Objectif** : Créer des graphiques pour monitorer l'activité d'annotation

**Contenu** :
- **Introduction à Recharts**
  - Philosophie : composants React natifs
  - Types de graphiques disponibles
  - Configuration de base
- **Layout responsive** avec React-Bootstrap Grid
- **Graphiques utiles pour IA/Data** :
  - BarChart : distribution par catégorie
  - LineChart : évolution temporelle
  - PieChart : proportions
- **Métriques clés** : Cards avec chiffres
- **Rafraîchissement manuel** : bouton + état loading

**Exemple pratique - Dashboard complet** :

**Backend** (`main.py`) :
```python
@app.get("/api/stats")
def get_stats():
    return {
        "total_annotations": 1247,
        "avg_confidence": 0.87,
        "by_category": [
            {"category": "Technology", "count": 450},
            {"category": "Finance", "count": 320},
            {"category": "Sport", "count": 280},
            {"category": "Politics", "count": 197}
        ],
        "timeline": [
            {"date": "2024-11-01", "count": 45},
            {"date": "2024-11-02", "count": 52},
            # ...
        ],
        "confidence_distribution": [
            {"range": "0-20%", "count": 12},
            {"range": "20-40%", "count": 45},
            {"range": "40-60%", "count": 123},
            {"range": "60-80%", "count": 467},
            {"range": "80-100%", "count": 600}
        ]
    }
```

**Frontend** (`DashboardPage.jsx`) :
```jsx
import { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
         XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useFetch } from '../hooks/useFetch';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function DashboardPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { data: stats, loading } = useFetch(`/api/stats?r=${refreshKey}`);
  
  const handleRefresh = () => setRefreshKey(prev => prev + 1);
  
  if (loading) return <Spinner />;
  
  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Dashboard ML</h1>
        <Button onClick={handleRefresh}>🔄 Rafraîchir</Button>
      </div>
      
      {/* Métriques clés */}
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Total Annotations</Card.Title>
              <h2>{stats.total_annotations}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Confiance Moyenne</Card.Title>
              <h2>{(stats.avg_confidence * 100).toFixed(1)}%</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Graphiques */}
      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Annotations par Catégorie</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.by_category}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Évolution Temporelle</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.timeline}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Distribution des Scores</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.confidence_distribution}
                    dataKey="count"
                    nameKey="range"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {stats.confidence_distribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
```

**Démonstration interactive** : Dashboard miniature dans Docusaurus

**Prompts Claude Code suggérés** :
```
Crée un dashboard React avec Recharts qui affiche :
- 2 cards de métriques (total annotations, confiance moyenne)
- Graphique en barres : annotations par catégorie
- Graphique en ligne : évolution dans le temps
- Graphique camembert : distribution des scores de confiance
- Layout responsive (Grid 2x2)
- Bouton "Rafraîchir" qui recharge les données
- Utilise React-Bootstrap pour le layout et les cards
```

**Pièges à éviter** :
- Oublier `ResponsiveContainer` (graphiques non-responsive)
- Ne pas gérer le loading du refresh
- Graphiques trop petits (min-height 300px)

---

### ⚡ Section 7 : Bonnes Pratiques et Optimisations
**Fichier** : `docs/advanced/section-7-best-practices.md`

**Objectif** : Rendre le code maintenable, performant et professionnel

**Contenu** :
- **Composition de composants** :
  - Props drilling : le problème
  - Composition vs héritage
  - Children props et render props
- **Gestion d'état avancée** :
  - Quand utiliser Context API (vs props)
  - Pattern Provider/Consumer
  - useState vs useReducer pour logique complexe
- **Performance** :
  - useMemo : mémoïser des calculs coûteux
  - useCallback : stabiliser des fonctions callback
  - Quand s'en soucier (vraiment)
- **Formulaires** :
  - Controlled components (recommandé)
  - Validation simple
  - Librairies (react-hook-form) - mention
- **Accessibilité** (a11y) :
  - Labels sur les inputs
  - ARIA attributes basiques
  - Navigation clavier

**Exemples pratiques** :

**Avant (props drilling)** :
```jsx
function App() {
  const [user, setUser] = useState(null);
  return <Dashboard user={user} setUser={setUser} />;
}

function Dashboard({ user, setUser }) {
  return <Sidebar user={user} setUser={setUser} />;
}

function Sidebar({ user, setUser }) {
  return <UserProfile user={user} setUser={setUser} />;
}

function UserProfile({ user, setUser }) {
  return <div>{user.name}</div>;
}
```

**Après (Context API)** :
```jsx
const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Dashboard />
    </UserContext.Provider>
  );
}

function UserProfile() {
  const { user } = useContext(UserContext);
  return <div>{user.name}</div>;
}
```

**Performance - useMemo** :
```jsx
function AnnotationList({ documents }) {
  // ❌ Recalculé à chaque render
  const filteredDocs = documents.filter(d => d.score > 0.8);
  
  // ✅ Mémoïsé, recalculé seulement si documents change
  const filteredDocs = useMemo(
    () => documents.filter(d => d.score > 0.8),
    [documents]
  );
  
  return <div>...</div>;
}
```

**Formulaire contrôlé** :
```jsx
function AnnotationForm() {
  const [formData, setFormData] = useState({ category: '', notes: '' });
  
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (!formData.category) {
      alert('Catégorie requise');
      return;
    }
    // Envoi API
    saveAnnotation(formData);
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="category">Catégorie</Form.Label>
        <Form.Control
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button type="submit">Sauvegarder</Button>
    </Form>
  );
}
```

**Prompts Claude Code suggérés** :
```
Refactore ce composant avec props drilling en utilisant Context API
```
```
Optimise ce composant en utilisant useMemo et useCallback où approprié
```

**Pièges à éviter** :
- Sur-optimiser (useMemo partout)
- Context pour tout (overkill pour petites apps)
- Formulaires non-contrôlés (uncontrolled)

---

### 🤖 Section 8 : Workflow Complet avec Claude Code et Lovable
**Fichier** : `docs/advanced/section-8-claude-workflow.md`

**Objectif** : Maîtriser l'orchestration de Claude Code pour créer des features complètes

**Contenu** :
- **Méthodologie** :
  - Décomposer une feature en sous-tâches
  - Séquence de prompts (du général au spécifique)
  - Itération et debug avec Claude
- **Patterns de prompts efficaces** :
  - Prompt initial : contexte + objectif + contraintes
  - Prompts de correction : erreur spécifique + solution attendue
  - Prompts d'amélioration : feedback + direction
- **Claude Code vs Lovable** :
  - Claude Code : contrôle total, code local, personnalisation
  - Lovable : prototypage rapide, moins de contrôle
  - Quand utiliser l'un ou l'autre
- **Debug assisté par IA** :
  - Partager les erreurs console
  - Demander des explications
  - Générer des tests

**Exemple pratique - Feature "Historique des Annotations"** :

**Séquence de prompts** :

**Prompt 1 (Structure)** :
```
Je veux créer une page "Historique des Annotations" dans mon app React.

Contexte :
- App d'annotation de documents
- Backend FastAPI avec endpoint GET /api/annotations/history
- Réponse JSON : liste avec {id, document_text, category, annotated_by, annotated_at, previous_category}

Crée :
1. Le fichier AnnotationHistoryPage.jsx
2. Un hook useFetch pour récupérer les données
3. L'affichage avec React-Bootstrap Table
4. Ajoute la route dans App.jsx

Style : React-Bootstrap, épuré
```

**Prompt 2 (Fonctionnalité)** :
```
Ajoute à AnnotationHistoryPage :
- Un filtre par annotateur (dropdown)
- Un filtre par date (date picker)
- Un indicateur quand la catégorie a été modifiée vs validée
- Tri par date (plus récent en premier)
```

**Prompt 3 (Debug)** :
```
J'ai cette erreur dans la console :
"Cannot read property 'map' of undefined"

Elle vient de la ligne où je map sur history.data
Le composant AnnotationHistoryPage ne gère pas le cas où data est null au chargement.

Corrige en ajoutant les vérifications nécessaires.
```

**Prompt 4 (Amélioration)** :
```
Le tableau est trop chargé. Améliore l'UI :
- Tronquer le texte des documents à 50 caractères
- Utiliser des badges pour les catégories
- Ajouter une colonne avec une icône selon le type d'action (✓ validé, ✏️ corrigé)
- Formater les dates en français (format court)
```

**Comparaison Lovable** :

Avec Lovable, tu aurais dit :
```
"Crée une page historique des annotations avec filtres et tableau"
```

**Avantages Lovable** :
- Interface générée en 30 secondes
- Design cohérent automatique
- Moins de prompts nécessaires

**Inconvénients Lovable** :
- Moins de contrôle sur l'implémentation
- Difficile de personnaliser finement
- Code généré non-local (hébergé chez Lovable)

**Recommandation** :
- **Prototypage rapide** : Lovable
- **Production / Personnalisation** : Claude Code

**Tableau comparatif** :

| Critère | Claude Code | Lovable |
|---------|-------------|---------|
| Contrôle | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| Vitesse | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Personnalisation | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Code local | ✅ | ❌ |
| Apprentissage | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

**Prompts Claude Code - Best Practices** :

✅ **Bon prompt** :
```
Crée un composant React AnnotationCard qui :
- Affiche un document avec sa catégorie prédite
- Props : { document, onValidate, onCorrect }
- Badge coloré selon le score (>80% vert, >60% orange, sinon rouge)
- Boutons "Valider" (variant success) et "Corriger" (dropdown de catégories)
- Style : React-Bootstrap Card
- Responsive (col-md-6)
```

❌ **Mauvais prompt** :
```
Fais-moi un truc pour annoter
```

**Pièges à éviter** :
- Prompts trop vagues
- Ne pas donner le contexte (stack, conventions)
- Accepter du code sans le comprendre
- Ne pas tester après génération

---

### conclusion.md
**Fichier** : `docs/conclusion.md`

**Contenu** :
- **Récapitulatif des compétences acquises**
  - ✅ Setup d'un projet React moderne (Vite)
  - ✅ Structure de code maintenable
  - ✅ Intégration API FastAPI
  - ✅ Interfaces d'annotation professionnelles
  - ✅ Tableaux interactifs (TanStack Table)
  - ✅ Dashboards de visualisation (Recharts)
  - ✅ Utilisation efficace de Claude Code

- **Pour aller plus loin**
  - State management avancé (Redux, Zustand)
  - Testing (Jest, React Testing Library, Playwright)
  - Performance avancée (React.memo, code splitting)
  - TypeScript pour plus de robustesse
  - Librairies UI avancées (shadcn/ui, MUI)
  - Animation (Framer Motion)

- **Ressources recommandées**
  - [React Docs officielle](https://react.dev)
  - [React-Bootstrap Docs](https://react-bootstrap.github.io/)
  - [TanStack Table Docs](https://tanstack.com/table/latest)
  - [Recharts Docs](https://recharts.org/)
  - [FastAPI Docs](https://fastapi.tiangolo.com/)

- **Quand faire appel à un frontend dev senior**
  - Application critique avec besoins de performance extrêmes
  - Design system custom complexe
  - Architecture multi-équipes
  - Accessibilité avancée (WCAG AAA)
  - Animations complexes
  - SSR/SSG (Next.js, Remix)

- **Message final**
  > En tant qu'ingénieur IA/Data, vous avez maintenant les outils pour créer des interfaces professionnelles pour vos projets ML. L'IA (Claude Code) est un accélérateur puissant, mais votre compréhension des concepts React reste essentielle pour débugger, personnaliser et maintenir votre code. N'hésitez pas à itérer, tester et apprendre en faisant !



---

## 📊 Exemples fils rouges

Tous les exemples tourneront autour de **deux applications** :

1. **AnnotaTool** : Interface d'annotation de documents avec classification
   - Liste de documents avec prédictions IA
   - Validation/correction en masse
   - Tableau de suivi des annotations

2. **DashBoard ML** : Dashboard de monitoring
   - Statistiques d'annotation
   - Graphiques de performance
   - Métriques de confiance des modèles

---

## 🎯 Compétences finales attendues

À la fin du guide, l'ingénieur IA/Data sera capable de :

- ✅ Créer une application React multi-pages structurée
- ✅ Intégrer des APIs FastAPI avec gestion d'erreurs
- ✅ Utiliser Claude Code efficacement pour générer et itérer sur du code frontend
- ✅ Créer des interfaces d'annotation professionnelles
- ✅ Implémenter des tableaux interactifs avec tri/filtres/pagination
- ✅ Construire des dashboards de visualisation avec Recharts
- ✅ Appliquer les bonnes pratiques React (composition, hooks, état)
- ✅ Débugger et améliorer du code généré par IA

---

## 📝 Notes de rédaction

**Ton** : Pragmatique et direct, peu de jargon, focus sur "comment faire"

**Format des sections** :
- Introduction courte (pourquoi cette section)
- Concepts théoriques (concis, avec schémas si utile)
- Exemple pratique commenté
- Prompts Claude Code à utiliser
- Points d'attention / erreurs courantes

**Code** :
- Python (FastAPI) : exemples d'endpoints
- React : composants complets et fonctionnels
- Tous les exemples doivent être testables

