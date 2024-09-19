import { createRoot } from 'react-dom/client';
import Home from './components/Home';
import React from 'react';
const container = document.getElementById('app');
if (container != null) {
    const root = createRoot(container);
    root.render(<Home  />);
}
