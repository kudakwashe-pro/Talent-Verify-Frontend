import React from 'react';
import { List, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';

const ListButtons = ({ items }) => {
  return (
    <List>
      {items.map((item, index) => (
        <ListItemButton key={index} onClick={item.onClick}>
          {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default ListButtons;