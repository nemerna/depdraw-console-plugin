import React, { useState, useRef, useCallback, useEffect } from 'react';
import EditingNodeContext from '../store/EditingNodeContext';
import {
  updateNode,
  fetchDiagram,
  fetchDiagramResources,
  fetchDiagramLines,
  createNode,
  createEdge,
  deleteNode,
} from '../services/api'; // Import the API functions
import ReactFlow, {
  MiniMap,
  Background,
  BackgroundVariant,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useStoreApi,
} from 'reactflow';
import 'reactflow/dist/style.css';
// import CustomNode from './CustomNode';
import ResizableNodeSelected from './ResizableNodeSelected';
import transform_fenode_be_node from '../services/types';
import './example.css';
const nodeTypes = {
  ResizableNodeSelected,
};
const initialNodes = [];

const edgeTypes = {};

let id = 0;
const getId = () => `dndnode_${id++}`;

const Canvas = ({ onNodeSelected, diagramUuid }) => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdges, setSelectedEdges] = useState([]);
  const [editingNodeId, setEditingNodeId] = useState(null);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onEdgeClick = useCallback((event, element) => {
    setSelectedEdges([element]);
  }, []);

  const handleSetEditingNode = (node) => {
    // console.log(node)
    setEditingNodeId(node.id);
  };

  const handleExitEditingMode = () => {
    setEditingNodeId(null);
  };

  const handleNodeDragStop = useCallback((event, node) => {
    node.data.backend_data.posX = node.position.x;
    node.data.backend_data.posY = node.position.y;
    updateNode(diagramUuid, node.id, node);
  }, []);

  const handleNodeNameChange = (nodeId, newName) => {
    if (newName) {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, label: newName } }
            : node,
        ),
      );
    }
  };

  const onConnect = useCallback(
    async (params) => {
      const newEdge = {
        source: params.source,
        target: params.target,
      };

      // Make a POST request to create the edge on the backend
      try {
        const response = await fetch(
          `http://localhost:8080/diagrams/${diagramUuid}/lines/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              lineCatalogID: 'ef18d3dc-8cf8-11ed-a1eb-0242ac120002',
              source: newEdge.source,
              destination: newEdge.target,
            }),
          },
        );

        if (response.ok) {
          // Update the edges state locally on success
          const responseData = await response.json();
          const edgeUUID = responseData.uuid;
          newEdge.id = edgeUUID;
          setEdges((prevEdges) => [...prevEdges, newEdge]);
        } else {
          console.error('POST request for creating edge failed');
        }
      } catch (error) {
        console.error('Error making POST request for creating edge:', error);
      }
    },
    [diagramUuid, setEdges],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onLoad = useCallback((event) => {
    event.preventDefault();
    console.log('loaded');
  }, []);

  const onDrop = useCallback(
    async (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const data = JSON.parse(event.dataTransfer.getData('application/json'));
      const type = data.nodeType;
      const catalog = data.additionalData;

      if (typeof type === 'undefined' || !type) {
        console.log(type);
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // Set backend_data as the label when selected
      const newNode = transform_fenode_be_node(catalog, position, type);
      try {
        const responseJson = await createNode(
          diagramUuid,
          newNode.data.backend_data,
        );

        if (responseJson && responseJson.uuid) {
          newNode.id = responseJson.uuid;
          console.log(newNode);
          setNodes((nds) => nds.concat(newNode));
        } else {
          console.error('Failed to create node');
        }
      } catch (error) {
        console.error('Error creating node:', error);
      }
    },
    [diagramUuid, reactFlowInstance, setNodes],
  );

  // Fetch existing nodes from the backend and populate the nodes state
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchDiagram(diagramUuid).then((diagram) => {
      const diagramNodes = diagram['resources'];
      const diagramEdges = diagram['lines'];
      for (const node of diagramNodes) {
        node.resourceCatalogID = node.resourceCatalog.uuid;
        delete node.resourceCatalog;
      }
      const Nodes = diagramNodes.map((Node) => ({
        id: Node.uuid,
        type: 'ResizableNodeSelected',
        position: { x: Node.position.x, y: Node.position.y },
        data: { label: Node.name, backend_data: Node },
        style: {
          background: '#fff',
          border: '1px solid black',
          borderRadius: 15,
          fontSize: 12,
        },
      }));
      setNodes(Nodes);

      const Edges = diagramEdges.map((edge) => ({
        id: edge.uuid, // Use the edge's UUID as ID
        source: edge.source.uuid,
        target: edge.destination.uuid,
        type: 'smoothstep', // Set the edge type here
      }));
      setEdges(Edges);
    });
  }, [setNodes, setEdges, diagramUuid]);

  useEffect(() => {
    const handleKeyDown = async (event) => {
      if (event.key === 'Delete') {
        const selectedNodes = nodes.filter((node) => node.selected);
        const updatedNodes = nodes.filter(
          (node) => !selectedNodes.includes(node),
        );

        // Delete selected nodes from backend and then update state
        for (const selectedNode of selectedNodes) {
          deleteNode(diagramUuid, selectedNode.data.backend_data.uuid);
        }
        setNodes(updatedNodes);

        // Delete selected edges
        const selectedEdgeIds = selectedEdges.map((edge) => edge.id);
        const updatedEdges = edges.filter(
          (edge) => !selectedEdgeIds.includes(edge.id),
        );

        // Delete selected edges from backend and then update state
        for (const selectedEdge of selectedEdges) {
          await fetch(
            `http://localhost:8080/diagrams/${diagramUuid}/lines/${selectedEdge.id}`,
            {
              method: 'DELETE',
            },
          );
        }
        setEdges(updatedEdges);
        setSelectedEdges([]); // Clear the selected edges
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [nodes, edges, selectedEdges, setNodes, setEdges, diagramUuid]);

  return (
    <div
      className="reactflow-wrapper"
      ref={reactFlowWrapper}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <EditingNodeContext.Provider
        value={{
          editingNodeId,
          handleNodeNameChange,
          handleExitEditingMode,
          diagramUuid,
        }}
      >
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          edges={edges.map((edge) => ({ ...edge, type: 'smoothstep' }))}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect} // Attach the updated onConnect handler
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeDoubleClick={(event, element) => handleSetEditingNode(element)}
          onNodeDragStop={handleNodeDragStop}
          onEdgeClick={onEdgeClick}
          fitView
        >
          <Background variant={BackgroundVariant.Dots} />
          <MiniMap />
          <Controls style={{ marginLeft: '40px' }} />
        </ReactFlow>
      </EditingNodeContext.Provider>
    </div>
  );
};

export default Canvas;
