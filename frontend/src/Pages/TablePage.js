import React, { useState, useEffect } from 'react';
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';

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

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const baseURL = 'http://127.0.0.1:5000/league_table/';

const LeaguePage = () => {
  const [league, setLeague] = useState('');
  
  const fetchLeague = async () => {
    const { data } = await axios.get(baseURL);
    setLeague(data)
  }

  useEffect(() => {
    fetchLeague();
  }, []);

  console.log(league)

  return (
    <div style={{ height: 900, width: '100%' }}>
      <header>
        <h1>Football Data</h1>
      </header>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}        
      />
    </div>
  );
}

export default LeaguePage;
