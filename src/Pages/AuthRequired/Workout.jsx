import React from 'react';
import { useNavigate } from 'react-router';
import { 
  HiChevronLeft, 
  HiDotsVertical, 
  HiChevronRight, 
  HiHome 
} from 'react-icons/hi';
import { LuPersonStanding, LuDumbbell, LuLayers } from 'react-icons/lu';

const Workout = () => {
  const navigate = useNavigate();

  const tracks = [
    {
      id: 'calisthenics',
      title: 'Calisthenics',
      description: 'Master your bodyweight with gymnastics-inspired movements.',
      badge: 'All Levels',
      icon: LuPersonStanding,
      badgeIcon: LuLayers,
      accentColor: 'text-sky-400 bg-sky-400/10',
      link: "/dashboard/workouts/calisthenics" // Ensure path matches your router exactly
    },
    {
      id: 'home-workout',
      title: 'Home Workout',
      description: 'No equipment needed. Effective routines for any space.',
      badge: 'Beginner Friendly',
      icon: HiHome,
      badgeIcon: LuLayers,
      accentColor: 'text-primary bg-primary/10',
      link: "/dashboard/workouts/home-workout" // Added link
    },
    {
      id: 'weight-training',
      title: 'Weight Training',
      description: 'Build maximum strength and muscle with weights.',
      badge: 'Gym Required',
      icon: LuDumbbell,
      badgeIcon: LuLayers,
      accentColor: 'text-secondary bg-secondary/10',
      link: "/dashboard/workouts/weight-training" // Added link
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="btn btn-circle btn-ghost btn-sm bg-base-200 border border-base-300 hover:bg-base-300"
          >
            <HiChevronLeft className="text-xl" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Select Track</h1>
        </div>
        <button className="btn btn-circle btn-ghost btn-sm bg-base-200 border border-base-300 hover:bg-base-300">
          <HiDotsVertical className="text-lg" />
        </button>
      </div>

      {/* Track List Section */}
      <div>
        <p className="text-xs font-bold text-base-content/60 uppercase tracking-widest mb-4">
          Available Tracks
        </p>

        {/* Responsive Grid: 1 column on Mobile, 2 on Tablet, 3 on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {tracks.map((track) => {
            const Icon = track.icon;
            const BadgeIcon = track.badgeIcon;

            return (
              <div
                key={track.id}
                onClick={() => navigate(track.link)} // Added click handler here
                className="group bg-base-200 hover:bg-base-300/60 p-5 md:p-6 rounded-3xl border border-base-300 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Icon & Arrow */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3.5 rounded-2xl ${track.accentColor}`}>
                      <Icon className="text-2xl" />
                    </div>
                    <div className="p-2 rounded-full bg-base-100 group-hover:translate-x-1 transition-transform duration-200 text-base-content/60">
                      <HiChevronRight className="text-lg" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-lg md:text-xl font-bold mb-1.5 group-hover:text-primary transition-colors">
                    {track.title}
                  </h2>
                  <p className="text-xs md:text-sm text-base-content/70 leading-relaxed mb-6">
                    {track.description}
                  </p>
                </div>

                {/* Badge Tag */}
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-base-100 border border-base-300 text-[11px] font-semibold text-base-content/70">
                    <BadgeIcon className="text-xs text-primary" />
                    {track.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Workout;