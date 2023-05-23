import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UsersContext from '../../contexts/UsersContext';
import { hashSync } from 'bcryptjs';



function Header() {

  const { currentUser, setCurrentUser } = useContext(UsersContext);
  const navigate = useNavigate();

    return (
        <div className="header">
           <nav>
            <img src="https://i.pinimg.com/236x/60/33/29/603329a4f06ead834eba10bd7913e084.jpg" alt="logo"></img>
            <ul>
              <li> <NavLink to="/">Pagrindinis</NavLink></li>
              <li> <NavLink to="/login">Populiariausios temos</NavLink></li>
              <li> <NavLink to="/register">Papildoma informacija</NavLink></li>
              <li> <NavLink to="/posts">Visi Postai</NavLink></li>
              </ul>
              <div className='userInfo'>
                {
                !currentUser ?
                <>
                <NavLink to="/login"><button>Prisijungti</button></NavLink>
                <NavLink to="/register"><button>Registracija</button></NavLink>
                </> :
                <>
                <NavLink to="/userPage">
                  <div className='userInfo'>
                  <img src={currentUser.avatarURL} alt="User avatar"></img>
                  <p>{currentUser.userName}</p>
                  </div>
                </NavLink>
                <button
                  onClick={() => {
                    setCurrentUser(null);
                    navigate('/login');
                  }}
                >
                  Atsijungti
                </button>
                </>
                }
               
           </div>
           </nav>
        </div>
    )
}

export default Header;