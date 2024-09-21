import React from 'react';
import { Content } from '../Model/Content';

interface CatalogueProps {
    content: Content;
}

const EmptyContent = () => {
        return (
        <div style={{backgroundColor: "red"}}>
            <h1>No items to render</h1>
        </div>
        )
}

const ExternalCatalogue: React.FC<CatalogueProps> = ({content}) => {
    
    if (content.status != "Complete") {
        throw new Error('Failed to retrieve catalogue contents');
    }

    if (content.data == null || content.data.items.length == 0) {
        return <EmptyContent />
    }

    //TODO: return the actual card content
};

export default ExternalCatalogue;