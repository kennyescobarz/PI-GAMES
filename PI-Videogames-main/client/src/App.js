import './App.css';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Landing from './components/Landing'
import Home from './components/Home';
import Description from './components/Description';
import Create from './components/Create'
function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/game/:id' element={<Description/>}/>
        <Route path='/home/create' element={<Create/>}/>
      </Routes>
    </div>
    </BrowserRouter>

    
  );
}

export default App;
