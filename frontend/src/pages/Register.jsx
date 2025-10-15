import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigation = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");

const handleSubmit = async (event) => {
  event.preventDefault();
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  if (response.ok) {
    console.log('User registered successfully');
    navigation('/login');
  } else {
    const errorData = await response.json();
    alert(errorData.message || 'Registration failed');
  }
};


  return (
    <>
      <section  className=" register min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <h1 className='text-white font-semibold font-mono text-4xl text-center mb-8'>Registration</h1>
        <div className='flex items-center justify-center w-full '>
        <form
         className='flex flex-col items-center gap-4 border border-gray-300 shadow-lg rounded-3xl p-12 w-full max-w-md bg-white'
         onSubmit={handleSubmit}>
          <input
          className='border-2 border-gray-300 px-4 py-2 rounded-3xl mt-3 w-full'
            type="text"
            name="username"
            placeholder="Username"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
          className='border-2 border-gray-300 px-4 py-2 rounded-3xl mt-3 w-full'
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
          className='border-2 border-gray-300 px-4 py-2 rounded-3xl mt-3 w-full'
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
          className=' font-mono text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br 
          focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-3 text-center mt-4 mb-0'
          type="submit">Register</button>
        <Link to='/login'>or log in</Link>
        </form>
        </div>
      </section>
    </>
  );
};

export default Register;
