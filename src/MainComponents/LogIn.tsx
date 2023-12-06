// This file handles User Log - Ins and redirects to the sign-up page if user doesn't have an account
import React from "react";
import { useState } from "react";

const LogIn = () => {
    const [inputUserNameValue, setInputUserNameValue] = useState('');

    const handleInputUserNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputUserNameValue(e.target.value);
    };

    const [inputPasswordValue, setInputPasswordValue] = useState('');

    const handleInputPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputPasswordValue(e.target.value);
    };

    return (
        <div className="flex justify-center items-center flex-col">
            <h1 >Login</h1>

            <label htmlFor="Username">Username:</label>
            <input
                type="text"
                id="Username"
                value={inputUserNameValue}
                onChange={handleInputUserNameChange}
                className="border border-gray-300"
                placeholder="Your text here"
            />

            <label htmlFor="Password">Password:</label>
            <br />
            <input
                type="text"
                id="Password"
                value={inputPasswordValue}
                onChange={handleInputPasswordChange}
                className="border border-gray-300"
                placeholder="Your text here"
            />

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>

            <p>Or sign up using</p>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign Up</button>



        </div>
    )
}

export default LogIn; 