// src/TabBar.js
import React, { useState } from 'react';
import {
  AppBar,
  Tab,
  Tabs,
  Typography,
  Box,
  Button,
  Modal,
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TabBar = () => {
  const [tabs, setTabs] = useState([
    { id: '1', label: 'Tab One' },
    { id: '2', label: 'Tab Two' },
    { id: '3', label: 'Tab Three' },
  ]);
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const onDragEnd = (result) => {
    if (!result.destination) return;

    // Check if dragged out of tabs
    if (result.destination.index === tabs.length) {
      setModalContent(tabs[result.source.index].label);
      setModalOpen(true);
      return;
    }

    const reorderedTabs = Array.from(tabs);
    const [removed] = reorderedTabs.splice(result.source.index, 1);
    reorderedTabs.splice(result.destination.index, 0, removed);
    setTabs(reorderedTabs);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided) => (
            <AppBar position="static" ref={provided.innerRef} {...provided.droppableProps}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                {tabs.map((tab, index) => (
                  <Draggable key={tab.id} draggableId={tab.id} index={index}>
                    {(provided) => (
                      <Tab
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        label={tab.label}
                        value={tab.id}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {/* Area to allow dragging out of the tab area */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    cursor: 'pointer',
                  }}
                >
                  <Draggable draggableId="add-tab" index={tabs.length}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Button variant="outlined">+</Button>
                      </div>
                    )}
                  </Draggable>
                </div>
              </Tabs>
            </AppBar>
          )}
        </Droppable>
      </DragDropContext>

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={{ bgcolor: 'white', p: 4, borderRadius: '8px', maxWidth: '400px', margin: 'auto', marginTop: '20%' }}>
          <Typography variant="h6">{modalContent}</Typography>
          <Button variant="contained" onClick={handleCloseModal}>Close</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default TabBar;