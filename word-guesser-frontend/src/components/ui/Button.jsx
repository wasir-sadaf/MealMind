const Button = ({ children, onClick, variant = 'primary', disabled = false, className = '' }) => {
  const baseStyles = "w-full py-3 rounded-xl font-bold text-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-teal-500 hover:bg-teal-400 text-slate-900 shadow-lg hover:shadow-teal-500/20",
    secondary: "bg-slate-700 hover:bg-slate-600 text-white",
    danger: "bg-red-600 hover:bg-red-500 text-white shadow-lg"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;