import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import { mainListItems, secondaryListItems } from './listItems';
import { ChatFeed, Message } from 'react-chat-ui';
import { StaticGoogleMap, Marker } from 'react-static-google-map';
import AlertInfo from './AlertInfo';
import Map from './Map';
import { firebase, config } from './config/firebase';
import { getTime, getDate } from './Util.js'

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

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  alert: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }
}));


export default function DashboardItems() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const [alerts, setAlerts] = useState(null);
  
  useEffect(() => {
    listenForAlerts();
  }, []);


  // Use firestore to listen for changes within
  // our newly created collection
  const listenForAlerts = () => {
    firebase.firestore().collection('iot_updates')
        .onSnapshot((snapshot) => {
            // Loop through the snapshot and collect
            // the necessary info we need. Then push
            // it into our array
            const allAlerts = [];
            snapshot.forEach((doc) => allAlerts.push(doc.data()));
            
            const recentAlerts = [];
            let currentTime = new Date();
            
            let j = 0
            for (let i = 0; i < allAlerts.length; ++i) {
              var data = allAlerts[i];
              let t = new Date(1970, 0, 1); // Epoch
              t.setSeconds(data.timestamp.seconds);
              if (data.timestamp.seconds > currentTime.getTime()/1000 - 10) {
                // Adds only if is in the last 10 seconds
                recentAlerts.push(data)
                recentAlerts[j].time = getTime(t);
                recentAlerts[j].date = getDate(t);
                recentAlerts[j].t = t;
                j++;
              }
            }

            // Set the collected array as our state
            setAlerts(recentAlerts);
        }, (error) => console.error(error));
      };

  if (!alerts) {
    return (
      <div>
        Loading...
      </div>
    )
  }
  

  return (
    <main className={classes.content}>
      <Container maxWidth="lg" className={classes.container}>
        {alerts.map(alert => (
          <Alert className={classes.alert} severity="warning"
            action={
              <a href={"https://innoveng-8d787.web.app/" + alert.stage}>
                <Button color="inherit" size="small">
                  GO
                </Button>
              </a>
              
            }
          >
            New alert triggered - {alert.type} at {alert.location}!
          </Alert>
        ))}
        <Grid container spacing={3}>
          {/* left  - Map */}
          <Grid item xs={12} md={5} lg={6}>
            <Paper className={classes.paper}>
              <Map/>
            </Paper>
          </Grid>
          {/* right - List of emergencies */}
          <Grid item xs={12} md={5} lg={6}>
            <AlertInfo/>
          </Grid>
        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </main>
  );
}
