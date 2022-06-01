import React, { useState, useEffect } from 'react';
import axios from "axios";
import BasicSelect from '../components/LeagueSelect';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Card } from '@mui/material';
import { Typography } from '@mui/material';
import { CardContent } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Stack } from '@mui/material';
import { Divider } from '@mui/material';

const baseURL = 'http://127.0.0.1:5000/results/';

const ResultPage = () => {
  const [resultData, setResultData] = useState([]);
  const [isLoading, setLoading] = useState(true); 
  const [value, setValue] = React.useState(null);


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
    <Box sx={{ flexGrow: 1 }}>        
    <header>
        <h1>Football Results</h1>
    </header>
    <br></br>
    <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
    <BasicSelect/>
        <LocalizationProvider dateAdapter={AdapterDateFns}>        
            <DatePicker
            views={['year']}
            label="Year only"
            value={value}
            onChange={(newValue) => {
                setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} helperText={null} />}
            />        
        </LocalizationProvider>
    </Stack>
    <br></br>
    <Grid container spacing={3} justify="space-evenly">        
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
