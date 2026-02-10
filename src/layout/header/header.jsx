const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-indigo-200 shadow-lg">
            <span className="text-white font-bold text-xs">T</span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 tracking-tight">
            TimeSync
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
          <div className="px-4 py-1.5 bg-slate-100 rounded-full text-slate-600 text-xs">
            v2.0 Beta
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;