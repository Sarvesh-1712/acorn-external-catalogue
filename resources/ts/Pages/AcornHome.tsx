import React from 'react';
import { Inertia } from '@inertiajs/inertia';

const AcornHome = () => {
    return (
        <div>
            <h1>Acorn External Catalogue system</h1>
            <button onClick={() => Inertia.visit('/external-catalogue')}>View External Catalogues</button>
        </div>
    );
};

export default AcornHome;