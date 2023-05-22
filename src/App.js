import './App.css'
import { BrowserRouter, Routes, Route, Link, NavLink} from "react-router-dom"

// Puslapiai
import Home from "./components/pages/Home"
import NotFound from  "./components/pages/NotFound"
import Header from './components/Header'
import Login from './components/pages/Login'
import Register from './components/pages/Register'



function App() {
  return (
<BrowserRouter>
<Header />
  <main>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="error_404" element={<NotFound />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  </main>
</BrowserRouter>
  );
}

export default App;
