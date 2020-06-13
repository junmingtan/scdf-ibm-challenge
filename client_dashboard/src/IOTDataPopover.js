import React from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Typography from '@material-ui/core/Typography';
import IOTDataChart from './IOTDataChart';

export default function IOTDataPopover(props){
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <VisibilityIcon {...bindTrigger(popupState)}>
            Open Popover
          </VisibilityIcon>
          <Popover
            anchorReference="anchorPosition"
            anchorPosition={{ top: 50, left: 300 }}
            {...bindPopover(popupState)}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <IOTDataChart deviceId={props.deviceId}/>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
