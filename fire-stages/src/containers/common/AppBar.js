import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Link, IconButton, Typography} from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';


const useStyles = makeStyles(theme => ({
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      background: '#e25822'
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
}));

export default function AppBarWidget(props){
    const classes = useStyles();
    return(
        <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
        <Link color="inherit" href="https://gai511.web.app/">
        <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            className={classes.menuButton}
          >
            <KeyboardBackspaceIcon />
          </IconButton>
          </Link>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {props.name}
          </Typography>
        </Toolbar>
      </AppBar>
    );
}