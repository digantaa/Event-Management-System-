import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

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
        try {
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
        } catch (error) {
            setLoginError("Network error. Please try again.");
        }
    };

    return (
        <>
            <section className="register min-h-screen flex flex-col justify-center items-center bg-gray-50">
                <h1 className='font-mono text-4xl text-center mb-8'>Login</h1>
                <div className='flex items-center justify-center w-full'>
                    <form
                        className='flex flex-col items-center gap-4 border border-gray-300 shadow-lg rounded-3xl p-12 w-full max-w-md bg-white'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {loginError && <span style={{ color: "red" }}>{loginError}</span>}
                        
                        <input
                            className='border-2 border-gray-300 px-4 py-2 rounded-3xl mt-3 w-full'
                            type="email"
                            placeholder="Email"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
                        
                        <input
                            className='border-2 border-gray-300 px-4 py-2 rounded-3xl mt-3 w-full'
                            type="password"
                            placeholder="Password"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}
                        
                        <button
                            className='font-mono text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br 
                            focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-3 text-center mt-4 mb-0'
                            type="submit"
                        >
                            Login
                        </button>
                        <Link to='/register'>or Register</Link>
                    </form>
                </div>
            </section>
        </>
    );
}

export default Login;