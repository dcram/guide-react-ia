---
sidebar_position: 2
title: Tableaux Interactifs
description: Créer des tableaux professionnels avec tri, filtres et pagination
---

# Tableaux Interactifs avec TanStack Table

## 🎯 Ce que vous allez apprendre

- Utiliser TanStack Table pour créer des tableaux professionnels
- Implémenter le tri sur plusieurs colonnes
- Ajouter des filtres globaux et par colonne
- Configurer la pagination côté client
- Personnaliser l'affichage des cellules
- Intégrer avec React-Bootstrap pour le style

## Pourquoi c'est important

Les tableaux sont omniprésents dans les interfaces de données. Un bon tableau permet de :
- **Visualiser** rapidement de grandes quantités de données
- **Trier** pour trouver les valeurs extrêmes
- **Filtrer** pour se concentrer sur un sous-ensemble
- **Paginer** pour gérer des milliers de lignes
- **Interagir** avec des actions par ligne

:::tip Cas d'usage IA/Data
Afficher les résultats d'annotation, les métriques de modèles, les logs d'entraînement, ou tout dataset avec des actions (éditer, supprimer, exporter).
:::

## Pourquoi TanStack Table ?

**TanStack Table** (anciennement React Table) est la référence pour les tableaux React :

| Critère | TanStack Table | Table HTML simple | Autres librairies |
|---------|----------------|-------------------|-------------------|
| Headless (sans style) | ✅ | ✅ | ❌ |
| Tri multi-colonnes | ✅ | ❌ | ⚠️ |
| Filtres avancés | ✅ | ❌ | ⚠️ |
| Pagination | ✅ | ❌ | ⚠️ |
| Personnalisation | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| Performance | Excellente | Moyenne | Variable |

**Headless** signifie : zéro CSS imposé, vous gardez le contrôle total du style.

## Installation

```bash
npm install @tanstack/react-table
```

## Concepts clés

### 1. Définition des colonnes

Les colonnes définissent la structure du tableau :

```jsx
const columns = [
  {
    accessorKey: 'id',      // Clé dans les données
    header: 'ID',           // Titre de colonne
    size: 60                // Largeur optionnelle
  },
  {
    accessorKey: 'name',
    header: 'Nom',
    cell: info => info.getValue().toUpperCase()  // Personnalisation
  }
];
```

### 2. Configuration du tableau

```jsx
const table = useReactTable({
  data,                      // Vos données
  columns,                   // Vos colonnes
  getCoreRowModel: getCoreRowModel(),        // Obligatoire
  getSortedRowModel: getSortedRowModel(),    // Pour le tri
  getFilteredRowModel: getFilteredRowModel(), // Pour les filtres
  getPaginationRowModel: getPaginationRowModel(), // Pour la pagination
});
```

### 3. Rendu avec flexRender

```jsx
{table.getRowModel().rows.map(row => (
  <tr key={row.id}>
    {row.getVisibleCells().map(cell => (
      <td key={cell.id}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </td>
    ))}
  </tr>
))}
```

## Exemple pratique : Tableau d'annotations complet

### Page avec tableau interactif

```jsx title="src/pages/AnnotationTablePage.jsx"
import { useState, useMemo } from 'react';
import { Container, Table, Form, Button, Badge, ButtonGroup, InputGroup } from 'react-bootstrap';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender
} from '@tanstack/react-table';
import { useFetch } from '../hooks/useFetch';

function AnnotationTablePage() {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const { data: documents, loading, error } = useFetch(`${apiUrl}/api/documents`);

  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Définition des colonnes
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 60,
        cell: info => (
          <span className="text-muted">#{info.getValue()}</span>
        )
      },
      {
        accessorKey: 'text',
        header: 'Document',
        cell: info => {
          const text = info.getValue();
          return (
            <div title={text}>
              {text.length > 80 ? text.substring(0, 80) + '...' : text}
            </div>
          );
        }
      },
      {
        accessorKey: 'predicted_category',
        header: 'Catégorie',
        cell: info => (
          <Badge bg="primary">{info.getValue()}</Badge>
        )
      },
      {
        accessorKey: 'confidence_score',
        header: 'Score',
        cell: info => {
          const score = info.getValue();
          const variant = score >= 0.8 ? 'success' : score >= 0.6 ? 'warning' : 'danger';
          return (
            <Badge bg={variant}>
              {(score * 100).toFixed(0)}%
            </Badge>
          );
        },
        sortingFn: 'basic'
      },
      {
        accessorKey: 'status',
        header: 'Statut',
        cell: info => {
          const status = info.getValue();
          const variants = {
            pending: 'secondary',
            validated: 'success',
            corrected: 'info'
          };
          const labels = {
            pending: 'En attente',
            validated: 'Validé',
            corrected: 'Corrigé'
          };
          return (
            <Badge bg={variants[status] || 'secondary'}>
              {labels[status] || status}
            </Badge>
          );
        }
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <ButtonGroup size="sm">
            <Button variant="outline-primary" onClick={() => handleEdit(row.original.id)}>
              ✏️
            </Button>
            <Button variant="outline-danger" onClick={() => handleDelete(row.original.id)}>
              🗑️
            </Button>
          </ButtonGroup>
        )
      }
    ],
    []
  );

  // Filtrage par statut
  const filteredData = useMemo(() => {
    if (!documents) return [];
    if (statusFilter === 'all') return documents;
    return documents.filter(doc => doc.status === statusFilter);
  }, [documents, statusFilter]);

  // Configuration du tableau
  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
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

  // Handlers
  const handleEdit = (id) => {
    console.log('Éditer document', id);
    // TODO: Implémenter l'édition
  };

  const handleDelete = (id) => {
    console.log('Supprimer document', id);
    // TODO: Implémenter la suppression
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-4">
        <div className="alert alert-danger">
          Erreur de chargement : {error}
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="my-4">
      <h1 className="mb-4">Tableau des Annotations</h1>

      {/* Barre de filtres */}
      <div className="d-flex gap-3 mb-3 align-items-center">
        {/* Recherche globale */}
        <InputGroup style={{ maxWidth: '300px' }}>
          <InputGroup.Text>🔍</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Rechercher..."
            value={globalFilter ?? ''}
            onChange={e => setGlobalFilter(e.target.value)}
          />
          {globalFilter && (
            <Button
              variant="outline-secondary"
              onClick={() => setGlobalFilter('')}
            >
              ✕
            </Button>
          )}
        </InputGroup>

        {/* Filtre par statut */}
        <Form.Select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={{ maxWidth: '200px' }}
        >
          <option value="all">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="validated">Validés</option>
          <option value="corrected">Corrigés</option>
        </Form.Select>

        {/* Compteur */}
        <div className="text-muted ms-auto">
          {table.getFilteredRowModel().rows.length} résultat(s)
        </div>
      </div>

      {/* Tableau */}
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-light">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    style={{
                      width: header.getSize(),
                      cursor: header.column.getCanSort() ? 'pointer' : 'default'
                    }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <span className="ms-2">
                          {{
                            asc: '🔼',
                            desc: '🔽',
                          }[header.column.getIsSorted()] ?? '⇅'}
                        </span>
                      )}
                    </div>
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
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Message si vide */}
      {table.getRowModel().rows.length === 0 && (
        <div className="alert alert-info text-center">
          Aucun résultat trouvé
        </div>
      )}

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="text-muted">
          Page {table.getState().pagination.pageIndex + 1} sur{' '}
          {table.getPageCount()}
        </div>

        <ButtonGroup>
          <Button
            variant="outline-primary"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            ⏮️
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            ◀️ Précédent
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Suivant ▶️
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            ⏭️
          </Button>
        </ButtonGroup>

        <Form.Select
          value={table.getState().pagination.pageSize}
          onChange={e => table.setPageSize(Number(e.target.value))}
          style={{ maxWidth: '150px' }}
        >
          {[10, 20, 50, 100].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize} par page
            </option>
          ))}
        </Form.Select>
      </div>
    </Container>
  );
}

export default AnnotationTablePage;
```

## Explications détaillées

### 1. Mémoïsation des colonnes

```jsx
const columns = useMemo(() => [...], []);
```

**Pourquoi ?** React recrée les objets à chaque render. Sans `useMemo`, TanStack Table pense que les colonnes changent constamment, ce qui cause des re-renders inutiles.

### 2. Personnalisation des cellules

```jsx
{
  accessorKey: 'confidence_score',
  cell: info => {
    const score = info.getValue();  // Valeur de la cellule
    return <Badge>{(score * 100).toFixed(0)}%</Badge>;
  }
}
```

Le paramètre `info` fournit :
- `info.getValue()` : la valeur de la cellule
- `info.row.original` : l'objet complet de la ligne
- `info.column` : informations sur la colonne

### 3. Tri

```jsx
const [sorting, setSorting] = useState([]);

// Dans useReactTable
state: { sorting },
onSortingChange: setSorting,
getSortedRowModel: getSortedRowModel(),
```

L'état `sorting` est un tableau :
```javascript
[{ id: 'confidence_score', desc: true }]
```

Pour le tri multi-colonnes, maintenez Shift + Clic sur les en-têtes.

### 4. Filtre global

```jsx
const [globalFilter, setGlobalFilter] = useState('');

// Dans useReactTable
state: { globalFilter },
onGlobalFilterChange: setGlobalFilter,
getFilteredRowModel: getFilteredRowModel(),
```

Le filtre global cherche dans toutes les colonnes.

### 5. Pagination

```jsx
getPaginationRowModel: getPaginationRowModel(),
initialState: {
  pagination: { pageSize: 20 }
}

// Navigation
table.nextPage()
table.previousPage()
table.setPageIndex(0)
table.setPageSize(50)
```

## Pagination côté serveur vs côté client

### Côté client (notre exemple)

**Avantages** :
- Simple à implémenter
- Pas de requête réseau pour changer de page
- Tri et filtres instantanés

**Inconvénients** :
- Nécessite de charger toutes les données
- Ne scale pas au-delà de quelques milliers de lignes

### Côté serveur

```jsx
const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });

const { data } = useFetch(
  `/api/documents?page=${pagination.pageIndex}&size=${pagination.pageSize}`
);

const table = useReactTable({
  data: data?.results || [],
  pageCount: data?.totalPages || 0,  // Backend fournit le nombre de pages
  manualPagination: true,             // Dire à TanStack de ne pas gérer
  onPaginationChange: setPagination,
});
```

**Avantages** :
- Scale à des millions de lignes
- Charge rapide initiale

**Inconvénients** :
- Requête réseau pour chaque page
- Tri/filtres nécessitent aussi des requêtes

:::tip Règle générale
- **< 1000 lignes** : pagination côté client
- **> 1000 lignes** : pagination côté serveur
:::

## Export CSV

Ajoutons une fonction d'export :

```jsx
const exportToCSV = () => {
  const rows = table.getFilteredRowModel().rows;

  // En-têtes
  const headers = columns
    .filter(col => col.accessorKey)
    .map(col => col.header)
    .join(',');

  // Lignes
  const csvRows = rows.map(row =>
    columns
      .filter(col => col.accessorKey)
      .map(col => {
        const value = row.original[col.accessorKey];
        // Échapper les virgules et guillemets
        return `"${String(value).replace(/"/g, '""')}"`;
      })
      .join(',')
  );

  const csv = [headers, ...csvRows].join('\n');

  // Téléchargement
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'annotations.csv';
  a.click();
};

// Dans le JSX
<Button onClick={exportToCSV}>📥 Exporter CSV</Button>
```

## 🤖 Prompts Claude Code recommandés

:::tip Générer le tableau complet
```
Crée un tableau React avec TanStack Table qui affiche des annotations avec :

Colonnes :
- ID (numéro)
- Document (texte tronqué à 80 caractères)
- Catégorie (badge coloré)
- Score (pourcentage avec badge selon seuil)
- Statut (badge)
- Actions (boutons éditer et supprimer)

Features :
- Tri sur toutes les colonnes (avec indicateurs de direction)
- Filtre global (barre de recherche)
- Filtre par statut (dropdown : tous, pending, validated, corrected)
- Pagination (20 items par page)
- Compteur de résultats
- Style avec React-Bootstrap

Données récupérées depuis GET /api/documents
```
:::

:::info Ajouter l'export
```
Ajoute une fonction d'export CSV au tableau qui :
- Exporte les lignes filtrées actuelles (pas toutes les données)
- Inclut toutes les colonnes sauf Actions
- Échappe correctement les virgules et guillemets
- Télécharge le fichier avec nom "annotations_YYYY-MM-DD.csv"
- Ajoute un bouton "📥 Exporter CSV" dans la barre de filtres
```
:::

:::tip Pagination côté serveur
```
Convertis le tableau en pagination côté serveur :
- L'API accepte les paramètres ?page=X&size=Y
- Elle retourne { results: [...], total: N, pages: M }
- Le tableau doit utiliser manualPagination
- Les changements de page doivent refetch les données
- Afficher un spinner pendant le chargement de page
```
:::

## ⚠️ Pièges à éviter

**1. Ne pas mémoïser les colonnes**
```jsx
// ❌ FAUX - colonnes recréées à chaque render
const columns = [
  { accessorKey: 'id', header: 'ID' }
];

// ✅ BON - colonnes mémoïsées
const columns = useMemo(() => [
  { accessorKey: 'id', header: 'ID' }
], []);
```

**2. Oublier les hooks de fonctionnalités**
```jsx
// ❌ FAUX - pas de tri/filtres/pagination
const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
});

// ✅ BON - toutes les features activées
const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});
```

**3. Ne pas gérer l'état vide**
```jsx
// ❌ FAUX - pas de message si vide
<tbody>
  {table.getRowModel().rows.map(row => ...)}
</tbody>

// ✅ BON - message si aucun résultat
<tbody>
  {table.getRowModel().rows.map(row => ...)}
</tbody>
{table.getRowModel().rows.length === 0 && (
  <div>Aucun résultat</div>
)}
```

**4. Taille de page mal configurée**
```jsx
// ❌ FAUX - pas de limite initiale
const table = useReactTable({
  data,
  columns,
  getPaginationRowModel: getPaginationRowModel(),
});

// ✅ BON - taille par défaut définie
const table = useReactTable({
  data,
  columns,
  getPaginationRowModel: getPaginationRowModel(),
  initialState: {
    pagination: { pageSize: 20 }
  }
});
```

**5. Oublier le responsive**
```jsx
// ❌ FAUX - déborde sur mobile
<Table>...</Table>

// ✅ BON - wrapper responsive
<div className="table-responsive">
  <Table>...</Table>
</div>
```

## 🔗 Ressources

- [TanStack Table Documentation](https://tanstack.com/table/latest)
- [TanStack Table Examples](https://tanstack.com/table/latest/docs/framework/react/examples/basic)
- [React-Bootstrap Tables](https://react-bootstrap.github.io/components/table/)
- [CSV Export in JavaScript](https://developer.mozilla.org/en-US/docs/Web/API/Blob)

## ➡️ Prochaine étape

Maintenant que vous maîtrisez les tableaux, créons des dashboards de visualisation avec des graphiques interactifs.

👉 [Section 6 : Dashboard de Visualisation](/interfaces/section-6-dashboard)
