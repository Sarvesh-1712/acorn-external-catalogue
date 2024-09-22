import React, { useState } from 'react';
import { Item } from '../Model/Content';
import DOMPurify from 'dompurify';
import {isHTML, hasImage, getFallbackImageUrl} from '../Util';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

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
    }
}));

const CardItem: React.FC<{ item: Item }> = ({ item }) => {
    const classes = useStyles();

    const [isExpanded, setIsExpanded] = useState(false);
    const {fullname, imageurl, summary, contenttype, duration, badgecolor} = item;

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

export default CardItem;