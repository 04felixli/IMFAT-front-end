// This file handles User Log - Ins and redirects to the sign-up page if user doesn't have an account
import React from "react";
import { useState } from "react";

const LogIn = () => {

    const [isLogin, setIsLogin] = useState<boolean>(true);

    const [inputUserNameValue, setInputUserNameValue] = useState('');

    const handleInputUserNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputUserNameValue(e.target.value);
    };

    const [inputPasswordValue, setInputPasswordValue] = useState('');

    const handleInputPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputPasswordValue(e.target.value);
    };

    const switchToSignUp = (): void => {
        setIsLogin(false);
    }

    const switchToLogIn = (): void => {
        setIsLogin(true);
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="shadow-md border border-gray-400 p-4 rounded-lg flex flex-col w-10/12 h-4/5">
                <div className="text-3xl font-bold text-left">{isLogin ? 'Log in' : 'Sign Up'}</div>
                <p className="text-sm mt-1">Start tracking your workouts</p>

                <section className="mt-10">
                    <input
                        type="text"
                        id="Username"
                        value={inputUserNameValue}
                        onChange={handleInputUserNameChange}
                        className="border-b border-gray-400 mt-10 text-lg w-full focus:outline-none focus:bg-gray-100"
                        placeholder="Email"
                    />

                    <input
                        type="text"
                        id="Password"
                        value={inputPasswordValue}
                        onChange={handleInputPasswordChange}
                        className="border-b border-gray-400 mt-10 text-lg w-full focus:outline-none focus:bg-gray-100"
                        placeholder="Password"
                    />
                </section>

                <section className="mt-10">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 w-full">{isLogin ? 'Log in' : 'Sign Up'}</button>
                    <div className={`flex items-end ${isLogin ? '' : 'hidden'}`}>
                        <p className="text-sm mt-5 mr-1">New to IMFAT?</p>
                        <button className="font-bold underline ml-1" onClick={switchToSignUp}>Sign up</button>
                    </div>

                    <div className={`flex items-end ${isLogin ? 'hidden' : ''}`}>
                        <p className="text-sm mt-5 mr-1">Already have an account?</p>
                        <button className="font-bold underline ml-1" onClick={switchToLogIn}>Log in</button>
                    </div>

                </section>

            </div>
        </div>
    )
}

export default LogIn; 