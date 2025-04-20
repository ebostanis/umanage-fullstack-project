import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import Background from './asseets/back-image.jpeg'
import { Contact, UserRoundPlus } from 'lucide-react';

const Home = () => {

  
  const animationStyle = {
    animation: 'dropDown 0.8s ease forwards',
    opacity: 0,
    '@keyframes dropDown': {
      '0%': { transform: 'translateY(-20px)', opacity: 0 },
      '100%': { transform: 'translateY(0)', opacity: 1 },
    }
  }

  return (
<Box sx={{ minHeight: '100vh', 
           backgroundColor: "white", 
           padding: '2rem 0', 
           backgroundImage: `url(${Background})`,
           backgroundPosition: 'center', 
           backgroundSize: 'cover', 
           backgroundBlendMode: 'luminosity'}}>
      <Container maxWidth="lg">
        <Box
          sx={{
            ...animationStyle,
            textAlign: 'center',
            marginBottom: '3rem',
            padding: '2rem',
            background: 'linear-gradient(dimgrey, #1d1d1d)',
            color: 'white',
            borderRadius: 5,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',}}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              marginBottom: '1rem',
              color: '#f7d047'}}>
            Welcome to the UManage App
          </Typography>
          <Typography
            variant="h6"
            sx={{
              marginBottom: '2rem',}}>
            A simple(for now) web app that helps you register and manage users.
          </Typography>
        </Box>

        <Grid container spacing={10} sx={{ marginTop: '10rem', 
                                      display: 'flex', 
                                      justifyContent: 'center' }}>
          <Grid item xs={12} md={4} sx={{textAlign: 'center'}}>
            <Card sx={{ ...animationStyle, 
                      boxShadow: 3, 
                      borderRadius: 5, 
                      height: '100%', 
                      background: 'linear-gradient(ghostwhite, #f7d047)'}}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: '1rem', color: '#1d1d1d'}}>
                  Add User
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '1rem', color: 'black'}}>
                  Enter user details
                </Typography>
                <Link class="nav-link" to={"/add-user"}>
                  <Button
                    variant='contained' 
                    center
                    sx={{
                      backgroundColor: '#1d1d1d',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'dimgrey',
                      }}}>
                    <UserRoundPlus/>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} sx={{textAlign: 'center'}}>
            <Card sx={{ ...animationStyle, 
                  boxShadow: 3, 
                  borderRadius: 5, 
                  height: '100%', 
                  background: 'linear-gradient(ghostwhite, #f7d047)' }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, 
                                          marginBottom: '1rem', 
                                          color: '#1d1d1d'}}>
                  View Users
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '1rem'}}>
                  Manage users and view user details
                </Typography>
                <Link class="nav-link" to={"/users"}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: '#1d1d1d',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'dimgrey',
                        }, justifyContent: 'space-evenly'}}>
                      <Contact/>
                    </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
    );
}
export default Home