const Header = () => {
  return (
    <header
      className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60"
      aria-label="Site Header"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-slate-800 to-slate-500 tracking-tight">
            TimeSync
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;