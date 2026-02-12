const Button = ({ children, onClick, active, ...attrs }) => (
  <button
    onClick={onClick}
    className={`px-10 py-3 rounded-full font-semibold tracking-wide transition-all shadow-lg active:scale-95 
      ${active
      ? 'bg-indigo-600 text-white shadow-indigo-200'
      : 'bg-white text-slate-600 hover:bg-slate-50'}`}
    {...attrs}
  >
    {children}
  </button>
);
export default Button;