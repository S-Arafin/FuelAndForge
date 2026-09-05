import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { HiChevronLeft, HiLockClosed, HiCheckCircle, HiShare } from 'react-icons/hi';
import { LuTrophy, LuFlame, LuDumbbell, LuZap, LuTarget, LuAward } from 'react-icons/lu';

const Achievement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  // Stats summary data
  const summaryStats = [
    { label: 'Total Unlocked', value: '12/24', icon: LuTrophy, color: 'text-primary' },
    { label: 'Current Streak', value: '14 Days', icon: LuFlame, color: 'text-secondary' },
    { label: 'Points Earned', value: '2,450', icon: LuZap, color: 'text-accent' },
  ];

  // Achievement badges data
  const achievements = [
    {
      id: 'first-step',
      title: 'First Step',
      description: 'Completed your very first workout session.',
      category: 'milestone',
      icon: LuDumbbell,
      unlocked: true,
      date: 'May 10, 2026',
      color: 'from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30',
    },
    {
      id: 'streak-master',
      title: 'Consistency King',
      description: 'Maintained a 7-day workout streak.',
      category: 'streak',
      icon: LuFlame,
      unlocked: true,
      date: 'May 18, 2026',
      color: 'from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/30',
    },
    {
      id: 'iron-pumper',
      title: 'Heavy Lifter',
      description: 'Lifted a cumulative total of 10,000 kg.',
      category: 'strength',
      icon: LuAward,
      unlocked: true,
      date: 'May 24, 2026',
      color: 'from-purple-500/20 to-purple-500/5 text-purple-400 border-purple-500/30',
    },
    {
      id: 'goal-getter',
      title: 'Target Crusher',
      description: 'Hit all weekly fitness goals for 2 consecutive weeks.',
      category: 'milestone',
      icon: LuTarget,
      unlocked: false,
      progress: 80,
      color: 'from-sky-500/20 to-sky-500/5 text-sky-400 border-sky-500/30',
    },
    {
      id: 'monthly-beast',
      title: '30-Day Warrior',
      description: 'Complete 30 workouts in a single calendar month.',
      category: 'streak',
      icon: LuTrophy,
      unlocked: false,
      progress: 45,
      color: 'from-rose-500/20 to-rose-500/5 text-rose-400 border-rose-500/30',
    },
    {
      id: 'century-club',
      title: 'Century Club',
      description: 'Log 100 total completed workouts.',
      category: 'milestone',
      icon: LuZap,
      unlocked: false,
      progress: 24,
      color: 'from-indigo-500/20 to-indigo-500/5 text-indigo-400 border-indigo-500/30',
    },
  ];

  const filteredAchievements = achievements.filter((item) => {
    if (activeTab === 'unlocked') return item.unlocked;
    if (activeTab === 'locked') return !item.unlocked;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
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
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">Achievements</h1>
            <p className="text-xs text-base-content/60">Badges & Fitness Milestones</p>
          </div>
        </div>

        <button 
          type="button" 
          aria-label="Share Achievements"
          className="btn btn-circle btn-ghost btn-sm bg-base-200 border border-base-300 hover:bg-base-300"
        >
          <HiShare className="text-lg" />
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        {summaryStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.label}
              className="bg-base-200 p-4 md:p-5 rounded-2xl border border-base-300 flex items-center gap-4 shadow-sm"
            >
              <div className={`p-3 rounded-xl bg-base-100 ${stat.color} border border-base-300`}>
                <Icon className="text-2xl" />
              </div>
              <div>
                <p className="text-xs font-bold text-base-content/60 uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl md:text-2xl font-black mt-0.5">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-between items-center border-b border-base-300 pb-3">
        <div className="bg-base-200 p-1 rounded-2xl border border-base-300 flex items-center gap-1">
          {['all', 'unlocked', 'locked'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-primary text-primary-content shadow-sm'
                  : 'text-base-content/60 hover:text-base-content'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <span className="text-xs font-semibold text-base-content/60 hidden sm:inline-block">
          Showing {filteredAchievements.length} Badges
        </span>
      </div>

      {/* Achievements Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {filteredAchievements.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`relative bg-base-200 p-5 md:p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between shadow-sm ${
                item.unlocked
                  ? 'border-base-300 hover:border-primary/50'
                  : 'border-base-300/60 opacity-80'
              }`}
            >
              <div>
                {/* Header: Icon & Status Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${item.color} border`}>
                    <Icon className="text-2xl" />
                  </div>

                  {item.unlocked ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-success bg-success/10 px-2.5 py-1 rounded-full border border-success/20">
                      <HiCheckCircle className="text-sm" />
                      Unlocked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-base-content/50 bg-base-100 px-2.5 py-1 rounded-full border border-base-300">
                      <HiLockClosed className="text-xs" />
                      Locked
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <h2 className="text-lg font-bold mb-1.5">{item.title}</h2>
                <p className="text-xs md:text-sm text-base-content/70 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Progress Bar (Locked) or Completion Date (Unlocked) */}
              <div className="pt-2 border-t border-base-300/50">
                {item.unlocked ? (
                  <p className="text-[11px] font-semibold text-base-content/50">
                    Earned on {item.date}
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-base-content/60">Progress</span>
                      <span className="text-primary">{item.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-base-100 rounded-full overflow-hidden border border-base-300">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievement;