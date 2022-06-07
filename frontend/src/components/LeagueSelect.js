// import React, { useState, useEffect } from 'react';
import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// const league = createContext();

const BasicSelect = ({ leaguePicked }) => {
  const [league, setLeague] = React.useState(1729);
  // const [allleagues, setAllLeagues] = useState([]);

  

  const handleChange = (event) => {
    setLeague(event.target.value);
    leaguePicked(event.target.value)
    //setPickedLeague(event.target.value)
    //console.log(event.target.value);
    //console.log("picked league", setPickedLeague)
  };

  const leagues = [
    {
      leagueName: 'Belgium Jupiler League',
      value:1
    },
    {
      leagueName: 'England Premier League',
      value:1729
    },
    {
      leagueName: 'France Ligue 1',
      value:4769
    },
    {
      leagueName: 'Germany 1. Bundesliga',
      value:7809
    },
    {
      leagueName: 'Italy Serie A',
      value:10257
    },
    {
      leagueName: 'Netherlands Eredivisie',
      value:13274
    },
    {
      leagueName: 'Poland Ekstraklasa',
      value:15722
    },
    {
      leagueName: 'Portugal Liga ZON Sagres',
      value:17642
    },
    {
      leagueName: 'Scotland Premier League',
      value:19694
    },
    {
      leagueName: 'Spain LIGA BBVA',
      value:21518
    },
    {
      leagueName: 'Switzerland Super League',
      value:24558
    },
  ]  

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">League</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={league}
          label="League"
          onChange={handleChange}
        >
          {leagues.map(item => {
            return (
            <MenuItem value={item.value}>{item.leagueName}</MenuItem>
            )})}
        </Select>
      </FormControl>
    </Box>
  );
}


export default BasicSelect;
