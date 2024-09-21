import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static" sx={{ backgroundColor: 'lightgrey', marginBottom: '10px' }}>
            <Toolbar>
                <img
                    src="/images/acorn-logo.png"
                    alt="Acorn Home"
                    title="Goto Home"
                    style={{ width: '150px', height: '50px' }} 
                    onClick={(() => navigate('/'))}
                />
            </Toolbar>
        </AppBar>
    );
};

export default Header;