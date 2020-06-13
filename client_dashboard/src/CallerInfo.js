import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function CallerInfo() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Patient Information</Title>
      <Typography color="textPrimary">
        Name: Alex H
      </Typography>
      <Typography>
        Contact No.: 510 123 4567
      </Typography>
      <Typography color="textPrimary" className={classes.depositContext}>
        Drug Allergies: Tetracycline
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View more details
        </Link>
      </div>
    </React.Fragment>
  );
}
