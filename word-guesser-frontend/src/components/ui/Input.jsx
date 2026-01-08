const Input = ({ label, value, onChange, placeholder, type = "text", autoFocus = false }) => {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-slate-300">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none text-white placeholder-slate-500 transition-colors"
      />
    </div>
  );
};

export default Input;