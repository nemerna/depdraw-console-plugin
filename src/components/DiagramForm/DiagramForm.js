import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // if using Redux
import { addDiagram } from '../../store/actions/diagramActions'; // if using Redux
import { Button, Input } from 'antd';

const DiagramForm = () => {
  const [diagramName, setDiagramName] = useState('');
  const dispatch = useDispatch(); // if using Redux

  const handleSubmit = () => {
    if (diagramName.trim()) {
      dispatch(addDiagram(diagramName)); // if using Redux
      setDiagramName('');
    } else {
      alert('Please provide a name for the diagram.');
    }
  };

  return (
    <div className="create-diagram-section">
      <Input 
        placeholder="Enter diagram name" 
        value={diagramName} 
        onChange={(e) => setDiagramName(e.target.value)} 
      />
      <Button type="primary" onClick={handleSubmit}>
        Create New Diagram
      </Button>
    </div>
  );
};

export default DiagramForm;
