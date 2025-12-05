import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import type { GameContent } from '../types';
import confetti from 'canvas-confetti';

interface Props {
    data: GameContent['exam'];
    onComplete: (score: number) => void;
}

export const Exam = ({ data, onComplete }: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [score, setScore] = useState(0);

    const question = data.questions[currentIndex];
    const isCorrect = selectedOption === question.correctIndex;

    const handleSelect = (index: number) => {
        if (selectedOption !== null) return;
        setSelectedOption(index);

        if (index === question.correctIndex) {
            setScore(s => s + 1);
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 },
                colors: ['#92a7a3', '#876d88']
            });
        }
    };

    const handleNext = () => {
        if (currentIndex < data.questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
        } else {
            onComplete(score);
        }
    };

    return (
        <div className="min-h-screen bg-[#e3dddc] flex items-center justify-center p-4 md:p-8">
            {/* Progress Bar Top */}
            <div className="fixed top-0 left-0 w-full h-3 bg-white/20 z-50">
                <motion.div
                    className="h-full bg-[#876d88]"
                    animate={{ width: `${((currentIndex + 1) / data.questions.length) * 100}%` }}
                />
            </div>

            <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
                <div className="glass-panel p-8 md:p-12 shadow-xl bg-white flex flex-col gap-8">
                    {/* Header */}
                    <div className="flex justify-between items-end border-b pb-6 border-[#7c7a7c]/10">
                        <div className="flex flex-col gap-2">
                            <span className="text-[#92a7a3] font-display font-bold tracking-widest text-sm uppercase">
                                Theorieprüfung
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#876d88] leading-tight">
                                Frage {currentIndex + 1} <span className="text-2xl text-[#7c7a7c]/40 font-normal">/ {data.questions.length}</span>
                            </h2>
                        </div>
                    </div>

                    {/* Question */}
                    <h3 className="text-2xl md:text-4xl font-display font-medium leading-snug text-[#7c7a7c] py-4">
                        {question.question}
                    </h3>

                    {/* Options */}
                    <div className="grid grid-cols-1 gap-4">
                        {question.options.map((opt, idx) => {
                            let stateStyles = "bg-[#e3dddc]/30 border-transparent hover:bg-[#92a7a3]/10 hover:border-[#92a7a3]/30";

                            if (selectedOption !== null) {
                                if (idx === question.correctIndex) stateStyles = "bg-green-50 border-green-500 text-green-900 ring-2 ring-green-100";
                                else if (idx === selectedOption) stateStyles = "bg-red-50 border-red-500 text-red-900 ring-2 ring-red-100";
                                else stateStyles = "opacity-40 grayscale";
                            }

                            return (
                                <button
                                    key={idx}
                                    disabled={selectedOption !== null}
                                    onClick={() => handleSelect(idx)}
                                    className={`
                      w-full text-left p-6 md:p-7 rounded-2xl border-2 transition-all duration-300 
                      text-lg md:text-xl font-body shadow-sm hover:shadow-md
                      flex items-center justify-between gap-4 group
                      ${stateStyles}
                    `}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`
                            w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-lg transition-colors
                            ${selectedOption === idx || (selectedOption !== null && idx === question.correctIndex) ? 'border-current bg-current text-white' : 'border-[#7c7a7c]/30 text-[#7c7a7c]/50 group-hover:border-[#92a7a3] group-hover:text-[#92a7a3]'}
                        `}>
                                            {String.fromCharCode(65 + idx)}
                                        </div>
                                        <span className="leading-snug">{opt}</span>
                                    </div>

                                    {selectedOption !== null && idx === question.correctIndex && <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0" />}
                                    {selectedOption !== null && idx === selectedOption && idx !== question.correctIndex && <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Feedback Area - Separate Panel for consistent layout */}
                <AnimatePresence mode="wait">
                    {selectedOption !== null && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-panel p-8 bg-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border-l-8 border-l-[#876d88]"
                        >
                            <div className="flex-1">
                                <p className="font-display font-bold text-xl text-[#876d88] mb-2">
                                    {isCorrect ? "Goldrichtig!" : "Leider falsch."}
                                </p>

                            </div>
                            <button
                                onClick={handleNext}
                                className="px-10 py-4 bg-[#876d88] text-white font-display font-bold text-lg rounded-full hover:bg-[#876d88]/90 transition-all flex items-center gap-3 shadow-lg whitespace-nowrap"
                            >
                                {currentIndex < data.questions.length - 1 ? "Nächste Frage" : "Zur Praxisprüfung"}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
