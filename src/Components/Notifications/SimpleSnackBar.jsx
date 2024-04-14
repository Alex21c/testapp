import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';



export default function SimpleSnackbar({open, setOpen}) {


  // const [open, setOpen] = React.useState(false);



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>

      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  return (
    <div>
      {/* <Button onClick={()=>{openTheSnackBar(setOpen)}}>Open Snackbar</Button> */}
      <Snackbar  open={open} onClose={handleClose} autoHideDuration={5000}   anchorOrigin={{vertical: 'top', horizontal:'right'}}>
        <Alert
       
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      
      >
        Product Successfully added into Yours Shopping Cart!
      </Alert>      
      </Snackbar>
        


      
    </div>
  );
}

export function useSetInitialStateSnackbar(){
  const [open, setOpen] = React.useState(false);
  return  [open, setOpen];
}
export function openTheSnackBar(setOpen){
  setOpen(true);
};