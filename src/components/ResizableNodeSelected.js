import React from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';
import { useEditingNode } from '../store/EditingNodeContext';
import { updateNode, updateNodeDirectly } from '../services/api';
const ResizableNodeSelected = ({ id, data, selected }) => {
  const { editingNodeId, handleNodeNameChange, handleExitEditingMode, diagramUuid } = useEditingNode();
  const [name, setName] = React.useState(data.backend_data.name);
  const inputRef = React.useRef(null);

  const isEditing = id === editingNodeId;

  React.useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    // This will set the editingNodeId in the context to the current node's id
    handleNodeNameChange(id, name);
    
    
  };

  const handleBlur = async (e) => {
    handleExitEditingMode();
    try {
    console.log(data);
    data.backend_data.name = e.target.value;
    await updateNodeDirectly(diagramUuid, id, data.backend_data);
    console.log(data);
    } catch (error) {
      console.error('Error updating node name:', error);
    }
    };


  const handleChange = (e) => {
    setName(e.target.value);
    handleNodeNameChange(id, e.target.value);
  };



  return (
    <>
      <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />
      <Handle type="target" position={Position.Left} />
      <div
        style={{ color: '#000000', padding: 10 }}
        onDoubleClick={handleDoubleClick}
      >
        {isEditing ? (
          <input
            ref={inputRef}
            value={name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        ) : (
          name
        )}
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default React.memo(ResizableNodeSelected);
