import React from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default function CustomPopover(){
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <NotificationsIcon {...bindTrigger(popupState)}>
            Open Popover
          </NotificationsIcon>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box p={4}>
              <Typography>No new updates.</Typography>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
