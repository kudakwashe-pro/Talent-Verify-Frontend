import * as React from 'react';
import { styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ExpandLess, ExpandMore, Verified } from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';

const drawerWidth = 180;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const MiniVariantDrawer = ({ items, title }) => {
  const [open, setOpen] = React.useState(false);
  const [nestedStates, setNestedStates] = React.useState({});

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const toggleNested = (index) => {
    setNestedStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Box  sx={{ display: 'flex' }}>
      <AppBar variant='none' sx={{backgroundColor: '#F9FAF9DC',color:'black' }} position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
          >
            <MenuIcon sx={{ backgroundColor: '#EAEDEE'}} />
          </IconButton>
          <Verified className='AppIcon' sx={{color:"#4caf50", position:'absolute',left:250,top:8,zIndex:1}}/>
          <Typography sx={{fontWeight:'bold',fontSize:'1.7ex'}} variant="h6" noWrap component="div">{title}</Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader >
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {items.map(({ text, icon, onClick, nestedItems }, index) => (
            <div key={text}>
              <ListItem disablePadding>
                <ListItemButton divider onClick={nestedItems ? () => toggleNested(index) : onClick}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} sx={{'.MuiListItemText-primary': { color: 'black',fontSize:'1.7ex'}} }/>
                  {nestedItems && (nestedStates[index] ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </ListItem>
              {nestedItems && (
                <Collapse in={nestedStates[index]} timeout='auto' unmountOnExit>
                  <List sx={{backgroundColor:'#EBF7EBDC'}} component="div" disablePadding>
                    {nestedItems.map(({ nestedText, nestedOnClick,nestedIcons }, nestedIndex) => (
                      <ListItemButton key={nestedText} sx={{ pl: 4 }} onClick={nestedOnClick}>
                        <ListItemIcon>{nestedIcons}</ListItemIcon>
                        <ListItemText primary={nestedText} sx={{'.MuiListItemText-primary': { color: 'black',fontSize:'1.7ex'}} }/>
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </div>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default MiniVariantDrawer;