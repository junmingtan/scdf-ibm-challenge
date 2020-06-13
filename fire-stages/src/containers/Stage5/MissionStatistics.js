import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Title from '../common/Title';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import Container from '@material-ui/core/Container';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import { firebase, config } from '../../config/firebase';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(1),
  },
  buttonLink: {
    textDecoration: 'none',
  },
  buttonAlign: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 'auto',
    padding: theme.spacing(2),
    align: 'center'
  }, 
  containerAlign: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
  }
}));

export default function MissionStats() {
  const classes = useStyles();

  const [missionStats, setMissionStats] = useState(null);
  
  // Initialize with listening to our
    // messages collection. The second argument
    // with the empty array makes sure the
    // function only executes once
  useEffect(() => {
      getMissionStats();
  }, []);
  
  //var unsubscribe = firebase.firestore().collection('firefighting_assets').onSnapshot((snapshot) => {
  //  const firefightingAssets = [];
  //  snapshot.forEach((doc) => firefightingAssets.push(doc.data()));
  //  setFirefightingAssets(firefightingAssets);
  //});
  
  const getMissionStats = () => {
    firebase.firestore().collection('mission_stats').where(firebase.firestore.FieldPath.documentId(), "==", "berkeley_fire").get().then((snapshot) => {
      const firefightingAssets = [];
      snapshot.forEach((doc) => firefightingAssets.push(doc.data()));
      
      var items = Object.keys(firefightingAssets[0]).map(function(key) {
        return [key, firefightingAssets[0][key]];
      });
      
      items.sort(function(a, b) {
        if(a[0] < b[0]) { return -1; }
        if(a[0] > b[0]) { return 1; }
        return 0;
      });
      
      setMissionStats(items);
    });
  }
  
  console.log(missionStats);
  if (!missionStats) {
    return (
        <div>
            Loading...
      </div>
    )
  }
  return (
    <React.Fragment>
      <Container className={classes.containerAlign}>
        <Title>Fire Overview</Title>
        <Table size="small">
          <TableBody>
            {missionStats.map((stat) => (
              <TableRow>
                <TableCell scope="row">{stat[0]}</TableCell>
                <TableCell align='center'>{stat[1]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Grid container spacing={3} className={classes.buttonAlign}>
          <Grid item xs={12} md={5} lg={2} style={{marginRight:'150px'}}>
            <IconButton align="center">
              <VideoCallIcon fontSize="large"/>
            </IconButton>
            <Typography variant="overline" display="block" gutterBottom align="center">
              Videos
            </Typography>
          </Grid>
          <Grid item xs={12} md={5} lg={2}>
            <IconButton align="center">
              <LibraryBooksIcon fontSize="large"/>
            </IconButton>
            <Typography variant="overline" display="block" gutterBottom align="center">
              Logs
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
