import React, { useState } from 'react';
import { Card, Button } from '@patternfly/react-core';
import { Link } from 'react-router-dom';
import './DiagramCard.css';
import { deleteDiagram } from '../../services/api';

type Diagram = {
  uuid: string;
  name: string;
  // Uncomment and adjust these if needed
  // resourcesID: string[];
  // linesID: string[];
};

interface DiagramCardProps {
  diagram: Diagram;
}

const DiagramCard: React.FC<DiagramCardProps> = ({ diagram }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleDelete = async (uuid: string) => {
    try {
      await deleteDiagram(uuid);
    } catch (error) {
      console.error('Error deleting diagram:', error);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsHovered(true);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <Link
        to={`/canvas/${diagram.uuid}`}
        className="diagram-card-link"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card className="diagram-card" isHoverable>
          <h3 className="diagram-card-title">{diagram.name}</h3>
          <Button
            variant="danger"
            onClick={(e) => {
              e.preventDefault(); // Prevent navigation
              handleDelete(diagram.uuid);
            }}
          >
            Delete
          </Button>
        </Card>
      </Link>
      {isHovered && (
        <div
          className="hover-tooltip"
          style={{
            left: `${tooltipPosition.x + 15}px`,
            top: `${tooltipPosition.y}px`,
          }}
        >
          UUID: {diagram.uuid}
          <br />
          {/* SHAPES: {diagram.resourcesID.length} */}
          <br />
          {/* LINES: {diagram.linesID.length} */}
        </div>
      )}
    </>
  );
};

export default DiagramCard;
