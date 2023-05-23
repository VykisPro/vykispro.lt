import { useContext, useState } from "react";
import UsersContext from "../../contexts/UsersContext";
import { useNavigate } from "react-router-dom";
import { compareSync } from "bcryptjs";



const Login = () => {

const [formInputs, setFormInputs] = useState({
userName: '',
password: ''
});

const [failedLogIn, setFailedLogIn] = useState(false);
const { users, setCurrentUser } = useContext(UsersContext);
const navigate = useNavigate();
const inputHandler = e => {
setFormInputs({
...formInputs,
[e.target.name]:e.target.value
});
setFailedLogIn(false);
}

const formSubmit = e => {
    e.preventDefault();
    console.log('Form inputs:', formInputs);
  
    const plainTextPassword = formInputs.password;
    const loggedInUser = users.find(user => user.userName === formInputs.userName);
  
    if (loggedInUser && compareSync(plainTextPassword, loggedInUser.password)) {
      setCurrentUser(loggedInUser);
      setTimeout(() => navigate('/posts'), 0); // Delay the navigation action
    } else {
      setFailedLogIn(true);
    }
  };
  

return (
<main>
<form id="login" onSubmit={(e) => {formSubmit(e)}}>
<div>
    <label htmlFor="userName">Vartotojo vardas:</label>
    <input type="text"
    name="userName" id="userName"
    value={formInputs.userName}
    onChange={(e)=>{inputHandler(e)}}
    />
</div>
<div>
    <label htmlFor="password">Slaptažodis:</label>
    <input
    type="password"
    name="password" id="password"
    value={formInputs.password}
    onChange={(e)=>{inputHandler(e)}}
    />
</div>
<input type="submit" value="Prisijungti"></input>
</form>
{
failedLogIn &&
<h1>Neteisingi prisijungimo duomenys</h1>
}
</main>

);
}

export default Login;