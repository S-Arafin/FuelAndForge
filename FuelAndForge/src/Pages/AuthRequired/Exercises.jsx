import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  FiChevronLeft,
  FiSearch,
  FiPlayCircle,
  FiFileText,
  FiX,
} from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";

const Exercises = () => {
  const navigate = useNavigate();

  const [exercises, setExercises] = useState([]);
  const [search, setSearch] = useState("");
  const [activeBodyPart, setActiveBodyPart] = useState("All");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [loading, setLoading] = useState(true);

  // Routine states
  const [routines, setRoutines] = useState([]);
  const [showRoutineModal, setShowRoutineModal] = useState(false);
  const [exerciseToAdd, setExerciseToAdd] = useState(null);

  // Workout values
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [weight, setWeight] = useState(0);
  const [restTime, setRestTime] = useState(60);

  const [addingToRoutine, setAddingToRoutine] = useState(false);

  const bodyParts = [
    "All",
    "Chest",
    "Back",
    "Legs",
    "Shoulders",
    "Arms",
    "Core",
  ];

  // Load exercises
  useEffect(() => {
    const loadExercises = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/exercises"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch exercises");
        }

        const data = await response.json();

        setExercises(data.exercises || []);
      } catch (error) {
        console.error("Error loading exercises:", error);
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, []);

  // Fetch routines
  const fetchRoutines = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/routines"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch routines");
      }

      const data = await response.json();

      setRoutines(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading routines:", error);
      setRoutines([]);
    }
  };

  // Open Add to Routine modal
  const handleAddToRoutine = async (exercise) => {
    setSelectedExercise(null);

    setExerciseToAdd(exercise);

    setSets(3);
    setReps(10);
    setWeight(0);
    setRestTime(60);

    await fetchRoutines();

    setShowRoutineModal(true);
  };

  // Add exercise to routine
  const addExerciseToRoutine = async (routine) => {
    if (!exerciseToAdd) {
      return;
    }

    if (!routine?._id) {
      toast("Routine ID not found.");
      return;
    }

    if (!exerciseToAdd?._id) {
      toast("Exercise ID not found.");
      return;
    }

    const newExercise = {
      exerciseId: exerciseToAdd._id,
      sets: Number(sets),
      reps: Number(reps),
      weight: Number(weight),
      restTime: Number(restTime),
    };

    // Existing exercises
    const existingExercises = Array.isArray(
      routine.exercises
    )
      ? routine.exercises
      : [];

    const updatedExercises = [
      ...existingExercises,
      newExercise,
    ];

    try {
      setAddingToRoutine(true);

      const response = await fetch(
        `http://localhost:3000/api/routines/${routine._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: routine.name,
            description: routine.description || "",
            exercises: updatedExercises,
          }),
        }
      );

      const data = await response.json();

      console.log("Routine update status:", response.status);
      console.log("Routine update response:", data);

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.error ||
          "Failed to add exercise to routine"
        );
      }

      toast(
        `${exerciseToAdd.name} added to ${routine.name} successfully!`
      );

      // Update routine in local state
      setRoutines((previousRoutines) =>
        previousRoutines.map((item) =>
          item._id === routine._id
            ? data
            : item
        )
      );

      setShowRoutineModal(false);
      setExerciseToAdd(null);
    } catch (error) {
      console.error(
        "Add exercise to routine error:",
        error
      );

      toast(
        error.message ||
        "Failed to add exercise to routine."
      );
    } finally {
      setAddingToRoutine(false);
    }
  };

  // Search + body part filter
  const filteredExercises = exercises.filter(
    (exercise) => {
      const matchesBodyPart =
        activeBodyPart === "All" ||
        exercise.bodyPart === activeBodyPart;

      const matchesSearch = exercise.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesBodyPart && matchesSearch;
    }
  );

  return (
    <div className="min-h-screen bg-base-100 text-base-content pb-24 font-sans">

      {/* Header */}
      <div className="p-6 sticky top-0 bg-base-100/95 backdrop-blur-md z-10">

        <div className="flex items-center gap-4 mb-6">

          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-base-200 rounded-xl flex items-center justify-center hover:bg-base-300 transition"
          >
            <FiChevronLeft size={24} />
          </button>

          <div>
            <h1 className="text-2xl font-bold">
              Exercises
            </h1>

            <p className="text-xs text-base-content/60">
              Browse and select exercises
            </p>
          </div>

        </div>

        {/* Search */}
        <div className="relative mb-5">

          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50"
            size={20}
          />

          <input
            type="text"
            placeholder="Search exercises..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-base-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-primary text-base-content placeholder:text-base-content/40"
          />

        </div>

        {/* Body Part Filter */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">

          {bodyParts.map((part) => (
            <button
              key={part}
              onClick={() =>
                setActiveBodyPart(part)
              }
              className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition ${activeBodyPart === part
                  ? "bg-primary text-primary-content"
                  : "bg-base-200 text-base-content/70 hover:bg-base-300"
                }`}
            >
              {part}
            </button>
          ))}

        </div>

      </div>

      {/* Content */}
      <div className="px-6 pt-6">

        {/* Loading */}
        {loading && (
          <div className="text-center py-10 text-base-content/60">
            Loading exercises...
          </div>
        )}

        {/* No exercises */}
        {!loading &&
          filteredExercises.length === 0 && (
            <div className="text-center py-10">

              <p className="text-base-content/60">
                No exercises found.
              </p>

            </div>
          )}

        {/* Exercise List */}
        {!loading &&
          filteredExercises.length > 0 && (
            <div className="space-y-3">

              {filteredExercises.map(
                (exercise) => (

                  <div
                    key={exercise._id}
                    className="flex items-center gap-4 p-3 rounded-2xl bg-base-200 hover:bg-base-300 transition border border-transparent hover:border-base-300"
                  >

                    {/* Image */}
                    <img
                      src={
                        exercise.imageUrl ||
                        "https://via.placeholder.com/150"
                      }
                      alt={exercise.name}
                      className="w-16 h-16 rounded-xl object-cover bg-base-300"
                    />

                    {/* Exercise Info */}
                    <div className="flex-1 min-w-0">

                      <h3 className="font-bold text-base truncate">
                        {exercise.name}
                      </h3>

                      <p className="text-xs text-primary mt-1">
                        {exercise.bodyPart} •{" "}
                        {exercise.equipment}
                      </p>

                      <p className="text-xs text-base-content/60 mt-1">
                        Difficulty:{" "}
                        {exercise.difficulty}
                      </p>

                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 text-base-content/60">

                      {/* Video */}
                      {exercise.videoUrl && (
                        <a
                          href={exercise.videoUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) =>
                            e.stopPropagation()
                          }
                          className="hover:text-primary transition"
                        >
                          <FiPlayCircle size={22} />
                        </a>
                      )}

                      {/* Details */}
                      <button
                        onClick={() =>
                          setSelectedExercise(
                            exercise
                          )
                        }
                        className="hover:text-secondary transition"
                      >
                        <FiFileText size={22} />
                      </button>

                    </div>

                  </div>

                )
              )}

            </div>
          )}

      </div>

      {/* Exercise Details Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-base-300/70 flex items-center justify-center p-4 z-50">

          <div className="bg-base-200 w-full max-w-lg rounded-3xl overflow-hidden border border-base-300">

            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-base-300">

              <h2 className="text-xl font-bold">
                {selectedExercise.name}
              </h2>

              <button
                onClick={() =>
                  setSelectedExercise(null)
                }
                className="w-9 h-9 rounded-full bg-base-300 flex items-center justify-center hover:bg-base-300/80"
              >
                <FiX size={20} />
              </button>

            </div>

            {/* Image */}
            {selectedExercise.imageUrl && (
              <img
                src={selectedExercise.imageUrl}
                alt={selectedExercise.name}
                className="w-full h-56 object-cover"
              />
            )}

            {/* Details */}
            <div className="p-5 space-y-4">

              <div className="grid grid-cols-2 gap-3">

                <div className="bg-base-300 rounded-xl p-3">

                  <p className="text-xs text-base-content/60">
                    Body Part
                  </p>

                  <p className="font-semibold mt-1">
                    {selectedExercise.bodyPart}
                  </p>

                </div>

                <div className="bg-base-300 rounded-xl p-3">

                  <p className="text-xs text-base-content/60">
                    Equipment
                  </p>

                  <p className="font-semibold mt-1">
                    {selectedExercise.equipment}
                  </p>

                </div>

                <div className="bg-base-300 rounded-xl p-3">

                  <p className="text-xs text-base-content/60">
                    Difficulty
                  </p>

                  <p className="font-semibold mt-1">
                    {selectedExercise.difficulty}
                  </p>

                </div>

              </div>

              {/* Description */}
              <div>

                <h3 className="font-semibold mb-2">
                  Description
                </h3>

                <p className="text-sm text-base-content/70 leading-relaxed">
                  {selectedExercise.description ||
                    "No description available."}
                </p>

              </div>

              {selectedExercise.videoUrl && (
                <a
                  href={selectedExercise.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-primary-content font-bold py-3 rounded-xl transition"
                >
                  <FiPlayCircle size={20} />
                  Watch Tutorial
                </a>
              )}

              {/* Add to Routine */}
              <button
                onClick={() =>
                  handleAddToRoutine(
                    selectedExercise
                  )
                }
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-content font-semibold py-3 rounded-xl transition"
              >
                Add to Routine
              </button>

            </div>

          </div>

        </div>
      )}

      {/* Add to Routine Modal */}
      {showRoutineModal && (
        <div className="fixed inset-0 bg-base-300/70 flex items-center justify-center p-4 z-50">

          <div className="bg-base-200 w-full max-w-lg rounded-3xl overflow-hidden border border-base-300">

            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-base-300">

              <div>

                <h2 className="text-xl font-bold">
                  Add to Routine
                </h2>

                <p className="text-xs text-base-content/60 mt-1">
                  {exerciseToAdd?.name}
                </p>

              </div>

              <button
                onClick={() => {
                  setShowRoutineModal(false);
                  setExerciseToAdd(null);
                }}
                className="w-9 h-9 rounded-full bg-base-300 flex items-center justify-center hover:bg-base-300/80"
              >
                <FiX size={20} />
              </button>

            </div>

            <div className="p-5">

              {/* Workout Values */}
              <div className="grid grid-cols-2 gap-4">

                {/* Sets */}
                <div>

                  <label className="block text-xs text-base-content/60 mb-2">
                    Sets
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={sets}
                    onChange={(e) =>
                      setSets(e.target.value)
                    }
                    className="w-full bg-base-100 border border-base-300 rounded-xl px-3 py-3 text-base-content focus:outline-none focus:border-primary"
                  />

                </div>

                {/* Reps */}
                <div>

                  <label className="block text-xs text-base-content/60 mb-2">
                    Reps
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={reps}
                    onChange={(e) =>
                      setReps(e.target.value)
                    }
                    className="w-full bg-base-100 border border-base-300 rounded-xl px-3 py-3 text-base-content focus:outline-none focus:border-primary"
                  />

                </div>

                {/* Weight */}
                <div>

                  <label className="block text-xs text-base-content/60 mb-2">
                    Weight (kg)
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={weight}
                    onChange={(e) =>
                      setWeight(e.target.value)
                    }
                    className="w-full bg-base-100 border border-base-300 rounded-xl px-3 py-3 text-base-content focus:outline-none focus:border-primary"
                  />

                </div>

                {/* Rest Time */}
                <div>

                  <label className="block text-xs text-base-content/60 mb-2">
                    Rest Time (seconds)
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={restTime}
                    onChange={(e) =>
                      setRestTime(e.target.value)
                    }
                    className="w-full bg-base-100 border border-base-300 rounded-xl px-3 py-3 text-base-content focus:outline-none focus:border-primary"
                  />

                </div>

              </div>

              {/* Routine List */}
              <div className="mt-6">

                <h3 className="font-semibold mb-3">
                  Select Routine
                </h3>

                {routines.length === 0 ? (

                  <div className="text-center py-5">

                    <p className="text-sm text-base-content/60 mb-4">
                      No routines found.
                    </p>

                    <button
                      onClick={() =>
                        navigate(
                          "/dashboard/workouts/routine"
                        )
                      }
                      className="bg-primary text-primary-content font-semibold px-5 py-2 rounded-xl hover:bg-primary/90"
                    >
                      Create Routine
                    </button>

                  </div>

                ) : (

                  <div className="space-y-3">

                    {routines.map((routine) => (

                      <button
                        key={routine._id}
                        onClick={() =>
                          addExerciseToRoutine(
                            routine
                          )
                        }
                        disabled={addingToRoutine}
                        className="w-full text-left bg-base-100 border border-base-300 rounded-xl p-4 hover:bg-base-300 transition disabled:opacity-50"
                      >

                        <div className="flex items-center justify-between">

                          <h4 className="font-semibold">
                            {routine.name}
                          </h4>

                          <span className="text-primary">
                            +
                          </span>

                        </div>

                        {routine.description && (
                          <p className="text-xs text-base-content/60 mt-1">
                            {routine.description}
                          </p>
                        )}

                        <p className="text-xs text-base-content/40 mt-2">
                          {routine.exercises?.length ||
                            0}{" "}
                          exercise(s)
                        </p>

                      </button>

                    ))}

                  </div>

                )}

              </div>

              {addingToRoutine && (
                <p className="text-center text-sm text-base-content/60 mt-4">
                  Adding exercise to routine...
                </p>
              )}

            </div>

          </div>

        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Exercises;