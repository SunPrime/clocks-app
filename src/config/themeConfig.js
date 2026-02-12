const themeConfig = {
  card: {
    base: "backdrop-blur-xl p-6 lg:p-8 rounded-[2.5rem] border flex flex-col items-center justify-between h-[420px] lg:h-[450px] transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group/card",
    day: "bg-gradient-to-b from-amber-50 to-white shadow-xl shadow-orange-100/50 border-white/60",
    night: "bg-gradient-to-b from-indigo-600 to-slate-800 shadow-xl shadow-indigo-800/40",
  },
  text: {
    title: "font-bold uppercase tracking-[0.2em] text-[10px] py-1 italic",
    titleDay: "text-slate-400",
    titleNight: "text-indigo-200/70",
    selectDay: "text-slate-500 hover:text-indigo-600",
    selectNight: "text-indigo-100 hover:text-white",
  },
  effects: {
    nightGlow: "absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none",
    clockGlowDay: "bg-orange-400/10",
    clockGlowNight: "bg-indigo-500/10",
  }
};

export default themeConfig;