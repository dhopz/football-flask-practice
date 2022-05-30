import React, { useState, useEffect } from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const baseURL = 'http://127.0.0.1:5000/teams/';

const TeamPage = () => {
  const [teams, setTeams] = useState([]);
  
  // const fetchTeams = async () => {
  //   const { data } = await axios.get(baseURL);
  //   setTeams(data)
  // }

  // useEffect(() => {
  //   fetchTeams();
  // }, []);

  useEffect(() => {
    axios.get(baseURL)
      .then((response) => {
        console.log("These are the teams: ",response.data.league_teams)
        setTeams(response.data.league_teams);
      //setTeams(JSON.parse('["Chelsea", "Arsenal", "Tottenham", "Brentford", "Fulham"]'))
    });
  }, []);

  
  console.log(teams)
  // console.log("Why?")

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <header>
        <h1>Football Data</h1>
      </header>
      <TextField id="standard-basic" label="Standard" variant="standard" />
      {/* WHY DOESNT THIS WORK?? */}
      <ul>
        {teams.map(item => {
            return <li>{item.team}</li>;
        })}
      </ul>
    </Box>
  );
}

export default TeamPage;