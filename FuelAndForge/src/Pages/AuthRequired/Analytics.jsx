import { useEffect, useMemo, useState } from "react";
import {AreaChart,Area,LineChart,Line,BarChart,Bar,ResponsiveContainer,YAxis,XAxis,Tooltip,} from "recharts";

import {
    FiArrowLeft,
    FiCalendar,
    FiChevronLeft,
    FiChevronRight,
    
} from "react-icons/fi";

import { GiWeightLiftingUp } from "react-icons/gi";
import { LuActivity } from "react-icons/lu";

import { useNavigate } from "react-router";

import img1 from "../../Assets/gorilla-freak-wt5jg8_WrJg-unsplash.jpg";
import img2 from "../../Assets/luke-witter-k47w6BeapCs-unsplash.jpg";

const WEEKDAYS = [
    "MO",
    "TU",
    "WE",
    "TH",
    "FR",
    "SA",
    "SU",
];
// base api
const API = "http://localhost:3000/api";

const progressPhotos = [
    {
        id: 1,
        label: "Oct 12, 2025",
        badge: null,
        img: img2,
    },
    {
        id: 2,
        label: "Today",
        badge: "Today",
        img: img1,
    },
];

function buildMonthGrid(year, monthIndex) {
    const firstWeekday =
        (new Date(year, monthIndex, 1).getDay() + 6) % 7;

    const daysInMonth = new Date(
        year,
        monthIndex + 1,
        0
    ).getDate();

    const daysInPrevMonth = new Date(
        year,
        monthIndex,
        0
    ).getDate();

    const cells = [];

    for (let i = firstWeekday - 1; i >= 0; i -= 1) {
        cells.push({
            day: daysInPrevMonth - i,
            current: false,
        });
    }

    for (let d = 1; d <= daysInMonth; d += 1) {
        cells.push({
            day: d,
            current: true,
        });
    }

    let nextDay = 1;

    while (cells.length % 7 !== 0) {
        cells.push({
            day: nextDay,
            current: false,
        });

        nextDay += 1;
    }

    return cells;
}

const Analytics = () => {
    const navigate = useNavigate();

    const today = new Date();

    const [monthCursor, setMonthCursor] = useState(
        new Date(today.getFullYear(), today.getMonth(), 1)
    );

    const [selectedDay, setSelectedDay] = useState(
        today.getDate()
    );

    const [activeTab, setActiveTab] = useState("weekly");

    const [workouts, setWorkouts] = useState([]);
    const [meals, setMeals] = useState([]);
    const [foods, setFoods] = useState([]);
    const [bodyStats, setBodyStats] = useState([]);

    const [loading, setLoading] = useState(true);

    const monthLabel = monthCursor.toLocaleString(
        "default",
        {
            month: "long",
            year: "numeric",
        }
    );

    const gridCells = useMemo(
        () =>
            buildMonthGrid(
                monthCursor.getFullYear(),
                monthCursor.getMonth()
            ),
        [monthCursor]
    );

    const changeMonth = (offset) => {
        setMonthCursor(
            (previous) =>
                new Date(
                    previous.getFullYear(),
                    previous.getMonth() + offset,
                    1
                )
        );

        setSelectedDay(1);
    };



    useEffect(() => {
        const loadAnalyticsData = async () => {
            try {
                setLoading(true);

                const [
                    workoutResponse,
                    mealResponse,
                    foodResponse,
                    bodyStatsResponse,
                ] = await Promise.all([
                    fetch(`${API}/workout-history`),
                    fetch(`${API}/meals`),
                    fetch(`${API}/foods`),
                    fetch(`${API}/body-stats`),
                ]);

                const workoutData = workoutResponse.ok
                    ? await workoutResponse.json()
                    : [];

                const mealData = mealResponse.ok
                    ? await mealResponse.json()
                    : [];

                const foodData = foodResponse.ok
                    ? await foodResponse.json()
                    : [];

                const bodyStatsData = bodyStatsResponse.ok
                    ? await bodyStatsResponse.json()
                    : [];

                console.log("Analytics Workouts:", workoutData);
                console.log("Analytics Meals:", mealData);
                console.log("Analytics Foods:", foodData);
                console.log("Analytics Body Stats:", bodyStatsData);

                setWorkouts(
                    Array.isArray(workoutData)
                        ? workoutData
                        : []
                );

                setMeals(
                    Array.isArray(mealData)
                        ? mealData
                        : []
                );

                setFoods(
                    Array.isArray(foodData)
                        ? foodData
                        : []
                );

                setBodyStats(
                    Array.isArray(bodyStatsData)
                        ? bodyStatsData
                        : []
                );
            } catch (error) {
                console.error(
                    "Analytics loading error:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadAnalyticsData();
    }, []);


    const getDateKey = (date) => {
        const currentDate = new Date(date);

        const year = currentDate.getFullYear();

        const month = String(
            currentDate.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            currentDate.getDate()
        ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };


    const workoutDateKeys = useMemo(() => {
        return new Set(
            workouts.map((workout) =>
                getDateKey(workout.date)
            )
        );
    }, [workouts]);

    const selectedDateKey = getDateKey(
        new Date(
            monthCursor.getFullYear(),
            monthCursor.getMonth(),
            selectedDay
        )
    );

    const selectedDayWorkouts = useMemo(() => {
        return workouts.filter(
            (workout) =>
                getDateKey(workout.date) ===
                selectedDateKey
        );
    }, [
        workouts,
        selectedDateKey,
    ]);



    const getStartOfWeek = (date) => {
        const currentDate = new Date(date);

        const day = currentDate.getDay();

        const difference =
            day === 0 ? -6 : 1 - day;

        currentDate.setDate(
            currentDate.getDate() + difference
        );

        currentDate.setHours(0, 0, 0, 0);

        return currentDate;
    };

    const getEndOfWeek = (date) => {
        const start = getStartOfWeek(date);

        const end = new Date(start);

        end.setDate(
            start.getDate() + 6
        );

        end.setHours(
            23,
            59,
            59,
            999
        );

        return end;
    };

    const currentWeekStart =
        getStartOfWeek(today);

    const currentWeekEnd = getEndOfWeek(today);

    const weeklyWorkouts = workouts.filter((workout) => {
        const workoutDate = new Date(workout.date);

        return (
            workoutDate >= currentWeekStart &&
            workoutDate <= currentWeekEnd
        );
    });


    const monthlyWorkouts = workouts.filter((workout) => {
        const workoutDate = new Date(workout.date);

        return (
            workoutDate.getFullYear() ===
            monthCursor.getFullYear() &&
            workoutDate.getMonth() ===
            monthCursor.getMonth()
        );
    });


    const weeklyTarget = 5;

    const weeklyGoal = Math.min(
        Math.round(
            (weeklyWorkouts.length /
                weeklyTarget) *
            100
        ),
        100
    );



    const sessions = useMemo(() => {
        return selectedDayWorkouts.map(
            (workout, index) => {
                const routineName =
                    workout.routineId?.name ||
                    "Workout";

                const firstExercise =
                    workout.exercises?.[0];

                const exerciseName =
                    firstExercise?.exerciseId?.name ||
                    "Workout Session";

                const totalDuration =
                    workout.exercises?.reduce(
                        (total, exercise) =>
                            total +
                            Number(
                                exercise.duration || 0
                            ),
                        0
                    );

                return {
                    id:
                        workout._id ||
                        `${selectedDateKey}-${index}`,

                    name: routineName,

                    detail: `${exerciseName} • ${totalDuration || 0
                        }m`,

                    icon:
                        index % 2 === 0
                            ? GiWeightLiftingUp
                            : LuActivity,

                    iconWrap:
                        index % 2 === 0
                            ? "bg-primary/15 text-primary"
                            : "bg-secondary/15 text-secondary",

                    status: "Completed",

                    statusClass:
                        "bg-primary text-primary-content",
                };
            }
        );
    }, [
        selectedDayWorkouts,
        selectedDateKey,
    ]);


    const sortedBodyStats = useMemo(() => {
        return [...bodyStats].sort(
            (a, b) =>
                new Date(a.date) -
                new Date(b.date)
        );
    }, [bodyStats]);

    const weightData = useMemo(() => {
        const data =
            activeTab === "weekly"
                ? sortedBodyStats.slice(-7)
                : sortedBodyStats.slice(-12);

        return data.map((item, index) => ({
            day:
                activeTab === "weekly"
                    ? `D${index + 1}`
                    : `M${index + 1}`,

            kg: Number(item.weight || 0),
        }));
    }, [
        sortedBodyStats,
        activeTab,
    ]);

    const weightChange = useMemo(() => {
        if (sortedBodyStats.length < 2) {
            return 0;
        }

        const latest =
            Number(
                sortedBodyStats[
                    sortedBodyStats.length - 1
                ].weight || 0
            );

        const previous =
            Number(
                sortedBodyStats[
                    sortedBodyStats.length - 2
                ].weight || 0
            );

        return latest - previous;
    }, [sortedBodyStats]);

    
    // WORKOUT ACTIVITY CHART
    

    const workoutActivityData = useMemo(() => {
        if (activeTab === "weekly") {
            const data = [];

            for (let i = 0; i < 7; i++) {
                const date = new Date(
                    currentWeekStart
                );

                date.setDate(
                    currentWeekStart.getDate() + i
                );

                const dateKey =
                    getDateKey(date);

                const count =
                    workouts.filter(
                        (workout) =>
                            getDateKey(
                                workout.date
                            ) === dateKey
                    ).length;

                data.push({
                    day: date.toLocaleDateString(
                        "en-US",
                        {
                            weekday: "short",
                        }
                    ),
                    workouts: count,
                });
            }

            return data;
        }

        const data = [];

        for (let week = 0; week < 4; week++) {
            const start = new Date(
                monthCursor.getFullYear(),
                monthCursor.getMonth(),
                1 + week * 7
            );

            const end = new Date(start);

            end.setDate(
                start.getDate() + 6
            );

            const count =
                monthlyWorkouts.filter(
                    (workout) => {
                        const date = new Date(
                            workout.date
                        );

                        return (
                            date >= start &&
                            date <= end
                        );
                    }
                ).length;

            data.push({
                day: `Week ${week + 1}`,
                workouts: count,
            });
        }

        return data;
    }, [
        activeTab,
        workouts,
        currentWeekStart,
        monthlyWorkouts,
        monthCursor,
    ]);

    
    // FOOD MAP
   

    const foodMap = useMemo(() => {
        const map = {};

        foods.forEach((food) => {
            map[food._id] = food;
        });

        return map;
    }, [foods]);

    
    // CALORIE CALCULATION
    
    const calculateMealCalories = (
        meal
    ) => {
        if (!meal.foods) {
            return 0;
        }

        return meal.foods.reduce(
            (total, mealFood) => {
                const food =
                    mealFood.foodId &&
                        typeof mealFood.foodId ===
                        "object"
                        ? mealFood.foodId
                        : foodMap[
                        mealFood.foodId
                        ];

                if (!food) {
                    return total;
                }

                return (
                    total +
                    Number(food.calories || 0) *
                    Number(
                        mealFood.quantity || 1
                    )
                );
            },
            0
        );
    };

    
    // TOTAL CALORIES
    
    const calorieTotal = useMemo(() => {
        const filteredMeals =
            activeTab === "weekly"
                ? meals.filter((meal) => {
                    const date = new Date(
                        meal.date
                    );

                    return (
                        date >= currentWeekStart &&
                        date <= currentWeekEnd
                    );
                })
                : meals.filter((meal) => {
                    const date = new Date(
                        meal.date
                    );

                    return (
                        date.getFullYear() ===
                        monthCursor.getFullYear() &&
                        date.getMonth() ===
                        monthCursor.getMonth()
                    );
                });

        return filteredMeals.reduce(
            (total, meal) =>
                total +
                calculateMealCalories(meal),
            0
        );
    }, [
        meals,
        activeTab,
        foodMap,
        currentWeekStart,
        currentWeekEnd,
        monthCursor,
    ]);

   
    // CALORIE CHART
    
    const calorieData = useMemo(() => {
        const grouped = {};

        meals.forEach((meal) => {
            const dateKey =
                getDateKey(meal.date);

            if (!grouped[dateKey]) {
                grouped[dateKey] = 0;
            }

            grouped[dateKey] +=
                calculateMealCalories(meal);
        });

        const entries = Object.entries(
            grouped
        )
            .sort(
                ([dateA], [dateB]) =>
                    new Date(dateA) -
                    new Date(dateB)
            )
            .slice(
                activeTab === "weekly"
                    ? -7
                    : -30
            );

        return entries.map(
            ([date, calories]) => ({
                day: new Date(
                    date
                ).toLocaleDateString(
                    "en-US",
                    {
                        month: "short",
                        day: "numeric",
                    }
                ),

                calories: Math.round(
                    calories
                ),
            })
        );
    }, [
        meals,
        foodMap,
        activeTab,
    ]);

   
    // TODAY
   
    const todayLabel =
        today.toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
            }
        );

    return (
        <div className="mx-auto w-full max-w-md px-4 pb-28 pt-4 sm:max-w-2xl sm:px-6 lg:max-w-3xl">

            {/* TOP BAR */}
            <div className="mb-5 flex items-center gap-3">

                <button
                    aria-label="Go back"
                    onClick={() => navigate(-1)}
                    className="btn btn-circle btn-sm border-none bg-base-200 text-base-content/80 hover:bg-base-300"
                >
                    <FiArrowLeft className="h-4 w-4" />
                </button>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-content">
                    <FiCalendar className="h-4 w-4" />
                </div>

                <h1 className="text-base font-semibold text-base-content sm:text-lg">
                    Training History
                </h1>

            </div>

            {/* LOADING */}
            {loading && (
                <div className="mb-4 rounded-2xl bg-base-200 p-4 text-center text-sm text-base-content/60">
                    Loading analytics...
                </div>
            )}

            {/* CALENDAR */}
            <div className="rounded-3xl bg-base-100 p-5 text-base-content shadow-sm ring-1 ring-base-300 sm:p-6">

                <div className="mb-4 flex items-center justify-between">

                    <h2 className="text-xl font-bold sm:text-2xl">
                        {monthLabel}
                    </h2>

                    <div className="flex items-center gap-2">

                        <button
                            aria-label="Previous month"
                            onClick={() =>
                                changeMonth(-1)
                            }
                            className="btn btn-circle btn-sm border-none bg-base-200 hover:bg-base-300"
                        >
                            <FiChevronLeft className="h-4 w-4" />
                        </button>

                        <button
                            aria-label="Next month"
                            onClick={() =>
                                changeMonth(1)
                            }
                            className="btn btn-circle btn-sm border-none bg-base-200 hover:bg-base-300"
                        >
                            <FiChevronRight className="h-4 w-4" />
                        </button>

                    </div>

                </div>

                <div className="grid grid-cols-7 gap-y-1 text-center">

                    {WEEKDAYS.map((wd) => (
                        <span
                            key={wd}
                            className="pb-2 text-[11px] font-medium text-base-content/40"
                        >
                            {wd}
                        </span>
                    ))}

                    {gridCells.map(
                        (cell, idx) => {
                            const dateKey =
                                cell.current
                                    ? getDateKey(
                                        new Date(
                                            monthCursor.getFullYear(),
                                            monthCursor.getMonth(),
                                            cell.day
                                        )
                                    )
                                    : "";

                            const isSelected =
                                cell.current &&
                                cell.day ===
                                selectedDay;

                            const hasWorkout =
                                workoutDateKeys.has(
                                    dateKey
                                );

                            return (
                                <button
                                    key={`${cell.day}-${idx}`}
                                    disabled={
                                        !cell.current
                                    }
                                    onClick={() => {
                                        if (
                                            cell.current
                                        ) {
                                            setSelectedDay(
                                                cell.day
                                            );
                                        }
                                    }}
                                    className={`mx-auto flex h-10 w-10 flex-col items-center justify-center gap-0.5 rounded-full text-sm transition-colors sm:h-11 sm:w-11 ${isSelected
                                        ? "bg-primary font-semibold text-primary-content"
                                        : cell.current
                                            ? "text-base-content hover:bg-base-200"
                                            : "text-base-content/25"
                                        }`}
                                >
                                    {cell.day}

                                    {hasWorkout &&
                                        !isSelected && (
                                            <span className="h-1 w-1 rounded-full bg-primary" />
                                        )}
                                </button>
                            );
                        }
                    )}

                </div>
            </div>

            <p className="mb-3 mt-5 text-right text-sm font-semibold text-primary">
                {todayLabel} Today
            </p>

            {/* SESSIONS */}
            <div className="flex flex-col gap-3">

                {sessions.length === 0 ? (
                    <div className="rounded-2xl bg-base-100 p-5 text-center shadow-sm ring-1 ring-base-300">

                        <p className="text-sm text-base-content/60">
                            No workout recorded for{" "}
                            {monthCursor.toLocaleString(
                                "default",
                                {
                                    month: "short",
                                }
                            )}{" "}
                            {selectedDay}.
                        </p>

                    </div>
                ) : (
                    sessions.map((session) => {
                        const Icon = session.icon;

                        return (
                            <div
                                key={session.id}
                                className="flex items-center justify-between rounded-2xl bg-base-100 p-4 shadow-sm ring-1 ring-base-300"
                            >

                                <div className="flex items-center gap-3">

                                    <div
                                        className={`flex h-11 w-11 items-center justify-center rounded-full ${session.iconWrap}`}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <div>

                                        <p className="text-sm font-semibold text-base-content">
                                            {session.name}
                                        </p>

                                        <p className="text-xs text-base-content/50">
                                            {session.detail}
                                        </p>

                                    </div>

                                </div>

                                <span
                                    className={`rounded-full px-3 py-1 text-[11px] font-semibold ${session.statusClass}`}
                                >
                                    {session.status}
                                </span>

                            </div>
                        );
                    })
                )}

            </div>

            {/* PROGRESS TRACKING */}
            <div className="mb-3 mt-8 flex items-center justify-between">

                <h2 className="text-lg font-bold text-base-content">
                    Progress Tracking
                </h2>

                <div className="flex rounded-full bg-base-200 p-1 text-xs font-medium">

                    <button
                        onClick={() =>
                            setActiveTab("weekly")
                        }
                        className={`rounded-full px-3 py-1.5 transition-colors ${activeTab === "weekly"
                            ? "bg-primary text-primary-content"
                            : "text-base-content/60"
                            }`}
                    >
                        Weekly
                    </button>

                    <button
                        onClick={() =>
                            setActiveTab("monthly")
                        }
                        className={`rounded-full px-3 py-1.5 transition-colors ${activeTab === "monthly"
                            ? "bg-primary text-primary-content"
                            : "text-base-content/60"
                            }`}
                    >
                        Monthly
                    </button>

                </div>

            </div>

            {/* WEIGHT CHANGE */}
            <div className="rounded-2xl bg-base-200 p-4 shadow-sm">

                <div className="flex items-start justify-between">

                    <div>

                        <p className="text-[11px] font-medium tracking-wide text-primary">
                            METRIC DATA
                        </p>

                        <p className="text-sm font-semibold text-base-content">
                            Weight Change
                        </p>

                    </div>

                    <div className="text-right">

                        <p className="text-lg font-bold text-base-content">
                            {weightChange > 0
                                ? "+"
                                : ""}
                            {weightChange.toFixed(1)}
                            kg
                        </p>

                        <p className="text-[10px] text-base-content/40">
                            LAST RECORD CHANGE
                        </p>

                    </div>

                </div>

                <div className="mt-3 h-32">

                    {weightData.length > 0 ? (
                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <AreaChart
                                data={weightData}
                            >

                                <XAxis
                                    dataKey="day"
                                    hide
                                />

                                <YAxis
                                    domain={[
                                        "dataMin - 1",
                                        "dataMax + 1",
                                    ]}
                                    hide
                                />

                                <Tooltip />

                                <defs>

                                    <linearGradient
                                        id="weightFill"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >

                                        <stop
                                            offset="0%"
                                            stopColor="var(--p)"
                                            stopOpacity={0.35}
                                        />

                                        <stop
                                            offset="100%"
                                            stopColor="var(--p)"
                                            stopOpacity={0}
                                        />

                                    </linearGradient>

                                </defs>

                                <Area
                                    type="monotone"
                                    dataKey="kg"
                                    stroke="#eab308"
                                    strokeWidth={2.5}
                                    fill="url(#weightFill)"
                                />

                            </AreaChart>

                        </ResponsiveContainer>
                    ) : (
                        <div className="flex h-full items-center justify-center text-xs text-base-content/40">
                            No body weight data available.
                        </div>
                    )}

                </div>

            </div>

            {/* WORKOUT ACTIVITY */}
            <div className="mt-4 rounded-2xl bg-base-200 p-4 shadow-sm">

                <div className="flex items-start justify-between">

                    <div>

                        <p className="text-[11px] font-medium tracking-wide text-secondary">
                            PERFORMANCE
                        </p>

                        <p className="text-sm font-semibold text-base-content">
                            Workout Activity
                        </p>

                    </div>

                    <div className="text-right">

                        <p className="text-lg font-bold text-base-content">
                            {activeTab === "weekly"
                                ? weeklyWorkouts.length
                                : monthlyWorkouts.length}
                        </p>

                        <p className="text-[10px] text-base-content/40">
                            {activeTab === "weekly"
                                ? "THIS WEEK"
                                : "THIS MONTH"}
                        </p>

                    </div>

                </div>

                <div className="mt-3 h-32">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <BarChart
                            data={
                                workoutActivityData
                            }
                        >

                            <XAxis
                                dataKey="day"
                                tick={{
                                    fontSize: 10,
                                }}
                            />

                            <YAxis
                                allowDecimals={false}
                                hide
                            />

                            <Tooltip />

                            <Bar
                                dataKey="workouts"
                                fill="#ef4444"
                                radius={[6, 6, 0, 0]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>

            {/* CALORIE INTAKE */}
            <div className="mt-4 rounded-2xl bg-base-200 p-4 shadow-sm">

                <div className="flex items-start justify-between">

                    <div>

                        <p className="text-[11px] font-medium tracking-wide text-primary">
                            NUTRITION
                        </p>

                        <p className="text-sm font-semibold text-base-content">
                            Calorie Intake
                        </p>

                    </div>

                    <div className="text-right">

                        <p className="text-lg font-bold text-base-content">
                            {Math.round(
                                calorieTotal
                            )}{" "}
                            kcal
                        </p>

                        <p className="text-[10px] text-base-content/40">
                            {activeTab === "weekly"
                                ? "THIS WEEK"
                                : "THIS MONTH"}
                        </p>

                    </div>

                </div>

                <div className="mt-3 h-32">

                    {calorieData.length > 0 ? (
                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <LineChart
                                data={calorieData}
                            >

                                <XAxis
                                    dataKey="day"
                                    tick={{
                                        fontSize: 9,
                                    }}
                                />

                                <YAxis hide />

                                <Tooltip />

                                <Line
                                    type="monotone"
                                    dataKey="calories"
                                    stroke="#22c55e"
                                    strokeWidth={3}
                                    dot={{ r: 4 }}
                                />

                            </LineChart>

                        </ResponsiveContainer>
                    ) : (
                        <div className="flex h-full items-center justify-center text-xs text-base-content/40">
                            No calorie data available.
                        </div>
                    )}

                </div>

            </div>

            {/* PROGRESS PHOTOS */}
            <div className="mb-3 mt-6 flex items-center justify-between">

                <h2 className="text-base font-semibold text-base-content">
                    Progress Photos
                </h2>

                <button className="text-xs font-medium text-primary">
                    See All
                </button>

            </div>

            <div className="flex gap-3 overflow-x-auto pb-1">

                {progressPhotos.map(
                    (photo) => (
                        <div
                            key={photo.id}
                            className="relative flex h-50 w-42 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl bg-base-200 text-base-content/40 ring-1 ring-base-300"
                        >

                            {photo.badge && (
                                <span className="absolute right-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-content">
                                    {photo.badge}
                                </span>
                            )}

                            <img
                                src={photo.img}
                                alt={photo.label}
                                className="h-full w-full rounded-2xl object-cover"
                            />

                            <span className="absolute bottom-2 text-[10px] font-medium text-base-content/60">
                                {photo.label}
                            </span>

                        </div>
                    )
                )}

            </div>

        </div>
    );
};

export default Analytics;