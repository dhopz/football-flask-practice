import { BrowserRouter,Routes, Route } from 'react-router-dom';
import './App.css';
import TeamPage from './Pages/TeamPage'
import Homepage from './Pages/Homepage';
import TablePage from './Pages/TablePage';


function App() {
  
  return (
    <BrowserRouter>
      <div className="Routes">
        <Routes>
          <Route exact path='/' element = {<Homepage />} />
          <Route path='/teams/' element = {<TeamPage />} />
          <Route path='/league_table/' element = {<TablePage />} />

        </Routes>
      </div>
    </BrowserRouter>
  )
};

export default App;
