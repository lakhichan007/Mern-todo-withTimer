import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './login/login';
import SignUp from './signup/signup';
import Home from './home/home';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
