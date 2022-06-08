import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const TeamSelect = ({ teamPicked }) => {  

  const handleChange = (event) => {
    setTeam(event.target.value);
    teamPicked(event.target.value)
  };

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

  const [team, setTeam] = useState(startTeams);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Team</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={team}
          label="Team"
          onChange={handleChange}
        >
          {startTeams.map(item => {
            return (
            <MenuItem value={item}>{item}</MenuItem>
            )})}
        </Select>
      </FormControl>
    </Box>
  );
}


export default TeamSelect;
