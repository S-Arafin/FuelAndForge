import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FiMail, FiLock, FiEye, FiEyeOff, FiChevronLeft } from 'react-icons/fi';
import { FaApple, FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { IoBarbell } from 'react-icons/io5';
import { useAuth } from '../../Context/AuthContext';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (login(email, password)) {
            navigate('/');
        }
    };

    return (
        <div className="p-6 pt-12 flex flex-col h-full text-white">
            <Link to="/" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-800 transition-colors mb-8">
                <FiChevronLeft size={24} />
            </Link>

            <div className="flex-1 flex flex-col items-center">
                <div className="w-16 h-16 bg-[#1A2235] rounded-2xl border border-slate-700 flex items-center justify-center mb-6 shadow-lg">
                    <IoBarbell size={32} className="text-teal-400" />
                </div>
                
                <h1 className="text-3xl font-bold mb-2">Welcome</h1>
                <p className="text-slate-400 mb-10 text-sm">Ready to crush your goals today?</p>

                <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
                    <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
                        <input 
                            type="text" 
                            placeholder="Email or Username" 
                            className="w-full bg-[#1A2235] border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-teal-400 transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            className="w-full bg-[#1A2235] border border-slate-800 rounded-2xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-teal-400 transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-white">
                            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </button>
                    </div>

                    <div className="flex justify-end">
                        <Link to="#" className="text-teal-400 text-sm font-medium hover:text-teal-300">Forgot Password?</Link>
                    </div>

                    <button type="submit" className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold text-lg py-4 rounded-2xl mt-2 transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)]">
                        Log In
                    </button>
                </form>

                <div className="w-full flex items-center gap-4 my-8">
                    <div className="flex-1 h-px bg-slate-800"></div>
                    <span className="text-slate-500 text-xs font-semibold tracking-wider">OR CONTINUE WITH</span>
                    <div className="flex-1 h-px bg-slate-800"></div>
                </div>

                <div className="w-full flex gap-4 mb-8">
                    <button className="flex-1 py-4 bg-[#1A2235] border border-slate-800 rounded-2xl flex justify-center items-center hover:bg-slate-800 transition-colors">
                        <FaApple size={24} />
                    </button>
                    <button className="flex-1 py-4 bg-[#1A2235] border border-slate-800 rounded-2xl flex justify-center items-center hover:bg-slate-800 transition-colors">
                        <FcGoogle size={24} />
                    </button>
                    <button className="flex-1 py-4 bg-[#1A2235] border border-slate-800 rounded-2xl flex justify-center items-center hover:bg-slate-800 transition-colors">
                        <FaFacebook size={24} className="text-[#1877F2]" />
                    </button>
                </div>

                <p className="text-slate-400 text-sm mt-auto pb-4">
                    Don't have an account? <Link to="/auth/register" className="text-teal-400 font-bold hover:text-teal-300">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;