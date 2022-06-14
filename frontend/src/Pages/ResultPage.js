import React, { useState, useEffect } from 'react';
import axios from "axios";
import LeagueSelect from '../components/leagueSelect';
import SeasonSelect from '../components/seasonSelect';
import PageLinks from '../components/pageMenu';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Card } from '@mui/material';
import { Typography } from '@mui/material';
import { CardContent } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { Divider } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ResultPage = () => {
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

  const baseURL = (league, season) =>
  `http://127.0.0.1:5000/results/${league}/${season}`


  useEffect(() => {
    const fetchTeams = async () => {
      const response = await axios.get(baseURL(league,season))
      setResultData(response.data.teams) 
      const newTeams = [...new Set(response.data.teams.map(item => item.hometeam))]
      console.log('here...')
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
    <br></br>
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
    <Grid container spacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justify="space-evenly">        
    {resultData.map(item => {
    return (
        <Grid item xs={4}>
            <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {item.date}
                </Typography>
                <Typography variant="h5" component="div">
                {item.hometeam} {item.home_goal}
                </Typography>
                <Typography color="text.secondary">
                vs
                </Typography>
                <Typography variant="h5" component="div">
                {item.awayteam} {item.away_goal}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Match Results</Button>
            </CardActions>
            </Card>
            </Grid>
    )})}
    </Grid>
    </Box>
  );
}

export default ResultPage;
