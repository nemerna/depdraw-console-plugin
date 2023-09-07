import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import './DiagramCard.css';
import { deleteDiagram } from '../../services/api';
const DiagramCard = ({ diagram }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleDelete = async (uuid) => {
  try {
    deleteDiagram(diagram.uuid);
  } catch (error) {
    console.error('Error deleting diagram:', error);
  }
  };


  const handleMouseEnter = (e) => {
    setIsHovered(true);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <Link 
        to={`/example/${diagram.uuid}`} 
        className="diagram-card-link"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsHovered(false)}
      >
      <Card className="diagram-card" hoverable>
        <h3 className="diagram-card-title">{diagram.name}</h3>
        <Button 
          type="danger" 
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
            top: `${tooltipPosition.y}px` 
          }}
        >
          UUID: {diagram.uuid}
          <br/>
          {/* SHAPES: {diagram.resourcesID.length} */}
          <br/>
          {/* LINES: {diagram.linesID.length} */}
        </div>
      )}
    </>
  );
};

export default DiagramCard;
