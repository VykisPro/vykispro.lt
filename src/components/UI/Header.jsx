import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <div className="header">
           <nav>
            <img src="https://i.pinimg.com/236x/60/33/29/603329a4f06ead834eba10bd7913e084.jpg" alt="logo"></img>
            <ul>
              <li> <NavLink to="/">Pagrindinis</NavLink></li>
              <li> <NavLink to="/login">Prisijungti</NavLink></li>
              <li> <NavLink to="/Register">Registruotis</NavLink></li>
              <li> <NavLink to="/Posts">Visi Postai</NavLink></li>
              <div className='userInfo'>
            User
           </div>
            </ul>
           </nav>
        </div>
    )
}

export default Header;