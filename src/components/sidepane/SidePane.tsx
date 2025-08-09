import { useState, useRef, useEffect } from 'react';
import './SidePane.css';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { Box } from '@mui/material';
import { TreeItem } from '@mui/x-tree-view';

function SidePaneComponent() {
  const [collapsed, setCollapsed] = useState(true);
  const [resizing, setResizing] = useState(false);
  const [width, setWidth] = useState(320); // Default width (20rem = 320px)
  const sidePaneRef = useRef<HTMLDivElement>(null);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    setResizing(true);
  };

  const stopResizing = () => {
    setResizing(false);
  };

  const resize = (e: MouseEvent) => {
    if (resizing && !collapsed) {
      const newWidth = e.clientX;
      // Set minimum width to 160px (10rem) when expanded
      if (newWidth >= 160) {
        setWidth(newWidth);
      }
    }
  };

  useEffect(() => {
    if (resizing) {
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResizing);
    }

    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resizing]);

  return (
    <div
      ref={sidePaneRef}
      className={`side-pane ${collapsed ? 'collapsed' : ''}`}
      style={{ width: collapsed ? undefined : `${width}px` }}
    >
      <button className="toggle-button" onClick={toggleCollapse}>
        {collapsed ? '→' : '←'}
      </button>
      <div className="resize-handle" onMouseDown={startResizing}></div>
      <Box sx={{ minHeight: 352, minWidth: 250 }}>
          <SimpleTreeView>
            <TreeItem itemId="grid" label="Data Grid">
              <TreeItem itemId="grid-community" label="@mui/x-data-grid" />
              <TreeItem itemId="grid-pro" label="@mui/x-data-grid-pro" />
              <TreeItem itemId="grid-premium" label="@mui/x-data-grid-premium" />
            </TreeItem>
            <TreeItem itemId="pickers" label="Date and Time Pickers">
              <TreeItem itemId="pickers-community" label="@mui/x-date-pickers" />
              <TreeItem itemId="pickers-pro" label="@mui/x-date-pickers-pro" />
            </TreeItem>
            <TreeItem itemId="charts" label="Charts">
              <TreeItem itemId="charts-community" label="@mui/x-charts" />
              <TreeItem itemId="charts-pro" label="@mui/x-charts-pro" />
            </TreeItem>
            <TreeItem itemId="tree-view" label="Tree View">
              <TreeItem itemId="tree-view-community" label="@mui/x-tree-view" />
              <TreeItem itemId="tree-view-pro" label="@mui/x-tree-view-pro" />
            </TreeItem>
          </SimpleTreeView>
        </Box>
    </div>
  );
}

export default SidePaneComponent;