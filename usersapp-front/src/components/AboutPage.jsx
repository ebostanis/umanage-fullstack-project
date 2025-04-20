import { Container, Box, Typography } from '@mui/material';
import React from 'react';
import gitLogo from '../asseets/gitlogo.png'

const AboutPage = () => {

    const animationStyle = {
        animation: 'dropDown 0.8s ease forwards',
        opacity: 0,
        '@keyframes dropDown': {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        }
      }

  return (
    <Container maxWidth="lg">
        <Box
          sx={{
            ...animationStyle,
            textAlign: 'center',
            marginTop: '5rem',
            padding: '2rem',
            background: 'linear-gradient(dimgrey, #1d1d1d)',
            color: 'white',
            borderRadius: 5,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'}}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              marginBottom: '1rem',
              color: '#f7d047'}}>
            About the UManage App
          </Typography>
          <Typography
            variant="h6"
            sx={{
              marginBottom: '2rem',}}>
            This web application was developed as part of a hands-on 
            project to demonstrate core skills in full-stack web development
            using modern Java, JavaEE and JavaScript technologies.
          </Typography>
          <Typography
            variant="h6"
            sx={{
              marginBottom: '2rem',}}>
            Key feature of this app is user data submission, storage and retrieval.
            The backend was developed with Java and Spring Boot with emphasis on
            the best practices for database design and RESTful API implementation, 
            while for the frontend, React was used to build a clean and responsive 
            interface.
          </Typography>
          <Typography
            variant="h6"
            sx={{
              marginBottom: '2rem',}}>
            For more information about the project, including the source 
            code and full documentation check here:
          </Typography>
          <a href="https://github.com/ebostanis">
          <img src={gitLogo} alt="gitlogo" style={{width: '100px', height: '40px'}}/>
          </a>
        </Box>
    </Container>
  )
}

export default AboutPage