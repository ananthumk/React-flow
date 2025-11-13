import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ReactFlowProvider } from 'reactflow';
import metadata from './metadata.json';
import Diagram from './components/Diagram';
import Sidebar from './components/Sidebar';
import { applyEdgeChanges, applyNodeChanges } from 'reactflow';
import './App.css';

function AppContent() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [loading, setLoading] = useState(true);
  const diagramRef = useRef()

  // Load initial state from localStorage or metadata
  useEffect(() => {
    const savedNodes = localStorage.getItem('diagramNodes');
    const savedEdges = localStorage.getItem('diagramEdges');

    

    if (savedNodes && savedEdges) {
      try {
        setNodes(JSON.parse(savedNodes));
        setEdges(JSON.parse(savedEdges));
      } catch (error) {
        console.error('Error loading from localStorage:', error);
        setNodes(metadata.nodes);
        setEdges(metadata.edges);
      }
    } else {
      setNodes(metadata.nodes);
      setEdges(metadata.edges);
    }
    setLoading(false);
  }, []);

  // Save to localStorage whenever nodes or edges change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('diagramNodes', JSON.stringify(nodes));
      localStorage.setItem('diagramEdges', JSON.stringify(edges));
    }
  }, [nodes, edges, loading]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const addNode = (node) => setNodes((prev) => [...prev, node]);

  const removeNode = (id) => {
    setNodes((prev) => prev.filter((n) => n.id !== id));

    setEdges((prev) => prev.filter((e) => e.source !== id && e.target !== id));
  };

  const editNode = (id, newData) =>
    setNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...newData } : n))
    );

  const addEdge = (edge) => setEdges((prev) => [...prev, edge]);

  const removeEdge = (id) => setEdges((prev) => prev.filter((e) => e.id !== id));

  const editEdge = (id, newData) =>
    setEdges((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...newData } : e))
    );

  if (loading) {
    return <div className="loading">Loading diagram...</div>;
  }


  console.log(JSON.parse(localStorage.getItem('diagramNodes')));
  console.log(JSON.parse(localStorage.getItem('diagramEdges')));

  return (
    <div className="app-page">
      <Sidebar
        addNode={addNode}
        addEdge={addEdge}
        removeNode={removeNode}
        editNode={editNode}
        nodes={nodes}
        edges={edges}
        removeEdge={removeEdge}
        editEdge={editEdge}
        onResetView={() => diagramRef.current?.resetView()}
      />
      <Diagram
        ref={diagramRef}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      />
    </div>
  );
}

function App() {
  return (
    <ReactFlowProvider>
      <AppContent />
    </ReactFlowProvider>
  );
}

export default App;
