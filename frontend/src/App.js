import { BrowserRouter,Routes, Route } from 'react-router-dom';
import './App.css';
import TeamPage from './Pages/TeamPage'
import Homepage from './Pages/Homepage';
import TablePage from './Pages/TablePage';
import ResultPage from './Pages/ResultPage';
import ResultsTablePage from './Pages/ResultsTablePage';


function App() {
  
  return (
    <BrowserRouter>
      <div className="Routes">
        <Routes>
          <Route exact path='/' element = {<Homepage />} />
          <Route path='/teams/' element = {<TeamPage />} />
          <Route path='/league_table/' element = {<TablePage />} />
          <Route path='/league_table/:league/:season' element = {<TablePage />} />
          <Route path='/results/' element = {<ResultPage />} />
          <Route path='/result_table/' element = {<ResultsTablePage />} />
          <Route path='/result_table/:league/:season' element = {<ResultsTablePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
};

export default App;
