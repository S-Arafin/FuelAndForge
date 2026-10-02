import { useRef, useEffect, useState } from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis, } from "recharts";
import { FiCalendar, FiPlus, FiX, FiCheck, FiSearch } from "react-icons/fi";
import { LuSalad, LuMoon, LuBarcode, } from "react-icons/lu";
import { PiBowlFoodBold } from "react-icons/pi";
import { GiCookingPot } from "react-icons/gi";
import { toast, ToastContainer } from "react-toastify";

const API_URL = "http://localhost:3000/api";
const DAILY_CALORIE_GOAL = 2000;
const WATER_GOAL_ML = 2500;
const WATER_STEP_ML = 500;
const mealTypes = [
    {
        id: "Breakfast",
        name: "Breakfast",
        icon: PiBowlFoodBold,
        iconWrap: "bg-primary/15 text-primary",
    },
    {
        id: "Lunch",
        name: "Lunch",
        icon: GiCookingPot,
        iconWrap: "bg-warning/15 text-warning",
    },
    {
        id: "Dinner",
        name: "Dinner",
        icon: LuMoon,
        iconWrap: "bg-secondary/15 text-secondary",
    },
    {
        id: "Snacks",
        name: "Snacks",
        icon: LuSalad,
        iconWrap: "bg-error/15 text-error",
    },
];

const Nutrition = () => {

    const [foods, setFoods] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [meals, setMeals] = useState([]);

    const [selectedMeal, setSelectedMeal] = useState(null);
    const [selectedFood, setSelectedFood] = useState(null);

    const [quantity, setQuantity] = useState(100);

    const [showFoodModal, setShowFoodModal] = useState(false);

    const [showCustomFood, setShowCustomFood] = useState(false);

    const [customFood, setCustomFood] = useState({
        name: "",
        category: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
        servingSize: "100g",
    });

    const [loadingFoods, setLoadingFoods] = useState(false);
    const [savingMeal, setSavingMeal] = useState(false);
    const [savingFood, setSavingFood] = useState(false);
    const [waterMl, setWaterMl] = useState(1200);
    const totalCups = WATER_GOAL_ML / WATER_STEP_ML;
    const filledCups = Math.round(waterMl / WATER_STEP_ML);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const fetchFoods = async () => {
        try {
            setLoadingFoods(true);

            const response = await fetch(`${API_URL}/foods`);

            if (!response.ok) {
                throw new Error("Failed to fetch foods");
            }

            const data = await response.json();

            setFoods(data);
        } catch (error) {
            console.log("Failed to fetch foods:", error);
        } finally {
            setLoadingFoods(false);
        }
    };
    const fetchMeals = async () => {
        try {
            const response = await fetch(`${API_URL}/meals`);

            if (!response.ok) {
                throw new Error("Failed to fetch meals");
            }

            const data = await response.json();

            setMeals(data);
        } catch (error) {
            console.log("Failed to fetch meals:", error);
        }
    };
    useEffect(() => {
        const loadData = async () => {
            await fetchFoods();
            await fetchMeals();
        };

        loadData();
    }, []);

    const today = new Date();

    const todayMeals = meals.filter((meal) => {
        if (!meal.date) return false;

        const mealDate = new Date(meal.date);

        return (
            mealDate.getFullYear() === today.getFullYear() &&
            mealDate.getMonth() === today.getMonth() &&
            mealDate.getDate() === today.getDate()
        );
    });
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    todayMeals.forEach((meal) => {
        meal.foods?.forEach((item) => {
            const food = item.foodId;

            if (!food) return;

            const multiplier = Number(item.quantity || 0) / 100;

            totalCalories += Number(food.calories || 0) * multiplier;

            totalProtein += Number(food.protein || 0) * multiplier;

            totalCarbs += Number(food.carbs || 0) * multiplier;

            totalFat += Number(food.fat || 0) * multiplier;
        });
    });

    totalCalories = Math.round(totalCalories);
    totalProtein = Math.round(totalProtein);
    totalCarbs = Math.round(totalCarbs);
    totalFat = Math.round(totalFat);
    const remainingCalories = Math.max(
        DAILY_CALORIE_GOAL - totalCalories,
        0
    );
    const caloriePercent = Math.min(
        Math.round((totalCalories / DAILY_CALORIE_GOAL) * 100),
        100
    );

    const chartData = [
        {
            value: caloriePercent,
            fill: "url(#ringGradient)",
        },
    ];
    const filteredFoods = foods.filter((food) =>
        food.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
    );
    const openFoodModal = (mealName) => {
        setSelectedMeal(mealName);

        setSelectedFood(null);

        setQuantity(100);

        setSearchTerm("");

        setShowCustomFood(false);

        setShowFoodModal(true);
    };
    const handleSelectFood = (food) => {
        setSelectedFood(food);

        setQuantity(100);
    };
    const selectedCalories = selectedFood
        ? Math.round(
            Number(selectedFood.calories || 0) *
            Number(quantity || 0) /
            100
        )
        : 0;

    const selectedProtein = selectedFood
        ? Number(
            (
                Number(selectedFood.protein || 0) *
                Number(quantity || 0) /
                100
            ).toFixed(1)
        )
        : 0;

    const selectedCarbs = selectedFood
        ? Number(
            (
                Number(selectedFood.carbs || 0) *
                Number(quantity || 0) /
                100
            ).toFixed(1)
        )
        : 0;

    const selectedFat = selectedFood
        ? Number(
            (
                Number(selectedFood.fat || 0) *
                Number(quantity || 0) /
                100
            ).toFixed(1)
        )
        : 0;
    const handleAddMeal = async () => {
        if (!selectedMeal) {
            toast("Please select a meal.");
            return;
        }

        if (!selectedFood) {
            toast("Please select a food.");
            return;
        }

        if (!quantity || quantity <= 0) {
            toast("Please enter a valid quantity.");
            return;
        }

        try {
            setSavingMeal(true);

            const response = await fetch(`${API_URL}/meals`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    date: new Date().toISOString(),

                    mealType: selectedMeal,

                    foods: [
                        {
                            foodId: selectedFood._id,

                            quantity: Number(quantity),
                        },
                    ],

                    notes: `${selectedFood.name} added to ${selectedMeal}`,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to save meal"
                );
            }

            toast("Meal added successfully!");

            setSelectedFood(null);

            setQuantity(100);

            setSearchTerm("");

            setShowFoodModal(false);

            await fetchMeals();
        } catch (error) {
            console.log("Failed to save meal:", error);

            toast("Failed to add meal.");
        } finally {
            setSavingMeal(false);
        }
    };
    const handleCustomFoodChange = (e) => {
        const { name, value } = e.target;

        setCustomFood((previous) => ({
            ...previous,
            [name]: value,
        }));
    };
    const handleAddCustomFood = async (e) => {
        e.preventDefault();

        if (!customFood.name.trim()) {
            toast("Please enter food name.");

            return;
        }

        if (!customFood.category.trim()) {
            toast("Please enter food category.");

            return;
        }

        if (!customFood.calories) {
            toast("Please enter calories.");

            return;
        }

        try {
            setSavingFood(true);

            const response = await fetch(`${API_URL}/foods`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    name: customFood.name,

                    category: customFood.category,

                    calories: Number(customFood.calories),

                    protein: Number(customFood.protein || 0),

                    carbs: Number(customFood.carbs || 0),

                    fat: Number(customFood.fat || 0),

                    servingSize:
                        customFood.servingSize || "100g",
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to create food"
                );
            }

            toast("Custom food added successfully!");

            setCustomFood({
                name: "",
                category: "",
                calories: "",
                protein: "",
                carbs: "",
                fat: "",
                servingSize: "100g",
            });

            setShowCustomFood(false);

            await fetchFoods();
        } catch (error) {
            console.log("Failed to add custom food:", error);

            toast("Failed to add custom food.");
        } finally {
            setSavingFood(false);
        }
    };
    const handleImageCapture = (e) => {
        const file = e.target.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);

            setImagePreview(imageUrl);
        }
    };

    const closePreview = () => {
        setImagePreview(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const processImage = () => {
        console.log("Image processing can be connected later.");

        setTimeout(() => {
            closePreview();
        }, 1000);
    };
    return (
        <div className="mx-auto w-full max-w-md px-4 pb-28 pt-4 sm:max-w-2xl sm:px-6 lg:max-w-3xl">
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <p className="text-[11px] font-medium tracking-wide text-primary">
                        Today&apos;s Summary
                    </p>
                    <h1 className="text-xl font-bold text-base-content sm:text-2xl">
                        Nutrition Tracker
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <button className="btn btn-circle btn-sm border-none bg-base-200 text-base-content/80 hover:bg-base-300">
                        <FiCalendar className="h-4 w-4" />
                    </button>
                </div>
            </div>
            <div className="rounded-3xl bg-base-200 p-5 shadow-sm">

                <div className="flex items-center justify-between gap-4">

                    <div>

                        <p className="text-xs font-medium uppercase tracking-wide text-base-content/50">
                            Daily Summary
                        </p>

                        <p className="mt-1 text-3xl font-bold text-base-content sm:text-4xl">
                            {totalCalories.toLocaleString()}

                            <span className="text-base font-medium text-base-content/50">
                                {" "}kcal
                            </span>
                        </p>

                        <p className="mt-1 text-sm font-medium text-primary">
                            {remainingCalories} calories remaining
                        </p>

                    </div>

                    <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">

                        <RadialBarChart
                            width={112}
                            height={112}
                            cx="50%"
                            cy="50%"
                            innerRadius="78%"
                            outerRadius="100%"
                            barSize={10}
                            data={chartData}
                            startAngle={90}
                            endAngle={-270}
                        >

                            <defs>

                                <linearGradient
                                    id="ringGradient"
                                    x1="0"
                                    y1="0"
                                    x2="1"
                                    y2="1"
                                >

                                    <stop
                                        offset="0%"
                                        stopColor="hsl(var(--p))"
                                    />

                                    <stop
                                        offset="100%"
                                        stopColor="hsl(var(--a))"
                                    />

                                </linearGradient>

                            </defs>

                            <PolarAngleAxis
                                type="number"
                                domain={[0, 100]}
                                angleAxisId={0}
                                tick={false}
                            />

                            <RadialBar
                                background={{
                                    fill: "hsl(var(--b3))",
                                }}
                                dataKey="value"
                                cornerRadius={20}
                                fill="url(#ringGradient)"
                            />

                        </RadialBarChart>

                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">

                            <span className="text-lg font-bold text-base-content">
                                {caloriePercent}%
                            </span>

                        </div>

                    </div>

                </div>

                {/* Macros */}

                <div className="mt-5 grid grid-cols-3 gap-3">

                    {[
                        {
                            label: "Protein",
                            value: `${totalProtein}g`,
                            pct: Math.min(totalProtein / 1.5, 100),
                            color: "bg-primary",
                        },
                        {
                            label: "Carbs",
                            value: `${totalCarbs}g`,
                            pct: Math.min(totalCarbs / 3, 100),
                            color: "bg-secondary",
                        },
                        {
                            label: "Fats",
                            value: `${totalFat}g`,
                            pct: Math.min(totalFat / 0.7, 100),
                            color: "bg-accent",
                        },
                    ].map((macro) => (
                        <div key={macro.label}>

                            <div className="mb-1.5 flex items-baseline justify-between">

                                <span className="text-[11px] text-base-content/50">
                                    {macro.label}
                                </span>

                                <span className="text-xs font-semibold text-base-content">
                                    {macro.value}
                                </span>

                            </div>

                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-base-300">

                                <div
                                    className={`h-full rounded-full ${macro.color}`}
                                    style={{
                                        width: `${macro.pct}%`,
                                    }}
                                />

                            </div>

                        </div>
                    ))}

                </div>

            </div>
            <div className="mb-3 mt-6 flex items-center gap-2">

                <LuSalad className="h-4 w-4 text-primary" />

                <h2 className="text-base font-semibold text-base-content">
                    Daily Meals
                </h2>

            </div>

            <div className="flex flex-col gap-3">

                {mealTypes.map((meal) => {

                    const Icon = meal.icon;

                    const mealEntries = todayMeals.filter(
                        (entry) =>
                            entry.mealType?.toLowerCase() ===
                            meal.name.toLowerCase()
                    );

                    let mealCalories = 0;

                    mealEntries.forEach((entry) => {

                        entry.foods?.forEach((item) => {

                            if (!item.foodId) return;

                            mealCalories +=
                                Number(item.foodId.calories || 0) *
                                Number(item.quantity || 0) /
                                100;

                        });

                    });

                    return (
                        <div
                            key={meal.id}
                            className="rounded-2xl bg-base-200 p-4 shadow-sm"
                        >

                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-3">

                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-full ${meal.iconWrap}`}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <div>

                                        <p className="text-sm font-semibold text-base-content">
                                            {meal.name}
                                        </p>

                                        <p className="text-xs text-base-content/50">
                                            {mealEntries.length > 0
                                                ? `${Math.round(mealCalories)} kcal`
                                                : "No food added"}
                                        </p>

                                    </div>

                                </div>

                                <button
                                    onClick={() =>
                                        openFoodModal(meal.name)
                                    }
                                    className="btn btn-circle btn-sm border-none bg-primary text-primary-content"
                                >
                                    <FiPlus className="h-4 w-4" />
                                </button>

                            </div>

                            {/* Meal Foods */}

                            {mealEntries.map((entry) =>
                                entry.foods?.map((item, index) => {

                                    if (!item.foodId) return null;

                                    const food = item.foodId;

                                    const itemCalories = Math.round(
                                        Number(food.calories || 0) *
                                        Number(item.quantity || 0) /
                                        100
                                    );

                                    return (
                                        <div
                                            key={`${entry._id}-${index}`}
                                            className="mt-3 flex items-center justify-between border-t border-base-300 pt-3"
                                        >

                                            <div>

                                                <p className="text-sm font-medium text-base-content">
                                                    {food.name}
                                                </p>

                                                <p className="text-xs text-base-content/50">
                                                    {item.quantity}g •{" "}
                                                    {food.protein || 0}g Protein
                                                </p>

                                            </div>

                                            <span className="text-sm font-semibold text-base-content">
                                                {itemCalories} kcal
                                            </span>

                                        </div>
                                    );
                                })
                            )}

                        </div>
                    );
                })}

            </div>
            {showFoodModal && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

                    <div className="w-full max-w-md rounded-3xl bg-base-100 p-5 shadow-xl">

                        {/* Header */}

                        <div className="mb-4 flex items-center justify-between">

                            <div>

                                <h2 className="text-lg font-bold">
                                    Add Food
                                </h2>

                                <p className="text-xs text-base-content/50">
                                    Add food to {selectedMeal}
                                </p>

                            </div>

                            <button
                                onClick={() => {
                                    setShowFoodModal(false);
                                    setSelectedFood(null);
                                    setShowCustomFood(false);
                                }}
                                className="btn btn-circle btn-sm"
                            >
                                <FiX />
                            </button>

                        </div>

                        {selectedFood ? (

                            <div>

                                <div className="rounded-2xl bg-base-200 p-4">

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <p className="font-semibold">
                                                {selectedFood.name}
                                            </p>

                                            <p className="text-xs text-base-content/50">
                                                {selectedFood.calories} kcal / 100g
                                            </p>

                                        </div>

                                        <button
                                            onClick={() =>
                                                setSelectedFood(null)
                                            }
                                            className="btn btn-circle btn-xs"
                                        >
                                            <FiX />
                                        </button>

                                    </div>

                                    {/* Quantity */}

                                    <div className="mt-4">

                                        <label className="text-sm font-medium">
                                            Quantity (grams)
                                        </label>

                                        <input
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={(e) =>
                                                setQuantity(
                                                    Number(e.target.value)
                                                )
                                            }
                                            className="input input-bordered mt-2 w-full"
                                        />

                                    </div>

                                    {/* Nutrition Preview */}

                                    <div className="mt-4 grid grid-cols-2 gap-2">

                                        <div className="rounded-xl bg-base-100 p-3">

                                            <p className="text-xs text-base-content/50">
                                                Calories
                                            </p>

                                            <p className="font-bold text-primary">
                                                {selectedCalories} kcal
                                            </p>

                                        </div>

                                        <div className="rounded-xl bg-base-100 p-3">

                                            <p className="text-xs text-base-content/50">
                                                Protein
                                            </p>

                                            <p className="font-bold">
                                                {selectedProtein}g
                                            </p>

                                        </div>

                                        <div className="rounded-xl bg-base-100 p-3">

                                            <p className="text-xs text-base-content/50">
                                                Carbs
                                            </p>

                                            <p className="font-bold">
                                                {selectedCarbs}g
                                            </p>

                                        </div>

                                        <div className="rounded-xl bg-base-100 p-3">

                                            <p className="text-xs text-base-content/50">
                                                Fat
                                            </p>

                                            <p className="font-bold">
                                                {selectedFat}g
                                            </p>

                                        </div>

                                    </div>

                                </div>

                                <button
                                    onClick={handleAddMeal}
                                    disabled={savingMeal}
                                    className="btn btn-primary mt-4 w-full"
                                >
                                    {savingMeal
                                        ? "Saving..."
                                        : `Add to ${selectedMeal}`}
                                </button>

                            </div>

                        ) : (

                            <>

                                {/* Search */}

                                <div className="relative">

                                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />

                                    <input
                                        type="text"
                                        placeholder="Search food..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="input input-bordered w-full pl-10"
                                    />

                                </div>

                                {/* Add Custom Food */}

                                <button
                                    onClick={() =>
                                        setShowCustomFood(
                                            !showCustomFood
                                        )
                                    }
                                    className="btn btn-outline btn-primary mt-3 w-full"
                                >
                                    <FiPlus />
                                    Add Custom Food
                                </button>

                                {/* Custom Food Form */}

                                {showCustomFood && (

                                    <form
                                        onSubmit={handleAddCustomFood}
                                        className="mt-4 rounded-2xl bg-base-200 p-4"
                                    >

                                        <h3 className="mb-3 font-semibold">
                                            Custom Food
                                        </h3>

                                        <div className="grid gap-3">

                                            <input
                                                name="name"
                                                value={customFood.name}
                                                onChange={
                                                    handleCustomFoodChange
                                                }
                                                placeholder="Food name"
                                                className="input input-bordered w-full"
                                            />

                                            <input
                                                name="category"
                                                value={
                                                    customFood.category
                                                }
                                                onChange={
                                                    handleCustomFoodChange
                                                }
                                                placeholder="Category"
                                                className="input input-bordered w-full"
                                            />

                                            <input
                                                name="calories"
                                                type="number"
                                                value={
                                                    customFood.calories
                                                }
                                                onChange={
                                                    handleCustomFoodChange
                                                }
                                                placeholder="Calories per 100g"
                                                className="input input-bordered w-full"
                                            />

                                            <div className="grid grid-cols-3 gap-2">

                                                <input
                                                    name="protein"
                                                    type="number"
                                                    value={
                                                        customFood.protein
                                                    }
                                                    onChange={
                                                        handleCustomFoodChange
                                                    }
                                                    placeholder="Protein"
                                                    className="input input-bordered w-full"
                                                />

                                                <input
                                                    name="carbs"
                                                    type="number"
                                                    value={
                                                        customFood.carbs
                                                    }
                                                    onChange={
                                                        handleCustomFoodChange
                                                    }
                                                    placeholder="Carbs"
                                                    className="input input-bordered w-full"
                                                />

                                                <input
                                                    name="fat"
                                                    type="number"
                                                    value={customFood.fat}
                                                    onChange={
                                                        handleCustomFoodChange
                                                    }
                                                    placeholder="Fat"
                                                    className="input input-bordered w-full"
                                                />

                                            </div>

                                            <input
                                                name="servingSize"
                                                value={
                                                    customFood.servingSize
                                                }
                                                onChange={
                                                    handleCustomFoodChange
                                                }
                                                placeholder="Serving size"
                                                className="input input-bordered w-full"
                                            />

                                            <button
                                                type="submit"
                                                disabled={savingFood}
                                                className="btn btn-primary w-full"
                                            >
                                                {savingFood
                                                    ? "Saving..."
                                                    : "Save Custom Food"}
                                            </button>

                                        </div>

                                    </form>
                                )}

                                {/* Food List */}

                                <div className="mt-4 max-h-72 overflow-y-auto">

                                    {loadingFoods ? (

                                        <p className="py-8 text-center text-sm text-base-content/50">
                                            Loading foods...
                                        </p>

                                    ) : filteredFoods.length > 0 ? (

                                        filteredFoods.map((food) => (

                                            <button
                                                key={food._id}
                                                onClick={() =>
                                                    handleSelectFood(food)
                                                }
                                                className="mb-2 flex w-full items-center justify-between rounded-xl bg-base-200 p-3 text-left hover:bg-base-300"
                                            >

                                                <div>

                                                    <p className="font-semibold">
                                                        {food.name}
                                                    </p>

                                                    <p className="text-xs text-base-content/50">
                                                        {food.servingSize}
                                                    </p>

                                                </div>

                                                <div className="text-right">

                                                    <p className="font-semibold text-primary">
                                                        {food.calories} kcal
                                                    </p>

                                                    <p className="text-xs text-base-content/50">
                                                        P {food.protein || 0}g
                                                        {" · "}
                                                        C {food.carbs || 0}g
                                                        {" · "}
                                                        F {food.fat || 0}g
                                                    </p>

                                                </div>

                                            </button>

                                        ))

                                    ) : (

                                        <p className="py-8 text-center text-sm text-base-content/50">
                                            No food found
                                        </p>

                                    )}

                                </div>

                            </>

                        )}

                    </div>

                </div>
            )}
            <div className="mt-4 rounded-2xl bg-base-200 p-4 shadow-sm">

                <div className="mb-3 flex items-center justify-between">

                    <span className="text-sm font-semibold text-base-content">
                        Water Intake
                    </span>

                    <span className="text-sm font-semibold text-primary">
                        {(waterMl / 1000).toFixed(1)}L /{" "}
                        {(WATER_GOAL_ML / 1000).toFixed(1)}L
                    </span>

                </div>

                <div className="flex items-center gap-2">

                    {Array.from({
                        length: totalCups,
                    }).map((_, index) => (

                        <button
                            key={index}
                            onClick={() =>
                                setWaterMl(
                                    waterMl ===
                                        (index + 1) *
                                        WATER_STEP_ML
                                        ? index *
                                        WATER_STEP_ML
                                        : (index + 1) *
                                        WATER_STEP_ML
                                )
                            }
                            className={`h-9 flex-1 rounded-lg transition-colors ${index < filledCups
                                    ? "bg-primary"
                                    : "bg-base-300"
                                }`}
                        />

                    ))}

                </div>

            </div>
            <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={fileInputRef}
                onChange={handleImageCapture}
                className="hidden"
            />

            <button
                onClick={() =>
                    fileInputRef.current?.click()
                }
                className="btn btn-circle fixed bottom-24 right-5 z-40 h-16 w-16 border-none bg-primary text-primary-content shadow-lg shadow-primary/30 transition-transform hover:bg-primary/90 active:scale-95 sm:bottom-8"
            >

                <span className="flex flex-col items-center gap-0.5">

                    <LuBarcode className="h-6 w-6" />

                    <span className="text-[9px] font-semibold leading-none">
                        SCAN
                    </span>

                </span>

            </button>
            {imagePreview && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">

                    <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-base-100 shadow-2xl">

                        <div className="relative aspect-4/5 w-full bg-base-300">

                            <img
                                src={imagePreview}
                                alt="Scanned food"
                                className="h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 h-1/2 w-full bg-linear-to-b from-transparent via-primary/20 to-transparent" />

                        </div>

                        <div className="flex gap-4 bg-base-200 p-6">

                            <button
                                onClick={closePreview}
                                className="btn btn-outline flex-1 rounded-2xl"
                            >
                                <FiX className="h-5 w-5" />
                                Retake
                            </button>

                            <button
                                onClick={processImage}
                                className="btn btn-primary flex-1 rounded-2xl"
                            >
                                <FiCheck className="h-5 w-5" />
                                Analyze
                            </button>

                        </div>

                    </div>

                </div>

            )}
            <ToastContainer />

        </div>
    );
};

export default Nutrition;