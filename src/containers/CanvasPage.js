import Canvas from '../components/Canvas';
import ToolBar from '../components/SideBar/ToolBar';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const CanvasPage = () => {
  const [selectedNodeData, setSelectedNodeData] = useState(null);
  const [isVisible, setisVisible] = useState(true);

  const toggleSidebar = () => {
    setisVisible(!isVisible);
  };

  const handleNodeSelected = (nodeData) => {
    setSelectedNodeData(nodeData);
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
        <ToolBar isVisible={isVisible} toggleSidebar={toggleSidebar} />
        <Canvas diagramUuid={diagramUuid} onNodeSelected={handleNodeSelected} />
      </div>
    </div>
  );
};

export default CanvasPage;
