import React from 'react';
import { Inertia } from '@inertiajs/inertia';

interface Content {
    fullname: string;
    summary: string;
    imageurl: string;
}

interface CatalogueProps {
    contents: Content[];
}

const ExternalCatalogue: React.FC<CatalogueProps> = ($contents) => {
    console.log($contents);

    return (
        <>
            <h1>External Catalogue Page -- HOME</h1>
            <button onClick={() => Inertia.visit('/')}>Goto Home</button>
        </>
    );
};

export default ExternalCatalogue;