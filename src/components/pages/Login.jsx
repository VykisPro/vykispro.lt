import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password });
        setEmail("");
        setPassword("");
    };

    return (
        <main className='login'>
            <h1 className='loginTitle'>Prisijungti į paskyrą</h1>
            <form className='loginForm' onSubmit={handleSubmit}>
                <label htmlFor='email'>Elektroninis paštas:</label>
                <input
                    type='text'
                    name='email'
                    id='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='password'>Slaptažodis:</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='loginBtn'>PRISIJUNGTI</button>
                <p>
                   Neturite aktyvios paskyros? <Link to='/register'>Užregistruoti vartotojo paskyrą</Link>
                </p>
            </form>
        </main>
    );
};
export default Login;