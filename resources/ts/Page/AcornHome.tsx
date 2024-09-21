import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '4',
        textAlign: 'center',
    },
}));


const AcornHome = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    return (
        <Box className={classes.container}>
            <Typography variant="h4" component="h1">
                Welcome to Acorn's External Catalogue System
            </Typography>
            <Button variant="contained" color="primary" onClick={(() => navigate('/catalogue'))}>
                View Catalogue
            </Button>
        </Box>    
    );
};

export default AcornHome;