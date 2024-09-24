import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';

export default function SimpleSnackbar(props) {
  const{
    isOpen,
    autoHideDuration,
    message,
    handleClose
  } = props

 

  const action = (
    <React.Fragment>
      <Button color="success" size="small" onClick={handleClose}>
        Confirm
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <DoneIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={isOpen}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  )
}