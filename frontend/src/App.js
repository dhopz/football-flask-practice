import React from 'react';
import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
    leagues: []
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:5000/teams/')
      .then(res => {
        const leagues = res.data;
        this.setState({ leagues });
        console.log(leagues)
        console.log("hello")
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.leagues
            .map(leagues =>
              <li> { leagues } </li>
            )
        }
      </ul>
    )
  }
}