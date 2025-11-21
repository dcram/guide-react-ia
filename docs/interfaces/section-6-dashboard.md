---
sidebar_position: 3
title: Dashboard de Visualisation
description: Créer des dashboards avec graphiques interactifs et métriques clés
---

# Dashboard de Visualisation avec Recharts

## 🎯 Ce que vous allez apprendre

- Utiliser Recharts pour créer des graphiques React natifs
- Implémenter différents types de graphiques (barres, lignes, camembert)
- Créer des cards de métriques clés
- Organiser un layout responsive avec React-Bootstrap Grid
- Rafraîchir les données manuellement
- Personnaliser les couleurs et le style des graphiques

## Pourquoi c'est important

Les dashboards permettent de visualiser rapidement les métriques importantes de vos projets ML/Data :
- **Suivre la progression** des annotations
- **Identifier les patterns** dans les données
- **Monitorer la qualité** des prédictions
- **Communiquer les résultats** visuellement

:::tip Cas d'usage IA/Data
Monitoring d'annotation, visualisation de métriques ML (accuracy, F1, etc.), distribution des classes, évolution temporelle des performances.
:::

## Pourquoi Recharts ?

**Recharts** est une bibliothèque de graphiques composée de composants React natifs :

| Critère | Recharts | Chart.js | D3.js |
|---------|----------|----------|-------|
| API React native | ✅ | ❌ | ❌ |
| Courbe d'apprentissage | Facile | Moyenne | Difficile |
| Responsive | ✅ | ⚠️ | Manuel |
| Personnalisation | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Taille bundle | Moyenne | Petite | Grande |

**Pour nos besoins** : Recharts est le meilleur compromis entre simplicité et fonctionnalités.

## Installation

```bash
npm install recharts
```

## Concepts clés

### 1. Composants de graphiques

Recharts fonctionne par composition de composants :

```jsx
<BarChart data={myData}>
  <CartesianGrid strokeDasharray="3 3" />  {/* Grille */}
  <XAxis dataKey="name" />                 {/* Axe X */}
  <YAxis />                                {/* Axe Y */}
  <Tooltip />                              {/* Info au survol */}
  <Legend />                               {/* Légende */}
  <Bar dataKey="value" fill="#8884d8" />   {/* Barres */}
</BarChart>
```

### 2. Format des données

Les données doivent être un tableau d'objets :

```javascript
const data = [
  { name: 'Technology', count: 450 },
  { name: 'Finance', count: 320 },
  { name: 'Sport', count: 280 }
];
```

### 3. ResponsiveContainer

Pour des graphiques adaptatifs :

```jsx
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    {/* ... */}
  </BarChart>
</ResponsiveContainer>
```

## Exemple pratique : Dashboard complet

### Backend - Endpoint de statistiques

Ajoutons un endpoint à notre FastAPI :

```python title="backend/main.py"
@app.get("/api/stats")
def get_stats():
    """Récupérer les statistiques d'annotation"""
    return {
        "total_annotations": 1247,
        "avg_confidence": 0.87,
        "validated_count": 892,
        "corrected_count": 355,
        "by_category": [
            {"category": "Technology", "count": 450},
            {"category": "Finance", "count": 320},
            {"category": "Sport", "count": 280},
            {"category": "Politics", "count": 197}
        ],
        "timeline": [
            {"date": "2024-11-15", "count": 45},
            {"date": "2024-11-16", "count": 52},
            {"date": "2024-11-17", "count": 48},
            {"date": "2024-11-18", "count": 61},
            {"date": "2024-11-19", "count": 55},
            {"date": "2024-11-20", "count": 58},
            {"date": "2024-11-21", "count": 63},
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

### Frontend - Composants de métriques

Créons d'abord des cards pour les métriques clés :

```jsx title="src/components/dashboard/MetricCard.jsx"
import { Card } from 'react-bootstrap';

function MetricCard({ title, value, subtitle, variant = 'primary', icon }) {
  const variantColors = {
    primary: '#0d6efd',
    success: '#198754',
    info: '#0dcaf0',
    warning: '#ffc107',
    danger: '#dc3545'
  };

  return (
    <Card className="h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Card.Title className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
            {title}
          </Card.Title>
          {icon && <span style={{ fontSize: '1.5rem' }}>{icon}</span>}
        </div>
        <h2 className="mb-1" style={{ color: variantColors[variant] }}>
          {value}
        </h2>
        {subtitle && (
          <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
            {subtitle}
          </p>
        )}
      </Card.Body>
    </Card>
  );
}

export default MetricCard;
```

### Frontend - Page Dashboard complète

```jsx title="src/pages/DashboardPage.jsx"
import { useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useFetch } from '../hooks/useFetch';
import MetricCard from '../components/dashboard/MetricCard';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

function DashboardPage() {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const [refreshKey, setRefreshKey] = useState(0);
  const { data: stats, loading, error } = useFetch(
    `${apiUrl}/api/stats?refresh=${refreshKey}`
  );

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
        <p className="mt-3 text-muted">Chargement des statistiques...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-4">
        <Alert variant="danger">
          <Alert.Heading>Erreur de chargement</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  if (!stats) return null;

  return (
    <Container fluid className="py-4">
      {/* En-tête */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Dashboard ML</h1>
          <p className="text-muted mb-0">
            Vue d'ensemble des annotations et métriques
          </p>
        </div>
        <Button
          variant="outline-primary"
          onClick={handleRefresh}
          disabled={loading}
        >
          🔄 Rafraîchir
        </Button>
      </div>

      {/* Métriques clés */}
      <Row className="mb-4">
        <Col md={3} className="mb-3 mb-md-0">
          <MetricCard
            title="Total Annotations"
            value={stats.total_annotations.toLocaleString()}
            subtitle="Documents annotés"
            variant="primary"
            icon="📝"
          />
        </Col>
        <Col md={3} className="mb-3 mb-md-0">
          <MetricCard
            title="Confiance Moyenne"
            value={`${(stats.avg_confidence * 100).toFixed(1)}%`}
            subtitle="Score moyen des prédictions"
            variant="success"
            icon="🎯"
          />
        </Col>
        <Col md={3} className="mb-3 mb-md-0">
          <MetricCard
            title="Validés"
            value={stats.validated_count.toLocaleString()}
            subtitle={`${((stats.validated_count / stats.total_annotations) * 100).toFixed(1)}% du total`}
            variant="success"
            icon="✓"
          />
        </Col>
        <Col md={3}>
          <MetricCard
            title="Corrigés"
            value={stats.corrected_count.toLocaleString()}
            subtitle={`${((stats.corrected_count / stats.total_annotations) * 100).toFixed(1)}% du total`}
            variant="warning"
            icon="✏️"
          />
        </Col>
      </Row>

      {/* Graphiques - Ligne 1 */}
      <Row className="mb-4">
        <Col lg={8} className="mb-4 mb-lg-0">
          <Card>
            <Card.Body>
              <Card.Title>Annotations par Catégorie</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.by_category}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#0d6efd" name="Nombre d'annotations" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
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
                    label={({ range, percent }) => `${range}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {stats.confidence_distribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Graphiques - Ligne 2 */}
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Évolution Temporelle des Annotations</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.timeline}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) => {
                      const d = new Date(date);
                      return `${d.getDate()}/${d.getMonth() + 1}`;
                    }}
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(date) => new Date(date).toLocaleDateString('fr-FR')}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#0d6efd"
                    strokeWidth={2}
                    name="Annotations"
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardPage;
```

## Explications détaillées

### 1. Rafraîchissement manuel

```jsx
const [refreshKey, setRefreshKey] = useState(0);
const { data } = useFetch(`/api/stats?refresh=${refreshKey}`);

const handleRefresh = () => {
  setRefreshKey(prev => prev + 1);
};
```

En changeant `refreshKey`, l'URL change, ce qui déclenche un nouveau fetch dans `useFetch`.

### 2. Personnalisation des graphiques

**BarChart avec couleur personnalisée** :
```jsx
<Bar dataKey="count" fill="#0d6efd" name="Nombre d'annotations" />
```

**LineChart avec courbe lisse** :
```jsx
<Line type="monotone" dataKey="count" stroke="#0d6efd" />
```

**PieChart avec couleurs multiples** :
```jsx
<Pie data={data} dataKey="count">
  {data.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  ))}
</Pie>
```

### 3. Formatage des tooltips

```jsx
<Tooltip
  labelFormatter={(date) => new Date(date).toLocaleDateString('fr-FR')}
  formatter={(value) => [`${value} annotations`, 'Total']}
/>
```

### 4. Labels personnalisés

```jsx
<Pie
  label={({ range, percent }) => `${range}: ${(percent * 100).toFixed(0)}%`}
/>
```

## Types de graphiques disponibles

### BarChart - Barres verticales

```jsx
<BarChart data={data}>
  <Bar dataKey="value" fill="#8884d8" />
</BarChart>
```

**Cas d'usage** : Comparer des catégories, montrer des distributions.

### LineChart - Courbes

```jsx
<LineChart data={data}>
  <Line type="monotone" dataKey="value" stroke="#8884d8" />
</LineChart>
```

**Cas d'usage** : Évolution temporelle, tendances.

### PieChart - Camembert

```jsx
<PieChart>
  <Pie data={data} dataKey="value" nameKey="name" />
</PieChart>
```

**Cas d'usage** : Proportions, parts de marché.

### AreaChart - Zones

```jsx
<AreaChart data={data}>
  <Area type="monotone" dataKey="value" fill="#8884d8" stroke="#8884d8" />
</AreaChart>
```

**Cas d'usage** : Volumes cumulatifs, évolution avec emphase sur la quantité.

### ScatterChart - Nuage de points

```jsx
<ScatterChart>
  <Scatter data={data} fill="#8884d8" />
</ScatterChart>
```

**Cas d'usage** : Corrélations, distributions 2D.

## Layout responsive

Utilisation de la Grid Bootstrap :

```jsx
<Row>
  <Col md={6} lg={4}>
    {/* 100% sur mobile, 50% sur tablette, 33% sur desktop */}
    <Card>...</Card>
  </Col>
  <Col md={6} lg={8}>
    <Card>...</Card>
  </Col>
</Row>
```

## Graphiques avancés

### Graphique avec plusieurs séries

```jsx
<LineChart data={data}>
  <Line type="monotone" dataKey="validated" stroke="#198754" name="Validés" />
  <Line type="monotone" dataKey="corrected" stroke="#ffc107" name="Corrigés" />
  <Line type="monotone" dataKey="pending" stroke="#6c757d" name="En attente" />
</LineChart>
```

### BarChart empilé

```jsx
<BarChart data={data}>
  <Bar dataKey="validated" stackId="a" fill="#198754" />
  <Bar dataKey="corrected" stackId="a" fill="#ffc107" />
  <Bar dataKey="pending" stackId="a" fill="#6c757d" />
</BarChart>
```

### Graphique avec référence

```jsx
<LineChart data={data}>
  <ReferenceLine y={0.8} stroke="red" strokeDasharray="3 3" label="Seuil" />
  <Line type="monotone" dataKey="accuracy" stroke="#8884d8" />
</LineChart>
```

## 🤖 Prompts Claude Code recommandés

:::tip Générer le dashboard complet
```
Crée un dashboard React avec Recharts qui affiche :

Métriques (cards en haut) :
- Total annotations (nombre)
- Confiance moyenne (pourcentage)
- Validés (nombre + pourcentage)
- Corrigés (nombre + pourcentage)

Graphiques :
1. BarChart : annotations par catégorie
2. PieChart : distribution des scores de confiance par tranches
3. LineChart : évolution temporelle (derniers 7 jours)

Layout :
- Responsive avec React-Bootstrap Grid
- 4 cards en ligne sur desktop, empilées sur mobile
- Graphiques : 2/3 pour BarChart, 1/3 pour PieChart (première ligne)
- LineChart pleine largeur (deuxième ligne)

Features :
- Bouton "Rafraîchir" en haut à droite
- État de chargement avec Spinner
- Gestion d'erreur avec Alert
- Données récupérées depuis GET /api/stats

Style : Cards Bootstrap, graphiques Recharts avec couleurs professionnelles
```
:::

:::info Ajouter des filtres
```
Ajoute des filtres au dashboard :
- Sélecteur de période (7 jours, 30 jours, 90 jours, tout)
- Sélecteur de catégorie (toutes, Technology, Finance, Sport, Politics)
- Les filtres doivent modifier les données affichées dans tous les graphiques
- Ajouter des paramètres à l'URL de l'API selon les filtres
```
:::

:::tip Export en image
```
Ajoute un bouton "📸 Exporter" pour chaque graphique qui :
- Utilise html2canvas pour capturer le graphique
- Télécharge l'image en PNG
- Nom du fichier : "graphique_YYYY-MM-DD_HH-MM.png"
```
:::

## ⚠️ Pièges à éviter

**1. Oublier ResponsiveContainer**
```jsx
// ❌ FAUX - taille fixe, pas responsive
<BarChart width={600} height={300} data={data}>
  <Bar dataKey="value" />
</BarChart>

// ✅ BON - responsive
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <Bar dataKey="value" />
  </BarChart>
</ResponsiveContainer>
```

**2. Hauteur trop petite**
```jsx
// ❌ FAUX - graphique écrasé
<ResponsiveContainer width="100%" height={150}>

// ✅ BON - hauteur minimum 250-300px
<ResponsiveContainer width="100%" height={300}>
```

**3. Données au mauvais format**
```jsx
// ❌ FAUX - objet au lieu de tableau
const data = { tech: 450, finance: 320 };

// ✅ BON - tableau d'objets
const data = [
  { category: 'tech', count: 450 },
  { category: 'finance', count: 320 }
];
```

**4. Clés dataKey incorrectes**
```jsx
// ❌ FAUX - la clé n'existe pas dans les données
<Bar dataKey="total" />  // Les données ont 'count', pas 'total'

// ✅ BON - correspondance avec les données
<Bar dataKey="count" />
```

**5. Trop de données dans un PieChart**
```jsx
// ❌ FAUX - 20 segments, illisible
<PieChart data={allCategories} />

// ✅ BON - limiter à 5-7 segments max
const topCategories = allCategories.slice(0, 5);
<PieChart data={topCategories} />
```

**6. Pas de gestion du loading/error**
```jsx
// ❌ FAUX - crash si data est null
<BarChart data={stats.by_category}>

// ✅ BON - vérification
if (loading) return <Spinner />;
if (error) return <Alert>{error}</Alert>;
if (!stats) return null;

return <BarChart data={stats.by_category}>
```

## 🔗 Ressources

- [Recharts Documentation](https://recharts.org/)
- [Recharts Examples](https://recharts.org/en-US/examples)
- [React-Bootstrap Grid](https://react-bootstrap.github.io/layout/grid/)
- [Color Palettes for Data Viz](https://colorbrewer2.org/)

## ➡️ Prochaine étape

Vous savez maintenant créer des interfaces complètes ! Passons aux bonnes pratiques pour rendre votre code maintenable et performant.

👉 [Section 7 : Bonnes Pratiques](/advanced/section-7-best-practices)
