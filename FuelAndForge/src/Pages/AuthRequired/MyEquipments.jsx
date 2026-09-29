import { useState } from 'react';
import { useNavigate } from 'react-router';
import { HiChevronLeft, HiPlus, HiSearch, HiTrash, HiCheck } from 'react-icons/hi';
import { LuDumbbell, LuSparkles, LuBox, LuLayers } from 'react-icons/lu';

const MyEquipments = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Summary stats
  const equipmentStats = [
    { label: 'Owned Items', value: '8', icon: LuDumbbell, color: 'text-primary' },
    { label: 'Saved Presets', value: '3', icon: LuLayers, color: 'text-secondary' },
    { label: 'Gym Type', value: 'Home Gym', icon: LuBox, color: 'text-accent' },
  ];

  // Equipment item inventory
  const [equipments, setEquipments] = useState([
    {
      id: 'dumbbells',
      name: 'Adjustable Dumbbells',
      category: 'free-weights',
      weightRange: '5 - 52.5 lbs',
      quantity: '1 Pair',
      available: true,
      icon: LuDumbbell,
      accentBg: 'bg-primary/10 text-primary',
    },
    {
      id: 'kettlebell',
      name: 'Kettlebell',
      category: 'free-weights',
      weightRange: '35 lbs (16 kg)',
      quantity: '2 Units',
      available: true,
      icon: LuDumbbell,
      accentBg: 'bg-secondary/10 text-secondary',
    },
    {
      id: 'pullup-bar',
      name: 'Doorway Pull-up Bar',
      category: 'bodyweight',
      weightRange: 'Up to 300 lbs',
      quantity: '1 Unit',
      available: true,
      icon: LuSparkles,
      accentBg: 'bg-accent/10 text-accent',
    },
    {
      id: 'resistance-bands',
      name: 'Resistance Band Set',
      category: 'accessories',
      weightRange: '10 - 50 lbs resistance',
      quantity: '5 Bands',
      available: true,
      icon: LuLayers,
      accentBg: 'bg-sky-500/10 text-sky-400',
    },
    {
      id: 'bench',
      name: 'Adjustable Weight Bench',
      category: 'bench',
      weightRange: 'Flat, Incline, Decline',
      quantity: '1 Unit',
      available: false,
      icon: LuBox,
      accentBg: 'bg-base-300 text-base-content/60',
    },
  ]);

  const toggleAvailability = (id) => {
    setEquipments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  const filteredEquipments = equipments.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-circle btn-ghost btn-sm bg-base-200 border border-base-300 hover:bg-base-300"
          >
            <HiChevronLeft className="text-xl" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">My Equipments</h1>
            <p className="text-xs text-base-content/60">Manage Gear & Workout Compatibility</p>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-sm rounded-xl font-bold gap-1.5 shadow-md shadow-primary/20"
        >
          <HiPlus className="text-lg" />
          <span className="hidden sm:inline">Add Gear</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        {equipmentStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-base-200 p-4 md:p-5 rounded-2xl border border-base-300 flex items-center gap-4 shadow-sm"
            >
              <div className={`p-3 rounded-xl bg-base-100 ${stat.color} border border-base-300`}>
                <Icon className="text-2xl" />
              </div>
              <div>
                <p className="text-xs font-bold text-base-content/60 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-xl md:text-2xl font-black mt-0.5">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search Bar & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40 text-lg" />
          <input
            type="text"
            placeholder="Search gear..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-sm w-full pl-10 rounded-xl bg-base-200 border-base-300 focus:border-primary text-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="bg-base-200 p-1 rounded-2xl border border-base-300 flex items-center gap-1 w-full sm:w-auto overflow-x-auto">
          {[
            { key: 'all', label: 'All' },
            { key: 'free-weights', label: 'Weights' },
            { key: 'bodyweight', label: 'Bodyweight' },
            { key: 'accessories', label: 'Bands' },
          ].map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat.key
                  ? 'bg-primary text-primary-content shadow-sm'
                  : 'text-base-content/60 hover:text-base-content'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {filteredEquipments.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`bg-base-200 p-5 md:p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between shadow-sm ${
                item.available
                  ? 'border-base-300 hover:border-primary/40'
                  : 'border-base-300/50 opacity-60'
              }`}
            >
              <div>
                {/* Header: Icon & Availability Toggle */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${item.accentBg}`}>
                    <Icon className="text-2xl" />
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleAvailability(item.id)}
                    className={`btn btn-xs rounded-full font-bold px-3 border transition-colors ${
                      item.available
                        ? 'btn-success btn-outline hover:bg-success hover:text-success-content'
                        : 'bg-base-100 border-base-300 text-base-content/50'
                    }`}
                  >
                    {item.available ? (
                      <>
                        <HiCheck className="text-xs" />
                        In Use
                      </>
                    ) : (
                      'Disabled'
                    )}
                  </button>
                </div>

                {/* Title & Details */}
                <h2 className="text-lg font-bold mb-1">{item.name}</h2>
                <div className="space-y-1 text-xs text-base-content/70 mb-4">
                  <p>
                    <span className="font-semibold text-base-content/90">Range/Type:</span>{' '}
                    {item.weightRange}
                  </p>
                  <p>
                    <span className="font-semibold text-base-content/90">Quantity:</span>{' '}
                    {item.quantity}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-base-300/60 flex items-center justify-between">
                <span className="text-[10px] font-bold text-base-content/50 uppercase tracking-wider">
                  {item.category.replace('-', ' ')}
                </span>
                <button
                  type="button"
                  aria-label={`Remove ${item.name}`}
                  className="text-base-content/40 hover:text-error transition-colors p-1"
                >
                  <HiTrash className="text-base" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyEquipments;