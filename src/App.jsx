import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";

// Puslapiai
import Home from "./components/pages/Home";
import NotFound from  "./components/pages/NotFound";
import Header from './components/UI/Header';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import AllPosts from './components/pages/AllPosts';



function App() {
  return (
<BrowserRouter>
<Header />
  <main>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/posts" element={<AllPosts />} />
    </Routes>
  </main>
</BrowserRouter>
  );
}

export default App;
