import React, { useState, useEffect } from 'react';
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
  LogIn as LogInIcon,
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

function NavBar({ history }) {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState();
  const redirect = window.location.pathname;

  useEffect(() => {
    (async () => {
      setUserInfo(await getUserInfo());
    })();
  }, []);

  async function getUserInfo() {
    try {
      const response = await fetch('/.auth/me');
      const payload = await response.json();
      const { clientPrincipal } = payload;
      return clientPrincipal;
    } catch (error) {
      console.error('No profile could be found');
      return undefined;
    }
  }

  const menuItems = [
    {
      icon: HomeIcon,
      title: 'Home',
      handleAction: () => history.push('/')
    },
    {
      icon: InfoIcon,
      title: 'About',
      handleAction: () => history.push('/about')
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
            {menuItems.map((item) => (
              <NavItem
                key={item.title}
                onClick={item.handleAction}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </List>
          <nav className="menu auth">
            <List>
              {userInfo ?
                <NavItem
                  key={'LogOut'}
                  onClick={() => {
                    location.href = `/.auth/logout?post_logout_redirect_uri=${redirect}`;
                  }}
                  title={'LogOut'}
                  icon={LogOutIcon}
                />
                :
                <NavItem
                  key={'LogIn'}
                  onClick={() => {
                    location.href = `/.auth/login/github?post_login_redirect_uri=${redirect}`;
                  }}
                  title={'LogIn'}
                  icon={LogInIcon}
                />}
            </List>
          </nav>
        </Box>
      </Box>
    </Drawer >
  );
};

export default withRouter(NavBar);