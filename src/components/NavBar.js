import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  makeStyles
} from '@material-ui/core';
import {
  Home as HomeIcon,
  Info as InfoIcon,
  LogOut as LogOutIcon,
} from 'react-feather';
import NavItem from './NavItem';

const useStyles = makeStyles(() => ({
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
}));

const NavBar = withRouter(props => {
  const classes = useStyles();

  const items = [
    {
      icon: HomeIcon,
      title: 'Home',
      handleAction: () => props.history.push('/')
    },
    {
      icon: InfoIcon,
      title: 'About',
      handleAction: () => props.history.push('/about')
    },
    {
      icon: LogOutIcon,
      title: 'LogOut',
      handleAction: () => { }
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.desktopDrawer }}
      open
      variant="persistent"
    >
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
      >
        <Box p={2}>
          <List>
            {items.map((item) => (
              <NavItem
                key={item.title}
                onClick={item.handleAction}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
});

export default NavBar;