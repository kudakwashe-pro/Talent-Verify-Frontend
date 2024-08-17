import React from 'react';
import { Box } from '@mui/material';

const ScrollableContainer = ({ width = '500px', height = '400px', children }) => {
  return (
    <Box
      sx={{
        width: width,
        height: height,
        overflowY: 'auto',
        border: '1px solid #ccc',
        padding: '16px',
      }}
    >
      {children}
    </Box>
  );
};

export default ScrollableContainer;