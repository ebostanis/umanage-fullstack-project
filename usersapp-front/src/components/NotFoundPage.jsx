import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';


const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        textAlign: 'center',
        paddingTop: '4rem',
        paddingBottom: '4rem',
      }}
    >
      <Typography variant="h2" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! Such Empty.
      </Typography>
      <Typography variant="body1">
        It seems the page you are trying to access is not available or you have typed the wrong URL.
      </Typography>
      <Button variant="contained" onClick={handleGoHome} 
            sx={{backgroundColor: 'dimgrey'}}>
        Go Back to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;