import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiChevronLeft, FiArrowRight, FiShield } from 'react-icons/fi';
import { FaApple, FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="p-6 pt-12 flex flex-col h-full text-white">
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center mb-6 cursor-pointer" onClick={() => navigate(-1)}>
                <FiChevronLeft size={20} />
            </div>

            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-slate-400 mb-8 text-sm">
                Start tracking your <span className="text-teal-400">workouts</span>, <span className="text-purple-400">diet</span>, and <span className="text-blue-500">progress</span>.
            </p>

            <form className="w-full flex flex-col gap-4">
                <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
                    <input type="text" placeholder="Full Name" className="w-full bg-[#1A2235] border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-teal-400 transition-colors" />
                </div>

                <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
                    <input type="email" placeholder="Email Address" className="w-full bg-[#1A2235] border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-teal-400 transition-colors" />
                </div>

                <div className="relative mb-1">
                    <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Password" 
                        className="w-full bg-[#1A2235] border border-slate-800 rounded-2xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-teal-400 transition-colors" 
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-white">
                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                </div>
                
                {/* Password Strength Indicator */}
                <div>
                    <div className="flex gap-2 mb-1">
                        <div className="h-1.5 flex-1 bg-teal-500 rounded-full"></div>
                        <div className="h-1.5 flex-1 bg-teal-500 rounded-full"></div>
                        <div className="h-1.5 flex-1 bg-slate-700 rounded-full"></div>
                        <div className="h-1.5 flex-1 bg-slate-700 rounded-full"></div>
                    </div>
                    <span className="text-[10px] text-slate-500">At least 8 characters</span>
                </div>

                <div className="relative mt-2">
                    <FiShield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
                    <input type="password" placeholder="Confirm Password" className="w-full bg-[#1A2235] border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-teal-400 transition-colors" />
                </div>

                <div className="flex items-start gap-3 mt-2 mb-4">
                    <div className="w-5 h-5 mt-0.5 bg-teal-500 rounded flex items-center justify-center cursor-pointer flex-shrink-0">
                        <svg className="w-3 h-3 text-[#131B2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <p className="text-xs text-slate-400 leading-tight">
                        I agree to the <span className="text-white font-medium">Terms of Service</span> & <span className="text-white font-medium">Privacy Policy</span>.
                    </p>
                </div>

                <button type="button" className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold text-lg py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)]">
                    Get Started <FiArrowRight size={20} />
                </button>
            </form>

            <div className="w-full flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-slate-800"></div>
                <span className="text-slate-500 text-[10px] font-semibold tracking-wider">OR REGISTER WITH</span>
                <div className="flex-1 h-px bg-slate-800"></div>
            </div>

            <div className="w-full flex gap-4 mb-4">
                <button className="flex-1 py-3 bg-[#1A2235] border border-slate-800 rounded-2xl flex justify-center items-center hover:bg-slate-800 transition-colors">
                    <FaApple size={22} />
                </button>
                <button className="flex-1 py-3 bg-[#1A2235] border border-slate-800 rounded-2xl flex justify-center items-center hover:bg-slate-800 transition-colors">
                    <FcGoogle size={22} />
                </button>
                <button className="flex-1 py-3 bg-[#1A2235] border border-slate-800 rounded-2xl flex justify-center items-center hover:bg-slate-800 transition-colors">
                    <FaFacebook size={22} className="text-[#1877F2]" />
                </button>
            </div>

            <p className="text-slate-400 text-sm text-center mt-auto pb-4">
                Already have an account? <Link to="/auth/login" className="text-teal-400 font-bold hover:text-teal-300">Log In</Link>
            </p>
        </div>
    );
};

export default Register;