import {BrowserRouter ,Routes , Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'
import Private from './components/Private'

function App() {
  
   
  return (
   
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route element={<Private/>}>
      <Route path='/profile' element={<Profile/>} />
      </Route>
      
      <Route path='/signin' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
    </Routes>
      

    </BrowserRouter>
    
    
  )
}

export default App
