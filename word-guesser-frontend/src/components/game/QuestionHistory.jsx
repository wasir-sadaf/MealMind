import { useEffect, useRef } from 'react';

const QuestionHistory = ({ questions }) => {
  const bottomRef = useRef(null);

  // Auto-scroll to bottom when new questions arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [questions]);

  if (!questions || questions.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-600 italic">
        No questions asked yet.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
      {questions.map((q) => (
        <div 
          key={q.question_id} 
          className="bg-slate-700/50 p-3 rounded-lg border border-slate-700/50"
        >
          <div className="flex justify-between items-start gap-4">
            <p className="text-slate-200 font-medium text-sm md:text-base">
              {q.question_text}
            </p>
            
            {/* Answer Badge */}
            {q.answer ? (
              <span className={`px-2 py-1 text-xs font-bold rounded uppercase tracking-wide shrink-0
                ${q.answer === 'Yes' 
                  ? 'bg-green-900 text-green-300 border border-green-700' 
                  : 'bg-red-900 text-red-300 border border-red-700'
                }`}
              >
                {q.answer}
              </span>
            ) : (
              <span className="text-xs text-slate-500 animate-pulse whitespace-nowrap">
                Thinking...
              </span>
            )}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default QuestionHistory;