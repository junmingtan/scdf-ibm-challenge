import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Title from './Title';

import firebase from './config/firebase';
import IOTDataPopover from './IOTDataPopover';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(1),
  },
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(4)
  }
}));

export default function AlertInfo() {
  const classes = useStyles();

  const [allDevices, setDevices] = useState(null);
  // Initialize with listening to our
    // messages collection. The second argument
    // with the empty array makes sure the
    // function only executes once
    useEffect(() => {
      listenForNewDevices();
  }, []);


  // Use firestore to listen for changes within
  // our newly created collection
  const listenForNewDevices = () => {
      firebase.firestore().collection('iot_devices')
          .onSnapshot((snapshot) => {
              // Loop through the snapshot and collect
              // the necessary info we need. Then push
              // it into our array
              const allDevices = [];
              snapshot.forEach((doc) => {
                allDevices.push(doc.data())
              });

              // Set the collected array as our state
              setDevices(allDevices);
          }, (error) => console.error(error));
  };

  if (!allDevices) {
    return (
        <div>
            Loading...
      </div>
    )
  }

  return (
      <Container className={classes.container}>
        <React.Fragment>
          <Title>Active Alerts</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Device ID</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allDevices.map(device => (
                <TableRow key={device.id}>
                  <TableCell>{device.id}</TableCell>
                  <TableCell>{device.location}</TableCell>
                  <TableCell>{device.status}</TableCell>
                  <IOTDataPopover deviceId={device.id} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      </Container>
  );
}
