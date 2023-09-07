import React, { useEffect, useState } from 'react';
import { deleteDiagram as deleteDiagramApi } from '../../store/actions/diagramActions'; // rename to avoid naming conflict
import { fetchDiagrams } from '../../services/api';
import DiagramCard from '../DiagramCard/DiagramCard';
import DiagramForm from '../DiagramForm/DiagramForm';
import './DiagramList.css';

const DiagramList = () => {
  const [diagrams, setDiagrams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDiagrams = await fetchDiagrams();
        setDiagrams(fetchedDiagrams);
        setLoading(false);
      } catch (error) {
        // Handle error
        console.error("Failed to fetch diagrams:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (diagramId) => {
    try {
      await deleteDiagramApi(diagramId);
      // Optionally, you can refetch the diagrams or filter out the deleted one
      setDiagrams(prevDiagrams => prevDiagrams.filter(d => d.uuid !== diagramId));
    } catch (error) {
      // Handle error
      console.error("Failed to delete diagram:", error);
    }
  };

  return (
    <div className="diagram-list-container">
      <h2 className="diagram-list-title">Diagrams List</h2>
      <DiagramForm />
      {loading ? (
        <p>Loading diagrams...</p>
      ) : (
        <div className="diagram-list">
          {diagrams.length > 0 ? (
            diagrams.map((diagram) => (
              <DiagramCard
                key={diagram.uuid}
                diagram={diagram}
                onDelete={() => handleDelete(diagram.uuid)}
              />
            ))
          ) : (
            <p>No diagrams available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DiagramList;
