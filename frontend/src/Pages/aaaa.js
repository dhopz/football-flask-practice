import React, { useState, useEffect } from 'react';
import axios from "axios";
import BasicSelect from '../components/LeagueSelect';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ResultCard from '../components/ResultCard';
import { Card } from '@mui/material';

const baseURL = 'http://127.0.0.1:5000/results/';

const ResultPage = () => {
  const [resultData, setResultData] = useState([]);
  const [isLoading, setLoading] = useState(true);  

  useEffect(() => {
    axios.get(baseURL)
      .then((response) => {
        console.log("These are the teams: ",response.data.teams)
        setResultData(response.data.teams)
        setLoading(false)
    });
  }, []);


  //console.log("For this league", resultData.league)
  console.log("These are the Teams:",resultData)

  if (isLoading) {
    return <div className="App">Loading...</div>
  }

  return (
    <Box 
    component="form"
    sx={{
        '& > :not(style)': { m: 1, width: '25ch', flexGrow:1 },
      }}
      noValidate
      autoComplete="off"
    >        
    <header>
        <h1>Football Results</h1>
    </header>
    <br></br>
    <Grid container spacing={3}>
        {resultData.map(item => {
            // return <li>{item.awayteam} vs {item.hometeam}</li>
            return (
                <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ minWidth: 275 }}>
                    <div class="my-card">
                    <div class="my-body">
                    <div class="my-home-team">
                    <div class="my-team-name">{item.hometeam}</div>
                    <div class="my-match-results">{item.home_goal}</div>
                    </div>
                    <div class="my-vs-tag">
                    <span class="vs">vs</span>
                    </div>
                    <div class="my-away-team">
                    <div class="my-team-name">{item.awayteam}</div>
                    <div class="my-match-results">{item.away_goal}</div>
                    </div>
                    <div class="my-extra-info">
                    <div class="my-loc-city">{item.hometeam}</div>
                    </div>
                    </div>
                    <div class="my-footer">
                    <div class= "my-group">
                    <div class="my-date">{item.date}
                    </div>
                    </div>
                    <div class="my-group">
                    <div class="my-time">9:30 PM
                    </div>
                    </div>
                    </div>
                    </div>
                    </Card>
                </Grid>
                </Grid>
            )
    })}
    </Grid>
    </Box>
  );
}

export default ResultPage;
