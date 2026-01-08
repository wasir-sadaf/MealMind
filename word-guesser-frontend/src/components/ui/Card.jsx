const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700 ${className}`}>
      {children}
    </div>
  );
};

export default Card;