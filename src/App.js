import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import { Navbar, Banner, List, Favorites } from './components';

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path = '/' element= {<><Banner /> <List name = 'Trending'/></>} />
        <Route path = '/favourites' element = {<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
