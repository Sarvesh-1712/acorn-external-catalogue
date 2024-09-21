import React, { useState } from 'react';
import { getContentTypeBgColor, Item } from '../Model/Content';
import Grid from '@mui/material/Grid2';
import { Button, Card, CardContent, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import DOMPurify from 'dompurify';

const MAX_SUMMARY_LENGTH = 100;

const useStyles = makeStyles((_) => ({
    cardContainer: {
        width: '400px', 
        objectFit:'contain',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    imageContainer: {
        maxWidth: '100%',
        maxHeight: '100%', 
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
    }
}));

const CardItem: React.FC<{ item: Item }> = ({ item }) => {
    const classes = useStyles();

    const [isExpanded, setIsExpanded] = useState(false);
    const {fullname, imageurl, summary, contenttype} = item;

    const isHTML = (text: string) => {
        const doc = new DOMParser().parseFromString(text, 'text/html');
        return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
    };

    const hasImage = (text: string): boolean => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        return doc.querySelectorAll('img').length > 0;
    };

    // render the html summary 
    const RenderHTMLSummary = () => (
        <>
            <Typography variant="subtitle2" color="text.secondary" dangerouslySetInnerHTML={{ __html: alteredDisplaySummary }} />
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

    const displayedSummary = isExpanded ?  santiziedSummary : summary.length > MAX_SUMMARY_LENGTH ? (santiziedSummary.slice(0, MAX_SUMMARY_LENGTH) + '...') :  santiziedSummary;

    // if image found in summary, alter the size of image for smoother display purposes
    const alteredDisplaySummary =  hasImage(displayedSummary) ? displayedSummary.replace(/<img /g, '<img class="' + classes.summaryImage + '"') : displayedSummary;

    const imageUrl = imageurl || '/images/acorn-logo.png';

    return (
        <Card className={classes.cardContainer}>
            <Typography className={classes.contentTypeContainer} style={{backgroundColor: getContentTypeBgColor(contenttype)}}>{contenttype}</Typography>
            <div className={classes.imageContainer}>
                <img 
                    className={classes.image}
                    src={imageUrl}
                    alt={fullname} />
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

const EmptyContent = () => (
    <Paper elevation={1} style={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
            No Data Found
        </Typography>
    </Paper>
);

const CardContainer: React.FC<{ loading: boolean, error: string, items: Item[] }> = ({ loading, error, items }) => {
    if (loading) {
        return  <Typography variant="h6" color="text.secondary">Loading contents... Please wait...</Typography>; 
    }

    if (error) {
        return <Typography variant="h6" color="text.secondary">{error}</Typography>; 
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

export default CardContainer;