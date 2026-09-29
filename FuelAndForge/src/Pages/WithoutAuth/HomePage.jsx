import React from "react";
import Footer from "../../Components/Footer";
const HomePage = () => {
  return (
    <div className="bg-[#0B1121] text-white min-h-screen font-sans">
      {/* 1. BANNER SECTION */}
      <section
        id="banner"
        className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      >
        <p className="text-teal-400 font-semibold tracking-widest text-sm mb-4 uppercase">
          ● New Performance Engine
        </p>
        <h1 className="text-5xl md:text-7xl font-bold mb-2">Master Your</h1>
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-6">
          Body Mechanics
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto mb-10 text-lg md:text-xl leading-relaxed">
          The precision tool for elite athletes and fitness enthusiasts. Track
          every metric, visualize every gain, and hit your personal best with
          data-driven insights.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-teal-400 hover:bg-teal-300 text-slate-900 font-bold py-3 px-8 rounded-xl transition-all">
            Get Started Free
          </button>
          <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-xl border border-slate-700 transition-all">
            View demo
          </button>
        </div>
      </section>

      {/* 2. HOW IT WORKS / FEATURES SECTION */}
      <section
        id="how-it-works"
        className="py-24 px-4 md:px-16 max-w-6xl mx-auto text-center"
      >
        <p className="text-teal-400 font-bold tracking-widest text-sm mb-4 uppercase">
          Features
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Built for Serious Athletes
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto mb-16 text-lg">
          We've distilled complex sports science into a simple, beautiful
          interface that helps you stay consistent and grow.
        </p>

        {/* Responsive Grid for Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {/* Card 1 */}
          <div className="bg-[#131B2F] p-8 rounded-3xl border border-slate-800 hover:border-teal-400 transition-colors">
            <div className="w-12 h-12 bg-slate-800 rounded-xl mb-6 flex items-center justify-center text-teal-400 font-bold">
              📈
            </div>
            <h3 className="text-xl font-bold mb-4">Deep Data Visualization</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              See your progress over time with high-fidelity charts. Identify
              plateau patterns and celebrate your weekly personal bests.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-[#131B2F] p-8 rounded-3xl border border-teal-500 shadow-[0_0_30px_rgba(20,184,166,0.15)]">
            <div className="w-12 h-12 bg-slate-800 rounded-xl mb-6 flex items-center justify-center text-teal-400 font-bold">
              🏋️
            </div>
            <h3 className="text-xl font-bold mb-4">Dynamic Workout Logging</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Log every rep, set, and resting period with ease. Our interface
              adapts to your routine, whether you're lifting heavy or doing
              HIIT.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-[#131B2F] p-8 rounded-3xl border border-slate-800 hover:border-teal-400 transition-colors">
            <div className="w-12 h-12 bg-slate-800 rounded-xl mb-6 flex items-center justify-center text-teal-400 font-bold">
              📸
            </div>
            <h3 className="text-xl font-bold mb-4">Visual Progress Tracking</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Capture and compare side-by-side progress photos. See the physical
              transformation that mirrors your digital data.
            </p>
          </div>
        </div>
      </section>

      {/* 3. ABOUT US SECTION */}
      <section id="about" className="py-24 px-4 md:px-16 bg-[#0a0f1c]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <p className="text-teal-400 font-bold tracking-widest text-sm mb-4 uppercase">
              About Us
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Driven by Science,
              <br />
              Built for You
            </h2>
            <p className="text-slate-400 mb-6 text-lg leading-relaxed">
              FitTrack started as a project between data scientists and
              professional strength coaches. We realized that most fitness apps
              focused too much on the "social" aspect and not enough on the
              actual metrics that drive improvement.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed">
              Our mission is to provide every individual with elite-level
              tracking tools, helping you understand your body's response to
              training and nutrition with surgical precision.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center gap-12">
            <div>
              <h3 className="text-5xl font-bold text-teal-400 mb-2">99.9%</h3>
              <p className="text-slate-300 font-medium">Data Accuracy</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-indigo-400 mb-2">24/7</h3>
              <p className="text-slate-300 font-medium">Expert Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CONTACT SECTION */}
      <section id="contact" className="py-24 px-4 md:px-16 max-w-4xl mx-auto">
        <div className="bg-[#131B2F] rounded-3xl p-8 md:p-12 border border-slate-700 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Ready to level up?
          </h2>

          <form className="flex flex-col gap-6 mb-10">
            <div className="flex flex-col md:flex-row gap-6">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-[#0B1120] border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-teal-400"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-[#0B1120] border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-teal-400"
              />
            </div>
            <textarea
              rows="4"
              placeholder="Tell us about your fitness goals..."
              className="w-full bg-[#0B1120] border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-teal-400"
            ></textarea>
            <button
              type="button"
              className="bg-teal-400 hover:bg-teal-300 text-slate-900 font-bold py-4 rounded-xl transition-all text-lg w-full"
            >
              Send Message
            </button>
          </form>

          {/* Contact Details & Logos */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-800 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-teal-400 text-xl">📍</span>
              Dhaka, Bangladesh
            </div>
            <div className="flex items-center gap-2">
              <span className="text-teal-400 text-xl">✉️</span>
              hello@fittrack.app
            </div>
            <div className="flex items-center gap-2">
              <span className="text-teal-400 text-xl">📞</span>
              +1 (555) 000-FIT
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default HomePage;
