import * as React from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const baseURL = 'http://127.0.0.1:5000/teams/'

function App() {
  const [teams, setTeams] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setTeams(response.data);
    });
  }, []);

  console.log(teams)
  console.log("Why?")

  if (!teams) return null;

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" />
      <li>Some Teams Here</li>
    </Box>
  );
}

export default App;