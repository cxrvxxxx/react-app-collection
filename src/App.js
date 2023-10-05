import './App.css';
import { Route, Routes } from 'react-router-dom';
import Bingo from './pages/Bingo';
import ThreeCardPoker from './pages/ThreeCardPoker';
import ColorRoll from './pages/ColorRoll';
import PriorityQueue from './pages/PriorityQueue';
import Singer from './pages/Singer';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/bingo" element={<Bingo />} />
        <Route path="/threecardpoker" element={<ThreeCardPoker />} />
        <Route path="/colorroll" element={<ColorRoll />} />
        <Route path="/priorityqueue" element={<PriorityQueue />} />
        <Route exact path="/singers" element={<Singer />} />
        <Route exact path="/singers/:id" element={<Singer />} />
      </Routes>
    </div>
  );
}

export default App;
