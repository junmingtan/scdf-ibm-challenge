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

export default function MissionStats() {
  const classes = useStyles();

  
  const [firefightingAssets, setFirefightingAssets] = useState(null);
  // Initialize with listening to our
    // messages collection. The second argument
    // with the empty array makes sure the
    // function only executes once
  useEffect(() => {
      getFirefightingAssets();
  }, []);

  
  //var unsubscribe = firebase.firestore().collection('firefighting_assets').onSnapshot((snapshot) => {
  //  const firefightingAssets = [];
  //  snapshot.forEach((doc) => firefightingAssets.push(doc.data()));
  //  setFirefightingAssets(firefightingAssets);
  //});
  
  const getFirefightingAssets = () => {
    firebase.firestore().collection('assets_used').where(firebase.firestore.FieldPath.documentId(), "==", "berkeley_fire").get().then((snapshot) => {
      const firefightingAssets = [];
      snapshot.forEach((doc) => firefightingAssets.push(doc.data()));
      
      const assetsDict = firefightingAssets[0];
      delete assetsDict['timestamp']
      setFirefightingAssets(assetsDict);
    });
  }
 
  
  if (!firefightingAssets) {
    return (
        <div>
            Loading...
      </div>
    )
  }
  
  return (
    <React.Fragment>
      <Title>Assets Deployed</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Asset</TableCell>
            <TableCell align='center'>Number deployed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { Object.keys(firefightingAssets).map((key) => (
            <TableRow>
              <TableCell scope="row">{key}</TableCell>
              <TableCell align='center'>{firefightingAssets[key]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
