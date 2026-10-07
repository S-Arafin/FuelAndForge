import { useEffect, useState } from "react";
import {
  Dumbbell,
  CalendarDays,
  Clock,
  Repeat,
  Weight,
  FileText,
} from "lucide-react";

const WorkoutHistory = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch workout history
  const fetchWorkoutHistory = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/workout-history"
      );

      const data = await response.json();

      if (response.ok) {
        setWorkouts(data);
      } else {
        console.error("Failed to load workout history");
      }
    } catch (error) {
      console.error("Workout history error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const loadHistory = async () => {
    await fetchWorkoutHistory();
  };

  loadHistory();
}, []);

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format time
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate total sets
  const getTotalSets = (workout) => {
    return workout.exercises?.reduce(
      (total, exercise) => total + Number(exercise.sets || 0),
      0
    );
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-primary font-medium mb-2">
            WORKOUT TRACKER
          </p>

          <h1 className="text-3xl md:text-4xl font-bold">
            Workout History
          </h1>

          <p className="text-base-content/60 mt-2">
            Review your previous workouts and track your training progress.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

          {/* Total Workouts */}
          <div className="bg-base-200 border border-base-300 rounded-2xl p-5">
            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <Dumbbell
                  size={22}
                  className="text-primary"
                />
              </div>

              <div>
                <p className="text-base-content/60 text-sm">
                  Total Workouts
                </p>

                <h2 className="text-2xl font-bold">
                  {workouts.length}
                </h2>
              </div>

            </div>
          </div>

          {/* Total Exercises */}
          <div className="bg-base-200 border border-base-300 rounded-2xl p-5">
            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Repeat
                  size={22}
                  className="text-secondary"
                />
              </div>

              <div>
                <p className="text-base-content/60 text-sm">
                  Exercises Logged
                </p>

                <h2 className="text-2xl font-bold">
                  {workouts.reduce(
                    (total, workout) =>
                      total + (workout.exercises?.length || 0),
                    0
                  )}
                </h2>
              </div>

            </div>
          </div>

          {/* Total Sets */}
          <div className="bg-base-200 border border-base-300 rounded-2xl p-5">
            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <Weight
                  size={22}
                  className="text-primary"
                />
              </div>

              <div>
                <p className="text-base-content/60 text-sm">
                  Total Sets
                </p>

                <h2 className="text-2xl font-bold">
                  {workouts.reduce(
                    (total, workout) =>
                      total + getTotalSets(workout),
                    0
                  )}
                </h2>
              </div>

            </div>
          </div>

        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">

            <div className="w-10 h-10 border-4 border-base-300 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>

            <p className="text-base-content/60">
              Loading workout history...
            </p>

          </div>
        )}

        {/* Empty State */}
        {!loading && workouts.length === 0 && (
          <div className="bg-base-200 border border-base-300 rounded-2xl py-20 px-6 text-center">

            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Dumbbell
                size={30}
                className="text-primary"
              />
            </div>

            <h2 className="text-xl font-bold mb-2">
              No workouts yet
            </h2>

            <p className="text-base-content/60 max-w-md mx-auto">
              Your completed workouts will appear here.
            </p>

          </div>
        )}

        {/* Workout History */}
        {!loading && workouts.length > 0 && (
          <div className="space-y-6">

            {workouts.map((workout) => (

              <div
                key={workout._id}
                className="bg-base-200 border border-base-300 rounded-2xl overflow-hidden"
              >

                {/* Workout Header */}
                <div className="p-5 border-b border-base-300">

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div className="flex items-center gap-3">

                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Dumbbell
                          size={23}
                          className="text-primary"
                        />
                      </div>

                      <div>

                        <h2 className="text-xl font-bold">
                          {workout.routineId?.name ||
                            "Workout"}
                        </h2>

                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-base-content/60">

                          <span className="flex items-center gap-1">
                            <CalendarDays size={15} />
                            {formatDate(workout.date)}
                          </span>

                          <span className="flex items-center gap-1">
                            <Clock size={15} />
                            {formatTime(workout.date)}
                          </span>

                        </div>

                      </div>

                    </div>

                    <div className="text-sm text-base-content/60">

                      <span>
                        {workout.exercises?.length || 0} exercises
                      </span>

                      <span className="mx-2 text-base-content/30">
                        •
                      </span>

                      <span>
                        {getTotalSets(workout)} sets
                      </span>

                    </div>

                  </div>

                </div>

                {/* Exercises */}
                <div className="p-5">

                  <div className="space-y-3">

                    {workout.exercises?.map(
                      (exercise, index) => (

                        <div
                          key={exercise._id || index}
                          className="bg-base-100 border border-base-300 rounded-xl p-4"
                        >

                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                            {/* Exercise Name */}
                            <div className="flex items-center gap-3">

                              <div className="w-9 h-9 rounded-lg bg-base-300 flex items-center justify-center">
                                <Dumbbell
                                  size={17}
                                  className="text-base-content/70"
                                />
                              </div>

                              <div>

                                <h3 className="font-medium">
                                  {exercise.exerciseId?.name ||
                                    "Exercise"}
                                </h3>

                                <p className="text-xs text-base-content/50">
                                  {exercise.exerciseId?.bodyPart ||
                                    "Workout"}
                                </p>

                              </div>

                            </div>

                            {/* Exercise Stats */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">

                              <div className="bg-base-300/50 rounded-lg px-4 py-2 min-w-[85px]">
                                <p className="text-[11px] text-base-content/50">
                                  Sets
                                </p>

                                <p className="font-semibold text-sm">
                                  {exercise.sets}
                                </p>
                              </div>

                              <div className="bg-base-300/50 rounded-lg px-4 py-2 min-w-[85px]">
                                <p className="text-[11px] text-base-content/50">
                                  Reps
                                </p>

                                <p className="font-semibold text-sm">
                                  {exercise.reps}
                                </p>
                              </div>

                              <div className="bg-base-300/50 rounded-lg px-4 py-2 min-w-[85px]">
                                <p className="text-[11px] text-base-content/50">
                                  Weight
                                </p>

                                <p className="font-semibold text-sm">
                                  {exercise.weight} kg
                                </p>
                              </div>

                              <div className="bg-base-300/50 rounded-lg px-4 py-2 min-w-[85px]">
                                <p className="text-[11px] text-base-content/50">
                                  Duration
                                </p>

                                <p className="font-semibold text-sm">
                                  {exercise.duration} min
                                </p>
                              </div>

                            </div>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                  {/* Notes */}
                  {workout.notes && (
                    <div className="mt-4 bg-base-300/30 border border-base-300 rounded-xl p-4">

                      <div className="flex items-start gap-3">

                        <FileText
                          size={18}
                          className="text-base-content/70 mt-0.5"
                        />

                        <div>

                          <p className="text-sm font-medium mb-1">
                            Notes
                          </p>

                          <p className="text-sm text-base-content/60">
                            {workout.notes}
                          </p>

                        </div>

                      </div>

                    </div>
                  )}

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default WorkoutHistory;