import './App.css';
import SendJokes from './components/SendJokes/SendJokes';
import RandomJokes from './components/RandomJokes/RandomJokes';
import './index.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RandomJokes />} />
        <Route path="/send" element={<SendJokes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
