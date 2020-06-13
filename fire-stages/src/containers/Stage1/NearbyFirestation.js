import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TablePagination from '@material-ui/core/TablePagination';
import Title from '../common/Title';

import { firebase, config } from '../../config/firebase';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(2), 
  },
}));

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

export default function AlertInfo() {
  const classes = useStyles();

  const [alerts, setFirestation] = useState(null);
  // Initialize with listening to our
    // messages collection. The second argument
    // with the empty array makes sure the
    // function only executes once
    useEffect(() => {
      listenForFirestation();
  }, []);


  // Use firestore to listen for changes within
  // our newly created collection
  const listenForFirestation = () => {
      firebase.firestore().collection('stage3_locations')
          .onSnapshot((snapshot) => {
              // Loop through the snapshot and collect
              // the necessary info we need. Then push
              // it into our array
              const allFirestation = [];
              snapshot.forEach((doc) => allFirestation.push(doc.data()));
              
              let fireLat, fireLng;
              for (let i = 0; i < allFirestation.length; ++i) {
                if (allFirestation[i].type === 'fire') {
                  fireLat = allFirestation[i].lat;
                  fireLng = allFirestation[i].lng;
                }
              }
              
              let nearbyFirestations = []
              for (let i = 0; i < allFirestation.length; ++i) {
                if (allFirestation[i].type == 'firestation') {
                  allFirestation[i].distance = getDistanceFromLatLonInKm(allFirestation[i].lat, allFirestation[i].lng, fireLat, fireLng).toFixed(2);
                  nearbyFirestations.push(allFirestation[i]);
                }
              }
              
              // Set the collected array as our state
              setFirestation(nearbyFirestations);
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
      <Title>Firestations Activated</Title>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell align='center'>Distance / km</TableCell>
            <TableCell align='center'>Time to Arrival</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alerts.map(alert => (
            <TableRow>
              <TableCell>{alert.location}</TableCell>
              <TableCell align="center">{alert.distance}</TableCell>
              <TableCell align="center">{alert.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
