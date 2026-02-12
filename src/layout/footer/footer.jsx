const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-slate-100 py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-slate-400 text-sm">
          &copy; {currentYear} <span className="text-slate-600 font-semibold italic">sunprime</span>
        </div>

        <div className="flex gap-6 items-center">
          <div className="h-4 w-[1px] bg-slate-200"></div>
          <p className="text-slate-400 text-sm flex items-center gap-1">
            Made with <span className="text-rose-500 text-lg">♥</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;