import React, { useState, useEffect } from 'react';
import axios from "axios";
import LeagueSelect from '../components/leagueSelect';
import SeasonSelect from '../components/seasonSelect';
import PageLinks from '../components/pageMenu';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import { Divider } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

const ResultsTablePage = () => {
    const [resultData, setResultData] = useState([]);
    const [isLoading, setLoading] = useState(true); 
    const [season, setSeason] = useState(2008);
    const [league, setLeague] = useState(1729);  
    const [team, setTeam] = useState('');
  
    const startTeams = [
        'Arsenal',
        'Aston Villa',
        'Blackburn Rovers',
        'Bolton Wanderers',
        'Chelsea',
        'Everton',
        'Fulham',
        'Hull City',
        'Liverpool',
        'Manchester City',
        'Manchester United',
        'Middlesbrough',
        'Newcastle United',
        'Portsmouth',
        'Stoke City',
        'Sunderland',
        'Tottenham Hotspur',
        'West Bromwich Albion',
        'West Ham United',
        'Wigan Athletic',
    ]
    const [teams, setTeams] = useState(startTeams);

    // const columns = [
    //     {
    //     field: 'date',
    //     headerName: 'Date',
    //     type: 'number',
    //     width: 50,
    //     },
    //     {
    //     field: 'hometeam',
    //     headerName: 'Home Team',
    //     type: 'string',
    //     width: 80,
    //     },
    //     {
    //     field: 'home_goal',
    //     headerName: 'HG',
    //     type: 'number',
    //     width: 50,
    //     },
    //     {
    //     field: 'away_goal',
    //     headerName: 'AG',
    //     type: 'number',
    //     width: 50,
    //     },
    //     {
    //     field: 'awayteam',
    //     headerName: 'Away Team',
    //     type: 'string',
    //     width: 80,
    //     },
    // ];  
        
    const baseURL = (league, season) =>
    `http://127.0.0.1:5000/result_table/${league}/${season}`

    useEffect(() => {
        const fetchTeams = async () => {
        const response = await axios.get(baseURL(league,season))
        fixtureList(response.data.teams)
        // setResultData(fixtureList(response.data.teams)) 
        setResultData(response.data.teams)
        const newTeams = [...new Set(response.data.teams.map(item => item.hometeam))]
        setTeams(newTeams)
        setLoading(false)
        setTeam('')
        };
        fetchTeams()
    },[league,season]);
        

    useEffect(() => {
        const filterTeams = async () => {
        const response = await axios.get(baseURL(league,season))
        const teamResults = response.data.teams
        const selectedTeam = teamResults.filter(teamResults =>
            teamResults.hometeam.includes(team) || teamResults.awayteam.includes(team));
        setResultData(selectedTeam)
        };
        filterTeams()
    },[team]);

    const handleChange = (event) => {
        setTeam(event.target.value);    
    };
    
    const resetFilters = () => {
        const fetchTeams = async () => {
        const response = await axios.get(baseURL(league,season))      
        setResultData(response.data.teams)
        setLoading(false)
        setTeam('')
        };
        fetchTeams();
    }

    const fixtureList = (resultData) => {
        const fixture = resultData.reduce(function (r, a) {
        r[a.date] = r[a.date] || [];
        r[a.date].push(a);
        return r;
    }, Object.create(null));
    console.log('here....',fixture)
    console.log(resultData)
    }

    if (isLoading) {
        return <div className="App">Loading...</div>
    }

    return (
        <Box sx={{ m:4 }}>        
        <header>
            <h1>Football Results</h1>
        </header>
        <br></br>
        <PageLinks/>
        <br/>
        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
        <LeagueSelect
        leaguePicked={(num) =>
        setLeague(num)}
        />
        <SeasonSelect
        seasonPicked={(num) =>
        setSeason(num)}
        />
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Team</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={team}
                    defaultValue=''
                    label="Team"
                    onChange={handleChange}
                >
                    {teams.map(item => {
                    return (
                    <MenuItem value={item}>{item}</MenuItem>
                    )})}
                </Select>
            </FormControl>
        </Box> 
        <Button value='' onClick={resetFilters}>Clear Team</Button>
        </Stack>        
        <br></br> 
        <div>
        {resultData.map((item, index) => (
            <div key={index}>
                <h3>{item.date}</h3>
                {item.fixtures.map((c, i) => (
                <div key={i}>
                    <h3>{c.hometeam}</h3>
                    <h3>{c.awayteam}</h3>
                    <hr />
                </div>
                ))}
            </div>
            ))}        
        </div>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" size='small'>
            <TableHead>
            {resultData.map((row) => (
                <TableRow>
                <TableCell align="left">{row.date}</TableCell>            
                </TableRow>))}
            </TableHead>
            <TableBody>
            {resultData.map((row) => (
                <TableRow>
                <TableCell align="right">{row.hometeam}</TableCell>
                <TableCell component="th" scope="row">{row.home_goal}</TableCell>
                <TableCell align="right">{row.away_goal}</TableCell>
                <TableCell align="left">{row.awayteam}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </Box>
    );
    }

export default ResultsTablePage;
