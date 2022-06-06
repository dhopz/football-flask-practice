import React, { useState, useEffect } from 'react';
import axios from "axios";
import BasicSelect from '../components/LeagueSelect';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import { Divider } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const LeaguePage = () => {
  const [leagueData, setLeagueData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = useState(null);

  const columns = [
    {
      field: 'games_played',
      headerName: 'MP',
      type: 'number',
      width: 50,
    },
    {
      field: 'games_won',
      headerName: 'W',
      type: 'number',
      width: 50,
    },
    {
      field: 'games_drawn',
      headerName: 'D',
      type: 'number',
      width: 50,
    },
    {
      field: 'games_lost',
      headerName: 'L',
      type: 'number',
      width: 50,
    },
    {
      field: 'goals_for',
      headerName: 'GF',
      type: 'number',
      width: 50,
    },
    {
      field: 'goals_against',
      headerName: 'GA',
      type: 'number',
      width: 50,
    },
    {
      field: 'goal_difference',
      headerName: 'GD',
      type: 'number',
      width: 50,
    },
    {
      field: 'points',
      headerName: 'PTS',
      type: 'number',
      width: 50,
    },
  ];  
  
  const baseURL = 'http://127.0.0.1:5000/league_table/';  

  useEffect(() => {
    axios.get(baseURL)
      .then((response) => {
        // console.log("These are the teams: ",response.data.teams)
        setLeagueData(response.data)
        setLoading(false)
    });
  }, []);

  // console.log("For this league", leagueData.league)
  // console.log("These are the Teams:",leagueData.teams)

  if (isLoading) {
    return <div className="App">Loading...</div>
  }

  return (
    <Box sx={{ m:4 }}>        
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
                setValue(newValue.getFullYear());
                console.log(newValue.getFullYear())
            }}
            renderInput={(params) => <TextField {...params} helperText={null} />}
            />        
        </LocalizationProvider>
    </Stack>
    <br></br> 
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell >Team </TableCell>
          {columns.map(item => {
            return (
            <TableCell align="right">{item.headerName}</TableCell>
            )})}
          </TableRow>
        </TableHead>
        <TableBody>
          {leagueData.teams.map((row) => (
            <TableRow
              key={row.team}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.team}</TableCell>
              <TableCell align="right">{row.games_played}</TableCell>
              <TableCell align="right">{row.games_won}</TableCell>
              <TableCell align="right">{row.games_drawn}</TableCell>
              <TableCell align="right">{row.games_lost}</TableCell>
              <TableCell align="right">{row.goals_for}</TableCell>
              <TableCell align="right">{row.goals_against}</TableCell>
              <TableCell align="right">{row.goal_difference}</TableCell>
              <TableCell align="right">{row.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}

export default LeaguePage;
