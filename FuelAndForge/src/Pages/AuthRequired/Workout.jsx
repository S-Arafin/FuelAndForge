import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  ArrowLeft,
  Check,
  Clock,
  Activity,
  Save,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";

const Workout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const routine = location.state?.routine;

  const [workoutExercises, setWorkoutExercises] = useState(() => {
    if (!routine?.exercises) {
      return [];
    }

    return routine.exercises.map((item) => ({
      exerciseId:
        typeof item.exerciseId === "object"
          ? item.exerciseId._id
          : item.exerciseId,

      name:
        typeof item.exerciseId === "object"
          ? item.exerciseId.name
          : "Exercise",

      bodyPart:
        typeof item.exerciseId === "object"
          ? item.exerciseId.bodyPart
          : "",

      sets: item.sets || 3,
      reps: item.reps || 10,
      weight: item.weight || 0,
      duration: 0,
      restTime: item.restTime || 60,
    }));
  });

  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  // Rest timer states
  const [activeTimerIndex, setActiveTimerIndex] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  // Rest timer countdown
  useEffect(() => {
    if (!timerRunning || activeTimerIndex === null) {
      return;
    }

    if (timeLeft <= 0) {
      setTimerRunning(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previousTime) => previousTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timerRunning, activeTimerIndex, timeLeft]);

  if (!routine) {
    return (
      <div className="min-h-screen bg-base-100 text-base-content flex items-center justify-center p-6">
        <div className="text-center">
          <Activity
            size={50}
            className="text-primary mx-auto mb-4"
          />

          <h2 className="text-2xl font-bold mb-2">
            No Workout Found
          </h2>

          <p className="text-base-content/60 mb-6">
            Please select a routine first to start a workout.
          </p>

          <button
            onClick={() =>
              navigate("/dashboard/workouts/routine")
            }
            className="bg-primary hover:bg-primary/90 text-primary-content font-semibold px-5 py-3 rounded-xl transition"
          >
            Go to Routines
          </button>
        </div>
      </div>
    );
  }

  const handleExerciseChange = (
    index,
    field,
    value
  ) => {
    setWorkoutExercises((previous) =>
      previous.map((exercise, i) =>
        i === index
          ? {
              ...exercise,
              [field]: value,
            }
          : exercise
      )
    );
  };

  // Start rest timer
  const handleStartRest = (index) => {
    const exercise = workoutExercises[index];

    const selectedRestTime =
      Number(exercise.restTime) || 60;

    setActiveTimerIndex(index);
    setTimeLeft(selectedRestTime);
    setTimerRunning(true);
  };

  // Pause / Resume timer
  const handlePauseResume = () => {
    if (timeLeft <= 0) {
      return;
    }

    setTimerRunning((previous) => !previous);
  };

  // Reset timer
  const handleResetTimer = () => {
    if (activeTimerIndex === null) {
      return;
    }

    const exercise = workoutExercises[activeTimerIndex];

    const selectedRestTime =
      Number(exercise.restTime) || 60;

    setTimeLeft(selectedRestTime);
    setTimerRunning(false);
  };

  const handleSaveWorkout = async () => {
    if (workoutExercises.length === 0) {
      alert("This routine has no exercises.");
      return;
    }

    try {
      setSaving(true);

      const workoutData = {
        routineId: routine._id,

        exercises: workoutExercises.map(
          (exercise) => ({
            exerciseId: exercise.exerciseId,
            sets: Number(exercise.sets),
            reps: Number(exercise.reps),
            weight: Number(exercise.weight),
            duration: Number(exercise.duration),
          })
        ),

        notes: notes,
      };

      console.log("Workout data:", workoutData);

      const response = await fetch(
        "http://localhost:3000/api/workouts",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(workoutData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save workout"
        );
      }

      alert("Workout saved successfully!");

      navigate("/dashboard/workouts/history");
    } catch (error) {
      console.error("Save workout error:", error);

      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content px-4 sm:px-6 lg:px-8 py-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-base-content/60 hover:text-primary transition mb-4"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Activity
                  size={24}
                  className="text-primary"
                />
              </div>

              <div>

                <p className="text-sm text-primary font-medium mb-1">
                  ACTIVE WORKOUT
                </p>

                <h1 className="text-3xl font-bold">
                  {routine.name}
                </h1>

                <p className="text-base-content/60 mt-1">
                  {routine.description ||
                    "Complete your workout"}
                </p>

              </div>

            </div>

          </div>

          <button
            onClick={handleSaveWorkout}
            disabled={
              saving ||
              workoutExercises.length === 0
            }
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:bg-base-300 disabled:text-base-content/30 text-primary-content font-semibold px-5 py-3 rounded-xl transition"
          >
            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save Workout"}
          </button>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

          <div className="bg-base-200 border border-base-300 rounded-2xl p-5">

            <p className="text-sm text-base-content/60">
              Exercises
            </p>

            <h2 className="text-2xl font-bold mt-1 text-primary">
              {workoutExercises.length}
            </h2>

          </div>

          <div className="bg-base-200 border border-base-300 rounded-2xl p-5">

            <p className="text-sm text-base-content/60">
              Routine
            </p>

            <h2 className="text-xl font-bold mt-1 truncate">
              {routine.name}
            </h2>

          </div>

          <div className="bg-base-200 border border-base-300 rounded-2xl p-5">

            <p className="text-sm text-base-content/60">
              Status
            </p>

            <div className="flex items-center gap-2 mt-2 text-secondary font-semibold">

              <span className="w-2 h-2 rounded-full bg-secondary"></span>

              In Progress

            </div>

          </div>

        </div>

        {/* Exercise List */}
        <div className="space-y-5">

          {workoutExercises.map(
            (exercise, index) => (

              <div
                key={`${exercise.exerciseId}-${index}`}
                className="bg-base-200 border border-base-300 rounded-2xl p-5 md:p-6"
              >

                {/* Exercise Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                  <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">

                      <Activity
                        size={21}
                        className="text-primary"
                      />

                    </div>

                    <div>

                      <h2 className="text-lg font-bold">
                        {exercise.name}
                      </h2>

                      <p className="text-sm text-base-content/50">
                        {exercise.bodyPart ||
                          "Workout"}
                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-2 text-sm text-base-content/60">

                    <Clock size={16} />

                    Rest: {exercise.restTime}s

                  </div>

                </div>

                {/* Rest Timer */}
                <div className="mb-6 bg-base-100 border border-base-300 rounded-xl p-4">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <div>

                      <p className="text-sm text-base-content/60">
                        Rest Timer
                      </p>

                      {activeTimerIndex === index ? (
                        <h3 className="text-3xl font-bold text-primary mt-1">
                          {timeLeft}s
                        </h3>
                      ) : (
                        <h3 className="text-2xl font-bold mt-1">
                          {exercise.restTime}s
                        </h3>
                      )}

                    </div>

                    <div className="flex flex-wrap items-center gap-2">

                      {activeTimerIndex !== index ||
                      timeLeft <= 0 ? (
                        <button
                          onClick={() =>
                            handleStartRest(index)
                          }
                          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-content font-semibold px-4 py-2.5 rounded-xl transition"
                        >
                          <Play size={16} />

                          Start Rest
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={handlePauseResume}
                            className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-content font-semibold px-4 py-2.5 rounded-xl transition"
                          >
                            {timerRunning ? (
                              <>
                                <Pause size={16} />
                                Pause
                              </>
                            ) : (
                              <>
                                <Play size={16} />
                                Resume
                              </>
                            )}
                          </button>

                          <button
                            onClick={handleResetTimer}
                            className="flex items-center gap-2 border border-base-300 hover:bg-base-200 font-semibold px-4 py-2.5 rounded-xl transition"
                          >
                            <RotateCcw size={16} />
                            Reset
                          </button>
                        </>
                      )}

                    </div>

                  </div>

                  {activeTimerIndex === index &&
                    timeLeft <= 0 && (
                      <div className="flex items-center gap-2 mt-4 text-primary font-semibold">

                        <Check size={17} />

                        Rest Complete

                      </div>
                    )}

                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

                  {/* Sets */}
                  <div>

                    <label className="block text-sm font-medium mb-2">
                      Sets
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={exercise.sets}
                      onChange={(e) =>
                        handleExerciseChange(
                          index,
                          "sets",
                          e.target.value
                        )
                      }
                      className="w-full bg-base-100 border border-base-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded-xl px-4 py-3"
                    />

                  </div>

                  {/* Reps */}
                  <div>

                    <label className="block text-sm font-medium mb-2">
                      Reps
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={exercise.reps}
                      onChange={(e) =>
                        handleExerciseChange(
                          index,
                          "reps",
                          e.target.value
                        )
                      }
                      className="w-full bg-base-100 border border-base-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded-xl px-4 py-3"
                    />

                  </div>

                  {/* Weight */}
                  <div>

                    <label className="block text-sm font-medium mb-2">
                      Weight (kg)
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={exercise.weight}
                      onChange={(e) =>
                        handleExerciseChange(
                          index,
                          "weight",
                          e.target.value
                        )
                      }
                      className="w-full bg-base-100 border border-base-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded-xl px-4 py-3"
                    />

                  </div>

                  {/* Duration */}
                  <div>

                    <label className="block text-sm font-medium mb-2">
                      Duration (min)
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={exercise.duration}
                      onChange={(e) =>
                        handleExerciseChange(
                          index,
                          "duration",
                          e.target.value
                        )
                      }
                      className="w-full bg-base-100 border border-base-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded-xl px-4 py-3"
                    />

                  </div>

                  {/* Rest Time */}
                  <div>

                    <label className="block text-sm font-medium mb-2">
                      Rest Time (sec)
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={exercise.restTime}
                      onChange={(e) =>
                        handleExerciseChange(
                          index,
                          "restTime",
                          e.target.value
                        )
                      }
                      className="w-full bg-base-100 border border-base-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded-xl px-4 py-3"
                    />

                  </div>

                </div>

                {/* Exercise Info */}
                <div className="mt-5 pt-5 border-t border-base-300">

                  <div className="flex items-center gap-2 text-sm text-base-content/60">

                    <Check
                      size={16}
                      className="text-primary"
                    />

                    Record your actual performance
                    before saving.

                  </div>

                </div>

              </div>

            )
          )}

        </div>

        {/* Notes */}
        <div className="bg-base-200 border border-base-300 rounded-2xl p-5 md:p-6 mt-6">

          <h2 className="text-lg font-bold mb-4">
            Workout Notes
          </h2>

          <textarea
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            rows="5"
            placeholder="Write something about today's workout..."
            className="w-full bg-base-100 border border-base-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded-xl px-4 py-3 resize-none placeholder:text-base-content/30"
          />

        </div>

        {/* Bottom Save */}
        <div className="flex justify-end mt-6 pb-8">

          <button
            onClick={handleSaveWorkout}
            disabled={
              saving ||
              workoutExercises.length === 0
            }
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:bg-base-300 disabled:text-base-content/30 text-primary-content font-semibold px-6 py-3 rounded-xl transition"
          >

            <Save size={18} />

            {saving
              ? "Saving Workout..."
              : "Save Workout"}

          </button>

        </div>

      </div>

    </div>
  );
};

export default Workout;