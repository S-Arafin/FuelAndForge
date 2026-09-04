import React from 'react';
import { HiBell, HiPlay, HiFire, HiChevronRight } from 'react-icons/hi';
import { IoBarbellOutline, IoWaterOutline, IoFootstepsOutline, IoTrophyOutline } from 'react-icons/io5';

const Home = () => {
  return (
    <div className="space-y-6">
      {/* Mobile Top Header */}
      <div className="flex md:hidden items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img 
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
                alt="Alex Avatar" 
              />
            </div>
          </div>
          <div>
            <p className="text-xs text-base-content/70">Good morning,</p>
            <h2 className="font-bold text-lg tracking-tight">Hello, Alex!</h2>
          </div>
        </div>
        <button className="btn btn-ghost btn-circle btn-sm">
          <HiBell className="text-xl" />
        </button>
      </div>

      {/* Start Workout Action */}
     <div className="flex items-center justify-center">
         <button className="btn btn-primary py-4 text-lg font-bold gap-2 shadow-lg shadow-primary/20 md:py-6">
        <HiPlay className="text-2xl" />
        <span>Start Workout</span>
      </button>
     </div>

      {/* Today's Progress Section */}
      <section className="space-y-3">
        <h3 className="font-bold text-lg">Today's Progress</h3>
        <div className="bg-base-200 p-6 rounded-3xl grid grid-cols-3 gap-4 border border-base-300 shadow-sm">
          {/* Calorie Circle */}
          <div className="flex flex-col items-center gap-2">
            <div className="radial-progress text-primary" style={{ "--value": 70, "--size": "3.8rem", "--thickness": "5px" }} role="progressbar">
              <HiFire className="text-lg" />
            </div>
            <div className="text-center">
              <p className="font-bold text-sm">1.2k</p>
              <p className="text-[10px] text-base-content/60 uppercase font-semibold">Kcal</p>
            </div>
          </div>

          {/* Water Circle */}
          <div className="flex flex-col items-center gap-2">
            <div className="radial-progress text-info" style={{ "--value": 60, "--size": "3.8rem", "--thickness": "5px" }} role="progressbar">
              <IoWaterOutline className="text-lg" />
            </div>
            <div className="text-center">
              <p className="font-bold text-sm">1.8L</p>
              <p className="text-[10px] text-base-content/60 uppercase font-semibold">Water</p>
            </div>
          </div>

          {/* Steps Circle */}
          <div className="flex flex-col items-center gap-2">
            <div className="radial-progress text-secondary" style={{ "--value": 45, "--size": "3.8rem", "--thickness": "5px" }} role="progressbar">
              <IoFootstepsOutline className="text-lg" />
            </div>
            <div className="text-center">
              <p className="font-bold text-sm">4.5k</p>
              <p className="text-[10px] text-base-content/60 uppercase font-semibold">Steps</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Workout Section */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Upcoming Workout</h3>
          <button className="text-xs text-primary font-semibold hover:underline">See all</button>
        </div>
        <div className="bg-base-200 p-4 rounded-2xl flex items-center justify-between border border-base-300">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-base-300 text-primary">
              <IoBarbellOutline className="text-2xl" />
            </div>
            <div>
              <h4 className="font-bold text-base">Push Day Routine</h4>
              <p className="text-xs text-base-content/60">⏱ 45 mins • 📋 5 exercises</p>
            </div>
          </div>
          <button className="btn btn-circle btn-ghost btn-sm">
            <HiChevronRight className="text-lg" />
          </button>
        </div>
      </section>

      {/* Streaks & Badges Section */}
      <section className="space-y-3">
        <h3 className="font-bold text-lg">Streaks & Badges</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-base-200 p-4 rounded-2xl flex items-center gap-3 border border-base-300">
            <div className="p-3 rounded-xl bg-warning/10 text-warning">
              <HiFire className="text-2xl" />
            </div>
            <div>
              <p className="font-bold text-base">7 Days</p>
              <p className="text-xs text-base-content/60">Current Streak</p>
            </div>
          </div>

          <div className="bg-base-200 p-4 rounded-2xl flex items-center gap-3 border border-base-300">
            <div className="p-3 rounded-xl bg-accent/10 text-accent">
              <IoTrophyOutline className="text-2xl" />
            </div>
            <div>
              <p className="font-bold text-base">Early Bird</p>
              <p className="text-xs text-base-content/60">Latest Badge</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;