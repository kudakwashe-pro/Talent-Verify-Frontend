import { AppBar, Box, Tab, Tabs, Typography, useTheme } from '@mui/material'
import React from 'react'
const TabPanel = ({ children, value, index }) => {
    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
      >
        {value === index && (
          <Box sx={{ p: 2 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    )
  }
const ChildTabs = ({tabs}) => {
    const [value, setValue] = React.useState(0)

    const handleChange = (event, newValue) => {
      setValue(newValue)
    }

    const theme = useTheme();

  return (
    <Box>
    <AppBar
        variant='none'
        position='sticky'
        sx={{top: '130px',background: theme.palette.mode === 'dark' ? '' :  'linear-gradient(90deg,#ddf1f1,#e6faf7, #eadcee)'}}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor='inherit'
          variant='standard'
          indicatorColor='transparent'
  
        >
          {tabs.map((tab, index) => (
            <Tab
              label={tab.label}
              key={index}
              sx={{
      
                color: value === index ? theme.palette.mode === 'dark' ? '' : '#1E1F1FBE' : theme.palette.mode === 'dark' ? '' : '#3B3B3B',
                fontWeight: value === index ? 'bold' : 'normal',
                borderLeft: value === index ? 'none' : 'none',
                borderRight: value === index ? 'none' : 'none',
                borderTop: value === index ? '1px solid orange' : 'none',
                borderRadius: value === index ? '32px' : '2px',
                fontSize: '1.3ex',
                borderBottom: value === index ? 'none' : '1px solid #B3B0B0',
                backgroundColor: value === index ? theme.palette.mode === 'dark' ? '' :  'white' : theme.palette.mode === 'dark' ? '' :  '#F4F7F7'
              }}
            />
          ))}
        </Tabs>
      </AppBar>
      {tabs.map((tab, index) => (
        <TabPanel value={value} index={index} key={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  )
}

export default ChildTabs
