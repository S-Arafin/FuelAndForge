import { useEffect, useState } from "react";
import { HiChevronLeft, HiPlus } from "react-icons/hi";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useNavigate } from "react-router";

const API = "http://localhost:3000/api";

const Profile = () => {
  const navigate = useNavigate();

  const [bodyStats, setBodyStats] = useState([]);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    weight: "",
    bmi: "",
    chest: "",
    waist: "",
    arms: "",
  });

  useEffect(() => {
    const loadProfileData = async () => {
    try {
      setLoading(true);

      const [bodyStatsResponse, dashboardResponse] = await Promise.all([
        fetch(`${API}/body-stats`),
        fetch(`${API}/dashboard`),
      ]);

      const bodyStatsData = await bodyStatsResponse.json();
      const dashboardData = await dashboardResponse.json();

      setBodyStats(bodyStatsData);
      setTotalWorkouts(dashboardData.totalWorkouts || 0);
    } catch (error) {
      console.error("Profile data error:", error);
    } finally {
      setLoading(false);
    }
  };
    loadProfileData();
  }, []);

  

  const sortedStats = [...bodyStats].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const latestStats =
    sortedStats.length > 0
      ? sortedStats[sortedStats.length - 1]
      : null;

  const previousStats =
    sortedStats.length > 1
      ? sortedStats[sortedStats.length - 2]
      : null;

  const weightData = sortedStats.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    }),
    weight: item.weight,
  }));

  const getChange = (current, previous, unit = "") => {
    if (
      current === undefined ||
      current === null ||
      previous === undefined ||
      previous === null
    ) {
      return "No previous data";
    }

    const change = Number(current) - Number(previous);

    if (change === 0) {
      return "No change";
    }

    const sign = change > 0 ? "+" : "";

    return `${sign}${change.toFixed(1)} ${unit}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${API}/body-stats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        weight: Number(formData.weight),
        bmi: Number(formData.bmi),
        chest: Number(formData.chest) || 0,
        waist: Number(formData.waist) || 0,
        arms: Number(formData.arms) || 0,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save body stats");
    }

    setFormData({
      weight: "",
      bmi: "",
      chest: "",
      waist: "",
      arms: "",
    });

    setShowForm(false);

    const bodyStatsResponse = await fetch(`${API}/body-stats`);

    if (!bodyStatsResponse.ok) {
      throw new Error("Failed to reload body stats");
    }

    const updatedBodyStats = await bodyStatsResponse.json();

    setBodyStats(updatedBodyStats);
  } catch (error) {
    console.error("Save body stats error:", error);
  }
};

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn-circle btn-ghost btn-sm bg-base-200 border border-base-300 hover:bg-base-300"
        >
          <HiChevronLeft className="text-xl" />
        </button>

        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            Body Metrics
          </h1>

          <p className="text-xs text-base-content/60">
            {latestStats
              ? `Last updated: ${new Date(
                  latestStats.date
                ).toLocaleDateString()}`
              : "No body metrics recorded yet"}
          </p>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {!loading && (
        <>
          {/* Profile Summary */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-base-200 p-5 rounded-3xl border border-base-300">
              <p className="text-xs font-bold text-base-content/60 uppercase">
                Total Workouts
              </p>

              <p className="text-3xl font-black mt-2">
                {totalWorkouts}
              </p>
            </div>

            <div className="bg-base-200 p-5 rounded-3xl border border-base-300">
              <p className="text-xs font-bold text-base-content/60 uppercase">
                Current Weight
              </p>

              <p className="text-3xl font-black mt-2">
                {latestStats ? `${latestStats.weight} kg` : "N/A"}
              </p>
            </div>

            <div className="bg-base-200 p-5 rounded-3xl border border-base-300">
              <p className="text-xs font-bold text-base-content/60 uppercase">
                Current BMI
              </p>

              <p className="text-3xl font-black mt-2">
                {latestStats ? latestStats.bmi : "N/A"}
              </p>
            </div>
          </section>

          {/* Weight Chart */}
          <section className="bg-base-200 p-5 md:p-6 rounded-3xl border border-base-300">
            <div className="mb-4">
              <p className="text-xs font-bold text-base-content/60 uppercase tracking-wider">
                Weight Progress
              </p>

              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl md:text-4xl font-black">
                  {latestStats ? latestStats.weight : "N/A"}
                </span>

                {latestStats && (
                  <span className="text-sm font-bold text-base-content/60">
                    kg
                  </span>
                )}
              </div>
            </div>

            <div className="h-64 w-full">
              {weightData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weightData}>
                    <defs>
                      <linearGradient
                        id="weightGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--p)"
                          stopOpacity={0.4}
                        />

                        <stop
                          offset="95%"
                          stopColor="var(--p)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <XAxis
                      dataKey="date"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />

                    <YAxis
                      domain={["dataMin - 1", "dataMax + 1"]}
                      hide
                    />

                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="weight"
                      stroke="#374151"
                      strokeWidth={3}
                      fill="url(#weightGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-sm text-base-content/60">
                  No weight history available
                </div>
              )}
            </div>
          </section>

          {/* Measurements */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">
                Body Measurements
              </h3>

              <span className="text-xs text-base-content/60">
                Latest record
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Chest */}
              <div className="bg-base-200 p-4 rounded-2xl border border-base-300">
                <p className="text-xs font-bold text-base-content/60">
                  CHEST
                </p>

                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-black">
                    {latestStats?.chest || 0}
                  </span>

                  <span className="text-xs text-base-content/60">
                    in
                  </span>
                </div>

                <p className="text-xs text-primary font-bold mt-2">
                  {getChange(
                    latestStats?.chest,
                    previousStats?.chest,
                    "in"
                  )}
                </p>
              </div>

              {/* Waist */}
              <div className="bg-base-200 p-4 rounded-2xl border border-base-300">
                <p className="text-xs font-bold text-base-content/60">
                  WAIST
                </p>

                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-black">
                    {latestStats?.waist || 0}
                  </span>

                  <span className="text-xs text-base-content/60">
                    in
                  </span>
                </div>

                <p className="text-xs text-primary font-bold mt-2">
                  {getChange(
                    latestStats?.waist,
                    previousStats?.waist,
                    "in"
                  )}
                </p>
              </div>

              {/* Arms */}
              <div className="bg-base-200 p-4 rounded-2xl border border-base-300">
                <p className="text-xs font-bold text-base-content/60">
                  ARMS
                </p>

                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-black">
                    {latestStats?.arms || 0}
                  </span>

                  <span className="text-xs text-base-content/60">
                    in
                  </span>
                </div>

                <p className="text-xs text-primary font-bold mt-2">
                  {getChange(
                    latestStats?.arms,
                    previousStats?.arms,
                    "in"
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* Log New Metrics */}
          <section>
            {!showForm ? (
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="btn btn-primary w-full py-4 font-bold rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                <HiPlus className="text-xl" />
                <span>LOG NEW METRICS</span>
              </button>
            ) : (
              <div className="bg-base-200 p-5 md:p-6 rounded-3xl border border-base-300">
                <h3 className="font-bold text-lg mb-4">
                  Add New Body Metrics
                </h3>

                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">
                        Weight (kg)
                      </span>
                    </label>

                    <input
                      type="number"
                      step="0.1"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">
                        BMI
                      </span>
                    </label>

                    <input
                      type="number"
                      step="0.1"
                      name="bmi"
                      value={formData.bmi}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">
                        Chest (in)
                      </span>
                    </label>

                    <input
                      type="number"
                      step="0.1"
                      name="chest"
                      value={formData.chest}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">
                        Waist (in)
                      </span>
                    </label>

                    <input
                      type="number"
                      step="0.1"
                      name="waist"
                      value={formData.waist}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">
                        Arms (in)
                      </span>
                    </label>

                    <input
                      type="number"
                      step="0.1"
                      name="arms"
                      value={formData.arms}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="md:col-span-2 flex gap-3 mt-2">
                    <button
                      type="submit"
                      className="btn btn-primary flex-1"
                    >
                      Save Metrics
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="btn btn-ghost"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Profile;