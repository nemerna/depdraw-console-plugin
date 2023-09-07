import Canvas from '../components/Canvas';
import Sidebar from '../components/SideBar/Sidebar';
import { ReactFlowProvider } from 'reactflow';
import React, { useState } from 'react';
// import NodeForm from '../components/NodeForm';
import { useParams } from 'react-router-dom';

const CanvasPage = () => {
  const [selectedNodeData, setSelectedNodeData] = useState(null);
  const [formData, setFormData] = useState({});
  const [isVisible, setisVisible] = useState(true);

  const toggleSidebar = () => {
    setisVisible(!isVisible);
  };

  const handleNodeSelected = (nodeData) => {
    setSelectedNodeData(nodeData);
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  const { diagramUuid } = useParams();

  return (
    <div
      className="canvas-page"
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <div className="dndflow">
        <ReactFlowProvider>
          <Sidebar isVisible={isVisible} toggleSidebar={toggleSidebar} />
          <Canvas
            diagramUuid={diagramUuid}
            onNodeSelected={handleNodeSelected}
          />
        </ReactFlowProvider>
        {/* {selectedNodeData && (
          <NodeForm
            nodeData={selectedNodeData}
            onSubmit={handleFormSubmit}
            initialFormData={formData}
          />
        )} */}
      </div>
    </div>
  );
};

export default CanvasPage;
