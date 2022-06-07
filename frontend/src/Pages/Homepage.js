import React, { Fragment, useState, useEffect } from 'react';

const App = () => {
    useEffect(() => {
        const getAPI = () => {
            // Change this endpoint to whatever local or online address you have
            // Local PostgreSQL Database
            const API = 'http://127.0.0.1:5000/teams';

            
            fetch(API)
                .then((response) => {
                    console.log(response);
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    setApiData(data);
                });
        };
        getAPI();
    }, []);
    const [apiData, setApiData] = useState('');
    console.log(apiData)

    return (
        <Fragment>
            <header>
                <h1>Football Data</h1>
                <h2>Put some propoganda here...</h2>
            </header>
        </Fragment>
    );
};

export default App;