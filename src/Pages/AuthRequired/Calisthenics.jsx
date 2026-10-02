import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FiChevronLeft, FiSearch, FiPlayCircle, FiFileText } from 'react-icons/fi';

const exercises = [
  { id: 'c1', name: 'Dips', category: 'Chest', type: 'Parallel Bars', img: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=150&h=150&fit=crop' },
  { id: 'c2', name: 'Planche Leans', category: 'Shoulders', type: 'Floor', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150&h=150&fit=crop' },
  { id: 'c3', name: 'Muscle Ups', category: 'Back', type: 'Bar', img: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=150&h=150&fit=crop' },
  { id: 'c4', name: 'Front Lever', category: 'Back', type: 'Rings', img: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?w=150&h=150&fit=crop' },
  { id: 'c5', name: 'Pistol Squats', category: 'Legs', type: 'Bodyweight', img: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=150&h=150&fit=crop' },
  { id: 'c6', name: 'Handstand Pushup', category: 'Shoulders', type: 'Wall', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=150&h=150&fit=crop' },
  { id: 'c7', name: 'L-Sit', category: 'Core', type: 'Floor', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=150&h=150&fit=crop' },
  { id: 'c8', name: 'Chin Ups', category: 'Arms', type: 'Bar', img: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=150&h=150&fit=crop' },
];

const categories = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms'];
const Calisthenics = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');
  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const filtered = exercises.filter(ex => 
    (activeCat === 'All' || ex.category === activeCat) &&
    ex.name.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = filtered.reduce((acc, ex) => {
    (acc[ex.category] = acc[ex.category] || []).push(ex);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#0B1121] text-white pb-24 font-sans">
      {/* Header */}
      <div className="p-6 sticky top-0 bg-[#0B1121]/90 backdrop-blur-md z-10">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate('/dashboard/workouts')} className="w-10 h-10 bg-[#1A2235] rounded-xl flex items-center justify-center hover:bg-slate-700 transition">
            <FiChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">Calisthenics</h1>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" placeholder="Search exercises..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1A2235] rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-teal-400 text-white placeholder-slate-500"
          />
        </div>

        {/* Categories (Horizontal Scroll) */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition ${activeCat === cat ? 'bg-teal-500 text-[#0B1121]' : 'bg-[#1A2235] text-slate-300 hover:bg-slate-700'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise List */}
      <div className="px-6 space-y-8">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">{category} ({items.length})</h2>
            <div className="space-y-3">
              {items.map(ex => (
                <div key={ex.id} onClick={() => toggleSelect(ex.id)}
                  className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition border ${selected.includes(ex.id) ? 'border-teal-500 bg-[#131B2F]' : 'border-transparent bg-[#1A2235] hover:bg-slate-800'}`}>
                  <img src={ex.img} alt={ex.name} className="w-16 h-16 rounded-xl object-cover bg-slate-800" />
                  <div className="flex-1">
                    <h3 className="font-bold text-base">{ex.name}</h3>
                    <p className="text-xs text-teal-400">{ex.category} • {ex.type}</p>
                  </div>
                  <div className="flex gap-3 text-slate-400 px-2">
                    <FiPlayCircle size={22} className="hover:text-white transition" />
                    <FiFileText size={22} className="hover:text-white transition" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Bottom Action */}
      {selected.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0B1121] via-[#0B1121] to-transparent">
          <button className="w-full bg-teal-500 hover:bg-teal-400 text-[#0B1121] font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(20,184,166,0.2)] transition">
            Confirm Selection ({selected.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default Calisthenics;