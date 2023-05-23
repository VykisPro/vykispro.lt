import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { hashSync } from "bcryptjs";

const Register = () => {

const values = {
email: '',
userName: '',
avatarURL: '',
password: '',
passwordConfirm: '',
age: ''
};

const handleSubmit = async (values) => {
const { passwordConfirm, ...user } = values;
const hashedPassword = hashSync(values.password, 10);
const newUser = { ...user, password: hashedPassword };

try {
const response = await fetch("http://localhost:3000/users", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(newUser),
});

if (response.ok) {
console.log("Vartotojas sėkmingai sukurtas!");
} else {
console.error(
"Registracija nepavyko:",
response.status,
response.statusText
);
}
} catch (error) {
console.error(
"Registracija nesėkminga, bandykite dar kartą:",
error
);
}
};


const validationSchema = Yup.object({
email: Yup.string()
.email("Turi būti įvestas galiojantis email adresas.")
.required("Laukelis negali būti tuščias.")
.test("unique-email", "Toks pašto adresas jau yra registruotas.", async function (value) {
const response = await fetch("http://localhost:3000/users?email=" + value);
const users = await response.json();
return users.length === 0;
}),
userName: Yup.string()
.min(3, "Prisijungimo vardas turi būti mažiausiai iš 3 simbolių")
.max(12, "Prisijungimo vardas negali viršyti 15 simbolių")
.required("Vartotojo vardo laukelis negali būti tuščias")
.test("unique-username", "Toks vartotojo vardas jau egzistuoja.", async function (value) {
const response = await fetch("http://localhost:3000/users?userName=" + value);
const users = await response.json();
return users.length === 0;
}),

avatarURL: Yup.string()
.url('Paveiksliukas privalo būti veikiančio URL formato.'),
password: Yup.string()
.matches(
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/, "Slaptažodyje privalo būti 8 simboliai, viena didžioji raidė ir viena mažojoji bei vienas skaičius")
.required('Privaloma įvesti reikalavimus atitinkantį slaptažodį'),
passwordConfirm: Yup.mixed()
.oneOf([Yup.ref('password'), null], 'Slaptažodžiai nesutampa')
.required('Privaloma įvesti reikalavimus atitinkantį slaptažodį, kuris sutaptu su pirmu slaptažodžiu'),
age: Yup.number()
.integer('Amžius turi būti sveikas skaičius')
.min(14, 'Registracija galima nuo 14 metų')
.max(100, 'Prašome nurodyti tikrą amžių')
.required('Privalote įvesti amžių')

});
const formik = useFormik({
initialValues: values,
validationSchema: validationSchema,
onSubmit: handleSubmit,

});

return (
<main>
<div className="pageContainer">
<h1 className='registerTitle'>Sukurti naują vartotoją</h1>
<form onSubmit={ formik.handleSubmit }>
<div>
<label htmlFor="email">Veikiantis email adresas:</label>
<input
type="text"
name="email" id="email"
value={formik.values.email}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
/>
{
formik.touched.email && formik.errors.email &&
<span className="error">{formik.errors.email}</span>
}
</div>
<div>
<label htmlFor="userName">Prisijungimo vardas:</label>
<input
type="text"
name="userName" id="userName"
value={formik.values.userName}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
/>
{
formik.touched.userName && formik.errors.userName &&
<span className="error">{formik.errors.userName}</span>
}
</div>
<div>
<label htmlFor="avatarURL"> Avatar'o URL:</label>
<input
type="url"
name="avatarURL" id="avatarURL"
value={formik.values.avatarURL}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
/>
{
formik.touched.avatarURL && formik.errors.avatarURL &&
<span className="error">{formik.errors.avatarURL}</span>
}
</div>
<div>
<label htmlFor="age">Kieks jums metų?</label>
<input
type="number"
name="age" id="age"
value={formik.values.age}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
/>
{
formik.touched.age && formik.errors.age &&
<span className="error">{formik.errors.age}</span>
}
</div>
<div>
<label htmlFor="password">Slaptažodis</label>
<input
type="password"
name="password" id="password"
value={formik.values.password}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
/>
{
formik.touched.password && formik.errors.password &&
<span className="error">{formik.errors.password}</span>
}
</div>
<div>
<label htmlFor="passwordConfirm">Pakartokite slaptažodį</label>
<input
type="password"
name="passwordConfirm" id="passwordConfirm"
value={formik.values.passwordConfirm}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
/>
{
formik.touched.passwordConfirm && formik.errors.passwordConfirm &&
<span className="error">{formik.errors.passwordConfirm}</span>
}
</div>
<input type="submit" value="Sukurti paskyrą" />

</form>
<p>
Jau esate susikūrę vartotoją? <Link to='/Login'>Prisijungti</Link>
</p>
</div>
</main>
);
};

export default Register;