import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
  buttonLink: {
    textDecoration: 'none',
  },
}));

export default function FireInfo() {
  const classes = useStyles();

  const [alerts, setFireInfo] = useState(null);
  // Initialize with listening to our
    // messages collection. The second argument
    // with the empty array makes sure the
    // function only executes once
    useEffect(() => {
      listenForFireInfo();
  }, []);


  // Use firestore to listen for changes within
  // our newly created collection
  const listenForFireInfo = () => {
      firebase.firestore().collection('FireInfo')
          .onSnapshot((snapshot) => {
              // Loop through the snapshot and collect
              // the necessary info we need. Then push
              // it into our array
              const allFireInfo = [];
              snapshot.forEach((doc) => allFireInfo.push(doc.data()));
              
              allFireInfo.sort(function(a, b) {
                if (a.row < b.row) return -1;
                if (a.row > b.row) return 1;
                return 0;
              });
              
              // Set the collected array as our state
              setFireInfo(allFireInfo);
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
      <Title>Fire Overview</Title>
      <Table size="small">
        <TableBody>
          {alerts.map(alert => (
            <TableRow>
              <TableCell scope="row">{alert.name}</TableCell>
              <TableCell align='center'>{alert.val}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
