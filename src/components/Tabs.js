import React, { useState } from 'react'
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
  Avatar,
  Card,
  Grid,
  IconButton,
  FormLabel,
  ListItem,
  List,
  useTheme
} from '@mui/material'
import {EditNote, PersonOutlined, Settings, VerifiedUser } from '@mui/icons-material'

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

const CustomTabs = ({ header, tabs }) => {
  const [value, setValue] = useState(0)
  const theme = useTheme();
  
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div>
    <Box >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme.palette.mode === 'dark' ? '' :'#FFFFFFDC'
        }}
      >
        {header && (
          <Typography
            variant='h6'
            sx={{
              flexGrow: 1,
              border: theme.palette.mode === 'dark' ? '1px solid' : '1px solid #E2DEDE',
              textIndent: 20,
              fontWeight: 'bold'
            }}
          >
            {header}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          background: theme.palette.mode === 'dark' ? '' :  'linear-gradient(90deg,#ddf1f1,#e6faf7, #eadcee)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          <Grid container spacing={3} sx={{ mt: 0, mb: 2 }}>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  borderRight:theme.palette.mode === 'dark' ? '1px solid' : '1px solid #E2DEDE',
                  borderRadius: '0',
                  backgroundColor: theme.palette.mode === 'dark' ? '' : 'unset',
                }}
                variant='none'
              >
                <Grid container spacing={3} sx={{ mb: 1}}>
                  <Grid sx={{ml:1, mt:1}} item xs={12} md={1}>
                    <Avatar sx={{borderRadius:'15px',bgcolor:theme.palette.mode === 'dark' ? 'white' :'gray',width:'35px',height:'35px'}} >
                      <PersonOutlined  />
                    </Avatar>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <List >
                    <ListItem >
                    <FormLabel sx={{fontFamily:'cursive',fontSize:'1.2ex'}} >Kadakwashe Makorokoto </FormLabel>
                    </ListItem>
                    <FormLabel sx={{fontFamily:'cursive',fontSize:'1.2ex',ml:2}} >Account State </FormLabel>
                    <VerifiedUser sx={{color:theme.palette.mode === 'dark' ? '' :'#98C1DD',height:'18px'}}/>
                    </List>
                  </Grid>

                  <Grid item xs={12} md={1}>
                    <IconButton>
                      <EditNote sx={{position:'absolute',left:8,top:-14,zIndex:5}}/>
                    </IconButton>
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card 
              sx={{
                  borderRight:theme.palette.mode === 'dark' ? '1px solid' : '1px solid #E2DEDE',
                  borderRadius: '0',
                  backgroundColor: theme.palette.mode === 'dark' ? '' : 'unset',
                }}
                variant='none'>
                  <Grid sx={{ml:1, mt:3}} item xs={12} md={1}>
              </Grid></Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  borderRadius: '0',
                  backgroundColor: theme.palette.mode === 'dark' ? '' : 'unset',
                }}
                variant='none'
              >
                <Grid container spacing={4} sx={{ mb: 1}}>

                  <Grid item xs={12} md={10}>
                    
                  </Grid>

                  <Grid item xs={12} md={2}>
                    <IconButton>
                      <Settings />
                    </IconButton>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Typography>
      </Box>
      <AppBar
        variant='none'
        position='sticky'
        sx={{ background: theme.palette.mode === 'dark' ? '' :  'linear-gradient(90deg,#ddf1f1,#e6faf7, #eadcee)',top: '70px' }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor='inherit'
          variant='fullWidth'
          indicatorColor='transparent'
        >
          {tabs.map((tab, index) => (
            <Tab
              label={tab.label}
              key={index}
              sx={{
                color: value === index ? theme.palette.mode === 'dark' ? '' :'#1E1F1FBE' : theme.palette.mode === 'dark' ? '' :'gray',
                fontWeight: value === index ? 'bold' : 'normal',
                borderLeft: value === index ? theme.palette.mode === 'dark' ? '' : '1px solid #B3B0B0' : theme.palette.mode === 'dark' ? '' : 'none',
                borderRight: value === index ? theme.palette.mode === 'dark' ? '' : '1px solid #B3B0B0' : theme.palette.mode === 'dark' ? '' : 'none',
                borderTop: value === index ? '1px solid orange' : theme.palette.mode === 'dark' ? '' : theme.palette.mode === 'dark' ? '' : 'none',
                borderRadius: value === index ? '32px' : '2px',
                fontSize: '1.3ex',
                borderBottom: value === index ? 'none' : theme.palette.mode === 'dark' ? '1px solid' : '1px solid #B3B0B0',
                backgroundColor: value === index ?theme.palette.mode === 'dark' ? '' : 'white' : theme.palette.mode === 'dark' ? '': '#FCFCFC'
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
    </Box></div>
  )
}

export default CustomTabs
