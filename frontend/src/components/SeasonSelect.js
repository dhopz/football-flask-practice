import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SeasonSelect = ({ seasonPicked }) => {
  const [season, setSeason] = useState(1729);  

  const handleChange = (event) => {
    setSeason(event.target.value);
    seasonPicked(event.target.value)
  };

  const seasons = [
    {seasonName: '2008/2009',value:'2008/2009'},
    {seasonName: '2009/2010',value:'2008/2009'},
    {seasonName: '2010/2011',value:'2008/2009'},
    {seasonName: '2011/2012',value:'2008/2009'},
    {seasonName: '2012/2013',value:'2008/2009'},
    {seasonName: '2013/2014',value:'2008/2009'},
    {seasonName: '2014/2015',value:'2008/2009'},
    {seasonName: '2015/2016',value:'2008/2009'}
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
          {seasons.map(item => {
            return (
            <MenuItem value={item.value}>{item.seasonName}</MenuItem>
            )})}
        </Select>
      </FormControl>
    </Box>
  );
}


export default SeasonSelect;
