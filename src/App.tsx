import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import History from './MainComponents/History';
import Nutrition from './MainComponents/Nutrition';
import Profile from './MainComponents/Profile';
import StartWorkout from './MainComponents/StartWorkout';
import Schedule from './MainComponents/Schedule';
import NotFound from './MainComponents/NotFound';
import LogIn from './MainComponents/LogIn';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/StartWorkout" element={<StartWorkout />} />
        <Route path="/History" element={<History />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Schedule" element={<Schedule />} />
        <Route path="/Nutrition" element={<Nutrition />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
