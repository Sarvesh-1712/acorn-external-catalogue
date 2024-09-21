import React from 'react';
import ReactDOM from 'react-dom/client';
import AcornHome from './Page/AcornHome';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CatalogueContent from './Page/CatalogueContent';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AcornHome />} />
                <Route path="/catalogue" element={<CatalogueContent />} />
            </Routes>
        </Router>
    );
};

const app = document.getElementById('app');
if (app) {
    const root = ReactDOM.createRoot(app);
    root.render(<App />);
}
