const Input = ({ value, onChange, variant = "default", ...attrs }) => {
  if (variant === "minimal") {
    return (
      <div className="relative flex items-center group">
        <input
          type="time"
          value={value}
          onChange={onChange}
          className="
            bg-transparent border-none outline-none
            text-indigo-600 font-black text-lg tracking-widest
            cursor-pointer transition-all hover:scale-110
            [&-::-webkit-calendar-picker-indicator]:hidden
          "
          {...attrs}
        />
      </div>
    );
  }

  return (
    <input className="px-4 py-2 bg-slate-100 rounded-xl outline-none" {...attrs} />
  );
};

export default Input;