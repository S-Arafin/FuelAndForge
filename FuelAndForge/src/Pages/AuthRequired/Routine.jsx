import { useEffect, useState } from "react";
import {
  Plus,
  Dumbbell,
  Trash2,
  Edit3,
  Play,
  X,
  Clock,
  Repeat,
  Weight,
} from "lucide-react";
import { useNavigate } from "react-router";

const Routine = () => {
  const navigate = useNavigate();

  const [routines, setRoutines] = useState([]);
  const [exercises, setExercises] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [routineName, setRoutineName] = useState("");
  const [routineDescription, setRoutineDescription] = useState("");

  const [editingRoutine, setEditingRoutine] = useState(null);

  const [saving, setSaving] = useState(false);

  const fetchRoutines = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/api/routines");

      const data = await response.json();

      if (response.ok) {
        setRoutines(data);
      } else {
        console.error("Failed to fetch routines");
      }
    } catch (error) {
      console.error("Fetch routines error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchExercises = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/exercises"
      );

      const data = await response.json();

      if (response.ok) {
        setExercises(data.exercises || []);
      }
    } catch (error) {
      console.error("Fetch exercises error:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        fetchRoutines(),
        fetchExercises(),
      ]);

      setLoading(false);
    };

    loadData();
  }, []);

  const getExerciseDetails = (exerciseId) => {
    return exercises.find(
      (exercise) => exercise._id === exerciseId
    );
  };

  const handleCreateRoutine = () => {
    setEditingRoutine(null);
    setRoutineName("");
    setRoutineDescription("");
    setShowCreateModal(true);
  };

  const handleEditRoutine = (routine) => {
    setEditingRoutine(routine);
    setRoutineName(routine.name);
    setRoutineDescription(routine.description || "");
    setShowCreateModal(true);
  };

  // Create or update routine
  const handleSaveRoutine = async (e) => {
    e.preventDefault();

    if (!routineName.trim()) {
      alert("Please enter routine name");
      return;
    }

    try {
      setSaving(true);

      const routineData = {
        name: routineName,
        description: routineDescription,
        exercises: editingRoutine
          ? editingRoutine.exercises
          : [],
      };

      let response;

      if (editingRoutine) {
        response = await fetch(
          `http://localhost:3000/api/routines/${editingRoutine._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(routineData),
          }
        );
      } else {
        response = await fetch(
          "http://localhost:3000/api/routines",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(routineData),
          }
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert(
        editingRoutine
          ? "Routine updated successfully"
          : "Routine created successfully"
      );

      setShowCreateModal(false);
      setRoutineName("");
      setRoutineDescription("");
      setEditingRoutine(null);

      fetchRoutines();
    } catch (error) {
      console.error("Save routine error:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  // Delete routine
  const handleDeleteRoutine = async (routineId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this routine?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/routines/${routineId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete routine");
      }

      alert("Routine deleted successfully");

      fetchRoutines();
    } catch (error) {
      console.error("Delete routine error:", error);
      alert(error.message);
    }
  };

  // Remove exercise from routine
  const handleRemoveExercise = async (routine, exerciseIndex) => {
    const confirmDelete = window.confirm(
      "Remove this exercise from the routine?"
    );

    if (!confirmDelete) return;

    try {
      const updatedExercises = [...routine.exercises];

      updatedExercises.splice(exerciseIndex, 1);

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

      if (!response.ok) {
        throw new Error(data.message || "Failed to update routine");
      }

      alert("Exercise removed successfully");

      fetchRoutines();
    } catch (error) {
      console.error("Remove exercise error:", error);
      alert(error.message);
    }
  };

  // Start workout
  const handleStartWorkout = (routine) => {
    navigate("/dashboard/workout", {
      state: {
        routine: routine,
      },
    });
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content px-4 sm:px-6 lg:px-8 py-8">

      {/* Header */}
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>
            <p className="text-sm text-primary font-medium mb-2">
              WORKOUT PLANNER
            </p>

            <h1 className="text-3xl md:text-4xl font-bold">
              My Routines
            </h1>

            <p className="text-base-content/60 mt-2">
              Create and manage your personalized workout routines.
            </p>
          </div>

          <button
            onClick={handleCreateRoutine}
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-content font-semibold px-5 py-3 rounded-xl transition"
          >
            <Plus size={20} />
            Create Routine
          </button>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

          <div className="bg-base-200 border border-base-300 rounded-2xl p-5">
            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <Dumbbell className="text-primary" size={22} />
              </div>

              <div>
                <p className="text-base-content/60 text-sm">
                  Total Routines
                </p>

                <h2 className="text-2xl font-bold">
                  {routines.length}
                </h2>
              </div>

            </div>
          </div>

          <div className="bg-base-200 border border-base-300 rounded-2xl p-5">
            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Dumbbell className="text-secondary" size={22} />
              </div>

              <div>
                <p className="text-base-content/60 text-sm">
                  Total Exercises
                </p>

                <h2 className="text-2xl font-bold">
                  {routines.reduce(
                    (total, routine) =>
                      total + (routine.exercises?.length || 0),
                    0
                  )}
                </h2>
              </div>

            </div>
          </div>

          <div className="bg-base-200 border border-base-300 rounded-2xl p-5">
            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Play className="text-secondary" size={22} />
              </div>

              <div>
                <p className="text-base-content/60 text-sm">
                  Ready to Train
                </p>

                <h2 className="text-2xl font-bold">
                  {routines.filter(
                    (routine) =>
                      routine.exercises &&
                      routine.exercises.length > 0
                  ).length}
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
              Loading routines...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && routines.length === 0 && (
          <div className="bg-base-200 border border-base-300 rounded-2xl py-20 px-6 text-center">

            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Dumbbell
                size={30}
                className="text-primary"
              />
            </div>

            <h2 className="text-xl font-bold mb-2">
              No routines yet
            </h2>

            <p className="text-base-content/60 max-w-md mx-auto mb-6">
              Create your first workout routine and start
              organizing your exercises.
            </p>

            <button
              onClick={handleCreateRoutine}
              className="bg-primary hover:bg-primary/90 text-primary-content font-semibold px-5 py-3 rounded-xl transition"
            >
              Create Your First Routine
            </button>

          </div>
        )}

        {/* Routine Cards */}
        {!loading && routines.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {routines.map((routine) => (

              <div
                key={routine._id}
                className="bg-base-200 border border-base-300 rounded-2xl overflow-hidden"
              >

                {/* Routine Header */}
                <div className="p-5 border-b border-base-300">

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex items-start gap-3">

                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Dumbbell
                          className="text-primary"
                          size={23}
                        />
                      </div>

                      <div>
                        <h2 className="text-xl font-bold">
                          {routine.name}
                        </h2>

                        <p className="text-base-content/60 text-sm mt-1">
                          {routine.description ||
                            "No description added"}
                        </p>
                      </div>

                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">

                      <button
                        onClick={() =>
                          handleEditRoutine(routine)
                        }
                        className="w-9 h-9 rounded-lg bg-base-300 hover:bg-base-300/80 flex items-center justify-center transition"
                        title="Edit routine"
                      >
                        <Edit3 size={16} />
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteRoutine(routine._id)
                        }
                        className="w-9 h-9 rounded-lg bg-error/10 hover:bg-error/20 text-error flex items-center justify-center transition"
                        title="Delete routine"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                  </div>

                </div>

                {/* Exercise List */}
                <div className="p-5">

                  <div className="flex items-center justify-between mb-4">

                    <h3 className="font-semibold">
                      Exercises
                    </h3>

                    <span className="text-sm text-base-content/60">
                      {routine.exercises?.length || 0} exercises
                    </span>

                  </div>

                  {routine.exercises &&
                  routine.exercises.length > 0 ? (
                    <div className="space-y-3">

                      {routine.exercises.map(
                        (routineExercise, index) => {

                          const exercise =
                            getExerciseDetails(
                              routineExercise.exerciseId
                            );

                          return (
                            <div
                              key={
                                routineExercise._id ||
                                index
                              }
                              className="bg-base-100 border border-base-300 rounded-xl p-4"
                            >

                              <div className="flex items-center justify-between gap-3">

                                <div className="flex items-center gap-3 min-w-0">

                                  <div className="w-9 h-9 rounded-lg bg-base-300 flex items-center justify-center shrink-0">
                                    <Dumbbell
                                      size={17}
                                      className="text-base-content/70"
                                    />
                                  </div>

                                  <div className="min-w-0">

                                    <h4 className="font-medium truncate">
                                      {exercise?.name ||
                                        "Exercise"}
                                    </h4>

                                    <p className="text-xs text-base-content/50">
                                      {exercise?.bodyPart ||
                                        "Workout"}
                                    </p>

                                  </div>

                                </div>

                                <button
                                  onClick={() =>
                                    handleRemoveExercise(
                                      routine,
                                      index
                                    )
                                  }
                                  className="text-base-content/50 hover:text-error transition shrink-0"
                                  title="Remove exercise"
                                >
                                  <X size={17} />
                                </button>

                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">

                                <div className="bg-base-300/50 rounded-lg px-3 py-2">
                                  <p className="text-[11px] text-base-content/50">
                                    Sets
                                  </p>

                                  <p className="text-sm font-semibold flex items-center gap-1">
                                    <Repeat size={13} />
                                    {routineExercise.sets}
                                  </p>
                                </div>

                                <div className="bg-base-300/50 rounded-lg px-3 py-2">
                                  <p className="text-[11px] text-base-content/50">
                                    Reps
                                  </p>

                                  <p className="text-sm font-semibold">
                                    {routineExercise.reps}
                                  </p>
                                </div>

                                <div className="bg-base-300/50 rounded-lg px-3 py-2">
                                  <p className="text-[11px] text-base-content/50">
                                    Weight
                                  </p>

                                  <p className="text-sm font-semibold flex items-center gap-1">
                                    <Weight size={13} />
                                    {routineExercise.weight} kg
                                  </p>
                                </div>

                                <div className="bg-base-300/50 rounded-lg px-3 py-2">
                                  <p className="text-[11px] text-base-content/50">
                                    Rest
                                  </p>

                                  <p className="text-sm font-semibold flex items-center gap-1">
                                    <Clock size={13} />
                                    {routineExercise.restTime}s
                                  </p>
                                </div>

                              </div>

                            </div>
                          );
                        }
                      )}

                    </div>
                  ) : (
                    <div className="border border-dashed border-base-300 rounded-xl p-6 text-center">

                      <Dumbbell
                        size={25}
                        className="text-base-content/30 mx-auto mb-2"
                      />

                      <p className="text-sm text-base-content/50">
                        No exercises added yet
                      </p>

                      <p className="text-xs text-base-content/40 mt-1">
                        Add exercises from the Exercises page
                      </p>

                    </div>
                  )}

                </div>

                {/* Footer */}
                <div className="px-5 pb-5">

                  <button
                    onClick={() => handleStartWorkout(routine)}
                    disabled={
                      !routine.exercises ||
                      routine.exercises.length === 0
                    }
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:bg-base-300 disabled:text-base-content/30 disabled:cursor-not-allowed text-primary-content font-semibold py-3 rounded-xl transition"
                  >
                    <Play size={18} />
                    Start Workout
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

      {/* Create / Edit Routine Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-base-300/70 backdrop-blur-sm flex items-center justify-center px-4">

          <div className="w-full max-w-lg bg-base-200 border border-base-300 rounded-2xl shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-base-300">

              <div>
                <h2 className="text-xl font-bold">
                  {editingRoutine
                    ? "Edit Routine"
                    : "Create Routine"}
                </h2>

                <p className="text-sm text-base-content/50 mt-1">
                  {editingRoutine
                    ? "Update your workout routine"
                    : "Create a new workout routine"}
                </p>
              </div>

              <button
                onClick={() => setShowCreateModal(false)}
                className="w-9 h-9 rounded-lg bg-base-300 hover:bg-base-300/80 flex items-center justify-center"
              >
                <X size={18} />
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSaveRoutine}
              className="p-5 space-y-5"
            >

              <div>
                <label className="block text-sm font-medium text-base-content/80 mb-2">
                  Routine Name
                </label>

                <input
                  type="text"
                  value={routineName}
                  onChange={(e) =>
                    setRoutineName(e.target.value)
                  }
                  placeholder="Example: Push Day"
                  className="w-full bg-base-100 border border-base-300 focus:border-primary outline-none rounded-xl px-4 py-3 text-base-content placeholder:text-base-content/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-base-content/80 mb-2">
                  Description
                </label>

                <textarea
                  value={routineDescription}
                  onChange={(e) =>
                    setRoutineDescription(e.target.value)
                  }
                  placeholder="Example: Chest, shoulder and triceps workout"
                  rows="4"
                  className="w-full bg-base-100 border border-base-300 focus:border-primary outline-none rounded-xl px-4 py-3 text-base-content placeholder:text-base-content/30 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={() =>
                    setShowCreateModal(false)
                  }
                  className="flex-1 bg-base-300 hover:bg-base-300/80 text-base-content font-semibold py-3 rounded-xl transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-primary hover:bg-primary/90 disabled:bg-primary/30 text-primary-content font-semibold py-3 rounded-xl transition"
                >
                  {saving
                    ? "Saving..."
                    : editingRoutine
                    ? "Update Routine"
                    : "Create Routine"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default Routine;