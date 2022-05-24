import React from 'react';
import axios from 'axios';
import { Container, Typography } from '@mui/material'

export default class TeamList extends React.Component {
  state = {
    teams: []
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:5000/teams/')
      .then(res => {
        const teams = res.data;
        this.setState({ teams });
        console.log(teams)
      })
  }

  render() {
    return ( 
      <Container style={{ textAlign:"center"}}>
        <Typography
            variant="h4"
            style={{ margin:18, fontFamily:"Roboto"}}
            >
            Football Data
        </Typography>      
        <ul>
          {
            this.state.teams
              .map(teams =>
                <li> { teams.team } </li>
              )
          }
        </ul>
      </Container>   
    )
  }
}