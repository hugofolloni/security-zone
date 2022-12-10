import Header from './Header';
import Homepage from './Homepage';
import Map from './Map';
import Search from './Search';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/map' element={<Map/>} />
          <Route path='/search' element={<Search/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
