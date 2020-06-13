import React, { useState, useEffect } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Map from '../common/Map';
import FlowBar from '../common/Flow';
import AppBar from '../common/AppBar';
import Copyright from '../common/Copyright';
import Assets from './Assets';
// firebase API
import { firebase } from '../../config/firebase';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    height: '74vh'
  },
  firemenPaper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '74vh'
  },
  fixedHeight: {
    height: 200,
  },
}));

export default function Situation() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar name="Notify Fire Station"/>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <FlowBar type= "2"/>
        {/* TODO - Write your code here! */}
          <Grid container spacing={3}>
            {/* left  - Map */}
            <Grid item xs={10} md={2} lg={6}>
              <Paper className={classes.paper}>
                <img src={require("./firestation.png")} height="100%"/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={5} lg={6}>
              {/* right  - mission details */}
              <Grid item xs={12}>
                <Paper className={classes.firemenPaper}>
                  <Assets/>
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
