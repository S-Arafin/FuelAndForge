const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });

// Home Route
app.get("/", (req, res) => {
  res.send("FuelAndForge server is running");
});

// Exercise Schema
const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    bodyPart: {
      type: String,
      required: true
    },

    equipment: {
      type: String,
      required: true
    },

    difficulty: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    videoUrl: {
      type: String
    },

    imageUrl: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);
// CREATE Exercise
app.post("/api/exercises", async (req, res) => {
  try {
    const exercise = await Exercise.create(req.body);

    res.status(201).json({
      success: true,
      message: "Exercise created successfully",
      exercise
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET All Exercises
app.get("/api/exercises", async (req, res) => {
  try {
    const exercises = await Exercise.find();

    res.status(200).json({
      success: true,
      exercises
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET Single Exercise
app.get("/api/exercises/:id", async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      return res.status(404).json({
        success: false,
        message: "Exercise not found"
      });
    }

    res.status(200).json({
      success: true,
      exercise
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// UPDATE Exercise
app.put("/api/exercises/:id", async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!exercise) {
      return res.status(404).json({
        success: false,
        message: "Exercise not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Exercise updated successfully",
      exercise
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// DELETE Exercise
app.delete("/api/exercises/:id", async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);

    if (!exercise) {
      return res.status(404).json({
        success: false,
        message: "Exercise not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Exercise deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

//routine schema
const routineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    exercises: [
      {
        exerciseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Exercise",
          required: true,
        },

        sets: {
          type: Number,
          required: true,
        },

        reps: {
          type: Number,
          required: true,
        },

        weight: {
          type: Number,
          default: 0,
        },

        restTime: {
          type: Number,
          default: 60,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Routine = mongoose.model("Routine", routineSchema);

// post routine
app.post("/api/routines", async (req, res) => {
  try {
    const routine = await Routine.create(req.body);

    res.status(201).json({
      message: "Routine created successfully",
      routine,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create routine",
      error: error.message,
    });
  }
});

// get routine
app.get("/api/routines", async (req, res) => {
  try {
    const routines = await Routine.find().populate(
      "exercises.exerciseId",
      "name bodyPart"
    );

    res.status(200).json(routines);
  } catch (error) {
    console.error("Get routines error:", error);

    res.status(500).json({
      message: "Failed to get routines",
      error: error.message,
    });
  }
});

// get single routine 
app.get("/api/routines/:id", async (req, res) => {
  try {
    const routine = await Routine.findById(req.params.id);

    if (!routine) {
      return res.status(404).json({
        message: "Routine not found",
      });
    }

    res.status(200).json(routine);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get routine",
      error: error.message,
    });
  }
});
// Update Routine
app.put("/api/routines/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { name, description, exercises } = req.body;

    const updatedRoutine = await Routine.findByIdAndUpdate(
      id,
      {
        name,
        description,
        exercises,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedRoutine) {
      return res.status(404).json({
        message: "Routine not found",
      });
    }

    res.status(200).json(updatedRoutine);
  } catch (error) {
    console.error("Update routine error:", error);

    res.status(500).json({
      message: "Failed to update routine",
      error: error.message,
    });
  }
});
// Delete Routine
app.delete("/api/routines/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRoutine = await Routine.findByIdAndDelete(id);

    if (!deletedRoutine) {
      return res.status(404).json({
        message: "Routine not found",
      });
    }

    res.status(200).json({
      message: "Routine deleted successfully",
      routine: deletedRoutine,
    });
  } catch (error) {
    console.error("Delete routine error:", error);

    res.status(500).json({
      message: "Failed to delete routine",
      error: error.message,
    });
  }
});

// workout schema
const workoutSchema = new mongoose.Schema(
  {
    routineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Routine",
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    exercises: [
      {
        exerciseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Exercise",
          required: true,
        },

        sets: {
          type: Number,
          required: true,
        },

        reps: {
          type: Number,
          required: true,
        },

        weight: {
          type: Number,
          default: 0,
        },

        duration: {
          type: Number,
          default: 0,
        },
      },
    ],

    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
const Workout = mongoose.model("Workout", workoutSchema);
// create workout
app.post("/api/workouts", async (req, res) => {
  try {
    const workout = await Workout.create(req.body);

    res.status(201).json({
      message: "Workout logged successfully",
      workout,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to log workout",
      error: error.message,
    });
  }
});
// get all workout
app.get("/api/workouts", async (req, res) => {
  try {
    const workouts = await Workout.find();

    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get workouts",
      error: error.message,
    });
  }
});
// get single workout
app.get("/api/workouts/:id", async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get workout",
      error: error.message,
    });
  }
});
// update workout
app.put("/api/workouts/:id", async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    res.status(200).json({
      message: "Workout updated successfully",
      workout,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update workout",
      error: error.message,
    });
  }
});
// delete workout
app.delete("/api/workouts/:id", async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    res.status(200).json({
      message: "Workout deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete workout",
      error: error.message,
    });
  }
});
// Workout History API
app.get("/api/workout-history", async (req, res) => {
  try {
    const workouts = await Workout.find()
      .sort({ date: -1 })
      .populate("routineId", "name")
      .populate("exercises.exerciseId", "name bodyPart");

    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get workout history",
      error: error.message,
    });
  }
});

// food schema
const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    calories: {
      type: Number,
      required: true,
    },

    protein: {
      type: Number,
      default: 0,
    },

    carbs: {
      type: Number,
      default: 0,
    },

    fat: {
      type: Number,
      default: 0,
    },

    servingSize: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Food = mongoose.model("Food", foodSchema);
// create food api
app.post("/api/foods", async (req, res) => {
  try {
    const food = await Food.create(req.body);

    res.status(201).json({
      message: "Food created successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create food",
      error: error.message,
    });
  }
});
// get all food
app.get("/api/foods", async (req, res) => {
  try {
    const foods = await Food.find();

    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get foods",
      error: error.message,
    });
  }
});
// get single food 
app.get("/api/foods/:id", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get food",
      error: error.message,
    });
  }
});
// update food
app.put("/api/foods/:id", async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    res.status(200).json({
      message: "Food updated successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update food",
      error: error.message,
    });
  }
});
// delete food
app.delete("/api/foods/:id", async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    res.status(200).json({
      message: "Food deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Food deleted successfully",
    });
  }
});
// meal schema
const mealSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },

    mealType: {
      type: String,
      required: true,
      trim: true,
    },

    foods: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
const Meal = mongoose.model("Meal", mealSchema);
// create meal
app.post("/api/meals", async (req, res) => {
  try {
    const meal = await Meal.create(req.body);

    res.status(201).json({
      message: "Meal logged successfully",
      meal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to log meal",
      error: error.message,
    });
  }
});
// get all meals
app.get("/api/meals", async (req, res) => {
  try {
    const meals = await Meal.find()
      .sort({ date: -1 })
      .populate("foods.foodId");

    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get meals",
      error: error.message,
    });
  }
});
// single meals
app.get("/api/meals/:id", async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id)
      .populate("foods.foodId");

    if (!meal) {
      return res.status(404).json({
        message: "Meal not found",
      });
    }

    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get meal",
      error: error.message,
    });
  }
});
// update meals
app.put("/api/meals/:id", async (req, res) => {
  try {
    const meal = await Meal.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!meal) {
      return res.status(404).json({
        message: "Meal not found",
      });
    }

    res.status(200).json({
      message: "Meal updated successfully",
      meal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update meal",
      error: error.message,
    });
  }
});
//delete meals
app.delete("/api/meals/:id", async (req, res) => {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id);

    if (!meal) {
      return res.status(404).json({
        message: "Meal not found",
      });
    }

    res.status(200).json({
      message: "Meal deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete meal",
      error: error.message,
    });
  }
});

// body stats schema
 const bodyStatsSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },

    weight: {
      type: Number,
      required: true,
    },

    bmi: {
      type: Number,
      default: 0,
    },

    chest: {
      type: Number,
      default: 0,
    },

    waist: {
      type: Number,
      default: 0,
    },

    arms: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const BodyStats = mongoose.model("BodyStats", bodyStatsSchema);
// create body stats 
app.post("/api/body-stats", async (req, res) => {
  try {
    const bodyStats = await BodyStats.create(req.body);

    res.status(201).json({
      message: "Body stats added successfully",
      bodyStats,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add body stats",
      error: error.message,
    });
  }
});
// get body stats
app.get("/api/body-stats", async (req, res) => {
  try {
    const stats = await BodyStats.find().sort({ date: -1 });

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get body stats",
      error: error.message,
    });
  }
});
// single body stats
app.get("/api/body-stats/:id", async (req, res) => {
  try {
    const stats = await BodyStats.findById(req.params.id);

    if (!stats) {
      return res.status(404).json({
        message: "Body stats not found",
      });
    }

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get body stats",
      error: error.message,
    });
  }
});

// update body stats
app.put("/api/body-stats/:id", async (req, res) => {
  try {
    const stats = await BodyStats.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!stats) {
      return res.status(404).json({
        message: "Body stats not found",
      });
    }

    res.status(200).json({
      message: "Body stats updated successfully",
      stats,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update body stats",
      error: error.message,
    });
  }
});
// delete body stats
app.delete("/api/body-stats/:id", async (req, res) => {
  try {
    const stats = await BodyStats.findByIdAndDelete(req.params.id);

    if (!stats) {
      return res.status(404).json({
        message: "Body stats not found",
      });
    }

    res.status(200).json({
      message: "Body stats deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete body stats",
      error: error.message,
    });
  }
});

// dashboard summary 
app.get("/api/dashboard", async (req, res) => {
  try {
    const totalExercises = await Exercise.countDocuments();
    const totalRoutines = await Routine.countDocuments();
    const totalWorkouts = await Workout.countDocuments();
    const totalFoods = await Food.countDocuments();
    const totalMeals = await Meal.countDocuments();

    const latestBodyStats = await BodyStats.findOne()
      .sort({ date: -1 });

    res.status(200).json({
      totalExercises,
      totalRoutines,
      totalWorkouts,
      totalFoods,
      totalMeals,
      latestBodyStats,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load dashboard",
      error: error.message,
    });
  }
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});