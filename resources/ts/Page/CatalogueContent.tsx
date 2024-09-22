import React, { useEffect, useState } from 'react';
import CardContainer from '../Component/CardsContainer';
import Header from '../Component/Header';
import axios from 'axios';

const CatalogueContent = () => {
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/contents');
                setContents(response.data);
            } catch (err) {
                setError("Error happened while fetching response.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Header />
            <CardContainer loading={loading} error={error} items={contents} />
        </>
    );
}

export default CatalogueContent;