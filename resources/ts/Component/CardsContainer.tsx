import React from 'react';
import { Item } from '../Model/Content';
import Grid from '@mui/material/Grid2';
import { Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CardItem from './CardItem';

const useStyles = makeStyles((_) => ({
    emptyContentContainer: {
        padding: '20px', 
        textAlign: 'center'
    }
}));

const EmptyContent = () => {
    const classes = useStyles();
    return (
        <Paper elevation={1} className={classes.emptyContentContainer}>
            <Typography variant="h6" color="text.secondary">
                No Data Found
            </Typography>
        </Paper>
    );
};

const CardsContainer: React.FC<{ loading: boolean, error: string, items: Item[] }> = ({ loading, error, items }) => {
    if (loading) {
        return <Typography variant="subtitle1" color="text.secondary">Loading contents. Please wait...</Typography>; 
    }
    if (error) {
        return <Typography variant="subtitle1" color="text.secondary">{error}</Typography>; 
    }
    if (items.length == 0) {
        return <EmptyContent />;
    }

    return (
        <Grid container spacing={2} sx={{ width: '60%', margin: '0 auto'}}>
            {items.map(item => (
                <Paper key={item.contentid} id={item.contentid} elevation={1} style={{height: '100%'}}>
                    <CardItem item={item} />
                </Paper>
            ))}
        </Grid>
    )
}

export default CardsContainer;