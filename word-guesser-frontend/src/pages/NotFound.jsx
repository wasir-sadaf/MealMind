import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-6 py-20">
      <h1 className="text-9xl font-black text-slate-800">404</h1>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
        <p className="text-slate-400">The page you are looking for doesn't exist or has been moved.</p>
      </div>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-lg transition-colors"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;