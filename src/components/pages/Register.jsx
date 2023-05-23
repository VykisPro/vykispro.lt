import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const Register = () => {

    const values = {
        email: '',
        userName: '',
        avatarURL: '',
        password: '',
        passwordConfim: ''
    }

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ username, email, password });
        setEmail("");
        setUsername("");
        setPassword("");
    };
    return (
        <main className='pageContainer'>
            <h1 className='registerTitle'>Sukurti naują vartotoją</h1>
            <form className='registerForm' onSubmit={handleSubmit}>
                <label htmlFor='username'>Prisijungimo vardas:</label>
                <input
                    type='text'
                    name='username'
                    id='username'
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor='email'>Elektroninio pašto adresas:</label>
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
                <button className='registerBtn'>Sukurti paskyrą</button>
                <p>
                    Jau esate susikūrę vartotoją? <Link to='/Login'>Prisijungti</Link>
                </p>
            </form>
        </main>
    );
};

export default Register;