import './App.css';
import { Route, Routes } from 'react-router-dom';
import Bingo from './pages/Bingo';
import ThreeCardPoker from './pages/ThreeCardPoker';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/bingo" element={<Bingo />} />
        <Route path="/threecardpoker" element={<ThreeCardPoker />} />
      </Routes>
    </div>
  );
}

export default App;
