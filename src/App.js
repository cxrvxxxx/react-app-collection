import './App.css';
import { Route, Routes } from 'react-router-dom';
import Bingo from './pages/Bingo';
import ThreeCardPoker from './pages/ThreeCardPoker';
import ColorRoll from './pages/ColorRoll';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/bingo" element={<Bingo />} />
        <Route path="/threecardpoker" element={<ThreeCardPoker />} />
        <Route path="/colorroll" element={<ColorRoll />} />
      </Routes>
    </div>
  );
}

export default App;
