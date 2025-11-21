---
sidebar_position: 1
title: Bonnes Pratiques React
description: Rendre votre code maintenable, performant et professionnel
---

# Bonnes Pratiques et Optimisations React

## 🎯 Ce que vous allez apprendre

- Éviter le props drilling avec Context API
- Utiliser la composition de composants efficacement
- Optimiser les performances avec useMemo et useCallback
- Gérer les formulaires proprement (controlled components)
- Appliquer les bases de l'accessibilité (a11y)
- Organiser votre code pour la maintenabilité

## Pourquoi c'est important

Un code bien structuré, c'est :
- **Facile à maintenir** : vous comprendrez votre code dans 6 mois
- **Performant** : l'app reste fluide même avec beaucoup de données
- **Évolutif** : ajouter des features ne casse pas l'existant
- **Accessible** : utilisable par tous, y compris personnes handicapées

:::tip Pour les ingénieurs IA/Data
Comme pour le code ML, le frontend a besoin de bonnes pratiques. Un modèle mal structuré est difficile à débugger ; une app React mal structurée aussi.
:::

## Props Drilling : le problème

**Props drilling** = passer des props à travers plusieurs niveaux de composants qui ne les utilisent pas.

### Exemple du problème

```jsx
// ❌ Props drilling - complexe et fragile
function App() {
  const [user, setUser] = useState({ name: 'Alice', role: 'admin' });

  return <Dashboard user={user} setUser={setUser} />;
}

function Dashboard({ user, setUser }) {
  // Dashboard n'utilise pas user, mais doit le passer
  return (
    <div>
      <Sidebar user={user} setUser={setUser} />
      <MainContent />
    </div>
  );
}

function Sidebar({ user, setUser }) {
  // Sidebar n'utilise pas user, mais doit le passer
  return (
    <div>
      <Navigation />
      <UserProfile user={user} setUser={setUser} />
    </div>
  );
}

function UserProfile({ user, setUser }) {
  // Enfin utilisé ici, 3 niveaux plus bas !
  return (
    <div>
      <p>Bienvenue, {user.name}</p>
      <button onClick={() => setUser({ ...user, name: 'Bob' })}>
        Changer de nom
      </button>
    </div>
  );
}
```

**Problèmes** :
- Beaucoup de props à passer
- Composants intermédiaires dépendent d'infos qu'ils n'utilisent pas
- Difficile de refactorer

## Solution : Context API

Le Context permet de partager des données globales sans props drilling.

### Création d'un Context

```jsx title="src/contexts/UserContext.jsx"
import { createContext, useContext, useState } from 'react';

// Créer le Context
const UserContext = createContext();

// Hook personnalisé pour utiliser le Context
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

// Provider qui enveloppe l'application
export function UserProvider({ children }) {
  const [user, setUser] = useState({ name: 'Alice', role: 'admin' });

  const value = {
    user,
    setUser,
    updateUserName: (name) => setUser(prev => ({ ...prev, name })),
    logout: () => setUser(null)
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
```

### Utilisation du Context

```jsx title="src/App.jsx"
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <Dashboard />
    </UserProvider>
  );
}
```

```jsx title="src/components/UserProfile.jsx"
import { useUser } from '../contexts/UserContext';

function UserProfile() {
  const { user, updateUserName } = useUser();

  if (!user) return <p>Non connecté</p>;

  return (
    <div>
      <p>Bienvenue, {user.name}</p>
      <button onClick={() => updateUserName('Bob')}>
        Changer de nom
      </button>
    </div>
  );
}
```

**Avantages** :
- Pas de props drilling
- Composants intermédiaires indépendants
- Logique centralisée dans le Provider

:::warning Quand utiliser Context ?
- ✅ Données globales (user, theme, langue)
- ✅ État partagé par beaucoup de composants
- ❌ État local à 2-3 composants (props suffisent)
- ❌ État qui change très souvent (performance)
:::

## Composition de composants

La **composition** consiste à construire des composants complexes à partir de composants simples.

### Exemple : Composition d'une Card

```jsx title="src/components/common/Card.jsx"
// Composant de base flexible
function Card({ children, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ children }) {
  return <div className="card-header">{children}</div>;
}

function CardBody({ children }) {
  return <div className="card-body">{children}</div>;
}

function CardFooter({ children }) {
  return <div className="card-footer">{children}</div>;
}

// Exporter tout
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
```

### Utilisation

```jsx
import Card from './components/common/Card';

function DocumentCard({ document }) {
  return (
    <Card>
      <Card.Header>
        <h3>{document.title}</h3>
      </Card.Header>
      <Card.Body>
        <p>{document.text}</p>
        <Badge>{document.category}</Badge>
      </Card.Body>
      <Card.Footer>
        <Button>Valider</Button>
        <Button>Corriger</Button>
      </Card.Footer>
    </Card>
  );
}
```

**Avantages** :
- Très flexible
- Réutilisable pour différents cas
- Facile à personnaliser

## Performance : useMemo et useCallback

### useMemo : mémoïser des calculs

```jsx
import { useMemo } from 'react';

function AnnotationList({ documents, minScore }) {
  // ❌ SANS useMemo - recalculé à chaque render
  const filteredDocs = documents.filter(doc => doc.score >= minScore);
  const avgScore = filteredDocs.reduce((sum, d) => sum + d.score, 0) / filteredDocs.length;

  // ✅ AVEC useMemo - recalculé uniquement si documents ou minScore change
  const filteredDocs = useMemo(
    () => documents.filter(doc => doc.score >= minScore),
    [documents, minScore]
  );

  const avgScore = useMemo(() => {
    if (filteredDocs.length === 0) return 0;
    return filteredDocs.reduce((sum, d) => sum + d.score, 0) / filteredDocs.length;
  }, [filteredDocs]);

  return (
    <div>
      <p>Score moyen: {avgScore.toFixed(2)}</p>
      {filteredDocs.map(doc => <DocumentItem key={doc.id} document={doc} />)}
    </div>
  );
}
```

**Quand utiliser useMemo ?**
- ✅ Calculs coûteux (tri, filtres sur grandes listes)
- ✅ Transformations de données complexes
- ❌ Calculs simples (addition, concaténation)
- ❌ Sur-optimisation prématurée

### useCallback : stabiliser des fonctions

```jsx
import { useCallback } from 'react';

function AnnotationPage() {
  const [documents, setDocuments] = useState([]);

  // ❌ SANS useCallback - fonction recréée à chaque render
  const handleValidate = (id) => {
    setDocuments(docs => docs.map(d =>
      d.id === id ? { ...d, validated: true } : d
    ));
  };

  // ✅ AVEC useCallback - fonction stable
  const handleValidate = useCallback((id) => {
    setDocuments(docs => docs.map(d =>
      d.id === id ? { ...d, validated: true } : d
    ));
  }, []); // Pas de dépendances car on utilise la forme fonctionnelle de setState

  return (
    <div>
      {documents.map(doc => (
        <DocumentItem
          key={doc.id}
          document={doc}
          onValidate={handleValidate}  // Fonction stable, évite re-renders
        />
      ))}
    </div>
  );
}
```

**Quand utiliser useCallback ?**
- ✅ Fonctions passées à des composants enfants mémoïsés
- ✅ Fonctions dans les dépendances d'effets
- ❌ Toutes les fonctions (overkill)

:::tip Règle d'or
Ne pas optimiser prématurément. Utilisez useMemo/useCallback seulement si vous avez un **problème de performance réel**.
:::

## Gestion d'état : useState vs useReducer

### useState : pour état simple

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### useReducer : pour logique complexe

```jsx
import { useReducer } from 'react';

// Définir le reducer
function annotationReducer(state, action) {
  switch (action.type) {
    case 'VALIDATE':
      return {
        ...state,
        documents: state.documents.map(doc =>
          doc.id === action.payload.id
            ? { ...doc, status: 'validated' }
            : doc
        ),
        validatedCount: state.validatedCount + 1
      };

    case 'CORRECT':
      return {
        ...state,
        documents: state.documents.map(doc =>
          doc.id === action.payload.id
            ? { ...doc, status: 'corrected', category: action.payload.category }
            : doc
        ),
        correctedCount: state.correctedCount + 1
      };

    case 'RESET':
      return { documents: [], validatedCount: 0, correctedCount: 0 };

    default:
      return state;
  }
}

function AnnotationPage() {
  const [state, dispatch] = useReducer(annotationReducer, {
    documents: [],
    validatedCount: 0,
    correctedCount: 0
  });

  const handleValidate = (id) => {
    dispatch({ type: 'VALIDATE', payload: { id } });
  };

  const handleCorrect = (id, category) => {
    dispatch({ type: 'CORRECT', payload: { id, category } });
  };

  return (
    <div>
      <p>Validés: {state.validatedCount}, Corrigés: {state.correctedCount}</p>
      {state.documents.map(doc => (
        <DocumentItem
          key={doc.id}
          document={doc}
          onValidate={() => handleValidate(doc.id)}
          onCorrect={(cat) => handleCorrect(doc.id, cat)}
        />
      ))}
    </div>
  );
}
```

**Quand utiliser useReducer ?**
- ✅ État complexe avec plusieurs sous-valeurs
- ✅ Transitions d'état multiples
- ✅ Logique partageable/testable
- ❌ État simple (une valeur)

## Formulaires contrôlés

Les **controlled components** gardent React comme source de vérité.

### Formulaire simple

```jsx
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function AnnotationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    category: '',
    notes: '',
    confidence: 0.5
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));

    // Effacer l'erreur quand l'utilisateur modifie
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.category.trim()) {
      newErrors.category = 'La catégorie est requise';
    }

    if (formData.confidence < 0 || formData.confidence > 1) {
      newErrors.confidence = 'La confiance doit être entre 0 et 1';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
    // Réinitialiser le formulaire
    setFormData({ category: '', notes: '', confidence: 0.5 });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="category">Catégorie *</Form.Label>
        <Form.Control
          id="category"
          name="category"
          type="text"
          value={formData.category}
          onChange={handleChange}
          isInvalid={!!errors.category}
        />
        <Form.Control.Feedback type="invalid">
          {errors.category}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="notes">Notes</Form.Label>
        <Form.Control
          id="notes"
          name="notes"
          as="textarea"
          rows={3}
          value={formData.notes}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="confidence">
          Confiance: {formData.confidence.toFixed(2)}
        </Form.Label>
        <Form.Range
          id="confidence"
          name="confidence"
          min={0}
          max={1}
          step={0.01}
          value={formData.confidence}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit" variant="primary">
        Sauvegarder
      </Button>
    </Form>
  );
}
```

**Principes** :
- État contrôle toujours la valeur des inputs
- Validation avant soumission
- Feedback immédiat sur les erreurs
- Labels avec `htmlFor` pour accessibilité

## Accessibilité (a11y) basique

### Labels sur les inputs

```jsx
// ✅ BON - label explicite
<Form.Group>
  <Form.Label htmlFor="email">Email</Form.Label>
  <Form.Control id="email" type="email" />
</Form.Group>

// ❌ FAUX - pas de label
<input type="email" placeholder="Email" />
```

### Texte alternatif pour images

```jsx
// ✅ BON
<img src="chart.png" alt="Graphique montrant l'évolution des annotations" />

// ❌ FAUX
<img src="chart.png" />
```

### ARIA attributes

```jsx
// Bouton avec état
<button aria-pressed={isActive} onClick={toggle}>
  {isActive ? 'Actif' : 'Inactif'}
</button>

// Indicateur de chargement
<div role="status" aria-live="polite">
  {loading && <Spinner />}
</div>

// Navigation
<nav aria-label="Menu principal">
  <ul>
    <li><a href="/">Accueil</a></li>
    <li><a href="/dashboard">Dashboard</a></li>
  </ul>
</nav>
```

### Navigation au clavier

```jsx
function DocumentItem({ document, onSelect }) {
  return (
    <div
      role="button"
      tabIndex={0}  // Rendre focusable
      onClick={() => onSelect(document.id)}
      onKeyPress={(e) => {
        // Activer avec Enter ou Espace
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(document.id);
        }
      }}
    >
      {document.title}
    </div>
  );
}
```

## Structure de code maintenable

### Organisation des fichiers

```
src/
├── components/
│   ├── common/           # Composants génériques
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.test.jsx
│   │   │   └── Button.css
│   │   └── Card/
│   ├── annotation/       # Domaine annotation
│   └── dashboard/        # Domaine dashboard
├── contexts/             # Contexts React
│   └── UserContext.jsx
├── hooks/                # Hooks personnalisés
│   ├── useFetch.js
│   └── useLocalStorage.js
├── pages/                # Pages/Routes
├── utils/                # Fonctions utilitaires
│   ├── api.js
│   └── formatters.js
└── App.jsx
```

### Nommage cohérent

```jsx
// Composants : PascalCase
function DocumentList() {}
function UserProfile() {}

// Hooks : camelCase avec "use"
function useFetch() {}
function useLocalStorage() {}

// Fonctions utilitaires : camelCase
function formatDate() {}
function calculateAverage() {}

// Constantes : UPPER_SNAKE_CASE
const API_BASE_URL = 'http://localhost:8000';
const MAX_RETRY_COUNT = 3;
```

### Extraire la logique réutilisable

```jsx title="src/hooks/useLocalStorage.js"
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
```

Utilisation :
```jsx
function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Thème: {theme}
    </button>
  );
}
```

## 🤖 Prompts Claude Code recommandés

```
Refactore ce composant qui utilise props drilling en créant un Context API pour l'état utilisateur. Le Context doit inclure : user, setUser, login(), logout().
```

```
Optimise ce composant qui filtre une grande liste de documents. Utilise useMemo pour mémoïser les résultats du filtre et useCallback pour les fonctions de callback.
```

```
Convertis ce formulaire en controlled component avec validation. Les champs sont : category (requis), notes (optionnel), confidence (nombre entre 0 et 1).
```

## ⚠️ Pièges à éviter

**1. Sur-utiliser Context**
```jsx
// ❌ Context pour tout
<ThemeContext>
  <UserContext>
    <AnnotationsContext>
      <FiltersContext>
        <App />
      </FiltersContext>
    </AnnotationsContext>
  </UserContext>
</ThemeContext>

// ✅ Context seulement pour données globales
<ThemeContext>
  <UserContext>
    <App />  {/* Le reste via props */}
  </UserContext>
</ThemeContext>
```

**2. Optimisation prématurée**
```jsx
// ❌ useMemo/useCallback partout
const name = useMemo(() => user.firstName + ' ' + user.lastName, [user]);

// ✅ Optimiser seulement si nécessaire
const name = user.firstName + ' ' + user.lastName;
```

**3. Formulaires non contrôlés**
```jsx
// ❌ Uncontrolled - pas de validation facile
<input defaultValue="test" />

// ✅ Controlled - plein contrôle
<input value={value} onChange={e => setValue(e.target.value)} />
```

**4. Oublier l'accessibilité**
```jsx
// ❌ Div cliquable sans accessibilité
<div onClick={handleClick}>Cliquer</div>

// ✅ Bouton avec sémantique correcte
<button onClick={handleClick}>Cliquer</button>
```

## 🔗 Ressources

- [React Context API](https://react.dev/reference/react/useContext)
- [useMemo](https://react.dev/reference/react/useMemo)
- [useCallback](https://react.dev/reference/react/useCallback)
- [useReducer](https://react.dev/reference/react/useReducer)
- [React Accessibility](https://react.dev/learn/accessibility)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)

## ➡️ Prochaine étape

Maintenant que vous connaissez les bonnes pratiques, apprenons à utiliser Claude Code efficacement pour créer des features complètes.

👉 [Section 8 : Workflow avec Claude Code](/advanced/section-8-claude-workflow)
