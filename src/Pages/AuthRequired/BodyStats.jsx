import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { HiChevronLeft, HiCalendar, HiPlus } from 'react-icons/hi';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const BodyStats = () => {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState('30D');

  const timeframes = ['7D', '30D', '3M', '6M', '1Y'];

  // Weight Trend Chart Data
  const weightData = [
    { date: 'May 01', weight: 79.6 },
    { date: 'May 05', weight: 79.2 },
    { date: 'May 10', weight: 79.0 },
    { date: 'May 15', weight: 78.8 },
    { date: 'May 20', weight: 78.6 },
    { date: 'May 25', weight: 78.5 },
    { date: 'May 30', weight: 78.4 },
  ];

  // Body Measurements Data
  const measurements = [
    { label: 'ARMS', value: '15.4', unit: 'in', change: '-0.1 in', isPositive: false },
    { label: 'HIPS', value: '38.2', unit: 'in', change: '-0.3 in', isPositive: false },
    { label: 'THIGHS', value: '22.8', unit: 'in', change: 'No change', isPositive: null },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-circle btn-ghost btn-sm bg-base-200 border border-base-300 hover:bg-base-300"
          >
            <HiChevronLeft className="text-xl" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">Body Metrics</h1>
            <p className="text-xs text-base-content/60">Last updated: Today, 8:30 AM</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" className="btn btn-circle btn-ghost btn-sm bg-base-200 border border-base-300">
            <HiCalendar className="text-lg" />
          </button>
          <div className="avatar">
            <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" />
            </div>
          </div>
        </div>
      </div>

      {/* Timeframe Filter Switcher */}
      <div className="flex justify-center md:justify-start">
        <div className="bg-base-200 p-1 rounded-2xl border border-base-300 flex items-center gap-1">
          {timeframes.map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setSelectedTimeframe(tf)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedTimeframe === tf
                  ? 'bg-primary text-primary-content shadow-sm'
                  : 'text-base-content/60 hover:text-base-content'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Main Charts & Indicators Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weight Progress Chart Card */}
        <div className="bg-base-200 p-5 md:p-6 rounded-3xl border border-base-300 space-y-4 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-base-content/60 uppercase tracking-wider">Current Weight</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl md:text-4xl font-black">78.4</span>
                <span className="text-sm font-bold text-base-content/60">kg</span>
              </div>
            </div>
            <span className="badge badge-primary font-bold text-xs py-2 px-3">
              -1.2 kg this month
            </span>
          </div>

          {/* Area Chart Container */}
          <div className="h-52 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weightData}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary, #10b981)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-primary, #10b981)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-base-100, #1f2937)', 
                    borderColor: 'var(--color-base-300, #374151)',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="var(--color-primary, #10b981)" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorWeight)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Body Mass Index Card */}
        <div className="bg-base-200 p-5 md:p-6 rounded-3xl border border-base-300 space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs font-bold text-base-content/60 uppercase tracking-wider">Body Mass Index</p>
                <span className="text-3xl md:text-4xl font-black">24.2</span>
              </div>
              <span className="badge badge-success font-bold text-xs py-2 px-3">HEALTHY</span>
            </div>

            {/* BMI Scale Bar */}
            <div className="space-y-2 pt-6">
              <div className="relative w-full h-3 rounded-full overflow-hidden flex">
                <div className="h-full w-[25%] bg-info" title="Underweight" />
                <div className="h-full w-[35%] bg-success" title="Normal" />
                <div className="h-full w-[20%] bg-warning" title="Overweight" />
                <div className="h-full w-[20%] bg-error" title="Obese" />
              </div>
              {/* BMI Indicator Arrow Marker */}
              <div className="relative w-full text-center">
                <div className="absolute left-[52%] -translate-x-1/2 -top-1">
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-base-content mx-auto" />
                </div>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-base-content/50 pt-2">
                <span>18.5</span>
                <span>25.0</span>
                <span>30.0</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-base-100 border border-base-300 text-xs text-base-content/70">
            💡 Your BMI is within the healthy range. Keep up your balanced routine!
          </div>
        </div>
      </div>

      {/* Measurements List Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Measurements</h3>
          <button type="button" className="text-xs text-primary font-semibold hover:underline">
            View History
          </button>
        </div>

        {/* Responsive Grid: 1 col on mobile, 3 cols on tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {measurements.map((item) => (
            <div 
              key={item.label} 
              className="bg-base-200 p-4 rounded-2xl border border-base-300 flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-bold text-base-content/60">{item.label}</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-black">{item.value}</span>
                  <span className="text-xs text-base-content/60">{item.unit}</span>
                </div>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                item.change === 'No change' 
                  ? 'bg-base-300 text-base-content/70' 
                  : 'bg-primary/10 text-primary'
              }`}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Log New Metrics CTA */}
      <div>
        <button 
          type="button" 
          className="btn btn-primary w-full py-4 font-bold rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
        >
          <HiPlus className="text-xl" />
          <span>LOG NEW METRICS</span>
        </button>
      </div>
    </div>
  );
};

export default BodyStats;