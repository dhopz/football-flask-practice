import React, { useState, useEffect } from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import LeagueSelect from '../components/leagueSelect';
import SeasonSelect from '../components/seasonSelect';
import PageLinks from '../components/pageMenu';
import { Stack } from '@mui/material';
import { Divider } from '@mui/material';


const baseURL = 'http://127.0.0.1:5000/teams/';

const TeamPage = () => {
  const [teams, setTeams] = useState([]);   

  useEffect(() => {
    axios.get(baseURL)
      .then((response) => {
        ///console.log("These are the teams: ",response.data.league_teams)
        setTeams(response.data.league_teams);
    });
  }, []);

  return (
    <Box sx={{ m:4 }}>   
      <header>
        <h1>Football Teams</h1>
      </header>
      <br></br>
      <PageLinks/>
      <br/>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
      <LeagueSelect/>
      <SeasonSelect/>
      </Stack>
      <br/>
      <ul>
        {teams.map(item => {
            return <li>{item.team}</li>;
        })}
      </ul>
    </Box>
  );
}

export default TeamPage;