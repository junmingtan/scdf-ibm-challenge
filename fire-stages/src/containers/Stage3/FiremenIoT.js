import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import FiremenAlerts from './FiremenAlerts';
import { Link } from 'react-router-dom';
import { Grid, Typography, Card, Box, makeStyles, CardContent } from "@material-ui/core";
import YouTube from '@u-wave/react-youtube';
// firebase API
import { firebase } from '../../config/firebase';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        511 Innovation Engineering
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 220;

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
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
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
  ioTPaper: {
    padding: theme.spacing(2),
    margin: theme.spacing(4, 2, 2, 2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '20vh'
  },
  firemenPaper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '60vh'
  },
  fixedHeight: {
    height: 240,
  },
  link: {
    textDecoration: "none",
    color: 'inherit'
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '85vh'
  },
  cardMedia: {
    height: '65vh',
    width: 'auto'
  },
  cardContent: {
    flexGrow: 1,
  },
  cardDiv: {
    height: '60vh'
  }
}));

export default function FiremenIoT(props) {
  const classes = useStyles();

  const [firemenInfo, setFiremenInfo] = useState(null);

  const { id } = props.match.params

  useEffect(() => {
    listenForFiremenInfo();
  }, []);

  const listenForFiremenInfo = () => {
    firebase.firestore().collection('firemen')
      .doc(id).get().then(function (doc) {
        if (doc.exists) {
          // console.log("Document data:", doc.data());
          console.log("Document data:", doc.data());
          setFiremenInfo(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          props.history.replace('/redirect');
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  if (firemenInfo == null) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Link to={'/'} className={classes.link}>
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
            Fire Mission - {firemenInfo.name}
          </Typography>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* left  - Map */}
            <Grid item xs={12} md={5} lg={6}>
              <Paper className={classes.paper}>
                  <img
                    className={classes.cardMedia}
                    src={firemenInfo.image}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="h3">
                      <b>{firemenInfo.name}</b>
                    </Typography>
                    <Typography>
                      Rank:
                  <span>&nbsp;</span>
                      {firemenInfo.rank}
                    </Typography>
                    <Typography>
                      Role:
                  <span>&nbsp;</span>
                      {firemenInfo.role}
                    </Typography>
                  </CardContent>
              </Paper>
            </Grid>
            <Grid item xs={12} md={5} lg={6}>
              {/* right  - mission details */}
              <Grid item xs={12}>
                <Paper className={classes.firemenPaper}>
                  <YouTube video="nlbLIpni9kc" autoplay height="100%"/>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.ioTPaper}>
                  <FiremenAlerts id={id}/>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
