import { useState, useRef } from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { FiCalendar,FiPlus,FiX, FiCheck } from "react-icons/fi";
import { LuSalad, LuMoon, LuBarcode } from "react-icons/lu";
import { PiBowlFoodBold } from "react-icons/pi";
import { GiCookingPot } from "react-icons/gi";

// ---- Static Data ----
const dailySummary = { consumed: 1240, goal: 2000, remaining: 760, percent: 62 };
const macros = [
    { label: "Protein", value: "92g", pct: 70, color: "bg-primary" },
    { label: "Carbs", value: "145g", pct: 55, color: "bg-secondary" },
    { label: "Fats", value: "38g", pct: 35, color: "bg-accent" },
];
const meals = [
    { id: "breakfast", name: "Breakfast", kcalLabel: "420 kcal", icon: PiBowlFoodBold, iconWrap: "bg-primary/15 text-primary", item: { name: "Greek Yogurt with Berries", detail: "250g • 32g Protein", kcal: "280 kcal" } },
    { id: "lunch", name: "Lunch", kcalLabel: "650 kcal", icon: GiCookingPot, iconWrap: "bg-warning/15 text-warning", item: { name: "Grilled Chicken Salad", detail: "400g • 45g Protein", kcal: "510 kcal" } },
    { id: "dinner", name: "Dinner", kcalLabel: "Planned", icon: LuMoon, iconWrap: "bg-secondary/15 text-secondary", item: null },
    { id: "snacks", name: "Snacks", kcalLabel: "210 kcal", icon: LuSalad, iconWrap: "bg-error/15 text-error", item: null },
];
const WATER_GOAL_ML = 2500;
const WATER_STEP_ML = 500;

const Nutrition = () => {
    const [waterMl, setWaterMl] = useState(1200);
    const totalCups = WATER_GOAL_ML / WATER_STEP_ML;
    const filledCups = Math.round(waterMl / WATER_STEP_ML);
    const chartData = [{ value: dailySummary.percent, fill: "url(#ringGradient)" }];

    // ---- Camera & Scanner State ----
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageCapture = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create a temporary URL to preview the image
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
        }
    };

    const closePreview = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input
    };

    const processImage = () => {
        // Add your AI vision or barcode processing logic here
        console.log("Processing image...");
        setTimeout(() => closePreview(), 1000); // Close after mock processing
    };

    return (
        <div className="mx-auto w-full max-w-md px-4 pb-28 pt-4 sm:max-w-2xl sm:px-6 lg:max-w-3xl">
            {/* Top bar */}
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <p className="text-[11px] font-medium tracking-wide text-primary">Today&apos;s Summary</p>
                    <h1 className="text-xl font-bold text-base-content sm:text-2xl">Nutrition Tracker</h1>
                </div>
                <div className="flex items-center gap-2">
                    <button className="btn btn-circle btn-sm border-none bg-base-200 text-base-content/80 hover:bg-base-300">
                        <FiCalendar className="h-4 w-4" />
                    </button>
                    <div className="avatar hidden sm:inline-flex">
                        
                    </div>
                </div>
            </div>

            {/* Daily summary card */}
            <div className="rounded-3xl bg-base-200 p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-base-content/50">Daily Summary</p>
                        <p className="mt-1 text-3xl font-bold text-base-content sm:text-4xl">
                            {dailySummary.consumed.toLocaleString()} <span className="text-base font-medium text-base-content/50">kcal</span>
                        </p>
                        <p className="mt-1 text-sm font-medium text-primary">{dailySummary.remaining} calories remaining</p>
                    </div>
                    <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
                        <RadialBarChart width={112} height={112} cx="50%" cy="50%" innerRadius="78%" outerRadius="100%" barSize={10} data={chartData} startAngle={90} endAngle={-270} className="h-full w-full">
                            <defs>
                                <linearGradient id="ringGradient" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="hsl(var(--p))" />
                                    <stop offset="100%" stopColor="hsl(var(--a))" />
                                </linearGradient>
                            </defs>
                            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                            <RadialBar background={{ fill: "hsl(var(--b3))" }} dataKey="value" cornerRadius={20} fill="url(#ringGradient)" />
                        </RadialBarChart>
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold text-base-content">{dailySummary.percent}%</span>
                        </div>
                    </div>
                </div>

                {/* Macros */}
                <div className="mt-5 grid grid-cols-3 gap-3">
                    {macros.map((m) => (
                        <div key={m.label}>
                            <div className="mb-1.5 flex items-baseline justify-between">
                                <span className="text-[11px] text-base-content/50">{m.label}</span>
                                <span className="text-xs font-semibold text-base-content">{m.value}</span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-base-300">
                                <div className={`h-full rounded-full ${m.color}`} style={{ width: `${m.pct}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Daily meals */}
            <div className="mb-3 mt-6 flex items-center gap-2">
                <LuSalad className="h-4 w-4 text-primary" />
                <h2 className="text-base font-semibold text-base-content">Daily Meals</h2>
            </div>

            <div className="flex flex-col gap-3">
                {meals.map((meal) => {
                    const Icon = meal.icon;
                    return (
                        <div key={meal.id} className="rounded-2xl bg-base-200 p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${meal.iconWrap}`}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-base-content">{meal.name}</p>
                                        <p className="text-xs text-base-content/50">{meal.kcalLabel}</p>
                                    </div>
                                </div>
                                <button className={`btn btn-circle btn-sm border-none ${meal.item ? "bg-base-300 text-base-content/70" : "bg-primary text-primary-content"}`}>
                                    <FiPlus className="h-4 w-4" />
                                </button>
                            </div>
                            {meal.item && (
                                <div className="mt-3 flex items-center justify-between border-t border-base-300 pt-3">
                                    <div>
                                        <p className="text-sm font-medium text-base-content">{meal.item.name}</p>
                                        <p className="text-xs text-base-content/50">{meal.item.detail}</p>
                                    </div>
                                    <span className="text-sm font-semibold text-base-content">{meal.item.kcal}</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Water intake */}
            <div className="mt-4 rounded-2xl bg-base-200 p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-semibold text-base-content">Water Intake</span>
                    <span className="text-sm font-semibold text-primary">{(waterMl / 1000).toFixed(1)}L / {(WATER_GOAL_ML / 1000).toFixed(1)}L</span>
                </div>
                <div className="flex items-center gap-2">
                    {Array.from({ length: totalCups }).map((_, i) => (
                        <button key={i} onClick={() => setWaterMl(waterMl === (i + 1) * WATER_STEP_ML ? i * WATER_STEP_ML : (i + 1) * WATER_STEP_ML)} className={`h-9 flex-1 rounded-lg transition-colors ${i < filledCups ? "bg-primary" : "bg-base-300"}`} />
                    ))}
                </div>
            </div>

            {/* ---------------- Camera/Upload Section ---------------- */}
            
            {/* Hidden File Input */}
            <input 
                type="file" 
                accept="image/*" 
                capture="environment" 
                ref={fileInputRef} 
                onChange={handleImageCapture} 
                className="hidden" 
            />

            {/* Floating Action Button */}
            <button
                onClick={() => fileInputRef.current.click()}
                className="btn btn-circle fixed bottom-24 right-5 h-16 w-16 border-none bg-primary text-primary-content shadow-lg shadow-primary/30 hover:bg-primary/90 sm:bottom-8 z-40 transition-transform active:scale-95"
            >
                <span className="flex flex-col items-center gap-0.5">
                    <LuBarcode className="h-6 w-6" />
                    <span className="text-[9px] font-semibold leading-none">SCAN</span>
                </span>
            </button>

            {/* Simple Image Preview Overlay */}
            {imagePreview && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="relative w-full max-w-md bg-base-100 rounded-3xl overflow-hidden shadow-2xl">
                        
                        {/* Image Container */}
                        <div className="relative aspect-[4/5] w-full bg-base-300">
                            <img 
                                src={imagePreview} 
                                alt="Scanned food or barcode" 
                                className="w-full h-full object-cover"
                            />
                            
                            {/* Scanning Animation Overlay (Optional visual flair) */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent w-full h-1/2 animate-[scan_2s_ease-in-out_infinite]" />
                        </div>

                        {/* Action Buttons */}
                        <div className="p-6 flex gap-4 bg-base-200">
                            <button 
                                onClick={closePreview} 
                                className="btn btn-outline flex-1 rounded-2xl border-base-content/20 text-base-content hover:bg-base-300 hover:border-base-content/30"
                            >
                                <FiX className="h-5 w-5" /> Retake
                            </button>
                            <button 
                                onClick={processImage} 
                                className="btn bg-primary text-primary-content flex-1 rounded-2xl border-none hover:bg-primary/90 shadow-lg shadow-primary/20"
                            >
                                <FiCheck className="h-5 w-5" /> Analyze
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Nutrition;