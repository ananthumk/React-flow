import React, { useState } from 'react';
import NodeForm from './NodeForm';
import EdgeForm from './EdgeForm';

function Sidebar({
  addNode,
  addEdge,
  nodes,
  edges,
  removeNode,
  removeEdge,
  editNode,
  editEdge,
  onResetView
}) {
  const [activeTab, setActiveTab] = useState('nodes');
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);



  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all nodes and edges? This cannot be undone.')) {
      nodes.forEach(n => removeNode(n.id));
      edges.forEach(e => removeEdge(e.id));
      alert('Diagram cleared!');
    }
  };

  return (
    <div className="sidebar">
      
      <h2 className="sidebar-title">Diagram Editor</h2>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'nodes' ? 'active' : ''}`}
          onClick={() => setActiveTab('nodes')}
        >
          Nodes
        </button>
        <button
          className={`tab ${activeTab === 'edges' ? 'active' : ''}`}
          onClick={() => setActiveTab('edges')}
        >
          Edges
        </button>
        <button
          className={`tab ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          Info
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'nodes' && (
          <>
            <NodeForm
              onAddNode={addNode}
              onEditNode={editNode}
              onDeleteNode={removeNode}
              existingNodes={nodes}
              selectedNode={selectedNode}
              onFormClose={() => setSelectedNode(null)}
            />
          </>
        )}

        {activeTab === 'edges' && (
          <>
            <EdgeForm
              onAddEdge={addEdge}
              onEditEdge={editEdge}
              onDeleteEdge={removeEdge}
              existingNodes={nodes}
              existingEdges={edges}
              selectedEdge={selectedEdge}
              onFormClose={() => setSelectedEdge(null)}
            />
          </>
        )}

        {activeTab === 'info' && (
          <div className="info-panel">
            <h4>Diagram Statistics</h4>
            <div className="stat-item">
              <span className="stat-label">Total Nodes:</span>
              <span className="stat-value">{nodes.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Edges:</span>
              <span className="stat-value">{edges.length}</span>
            </div>

            <h4 className="mt-20">Actions</h4>

            <div className="file-section">




              <button onClick={handleClearAll} className="form-btn clear-btn">
                Clear All
              </button>
            </div>


          </div>
        )}
      </div>

      <button
        onClick={onResetView}
        className="form-btn"
        style={{ marginTop: '12px' }}
      >
        Reset View
      </button>
    </div>
  );
}

export default Sidebar;
