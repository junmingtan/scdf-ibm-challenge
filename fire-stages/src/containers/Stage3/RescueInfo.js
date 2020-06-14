import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../common/Title';

import firebase from '../../config/firebase';

// const useStyles = makeStyles(theme => ({
//   seeMore: {
//     marginTop: theme.spacing(1),
//   },
// }));

export default function RescueInfo() {
  // const classes = useStyles();

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
      firebase.firestore().collection('rescue')
          .onSnapshot((snapshot) => {
              // Loop through the snapshot and collect
              // the necessary info we need. Then push
              // it into our array
              const allAlerts = [];
              snapshot.forEach((doc) => allAlerts.push(doc.data()));

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
      <Title>Map Information</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
          <TableCell align="center">Label</TableCell>
            <TableCell align="center">Role</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Remarks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alerts.map(alert => (
            <TableRow key={alert.label}>
              <TableCell align="center">{alert.label}</TableCell>
              <TableCell align="center">{alert.role}</TableCell>
              <TableCell align="center">{alert.status}</TableCell>
              <TableCell align="center">{alert.remarks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
