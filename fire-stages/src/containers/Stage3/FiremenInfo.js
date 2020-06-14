import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import YouTube from '@u-wave/react-youtube';
import FlowBar from '../common/Flow';
import Copyright from '../common/Copyright';

import {
  Typography, Grid,
  CardContent, Card
} from '@material-ui/core';

import firebase from '../../config/firebase';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
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
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
  },
  seeMore: {
    marginTop: theme.spacing(1),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    boxShadow: theme.shadows[2],
    // marginBottom: theme.spacing(4),
    // marginTop: theme.spacing(4),
  },
  video: {
    height: '40vh',
    width: '100%'
  },
  cardContent: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: 'inherit'
  },
}));

export default function IoTInfo() {
  const classes = useStyles();

  // const [alerts, setAlerts] = useState(null);
  const [firemenInfo, setFiremenInfo] = useState(null);
  // Initialize with listening to our
  // messages collection. The second argument
  // with the empty array makes sure the
  // function only executes once
  useEffect(() => {
    // listenForAlerts();
    listenForFiremenInfo();
  }, []);


  // Use firestore to listen for changes within
  // our newly created collection
  // const listenForAlerts = () => {
  //   firebase.firestore().collection('firemen_IoT')
  //     .onSnapshot((snapshot) => {
  //       // Loop through the snapshot and collect
  //       // the necessary info we need. Then push
  //       // it into our array
  //       const allAlerts = [];
  //       snapshot.forEach((doc) => allAlerts.push(doc.data()));

  //       // Set the collected array as our state
  //       setAlerts(allAlerts);
  //     }, (error) => console.error(error));
  // };

  const listenForFiremenInfo = () => {
    firebase.firestore().collection('firemen')
      .onSnapshot((snapshot) => {
        // Loop through the snapshot and collect
        // the necessary info we need. Then push
        // it into our array
        const allFiremen = [];
        snapshot.forEach((doc) => allFiremen.push(doc.data()));

        // Set the collected array as our state
        setFiremenInfo(allFiremen);
      }, (error) => console.error(error));
  };

  // if (!alerts) {
  //   return (
  //     <div>
  //       Loading...
  //     </div>
  //   )
  // }
  if (!firemenInfo) {
    return (
      <div>
        Loading...
      </div>
    )
  }
  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Link to={'/mission'} className={classes.link}>
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
            Mission Command Center
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <FlowBar type="3" />
          <Grid container spacing={6}>
            {firemenInfo.map(({ name, link, id, filter }, index) => (
              <Grid item key={index} xs={4}>
                <Card className={classes.card}>
                  <Card className={classes.video}>
                    <YouTube video={link} autoplay height="100%" width="100%" 
                    muted controls={false} annotations={false} showRelatedVideos={false} 
                    modestBranding={true} showInfo={false}/>
                  </Card>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="h3">
                      <b>{name}</b>
                    </Typography>
                    <Typography>
                      {filter}
                    </Typography>

                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
