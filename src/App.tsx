import { useState, useEffect } from 'react';
import type { GameContent } from './types';
import { Intro } from './components/Intro';
import { Exam } from './components/Exam';
import { Practical } from './components/Practical';
import { Result } from './components/Result';
import { Loader2 } from 'lucide-react';

function App() {
  const [content, setContent] = useState<GameContent | null>(null);
  const [currentView, setCurrentView] = useState<'intro' | 'exam' | 'practical' | 'result'>('intro');
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch('/content.json')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error("Failed to load content:", err));
  }, []);

  if (!content) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-900 text-gold-500">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="min-h-screen font-sans text-slate-100 selection:bg-primary selection:text-slate-900">
      {currentView === 'intro' && (
        <Intro
          data={content.intro}
          onStart={() => setCurrentView('exam')}
        />
      )}

      {currentView === 'exam' && (
        <Exam
          data={content.exam}
          onComplete={(finalScore) => {
            setScore(finalScore);
            setCurrentView('practical');
          }}
        />
      )}

      {currentView === 'practical' && content.practical && (
        <Practical
          data={content.practical}
          onComplete={() => setCurrentView('result')}
        />
      )}

      {currentView === 'result' && (
        <Result
          data={content.result}
          score={score}
          totalQuestions={content.exam.questions.length}
          onRestart={() => setCurrentView('intro')}
        />
      )}
    </main>
  );
}

export default App;
