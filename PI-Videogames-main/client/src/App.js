import './App.css';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Landing from './components/Landing'
import Home from './components/Home';
import Description from './components/Description';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/home/description/:id' element={<Description/>}/>
      </Routes>
    </div>
    </BrowserRouter>

    
  );
}

export default App;
