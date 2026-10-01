import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0a0f1c] border-t border-slate-800 py-8 px-4 md:px-16 mt-16 text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Logo & Copyright */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-teal-400"></div>
          <span className="text-white font-bold tracking-wider">FITTRACK</span>
          <span className="text-sm ml-2">© 2024 FitTrack AI. All rights reserved.</span>
        </div>

        {/* Social Logos (Placeholders) */}
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-500 transition-colors cursor-pointer">
            <span className="text-white text-xs">TW</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-500 transition-colors cursor-pointer">
            <span className="text-white text-xs">IG</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-500 transition-colors cursor-pointer">
            <span className="text-white text-xs">DC</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;