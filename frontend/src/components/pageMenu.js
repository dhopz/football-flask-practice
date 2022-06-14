/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

const preventDefault = (event) => event.preventDefault();

const PageLinks = () => {
    const navigate = useNavigate();

    const navigateToTeams = () => {
        // 👇️ navigate to /
        navigate('/teams');
    }; 
    
    const navigateToLeagueTable = () => {
    // 👇️ navigate to /contacts
    navigate('/league_table');
    };

    const navigateToResults = () => {
        // 👇️ navigate to /
        navigate('/results');
    }; 

    const navigateToTableResults = () => {
        // 👇️ navigate to /
        navigate('/results');
    }; 

    return (
        <Box
        sx={{
            typography: 'body1',
            '& > :not(style) + :not(style)': {
            ml: 2,
            },
        }}
        onClick={preventDefault}
        >
        <Link onClick={navigateToLeagueTable} href="#">League Table</Link>
        <Link onClick={navigateToResults} href="results">Results</Link>
        <Link onClick={navigateToTeams} href="#">Teams</Link>
        <Link onClick={navigateToTableResults} href="#">Table Results</Link>
        </Box>
    );
}

export default PageLinks;
