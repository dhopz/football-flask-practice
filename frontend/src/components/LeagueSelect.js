// import React, { useState, useEffect } from 'react';
import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import axios from "axios";

// const baseURL = 'http://127.0.0.1:5000/leagues/';

const BasicSelect = () => {
  const [league, setLeague] = React.useState('');
  // const [allleagues, setAllLeagues] = useState([]);

  const handleChange = (event) => {
    setLeague(event.target.value);
  };

  
  // const fetchLeagues = async () => {
  //   const { data } = await axios.get(baseURL);
  //   setAllLeagues(data);
  //   };

  // useEffect(() => {
  //   fetchLeagues();
  //   },[])

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
          {/* {allleagues.map(item => {
            return <MenuItem value={league}>{item.league}</MenuItem>;
          })}; */}
          <MenuItem value={10}>Belgium Jupiler League</MenuItem>
          <MenuItem value={20}>England Premier League</MenuItem>
          <MenuItem value={30}>France Ligue 1</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default BasicSelect;
