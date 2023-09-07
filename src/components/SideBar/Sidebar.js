import React, { useState, useEffect } from 'react';
import './SideBar.css';

const DragComponent = ({ isVisible, toggleSidebar }) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    // Fetch resource data from the backend
    fetch('http://localhost:8080/resourcecatalogs')
      .then(response => response.json())
      .then(apiResponse => {
        setResources(apiResponse);
      })
      .catch(error => {
        console.error('Error fetching resource data:', error);
      });
  }, []);

  const onDragStart = (event, resource) => {
    const data = {
      nodeType: 'ResizableNodeSelected',
      additionalData: resource,
    };
    event.dataTransfer.setData('application/json', JSON.stringify(data));
    event.dataTransfer.effectAllowed = 'move';
  };

return (
    <div className="sidebar-container" style={{ width: isVisible ? '220px' : '40px' }}>
      <div className="toggle-bar">
        <button onClick={toggleSidebar} className="toggle-btn">
          {isVisible ? "<<" : ">>"}
        </button>
      </div>
      
      {/* Use the 'closed' class when the sidebar is not visible */}
      <aside className={`sidebar ${!isVisible ? 'closed' : ''}`}>
        <div className="description">Draggable Items <br /> Resource Catalog</div>
        {resources.map((resource) => (
          <div
            key={resource.uuid}
            className="node"
            onDragStart={(event) => onDragStart(event, resource)}
            draggable
          >
            {resource.name}
          </div>
        ))}
      </aside>
    </div>
);
};

export default DragComponent;
