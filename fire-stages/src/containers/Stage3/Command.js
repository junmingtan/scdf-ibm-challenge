import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Title from '../common/Title';

import firebase from '../../config/firebase';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2), 
    width: '90%',
    justifyContent: 'center'
  },
  link: {
    textDecoration: "none",
    color: 'inherit'
  },
}));

export default function Command() {
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
      firebase.firestore().collection('mission_alerts')
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
      <Title>Mission Command Center</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
          <TableCell align="center">Source</TableCell>
            <TableCell align="center">Tag</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alerts.map(alert => (
            <TableRow key={alert.id}>
              <TableCell align="center">{alert.source}</TableCell>
              <TableCell align="center">{alert.tag}</TableCell>
              <TableCell align="center">{alert.type}</TableCell>
              <TableCell align="center">{alert.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link to={'/mission/command'} className={classes.link}>
      <Button variant="contained" color="default" className={classes.button}>
        COMMAND CENTER
        </Button>
      </Link>
    </React.Fragment>
  );
}
