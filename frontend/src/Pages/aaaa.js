import React, { useState, useEffect } from 'react';
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import BasicSelect from '../components/LeagueSelect';

// const columns = [
//   {
//     field: 'team',
//     headerName: 'Team',
//     width: 300,
//   },
//   {
//     field: 'games_played',
//     headerName: 'MP',
//     type: 'number',
//     width: 50,
//   },
//   {
//     field: 'games_won',
//     headerName: 'W',
//     type: 'number',
//     width: 50,
//   },
//   {
//     field: 'games_drawn',
//     headerName: 'D',
//     type: 'number',
//     width: 50,
//   },
//   {
//     field: 'games_lost',
//     headerName: 'L',
//     type: 'number',
//     width: 50,
//   },
//   {
//     field: 'goals_for',
//     headerName: 'GF',
//     type: 'number',
//     width: 50,
//   },
//   {
//     field: 'goals_against',
//     headerName: 'GA',
//     type: 'number',
//     width: 50,
//   },
//   {
//     field: 'goal_difference',
//     headerName: 'GD',
//     type: 'number',
//     width: 50,
//   },
//   {
//     field: 'points',
//     headerName: 'PTS',
//     type: 'number',
//     width: 50,
//   },
// ];

// const rows = [
//   { id: 1, games_drawn: 6, games_lost: 4, games_played: 38, games_won: 28, goal_difference: '44', goals_against: '24', goals_for: '68', points: 90, team: 'Manchester United'},
//   { id: 2, games_drawn: 11, games_lost: 2, games_played: 38, games_won: 25, goal_difference: '50', goals_against: '27', goals_for: '77', points: 86, team: 'Liverpool'},
// ];

// const baseURL = 'http://127.0.0.1:5000/league_table/';

const LeaguePage = () => {
  const [leagueData, setLeagueData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const columns = [
    {
      field: 'team',
      headerName: 'Team',
      width: 300,
    },
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
        console.log("These are the teams: ",response.data.teams)
        setLeagueData(response.data)
        setLoading(false)
    });
  }, []);


  console.log("For this league", leagueData.league)
  console.log("These are the Teams:",leagueData.teams)

  if (isLoading) {
    return <div className="App">Loading...</div>
  }

  return (
    <div style={{ height: 900, width: '100%' }}>
      <header>
        <h1>Football Data</h1>
        {/* <h2>{leagueData.league}</h2> */}
      </header>
      <br></br>
      <BasicSelect>
      </BasicSelect>
      <br></br>
      <DataGrid
        columns={columns}
        //rows={rows}
        rows={leagueData.teams}              
      />
    </div>
  );
}

export default LeaguePage;
