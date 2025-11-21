import React, { useState } from 'react';
import { Button, Badge, Dropdown, Container, Card, Alert } from 'react-bootstrap';

const MOCK_DOCUMENTS = [
  {
    id: 1,
    text: "L'intelligence artificielle révolutionne l'industrie technologique avec des avancées majeures...",
    predicted_category: "Technology",
    confidence_score: 0.95
  },
  {
    id: 2,
    text: "Les marchés financiers ont connu une forte hausse suite aux annonces de la banque centrale...",
    predicted_category: "Finance",
    confidence_score: 0.78
  },
  {
    id: 3,
    text: "Le match de football s'est terminé sur un score de 3-2 après prolongations...",
    predicted_category: "Sport",
    confidence_score: 0.62
  }
];

const CATEGORIES = ["Technology", "Finance", "Sport", "Politics", "Health"];

function DocumentItem({ document, annotation, onValidate, onCorrect }) {
  const { text, predicted_category, confidence_score } = document;

  const getBadgeVariant = (score) => {
    if (score >= 0.8) return 'success';
    if (score >= 0.6) return 'warning';
    return 'danger';
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="mb-3">
          <small className="text-muted">Document #{document.id}</small>
          <Card.Text className="mt-2">{text}</Card.Text>
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap">
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
                  {CATEGORIES.filter(cat => cat !== predicted_category).map(cat => (
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
              {annotation.action === 'validated'
                ? '✓ Validé'
                : `✏️ Corrigé → ${annotation.category}`}
            </Badge>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default function AnnotationList() {
  const [annotations, setAnnotations] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleValidate = (docId) => {
    setAnnotations(prev => ({
      ...prev,
      [docId]: { action: 'validated' }
    }));
    setSaveSuccess(false);
  };

  const handleCorrect = (docId, newCategory) => {
    setAnnotations(prev => ({
      ...prev,
      [docId]: { action: 'corrected', category: newCategory }
    }));
    setSaveSuccess(false);
  };

  const handleSave = () => {
    // Simulation de sauvegarde
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const annotationCount = Object.keys(annotations).length;

  return (
    <Container className="my-4">
      <h4 className="mb-3">Interface d'Annotation - Démo</h4>

      {saveSuccess && (
        <Alert variant="success" onClose={() => setSaveSuccess(false)} dismissible>
          ✓ {annotationCount} annotation(s) sauvegardée(s) avec succès !
        </Alert>
      )}

      <div className="mb-4">
        {MOCK_DOCUMENTS.map(doc => (
          <DocumentItem
            key={doc.id}
            document={doc}
            annotation={annotations[doc.id]}
            onValidate={() => handleValidate(doc.id)}
            onCorrect={(category) => handleCorrect(doc.id, category)}
          />
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
        <div>
          <strong>{annotationCount}</strong> modification(s) en attente
        </div>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={annotationCount === 0}
        >
          {annotationCount === 0 ? 'Aucune modification' : `Sauvegarder (${annotationCount})`}
        </Button>
      </div>
    </Container>
  );
}
