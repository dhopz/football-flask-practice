import React from 'react';
import PageLinks from '../components/pageMenu';
import Box from '@mui/material/Box';

const App = () => {
    return (
        <Box sx={{ m:4 }}>        
            <header>
                <h1>Football Data</h1>
                <br/>
                <h2>Put some propoganda here...</h2>
            </header>
            <br/>
            <PageLinks/>      
        </Box>
    );
};

export default App;