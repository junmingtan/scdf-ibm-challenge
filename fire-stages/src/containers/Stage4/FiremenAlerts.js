import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../common/Title';

import firebase from '../../config/firebase';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(1),
  },
}));

export default function FiremenAlerts(props) {
  const classes = useStyles();

  const [alerts, setAlerts] = useState(null);
  // Initialize with listening to our
    // messages collection. The second argument
    // with the empty array makes sure the
    // function only executes once
    useEffect(() => {
      listenForAlerts();
  }, []);

  console.log(props.id);


  // Use firestore to listen for changes within
  // our newly created collection
  const listenForAlerts = () => {
    firebase.firestore().collection('firemen_IoT')
      .doc(props.id).get().then(function (doc) {
        if (doc.exists) {
          // console.log("Document data:", doc.data());
          console.log("Document data:", doc.data());
          setAlerts(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
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
      <Title>Firemen Data</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
          <TableCell align="center">Temperature</TableCell>
            <TableCell align="center">Heart Rate</TableCell>
            <TableCell align="center">Fatigue</TableCell>
            <TableCell align="center">Task</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow key={alerts.id}>
              <TableCell align="center">{alerts.temperature}</TableCell>
              <TableCell align="center">{alerts.heartrate}</TableCell>
              <TableCell align="center">{alerts.fatigue}</TableCell>
              <TableCell align="center">{alerts.task}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
