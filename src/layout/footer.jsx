import { version } from '../../package.json';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-slate-100 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

        <div className="text-slate-400 text-xs flex items-center gap-1">
          <span>&copy; {currentYear}</span>
          <a
            href="https://www.linkedin.com/in/elenavelytchenko/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 font-semibold hover:text-indigo-600 transition-colors duration-300 decoration-slate-200 underline-offset-4 hover:underline"
          >
            sunprime
          </a>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-slate-500 text-[10px] font-mono shadow-sm">
            v{version}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;