import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const INITIAL_DATA = {
  by_category: [
    { category: 'Technology', count: 450 },
    { category: 'Finance', count: 320 },
    { category: 'Sport', count: 280 },
    { category: 'Politics', count: 197 }
  ],
  timeline: [
    { date: '15/11', count: 45 },
    { date: '16/11', count: 52 },
    { date: '17/11', count: 48 },
    { date: '18/11', count: 61 },
    { date: '19/11', count: 55 },
    { date: '20/11', count: 58 },
    { date: '21/11', count: 63 }
  ],
  confidence_distribution: [
    { range: '80-100%', count: 600 },
    { range: '60-80%', count: 467 },
    { range: '40-60%', count: 123 },
    { range: '20-40%', count: 45 },
    { range: '0-20%', count: 12 }
  ]
};

function MetricCard({ title, value, subtitle }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-muted" style={{ fontSize: '0.9rem' }}>
          {title}
        </Card.Title>
        <h2 className="mb-0">{value}</h2>
        {subtitle && <small className="text-muted">{subtitle}</small>}
      </Card.Body>
    </Card>
  );
}

export default function Dashboard() {
  const [data, setData] = useState(INITIAL_DATA);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulation de rafraîchissement avec données légèrement modifiées
    setTimeout(() => {
      setData({
        by_category: INITIAL_DATA.by_category.map(item => ({
          ...item,
          count: item.count + Math.floor(Math.random() * 20 - 10)
        })),
        timeline: INITIAL_DATA.timeline.map(item => ({
          ...item,
          count: item.count + Math.floor(Math.random() * 10 - 5)
        })),
        confidence_distribution: INITIAL_DATA.confidence_distribution.map(item => ({
          ...item,
          count: item.count + Math.floor(Math.random() * 30 - 15)
        }))
      });
      setRefreshing(false);
    }, 500);
  };

  const totalAnnotations = data.by_category.reduce((sum, item) => sum + item.count, 0);
  const avgConfidence = 87;

  return (
    <Container fluid className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Dashboard ML - Démo</h4>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          {refreshing ? '🔄 Rafraîchissement...' : '🔄 Rafraîchir'}
        </Button>
      </div>

      {/* Métriques clés */}
      <Row className="mb-4">
        <Col md={6} className="mb-3">
          <MetricCard
            title="Total Annotations"
            value={totalAnnotations.toLocaleString()}
            subtitle="Documents annotés"
          />
        </Col>
        <Col md={6} className="mb-3">
          <MetricCard
            title="Confiance Moyenne"
            value={`${avgConfidence}%`}
            subtitle="Score moyen du modèle"
          />
        </Col>
      </Row>

      {/* Graphiques */}
      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title style={{ fontSize: '1rem' }}>
                Annotations par Catégorie
              </Card.Title>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data.by_category}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title style={{ fontSize: '1rem' }}>
                Évolution Temporelle (7 derniers jours)
              </Card.Title>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data.timeline}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#00C49F"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Annotations"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title style={{ fontSize: '1rem' }}>
                Distribution des Scores de Confiance
              </Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.confidence_distribution}
                    dataKey="count"
                    nameKey="range"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ range, percent }) =>
                      `${range}: ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {data.confidence_distribution.map((entry, index) => (
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
    </Container>
  );
}
