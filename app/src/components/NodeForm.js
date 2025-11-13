import React, { useState, useEffect } from 'react';

function NodeForm({ 
  onAddNode, 
  onEditNode, 
  onDeleteNode,
  existingNodes,
  selectedNode,
  onFormClose 
}) {
  const [formMode, setFormMode] = useState('add'); // 'add', 'edit', 'delete'
  const [nodeLabel, setNodeLabel] = useState('');
  const [nodeId, setNodeId] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setFormMode('edit');
      setSelectedNodeId(selectedNode.id);
      setNodeId(selectedNode.id);
      setNodeLabel(selectedNode.data?.label || '');
    }
  }, [selectedNode]);

  const handleAddNode = (e) => {
    e.preventDefault();
    if (!nodeLabel.trim()) {
      alert('Please enter a node label');
      return;
    }

    const newNode = {
      id: Date.now().toString(),
      type: 'default',
      position: { 
        x: Math.random() * 400, 
        y: Math.random() * 400 
      },
      data: { label: nodeLabel }
    };

    onAddNode(newNode);
    setNodeLabel('');
    setNodeId('');
    alert('Node added successfully!');
  };

  const handleEditNode = (e) => {
    e.preventDefault();
    if (!selectedNodeId || !nodeLabel.trim()) {
      alert('Please select a node and enter a label');
      return;
    }

    onEditNode(selectedNodeId, { data: { label: nodeLabel } });
    setNodeLabel('');
    setNodeId('');
    setSelectedNodeId('');
    setFormMode('add');
    alert('Node updated successfully!');
  };

  const handleDeleteNode = (e) => {
    e.preventDefault();
    if (!selectedNodeId) {
      alert('Please select a node to delete');
      return;
    }

    if (window.confirm(`Are you sure you want to delete node "${nodeLabel}"?`)) {
      onDeleteNode(selectedNodeId);
      setNodeLabel('');
      setNodeId('');
      setSelectedNodeId('');
      setFormMode('add');
      alert('Node deleted successfully!');
    }
  };

  const handleSelectMode = (mode) => {
    setFormMode(mode);
    setNodeLabel('');
    setNodeId('');
    setSelectedNodeId('');
  };

  return (
    <div className="form-section">
      <div className="form-tabs">
        <button 
          className={`tab-btn ${formMode === 'add' ? 'active' : ''}`}
          onClick={() => handleSelectMode('add')}
        >
          Add Node
        </button>
        <button 
          className={`tab-btn ${formMode === 'edit' ? 'active' : ''}`}
          onClick={() => handleSelectMode('edit')}
        >
          Edit Node
        </button>
        <button 
          className={`tab-btn ${formMode === 'delete' ? 'active' : ''}`}
          onClick={() => handleSelectMode('delete')}
        >
          Delete Node
        </button>
      </div>

      {formMode === 'add' && (
        <form onSubmit={handleAddNode} className="node-form">
          <label>Node Label:</label>
          <input 
            type="text"
            value={nodeLabel} 
            onChange={e => setNodeLabel(e.target.value)} 
            placeholder="Enter node label"
          />
          <button type="submit" className="form-btn">Add Node</button>
        </form>
      )}

      {formMode === 'edit' && (
        <form onSubmit={handleEditNode} className="node-form">
          <label>Select Node to Edit:</label>
          <select 
            value={selectedNodeId} 
            onChange={e => {
              const selected = existingNodes.find(n => n.id === e.target.value);
              setSelectedNodeId(e.target.value);
              setNodeLabel(selected?.data?.label || '');
            }}
          >
            <option value="">-- Select a node --</option>
            {existingNodes.map(node => (
              <option key={node.id} value={node.id}>
                {node.id}: {node.data?.label || 'Untitled'}
              </option>
            ))}
          </select>
          <label>New Label:</label>
          <input 
            type="text"
            value={nodeLabel} 
            onChange={e => setNodeLabel(e.target.value)} 
            placeholder="Enter new label"
          />
          <button type="submit" className="form-btn">Update Node</button>
        </form>
      )}

      {formMode === 'delete' && (
        <form onSubmit={handleDeleteNode} className="node-form">
          <label>Select Node to Delete:</label>
          <select 
            value={selectedNodeId} 
            onChange={e => {
              const selected = existingNodes.find(n => n.id === e.target.value);
              setSelectedNodeId(e.target.value);
              setNodeLabel(selected?.data?.label || '');
            }}
          >
            <option value="">-- Select a node --</option>
            {existingNodes.map(node => (
              <option key={node.id} value={node.id}>
                {node.id}: {node.data?.label || 'Untitled'}
              </option>
            ))}
          </select>
          <p className="warning-text"> This will also remove all connected edges</p>
          <button type="submit" className="form-btn delete-btn">Delete Node</button>
        </form>
      )}
    </div>
  );
}

export default NodeForm;
