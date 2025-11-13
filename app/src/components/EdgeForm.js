import React, { useState, useEffect } from 'react';

function EdgeForm({ 
  onAddEdge, 
  onEditEdge, 
  onDeleteEdge,
  existingNodes,
  existingEdges,
  selectedEdge,
  onFormClose 
}) {
  const [formMode, setFormMode] = useState('add'); // 'add', 'edit', 'delete'
  const [edgeSource, setEdgeSource] = useState('');
  const [edgeTarget, setEdgeTarget] = useState('');
  const [edgeType, setEdgeType] = useState('smoothstep');
  const [selectedEdgeId, setSelectedEdgeId] = useState('');

  useEffect(() => {
    if (selectedEdge) {
      setFormMode('edit');
      setSelectedEdgeId(selectedEdge.id);
      setEdgeSource(selectedEdge.source);
      setEdgeTarget(selectedEdge.target);
      setEdgeType(selectedEdge.type || 'smoothstep');
    }
  }, [selectedEdge]);

  const handleAddEdge = (e) => {
    e.preventDefault();
    
    if (!edgeSource || !edgeTarget) {
      alert('Please select both source and target nodes');
      return;
    }

    if (edgeSource === edgeTarget) {
      alert('Source and target must be different nodes');
      return;
    }

    const newEdge = {
      id: `e_${Date.now()}`,
      source: edgeSource,
      target: edgeTarget,
      type: edgeType,
      animated: true
    };

    onAddEdge(newEdge);
    setEdgeSource('');
    setEdgeTarget('');
    setEdgeType('smoothstep');
    alert('Edge added successfully!');
  };

  const handleEditEdge = (e) => {
    e.preventDefault();
    
    if (!selectedEdgeId || !edgeSource || !edgeTarget) {
      alert('Please select an edge and valid nodes');
      return;
    }

    if (edgeSource === edgeTarget) {
      alert('Source and target must be different nodes');
      return;
    }

    onEditEdge(selectedEdgeId, { 
      source: edgeSource, 
      target: edgeTarget,
      type: edgeType
    });
    setEdgeSource('');
    setEdgeTarget('');
    setEdgeType('smoothstep');
    setSelectedEdgeId('');
    setFormMode('add');
    alert('Edge updated successfully!');
  };

  const handleDeleteEdge = (e) => {
    e.preventDefault();
    
    if (!selectedEdgeId) {
      alert('Please select an edge to delete');
      return;
    }

    if (window.confirm(`Are you sure you want to delete this edge?`)) {
      onDeleteEdge(selectedEdgeId);
      setEdgeSource('');
      setEdgeTarget('');
      setEdgeType('smoothstep');
      setSelectedEdgeId('');
      setFormMode('add');
      alert('Edge deleted successfully!');
    }
  };

  const handleSelectMode = (mode) => {
    setFormMode(mode);
    setEdgeSource('');
    setEdgeTarget('');
    setEdgeType('smoothstep');
    setSelectedEdgeId('');
  };

  return (
    <div className="form-section">
      <div className="form-tabs">
        <button 
          className={`tab-btn ${formMode === 'add' ? 'active' : ''}`}
          onClick={() => handleSelectMode('add')}
        >
          Add Edge
        </button>
        <button 
          className={`tab-btn ${formMode === 'edit' ? 'active' : ''}`}
          onClick={() => handleSelectMode('edit')}
        >
          Edit Edge
        </button>
        <button 
          className={`tab-btn ${formMode === 'delete' ? 'active' : ''}`}
          onClick={() => handleSelectMode('delete')}
        >
          Delete Edge
        </button>
      </div>

      {formMode === 'add' && (
        <form onSubmit={handleAddEdge} className="edge-form">
          <label>Source Node:</label>
          <select 
            value={edgeSource} 
            onChange={e => setEdgeSource(e.target.value)}
          >
            <option value="">-- Select source --</option>
            {existingNodes.map(node => (
              <option key={node.id} value={node.id}>
                {node.id}: {node.data?.label || 'Untitled'}
              </option>
            ))}
          </select>

          <label>Target Node:</label>
          <select 
            value={edgeTarget} 
            onChange={e => setEdgeTarget(e.target.value)}
          >
            <option value="">-- Select target --</option>
            {existingNodes.map(node => (
              <option key={node.id} value={node.id}>
                {node.id}: {node.data?.label || 'Untitled'}
              </option>
            ))}
          </select>

          <label>Edge Type:</label>
          <select 
            value={edgeType} 
            onChange={e => setEdgeType(e.target.value)}
          >
            <option value="smoothstep">Smooth Step</option>
            <option value="default">Default</option>
            <option value="straight">Straight</option>
            <option value="bezier">Bezier</option>
          </select>

          <button type="submit" className="form-btn">Add Edge</button>
        </form>
      )}

      {formMode === 'edit' && (
        <form onSubmit={handleEditEdge} className="edge-form">
          <label>Select Edge to Edit:</label>
          <select 
            value={selectedEdgeId} 
            onChange={e => {
              const selected = existingEdges.find(ed => ed.id === e.target.value);
              setSelectedEdgeId(e.target.value);
              if (selected) {
                setEdgeSource(selected.source);
                setEdgeTarget(selected.target);
                setEdgeType(selected.type || 'smoothstep');
              }
            }}
          >
            <option value="">-- Select an edge --</option>
            {existingEdges.map(edge => (
              <option key={edge.id} value={edge.id}>
                {edge.id}: {edge.source} → {edge.target}
              </option>
            ))}
          </select>

          <label>Source Node:</label>
          <select 
            value={edgeSource} 
            onChange={e => setEdgeSource(e.target.value)}
          >
            <option value="">-- Select source --</option>
            {existingNodes.map(node => (
              <option key={node.id} value={node.id}>
                {node.id}: {node.data?.label || 'Untitled'}
              </option>
            ))}
          </select>

          <label>Target Node:</label>
          <select 
            value={edgeTarget} 
            onChange={e => setEdgeTarget(e.target.value)}
          >
            <option value="">-- Select target --</option>
            {existingNodes.map(node => (
              <option key={node.id} value={node.id}>
                {node.id}: {node.data?.label || 'Untitled'}
              </option>
            ))}
          </select>

          <label>Edge Type:</label>
          <select 
            value={edgeType} 
            onChange={e => setEdgeType(e.target.value)}
          >
            <option value="smoothstep">Smooth Step</option>
            <option value="default">Default</option>
            <option value="straight">Straight</option>
            <option value="bezier">Bezier</option>
          </select>

          <button type="submit" className="form-btn">Update Edge</button>
        </form>
      )}

      {formMode === 'delete' && (
        <form onSubmit={handleDeleteEdge} className="edge-form">
          <label>Select Edge to Delete:</label>
          <select 
            value={selectedEdgeId} 
            onChange={e => {
              const selected = existingEdges.find(ed => ed.id === e.target.value);
              setSelectedEdgeId(e.target.value);
              if (selected) {
                setEdgeSource(selected.source);
                setEdgeTarget(selected.target);
              }
            }}
          >
            <option value="">-- Select an edge --</option>
            {existingEdges.map(edge => (
              <option key={edge.id} value={edge.id}>
                {edge.id}: {edge.source} → {edge.target}
              </option>
            ))}
          </select>

          <p className="warning-text">⚠️ This action cannot be undone</p>
          <button type="submit" className="form-btn delete-btn">Delete Edge</button>
        </form>
      )}
    </div>
  );
}

export default EdgeForm;
