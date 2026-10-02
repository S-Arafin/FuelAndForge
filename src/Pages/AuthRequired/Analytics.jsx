import React, { useMemo, useState } from 'react';
import {
    AreaChart,
    Area,
    LineChart,
    Line,
    ResponsiveContainer,
    YAxis,
} from 'recharts';
import {
    FiArrowLeft,
    FiCalendar,
    FiChevronLeft,
    FiChevronRight,
    FiArrowUp,
    FiZap,
    FiImage,
} from 'react-icons/fi';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { LuActivity } from 'react-icons/lu';
import { MdSelfImprovement } from 'react-icons/md';
import img1 from '../../Assets/gorilla-freak-wt5jg8_WrJg-unsplash.jpg';
import img2 from '../../Assets/luke-witter-k47w6BeapCs-unsplash.jpg';

// ---- Static data (swap with real data from your API/state) ----
const WEEKDAYS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

// day -> number of dot markers under that day in the calendar
const eventDots = { 3: 1, 8: 2, 11: 1 };

const sessions = [
    {
        id: 'strength',
        name: 'Strength Training',
        detail: 'Lower Body Power • 45m',
        icon: GiWeightLiftingUp,
        iconWrap: 'bg-primary/15 text-primary',
        status: 'Completed',
        statusClass: 'bg-primary text-primary-content',
    },
    {
        id: 'cardio',
        name: 'Cardio Session',
        detail: 'HIIT Sprints • 20m',
        icon: LuActivity,
        iconWrap: 'bg-secondary/15 text-secondary',
        status: 'Pending',
        statusClass: 'bg-base-300 text-base-content/70',
    },
    {
        id: 'flexibility',
        name: 'Flexibility',
        detail: 'Active Recovery • 15m',
        icon: MdSelfImprovement,
        iconWrap: 'bg-success/15 text-success',
        status: 'Rest Day',
        statusClass: 'bg-base-300 text-base-content/70',
    },
];

const weightData = [
    { day: 'W1', kg: 78.4 },
    { day: 'W2', kg: 77.9 },
    { day: 'W3', kg: 78.1 },
    { day: 'W4', kg: 77.2 },
    { day: 'W5', kg: 76.6 },
    { day: 'W6', kg: 76.3 },
    { day: 'W7', kg: 76.0 },
];

const deadliftData = [
    { week: 'Week 1', kg: 120 },
    { week: 'Week 2', kg: 125 },
    { week: 'Week 3', kg: 130 },
    { week: 'Week 4', kg: 145 },
];

const progressPhotos = [
    { id: 1, label: 'Oct 12, 2025', badge: null, img: img2 },
    { id: 2, label: 'Today', badge: 'Today', img: img1 },
];

// Build a Monday-first month grid of { day, current } cells
function buildMonthGrid(year, monthIndex) {
    const firstWeekday = (new Date(year, monthIndex, 1).getDay() + 6) % 7; // 0 = Monday
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, monthIndex, 0).getDate();

    const cells = [];
    for (let i = firstWeekday - 1; i >= 0; i -= 1) {
        cells.push({ day: daysInPrevMonth - i, current: false });
    }
    for (let d = 1; d <= daysInMonth; d += 1) {
        cells.push({ day: d, current: true });
    }
    let nextDay = 1;
    while (cells.length % 7 !== 0) {
        cells.push({ day: nextDay, current: false });
        nextDay += 1;
    }
    return cells;
}

const Analytics = () => {
    const [monthCursor, setMonthCursor] = useState(new Date(2026, 6, 1)); // July 2026
    const [selectedDay, setSelectedDay] = useState(16);
    const [activeTab, setActiveTab] = useState('weekly');

    const monthLabel = monthCursor.toLocaleString('default', {
        month: 'long',
        year: 'numeric',
    });

    const gridCells = useMemo(
        () => buildMonthGrid(monthCursor.getFullYear(), monthCursor.getMonth()),
        [monthCursor]
    );

    const changeMonth = (offset) => {
        setMonthCursor(
            (prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1)
        );
    };

    return (
        <div className="mx-auto w-full max-w-md px-4 pb-28 pt-4 sm:max-w-2xl sm:px-6 lg:max-w-3xl">
            {/* ---------------- Top bar ---------------- */}
            <div className="mb-5 flex items-center gap-3">
                <button
                    aria-label="Go back"
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

            {/* ---------------- Calendar card ---------------- */}
            <div className="rounded-3xl bg-base-100 p-5 text-base-content shadow-sm ring-1 ring-base-300 sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold sm:text-2xl">{monthLabel}</h2>
                    <div className="flex items-center gap-2">
                        <button
                            aria-label="Previous month"
                            onClick={() => changeMonth(-1)}
                            className="btn btn-circle btn-sm border-none bg-base-200 hover:bg-base-300"
                        >
                            <FiChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            aria-label="Next month"
                            onClick={() => changeMonth(1)}
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

                    {gridCells.map((cell, idx) => {
                        const isSelected = cell.current && cell.day === selectedDay;
                        const dots = cell.current ? eventDots[cell.day] || 0 : 0;

                        return (
                            <button
                                key={`${cell.day}-${idx}`}
                                disabled={!cell.current}
                                onClick={() => cell.current && setSelectedDay(cell.day)}
                                className={`mx-auto flex h-10 w-10 flex-col items-center justify-center gap-0.5 rounded-full text-sm transition-colors sm:h-11 sm:w-11 ${
                                    isSelected
                                        ? 'bg-primary font-semibold text-primary-content'
                                        : cell.current
                                        ? 'text-base-content hover:bg-base-200'
                                        : 'text-base-content/25'
                                }`}
                            >
                                {cell.day}
                                {dots > 0 && !isSelected && (
                                    <span className="flex gap-0.5">
                                        {Array.from({ length: dots }).map((_, i) => (
                                            <span
                                                key={i}
                                                className="h-1 w-1 rounded-full bg-primary"
                                            />
                                        ))}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            <p className="mb-3 mt-5 text-right text-sm font-semibold text-primary">
                Jul 31 Today
            </p>

            {/* ---------------- Sessions list ---------------- */}
            <div className="flex flex-col gap-3">
                {sessions.map((session) => {
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
                })}
            </div>

            {/* ---------------- Weekly goal ---------------- */}
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-base-200 p-5 shadow-sm">
                <div>
                    <p className="text-[11px] font-medium tracking-wide text-primary">
                        WEEKLY GOAL
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-3xl font-bold text-base-content">
                        82%
                        <FiArrowUp className="h-5 w-5 text-primary" />
                    </p>
                    <p className="mt-1 text-sm text-base-content/50">
                        You&apos;ve hit 4/5 session targets.
                    </p>
                </div>
                <button
                    aria-label="Weekly goal details"
                    className="btn btn-circle h-14 w-14 border-none bg-primary text-primary-content shadow-lg shadow-primary/30 hover:bg-primary/90"
                >
                    <FiZap className="h-6 w-6" />
                </button>
            </div>

            {/* ---------------- Progress tracking ---------------- */}
            <div className="mb-3 mt-8 flex items-center justify-between">
                <h2 className="text-lg font-bold text-base-content">
                    Progress Tracking
                </h2>
                <div className="flex rounded-full bg-base-200 p-1 text-xs font-medium">
                    <button
                        onClick={() => setActiveTab('weekly')}
                        className={`rounded-full px-3 py-1.5 transition-colors ${
                            activeTab === 'weekly'
                                ? 'bg-primary text-primary-content'
                                : 'text-base-content/60'
                        }`}
                    >
                        Weekly
                    </button>
                    <button
                        onClick={() => setActiveTab('monthly')}
                        className={`rounded-full px-3 py-1.5 transition-colors ${
                            activeTab === 'monthly'
                                ? 'bg-primary text-primary-content'
                                : 'text-base-content/60'
                        }`}
                    >
                        Monthly
                    </button>
                </div>
            </div>

            {/* Weight change */}
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
                        <p className="text-lg font-bold text-base-content">-2.4kg</p>
                        <p className="text-[10px] text-base-content/40">LAST 7 DAYS</p>
                    </div>
                </div>
                <div className="mt-3 h-24">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={weightData}>
                            <defs>
                                <linearGradient id="weightFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="0%"
                                        stopColor="hsl(var(--p))"
                                        stopOpacity={0.35}
                                    />
                                    <stop
                                        offset="100%"
                                        stopColor="hsl(var(--p))"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide />
                            <Area
                                type="monotone"
                                dataKey="kg"
                                stroke="hsl(var(--p))"
                                strokeWidth={2}
                                fill="url(#weightFill)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Deadlift trend */}
            <div className="mt-4 rounded-2xl bg-base-200 p-4 shadow-sm">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-[11px] font-medium tracking-wide text-secondary">
                            PERFORMANCE
                        </p>
                        <p className="text-sm font-semibold text-base-content">
                            Deadlift Trend
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold text-base-content">145kg</p>
                        <p className="text-[10px] text-base-content/40">PERSONAL BEST</p>
                    </div>
                </div>
                <div className="mt-3 h-24">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={deadliftData}>
                            <YAxis domain={['dataMin - 10', 'dataMax + 10']} hide />
                            <Line
                                type="stepAfter"
                                dataKey="kg"
                                stroke="hsl(var(--s))"
                                strokeWidth={2.5}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-1 flex justify-between text-[10px] text-base-content/40">
                    {deadliftData.map((d) => (
                        <span key={d.week}>{d.week}</span>
                    ))}
                </div>
            </div>

            {/* Progress photos */}
            <div className="mb-3 mt-6 flex items-center justify-between">
                <h2 className="text-base font-semibold text-base-content">
                    Progress Photos
                </h2>
                <button className="text-xs font-medium text-primary">See All</button>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-1">
                {progressPhotos.map((photo) => (
                    <div
                        key={photo.id}
                        className="relative flex h-50 w-42 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl bg-base-200 text-base-content/40 ring-1 ring-base-300"
                    >
                        {photo.badge && (
                            <span className="absolute right-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-content">
                                {photo.badge}
                            </span>
                        )}
                        <img src={photo.img} alt={photo.label} className="h-full w-full" />
                        <span className="absolute bottom-2 text-[10px] font-medium text-base-content/60">
                            {photo.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Analytics;
