import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Title from './Title';

import { firebase, config } from './config/firebase';
import { getTime, getDate } from './Util.js'

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
}));

export default function AlertInfo() {
  const classes = useStyles();

  const [alerts, setAlerts] = useState(null);
  // Initialize with listening to our
    // messages collection. The second argument
    // with the empty array makes sure the
    // function only executes once
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

              for (let i = 0; i < allAlerts.length; ++i) {
                var t = new Date(1970, 0, 1); // Epoch
                t.setSeconds(allAlerts[i].timestamp.seconds);
                allAlerts[i].time = getTime(t);
                allAlerts[i].date = getDate(t);
                allAlerts[i].t = t;
              }

              allAlerts.sort(function(a, b) {
                if (a.t > b.t) return -1;
                if (a.t < b.t) return 1;
                return 0;
              });

              // Set the collected array as our state
              setAlerts(allAlerts);
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
    <React.Fragment>
      <Title>Active Alerts</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Emergency Type</TableCell>
            <TableCell>Stage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alerts.map(alert => (
            <TableRow button className={classes.buttonLink} component="a" href={config["secLink"] + alert.stage}>
              <TableCell>{alert.date}</TableCell>
              <TableCell>{alert.time}</TableCell>
              <TableCell>{alert.location}</TableCell>
              <TableCell align="center">{alert.type}</TableCell>
              <TableCell align="center">{alert.stage.charAt(0).toUpperCase() + alert.stage.slice(1)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
