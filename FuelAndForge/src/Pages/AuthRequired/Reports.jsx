import { useState } from "react";
import { FiDownload, FiFileText } from "react-icons/fi";

const API = "http://localhost:3000/api";

const Reports = () => {
  const [loading, setLoading] = useState(false);

  const downloadCSV = async () => {
    try {
      setLoading(true);

      const [
        workoutRes,
        mealRes,
        bodyStatsRes
      ] = await Promise.all([
        fetch(`${API}/workout-history`),
        fetch(`${API}/meals`),
        fetch(`${API}/body-stats`)
      ]);

      if (
        !workoutRes.ok ||
        !mealRes.ok ||
        !bodyStatsRes.ok
      ) {
        throw new Error("Failed to load report data");
      }

      const workouts = await workoutRes.json();
      const meals = await mealRes.json();
      const bodyStats = await bodyStatsRes.json();

      let csv = "";

      

      csv += "WORKOUT REPORT\n";
      csv +=
        "Date,Routine,Exercise,Body Part,Sets,Reps,Weight,Duration\n";

      workouts.forEach((workout) => {
        const date = new Date(
          workout.date
        ).toLocaleDateString();

        const routineName =
          workout.routineId?.name || "Unknown Routine";

        workout.exercises?.forEach((exercise) => {
          const exerciseName =
            exercise.exerciseId?.name ||
            "Unknown Exercise";

          const bodyPart =
            exercise.exerciseId?.bodyPart ||
            "Unknown";

          csv += `"${date}","${routineName}","${exerciseName}","${bodyPart}",${exercise.sets},${exercise.reps},${exercise.weight},${exercise.duration}\n`;
        });
      });

      csv += "\n\n";


      csv += "MEAL & CALORIE REPORT\n";

      csv +=
        "Date,Meal Type,Food,Category,Quantity,Serving Size,Calories,Protein,Carbs,Fat\n";

      meals.forEach((meal) => {
        const date = new Date(
          meal.date
        ).toLocaleDateString();

        meal.foods?.forEach((item) => {

          const food = item.foodId;

          if (!food) return;

          

          const quantity = Number(item.quantity) || 0;

          const servingAmount =
            parseFloat(food.servingSize) || 100;

          const multiplier =
            quantity / servingAmount;

          const calories =
            food.calories * multiplier;

          const protein =
            food.protein * multiplier;

          const carbs =
            food.carbs * multiplier;

          const fat =
            food.fat * multiplier;

          csv += `"${date}","${meal.mealType}","${food.name}","${food.category}",${quantity},"${food.servingSize}",${calories.toFixed(
            2
          )},${protein.toFixed(
            2
          )},${carbs.toFixed(
            2
          )},${fat.toFixed(2)}\n`;
        });
      });

      csv += "\n\n";


      csv += "BODY METRICS REPORT\n";

      csv +=
        "Date,Weight,BMI,Chest,Waist,Arms\n";

      bodyStats.forEach((stats) => {
        const date = new Date(
          stats.date
        ).toLocaleDateString();

        csv += `"${date}",${stats.weight},${stats.bmi},${stats.chest},${stats.waist},${stats.arms}\n`;
      });

      const blob = new Blob(
        [csv],
        {
          type: "text/csv;charset=utf-8;"
        }
      );

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        `FuelAndForge_Report_${
          new Date()
            .toISOString()
            .split("T")[0]
        }.csv`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(url);

    } catch (error) {

      console.error(
        "Report error:",
        error
      );

      alert(
        "Failed to generate report"
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="p-4 md:p-6">

      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div className="mb-6">

          <h1 className="text-2xl md:text-3xl font-bold text-base-content">
            Reports
          </h1>

          <p className="text-base-content/60 mt-1">
            Export your workout, nutrition and body
            metrics data.
          </p>

        </div>


        {/* Report Card */}

        <div className="card bg-base-100 shadow-sm border border-base-300">

          <div className="card-body">

            <div className="flex items-center gap-3 mb-4">

              <div className="p-3 rounded-lg bg-primary/10 text-primary">

                <FiFileText size={24} />

              </div>

              <div>

                <h2 className="card-title">
                  FuelAndForge Progress Report
                </h2>

                <p className="text-sm text-base-content/60">
                  Workout, nutrition and body
                  measurement data
                </p>

              </div>

            </div>


            {/* Included Data */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">

              <div className="p-4 rounded-lg bg-base-200">

                <h3 className="font-semibold">
                  Workout Data
                </h3>

                <p className="text-sm text-base-content/60 mt-1">
                  Date, routine, exercise, body part,
                  sets, reps, weight and duration
                </p>

              </div>


              <div className="p-4 rounded-lg bg-base-200">

                <h3 className="font-semibold">
                  Nutrition Data
                </h3>

                <p className="text-sm text-base-content/60 mt-1">
                  Meals, foods, calories, protein,
                  carbs and fat
                </p>

              </div>


              <div className="p-4 rounded-lg bg-base-200">

                <h3 className="font-semibold">
                  Body Metrics
                </h3>

                <p className="text-sm text-base-content/60 mt-1">
                  Weight, BMI, chest, waist and arms
                </p>

              </div>

            </div>


            {/* Download Button */}

            <div className="card-actions justify-end mt-4">

              <button
                onClick={downloadCSV}
                disabled={loading}
                className="btn btn-primary"
              >

                <FiDownload size={18} />

                {loading
                  ? "Generating..."
                  : "Download CSV Report"}

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Reports;