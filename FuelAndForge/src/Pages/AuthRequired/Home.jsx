import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  HiBell,
  HiPlay,
  HiFire,
  HiChevronRight,
} from "react-icons/hi";
import {
  IoBarbellOutline,
  IoWaterOutline,
  IoFootstepsOutline,
} from "react-icons/io5";

const Home = () => {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/dashboard");

        if (!response.ok) {
          throw new Error("Failed to load dashboard");
        }

        const data = await response.json();
        setDashboard(data);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const handleStartWorkout = () => {
    navigate("/dashboard/workouts/routine");
  };

  const latestWeight = dashboard?.latestBodyStats?.weight || 0;
  const latestBMI = dashboard?.latestBodyStats?.bmi || 0;

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
            <p className="text-xs text-base-content/70">
              Good morning,
            </p>
            <h2 className="font-bold text-lg tracking-tight">
              Hello, Alex!
            </h2>
          </div>
        </div>

        <button className="btn btn-ghost btn-circle btn-sm">
          <HiBell className="text-xl" />
        </button>
      </div>

      {/* Start Workout Action */}
      <div className="flex items-center justify-center">
        <button
          onClick={handleStartWorkout}
          className="btn btn-primary py-4 text-lg font-bold gap-2 shadow-lg shadow-primary/20 md:py-6"
        >
          <HiPlay className="text-2xl" />
          <span>Start Workout</span>
        </button>
      </div>

      {/* Dashboard Summary */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Dashboard Summary</h3>

          {loading && (
            <span className="loading loading-spinner loading-sm text-primary"></span>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {/* Exercises */}
          <div className="bg-base-200 p-4 rounded-2xl border border-base-300 shadow-sm">
            <p className="text-xs text-base-content/60">
              Exercises
            </p>
            <p className="text-2xl font-bold mt-1">
              {loading ? "..." : dashboard?.totalExercises || 0}
            </p>
          </div>

          {/* Routines */}
          <div className="bg-base-200 p-4 rounded-2xl border border-base-300 shadow-sm">
            <p className="text-xs text-base-content/60">
              Routines
            </p>
            <p className="text-2xl font-bold mt-1">
              {loading ? "..." : dashboard?.totalRoutines || 0}
            </p>
          </div>

          {/* Workouts */}
          <div className="bg-base-200 p-4 rounded-2xl border border-base-300 shadow-sm">
            <p className="text-xs text-base-content/60">
              Workouts
            </p>
            <p className="text-2xl font-bold mt-1">
              {loading ? "..." : dashboard?.totalWorkouts || 0}
            </p>
          </div>

          {/* Foods */}
          <div className="bg-base-200 p-4 rounded-2xl border border-base-300 shadow-sm">
            <p className="text-xs text-base-content/60">
              Foods
            </p>
            <p className="text-2xl font-bold mt-1">
              {loading ? "..." : dashboard?.totalFoods || 0}
            </p>
          </div>

          {/* Meals */}
          <div className="bg-base-200 p-4 rounded-2xl border border-base-300 shadow-sm">
            <p className="text-xs text-base-content/60">
              Meals
            </p>
            <p className="text-2xl font-bold mt-1">
              {loading ? "..." : dashboard?.totalMeals || 0}
            </p>
          </div>
        </div>
      </section>

      {/* Today's Progress Section */}
      <section className="space-y-3">
        <h3 className="font-bold text-lg">Today's Progress</h3>

        <div className="bg-base-200 p-6 rounded-3xl grid grid-cols-3 gap-4 border border-base-300 shadow-sm">
          {/* Calorie Circle */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="radial-progress text-primary"
              style={{
                "--value": 70,
                "--size": "3.8rem",
                "--thickness": "5px",
              }}
              role="progressbar"
            >
              <HiFire className="text-lg" />
            </div>

            <div className="text-center">
              <p className="font-bold text-sm">1.2k</p>
              <p className="text-[10px] text-base-content/60 uppercase font-semibold">
                Kcal
              </p>
            </div>
          </div>

          {/* Water Circle */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="radial-progress text-info"
              style={{
                "--value": 60,
                "--size": "3.8rem",
                "--thickness": "5px",
              }}
              role="progressbar"
            >
              <IoWaterOutline className="text-lg" />
            </div>

            <div className="text-center">
              <p className="font-bold text-sm">1.8L</p>
              <p className="text-[10px] text-base-content/60 uppercase font-semibold">
                Water
              </p>
            </div>
          </div>

          {/* Steps Circle */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="radial-progress text-secondary"
              style={{
                "--value": 45,
                "--size": "3.8rem",
                "--thickness": "5px",
              }}
              role="progressbar"
            >
              <IoFootstepsOutline className="text-lg" />
            </div>

            <div className="text-center">
              <p className="font-bold text-sm">4.5k</p>
              <p className="text-[10px] text-base-content/60 uppercase font-semibold">
                Steps
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Body Stats */}
      <section className="space-y-3">
        <h3 className="font-bold text-lg">Latest Body Stats</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-base-200 p-4 rounded-2xl border border-base-300">
            <p className="text-xs text-base-content/60">
              Latest Weight
            </p>

            <p className="text-2xl font-bold mt-1">
              {loading ? "..." : `${latestWeight} kg`}
            </p>
          </div>

          <div className="bg-base-200 p-4 rounded-2xl border border-base-300">
            <p className="text-xs text-base-content/60">
              Latest BMI
            </p>

            <p className="text-2xl font-bold mt-1">
              {loading ? "..." : latestBMI}
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Workout Section */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Upcoming Workout</h3>

          <button
            onClick={() => navigate("/dashboard/workouts/routine")}
            className="text-xs text-primary font-semibold hover:underline"
          >
            See all
          </button>
        </div>

        <div className="bg-base-200 p-4 rounded-2xl flex items-center justify-between border border-base-300">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-base-300 text-primary">
              <IoBarbellOutline className="text-2xl" />
            </div>

            <div>
              <h4 className="font-bold text-base">
                Push Day Routine
              </h4>

              <p className="text-xs text-base-content/60">
                ⏱ 45 mins • 📋 5 exercises
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/dashboard/workouts/routine")}
            className="btn btn-circle btn-ghost btn-sm"
          >
            <HiChevronRight className="text-lg" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;