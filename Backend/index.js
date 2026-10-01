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

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});