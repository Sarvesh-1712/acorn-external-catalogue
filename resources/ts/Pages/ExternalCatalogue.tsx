import React from 'react';
import { Inertia } from '@inertiajs/inertia';

const ExternalCatalogue = () => {
    return (
        <div>
            <h1>External Catalogue Page -- HOME</h1>
            <button onClick={() => Inertia.visit('/')}>Goto Home</button>
        </div>
    );
};

export default ExternalCatalogue;