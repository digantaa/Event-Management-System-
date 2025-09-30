import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const [loginError, setLoginError] = useState("");

    const onSubmit = async (data) => {
    setLoginError("");
    const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
    });

    if (response.ok) {
        navigate("/events");
    } else {
        const errorData = await response.json();
        setLoginError(errorData.message || "Email or Password is not matching with our record");
    }
};


    return (
        <>
        <section className="register min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <h1 className='font-mono text-4xl text-center mb-8'>Registration</h1>
        <div className='flex items-center justify-center w-full '>
        <form
         className='flex flex-col items-center gap-4 border border-gray-300 shadow-lg rounded-3xl p-12 w-full max-w-md bg-white'
         onSubmit={handleSubmit(onSubmit)}>
          <input
          className='border-2 border-gray-300 px-4 py-2 rounded-3xl mt-3 w-full'
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            {...register("email", { required: true })}
            required
          />
          {errors.email && <span style={{ color: "red" }}>*Email* is mandatory</span>}
          <input
          className='border-2 border-gray-300 px-4 py-2 rounded-3xl mt-3 w-full'
            type="password"
            name="password"
            placeholder="Password"
            value={password}
           {...register("password", { required: true })}
            required
          />
          {errors.password && <span style={{ color: "red" }}>*Password* is mandatory</span>}
          <button
          className=' font-mono text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br 
          focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-3 text-center mt-4 mb-0'
          type="submit">Login</button>
        </form>
        </div>
      </section>
        </>
    );
}

export default Login;