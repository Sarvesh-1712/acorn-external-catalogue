import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '4',
        textAlign: 'center',
    },
    button: {
        marginTop: '6px !important'
    }
}));


const AcornHome = () => {
    const classes = useStyles();
    return (
        <>
            <Box className={classes.container}>
                <Typography variant="h4" component="h1">
                    Welcome to Acorn's External Catalogue System
                </Typography>
                <Button className={classes.button} variant="contained" color="primary" onClick={(() => Inertia.visit('/external-catalogue'))}>
                    View Catalogues
                </Button>
            </Box>
        </>
    );
};

export default AcornHome;