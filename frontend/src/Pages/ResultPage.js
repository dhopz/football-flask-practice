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

const ResultPage = () => {
  const [resultData, setResultData] = useState([]);
  const [isLoading, setLoading] = useState(true); 
  const [season, setSeason] = useState(2008);
  const [league, setLeague] = useState(1729);

  const baseURL = (league, season) =>
  `http://127.0.0.1:5000/results/${league}/${season}`


  useEffect(() => {
    axios.get(baseURL(league,season))
      .then((response) => {
        //console.log("These are the teams: ",response.data.teams)
        setResultData(response.data.teams)
        setLoading(false)
    });
  }, [league,season]);

  //console.log("For this league", resultData.league)
  //console.log("These are the Teams:",resultData)

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
