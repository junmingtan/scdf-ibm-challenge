import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import PhoneForwardedIcon from '@material-ui/icons/PhoneForwarded';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import PostAddIcon from '@material-ui/icons/PostAdd';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    color: 'inherit'
  },
}));

const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 22,
    },
    active: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    completed: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
  })(StepConnector);
  
  const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: '#ccc',
      zIndex: 1,
      color: '#fff',
      width: 50,
      height: 50,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
    link: {
      textDecoration: "none",
      color: 'inherit'
    },
  });
  
  function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;
  
    const icons = {
      1: <NotificationImportantIcon />,
      2: <SupervisorAccountIcon />,
      3: <WhatshotIcon/>,
      4: <PostAddIcon/>
    };
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }
  
  
  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };
  
  function getSteps() {
    return ['Emergency Triggered', 'myResponders', 'Mission', 'Post Accident'];
  }

  export default function FireHome(props) {
    const steps = getSteps();
    const classes = useStyles();
    return(
    <Stepper alternativeLabel activeStep={props.type} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>   
            <StepLabel StepIconComponent={ColorlibStepIcon}>

            <Link to={'/' + label.split(" ")[0]} className={classes.link}>{label}
            </Link>
            </StepLabel>
            
          </Step>
        ))}
      </Stepper>
    )
  }