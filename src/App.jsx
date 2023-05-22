import './App.css';
import { useContext } from 'react';
import UsersContext from './contexts/UsersContext';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";


// Puslapiai
import Home from "./components/pages/Home";
import NotFound from  "./components/pages/NotFound";
import Header from './components/UI/Header';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import AllPosts from './components/pages/AllPosts';
import UserPage from './components/pages/UserPage';



function App() {

  const { currentUser } = useContext(UsersContext);

  return (
<BrowserRouter>
<Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/posts" element={<AllPosts />} />
      <Route path="/userPage" element={currentUser ?
      <UserPage />:
      <Navigate to='/login' />
      } />
    </Routes>
</BrowserRouter>
  );
}

export default App;
