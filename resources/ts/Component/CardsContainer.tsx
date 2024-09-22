import React, { useState } from 'react';
import { Item } from '../Model/Content';
import Grid from '@mui/material/Grid2';
import { Button, Card, CardContent, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import DOMPurify from 'dompurify';
import {isHTML, hasImage, getFallbackImageUrl} from '../Util';

const MAX_SUMMARY_LENGTH = 150;

const useStyles = makeStyles((_) => ({
    cardContainer: {
        width: '400px', 
        objectFit:'contain',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    imageContainer: {
        maxWidth: '400px',
        maxHeight: '400px', 
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
        width: 'auto',
        height: 'auto',
        display: 'block',
    },
    summaryImage: {
        width: '100%',
        height: '100%',
        objectFit:'cover',
    },
    contentTypeContainer: {
        padding: '2px 4px',
        display: 'inline-block',
        width: '100%',
    },
    emptyContentContainer: {
        padding: '20px', 
        textAlign: 'center'
    }
}));

const CardItem: React.FC<{ item: Item }> = ({ item }) => {
    const classes = useStyles();

    const [isExpanded, setIsExpanded] = useState(false);
    const {fullname, imageurl, summary, contenttype, duration, badgecolor} = item;

    // render the html summary 
    const RenderHTMLSummary = () => (
        <>
            <Typography component="div" variant="subtitle2" color="text.secondary" dangerouslySetInnerHTML={{ __html: alteredDisplaySummary }} />
            {displayedSummary.length > MAX_SUMMARY_LENGTH && (
                <Button onClick={() => {setIsExpanded(!isExpanded)}}>
                    {isExpanded ? 'Show Less' : 'Show More'}
                </Button>
            )}
        </>
    );

    // render the text summary 
    const RenderTextSummary = () => (
        <Typography variant="caption" color="text.secondary">
            {summary}
            {summary.length > MAX_SUMMARY_LENGTH && (
                <Button onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? 'Show Less' : 'Show More'}
                </Button>
            )}
        </Typography>
    )

    // purify the html contents before rendering
    const santiziedSummary = DOMPurify.sanitize(summary);
    
    const displayedSummary = isExpanded
                                ? santiziedSummary 
                                : summary.length > MAX_SUMMARY_LENGTH 
                                    ? (santiziedSummary.slice(0, MAX_SUMMARY_LENGTH) + '...') 
                                    :  santiziedSummary;

    // NOTE: if image inside the summary is not accessible, it will be hidden to avoid showing broken image
    const alteredDisplaySummary = hasImage(displayedSummary)
                                    ? displayedSummary.replace(
                                        /<img\s([^>]*)\/?>/g,
                                        `<img onerror="this.onerror=null; this.style.display='none';" class=${classes.summaryImage}" $1 />`
                                    )
                                    : displayedSummary;

    return (
        <Card className={classes.cardContainer}>
            <Typography className={classes.contentTypeContainer} style={{backgroundColor: badgecolor || 'grey'}}>{contenttype}</Typography>
            <div className={classes.imageContainer}>
                <img 
                    className={classes.image}
                    src={imageurl || getFallbackImageUrl()}
                    alt={fullname}
                    onClick={(() => alert(`you have selected: ${contenttype}`))} />
            </div>
            <CardContent> 
                <Typography variant="h6">{fullname}</Typography>
                <div style={{overflow: 'auto'}}>
                    {isHTML(summary) ? (
                        <RenderHTMLSummary />
                    ) : (
                        <RenderTextSummary />
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

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
        return  <Typography variant="subtitle1" color="text.secondary">Loading contents. Please wait...</Typography>; 
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
                <Paper key={item.contentid} elevation={1} style={{height: '100%'}}>
                    <CardItem item={item} />
                </Paper>
            ))}
        </Grid>
    )
}

export default CardsContainer;