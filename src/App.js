import './App.css'
import { BrowserRouter, Routes, Route, Link, NavLink} from "react-router-dom"

// Puslapiai
import Home from "./components/pages/Home"
import NotFound from  "./components/pages/NotFound"
import Header from './components/Header';



function App() {
  return (
<BrowserRouter>
<Header />
  <main>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="error_404" element={<NotFound />} />
    </Routes>
  </main>
</BrowserRouter>
  );
}

export default App;
