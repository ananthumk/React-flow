# React Flow Diagram Application

A modern, interactive diagram flow editor built with React and React Flow library. Create, manage, and visualize complex process diagrams, mind maps, and flowcharts with an intuitive user interface.

## 📋 Table of Contents

- [Features](#features)
- [Technical Stack](#technical-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Architecture](#architecture)
- [State Management](#state-management)
- [Persistence](#persistence)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### Core Features
- **Interactive Diagram Editor**: Drag, drop, and connect nodes visually
- **Dynamic Node Management**: Add, edit, and delete nodes with real-time updates
- **Edge Connections**: Create relationships between nodes with various edge types
- **Multiple Edge Types**: Smooth Step, Bezier, Straight, Default
- **Responsive Design**: Works on desktop and mobile
- **State Persistence**: Auto-saves to browser localStorage

### Advanced Features
- **Export/Import**: Save diagrams as JSON
- **MiniMap**: Navigate large diagrams
- **Zoom & Pan**: Intuitive navigation
- **Tab-based UI**: Organized controls
- **Statistics Panel**: Track diagram metrics

## 🔧 Technical Stack

- **React**: 19.2.0
- **React Flow**: 11.11.4
- **State Management**: React Hooks
- **Storage**: Browser LocalStorage
- **Build Tool**: Create React App

## 📦 Installation

### Prerequisites
- Node.js v16+
- npm v7+

### Setup

```powershell
cd c:\Users\Dell\Desktop\Venham\app
npm install
npm start
```

The app opens at `http://localhost:3000`

### Build for Production
```powershell
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Diagram.js          # Diagram renderer
│   ├── NodeForm.js         # Node operations
│   ├── EdgeForm.js         # Edge operations
│   └── Sidebar.js          # Main UI
├── App.js                  # Main component
├── App.css                 # Styles
├── metadata.json           # Sample data
└── index.js                # Entry point
```

## 🚀 Usage Guide

### Adding Nodes
1. Go to **Nodes** tab
2. Select **Add Node**
3. Enter label
4. Click **Add Node**

### Editing Nodes
1. Go to **Nodes** tab
2. Select **Edit Node**
3. Choose node from dropdown
4. Modify label
5. Click **Update Node**

### Deleting Nodes
1. Go to **Nodes** tab
2. Select **Delete Node**
3. Choose node to delete
4. Confirm deletion

### Adding Edges
1. Go to **Edges** tab
2. Select **Add Edge**
3. Choose source and target nodes
4. Select edge type
5. Click **Add Edge**

### Diagram Navigation
- **Zoom**: Mouse wheel
- **Pan**: Click and drag
- **MiniMap**: Bottom-right corner
- **Fit View**: Controls button

### Export/Import
1. Go to **Info** tab
2. **Export**: Download current diagram as JSON
3. **Import**: Load previously saved diagram

## 🏗️ Architecture

### Component Hierarchy
```
App (State Management)
├── Sidebar
│   ├── NodeForm
│   ├── EdgeForm
│   └── Info Panel
└── Diagram
    ├── ReactFlow
    ├── Controls
    ├── Background
    └── MiniMap
```

### Data Flow
```
User Input → Form Component → State Update → Diagram Render → LocalStorage
```

### State Structure
```javascript
{
  nodes: [
    {
      id: string,
      type: string,
      position: { x, y },
      data: { label: string }
    }
  ],
  edges: [
    {
      id: string,
      source: string,
      target: string,
      type: string,
      animated: boolean
    }
  ]
}
```

## 💾 State Management

### Hooks Used
- **useState**: Node and edge state, UI state
- **useEffect**: Initialization and persistence
- **useCallback**: Optimized event handlers

### LocalStorage
- Keys: `diagramNodes`, `diagramEdges`
- Format: JSON strings
- Auto-saves on every change
- Loads on app startup

## 🔄 Persistence

### Auto-save
Changes are automatically saved to localStorage on every modification.

### Manual Save
Export diagrams as JSON files for backup or sharing.

### Import
Load previously exported diagrams to continue editing.

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Scroll | Zoom |
| Drag | Pan |
| Double Click | Edit node |
| Right Click | Context menu |

## 🐛 Troubleshooting

### Nodes not appearing?
- Check console for errors
- Ensure label is not empty
- Verify localStorage space

### Edges won't connect?
- Verify both nodes exist
- Source and target must differ
- Check node IDs

### Changes not saved?
- Enable localStorage
- Clear cache and reload
- Use manual export

### Diagram too large?
- Use MiniMap to navigate
- Fit View with controls
- Export and split into multiple diagrams

## 📊 Diagram Statistics

Go to **Info** tab to see:
- Total nodes count
- Total edges count
- Diagram size info
- Recent actions

## 💡 Tips & Best Practices

1. **Organization**: Group related nodes together
2. **Naming**: Use descriptive labels
3. **Backup**: Export diagrams regularly
4. **Performance**: Keep nodes under 100 for best performance
5. **Navigation**: Use MiniMap for large diagrams

## 📝 Example Workflows

### Flowchart
Start → Process → Decision → Options → End

### Mind Map
Central topic → Categories → Items

### Org Chart
CEO → Managers → Team members

## 🎓 Learning Resources

- [React Flow Documentation](https://reactflow.dev)
- [React Hooks Guide](https://react.dev/reference/react/hooks)
- [LocalStorage Guide](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## 📜 Available Scripts

### `npm start`
Runs the app in development mode at http://localhost:3000

### `npm test`
Launches the test runner in interactive mode

### `npm run build`
Builds the app for production

### `npm run eject`
Ejects from Create React App (one-way operation)

## 🎯 Future Enhancements

- [ ] Undo/Redo functionality
- [ ] Custom node shapes
- [ ] Node grouping
- [ ] Drag-drop file import
- [ ] Collaborative editing
- [ ] Dark mode
- [ ] Advanced styling
- [ ] Animation presets
- [ ] Search functionality

## 🆘 Support

- Check Troubleshooting section
- Review React Flow docs
- Open an issue with details

## 📄 License

This project is licensed under the MIT License.

---

**Version**: 1.0.0  
**Last Updated**: November 12, 2025

For more details, explore the components in the `src/` directory and check inline comments in the code.

