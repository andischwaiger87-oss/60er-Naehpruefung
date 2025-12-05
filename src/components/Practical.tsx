import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Timer, Check } from 'lucide-react';
import type { GameContent } from '../types';
import confetti from 'canvas-confetti';

interface Props {
    data: GameContent['practical'];
    onComplete: () => void;
}

export const Practical = ({ data, onComplete }: Props) => {
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [revealedItems, setRevealedItems] = useState<string[]>([]);

    const task = data.tasks[currentTaskIndex];

    const handleNext = () => {
        if (currentTaskIndex < data.tasks.length - 1) {
            setCurrentTaskIndex(prev => prev + 1);
            setRevealedItems([]);
        } else {
            onComplete();
        }
    };

    const toggleReveal = (text: string) => {
        if (revealedItems.includes(text)) return;
        setRevealedItems([...revealedItems, text]);
        confetti({
            particleCount: 30,
            spread: 40,
            origin: { y: 0.6 },
            colors: ['#92a7a3', '#876d88']
        });
    };

    return (
        <div className="h-screen bg-[#e3dddc] overflow-y-auto w-full">
            <div className="min-h-full flex items-center justify-center p-4 md:p-8 py-12">
                <motion.div
                    key={task.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="glass-panel p-6 md:p-10 max-w-6xl w-full flex flex-col items-center text-center bg-white shadow-xl relative"
                >
                    <div className="mb-6">
                        <span className="text-[#92a7a3] font-bold tracking-[0.2em] uppercase text-xs md:text-sm block mb-2">
                            Praxis-Station {currentTaskIndex + 1}
                        </span>
                        <h2 className="text-4xl md:text-6xl font-display font-medium text-[#876d88] leading-tight">
                            {task.title}
                        </h2>
                    </div>

                    <div className="w-20 h-1 bg-[#876d88]/20 mb-6 rounded-full" />

                    <p className="text-lg md:text-2xl text-[#7c7a7c] mb-8 max-w-4xl font-body leading-relaxed">
                        {task.instruction}
                    </p>

                    {task.items && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full mb-10">
                            {task.items.map((item, idx) => {
                                const isRevealed = revealedItems.includes(item.text);
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => toggleReveal(item.text)}
                                        disabled={isRevealed}
                                        className={`
                                h-40 md:h-48 rounded-2xl border-4 transition-all duration-300
                                relative overflow-hidden group font-display shadow-sm
                                ${isRevealed
                                                ? "border-[#92a7a3] scale-95 opacity-100"
                                                : "border-transparent hover:scale-105 hover:shadow-lg"
                                            }
                            `}
                                    >
                                        {/* Image - Full Size */}
                                        <img
                                            src={item.image}
                                            alt={item.text}
                                            className="absolute inset-0 w-full h-full object-cover object-center"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/e3dddc/876d88?text=' + item.text;
                                            }}
                                        />

                                        {/* Overlay Label */}
                                        <div className="absolute top-0 left-0 p-2 md:p-3 bg-white/90 backdrop-blur-md rounded-br-2xl shadow-sm z-10 border-b border-r border-[#92a7a3]/20">
                                            <span className={`font-bold text-sm md:text-base ${isRevealed ? "text-[#92a7a3]" : "text-[#7c7a7c]"}`}>
                                                {item.text}
                                            </span>
                                        </div>

                                        {/* Checked State Overlay */}
                                        {isRevealed && (
                                            <div className="absolute inset-0 z-20 bg-[#92a7a3]/40 flex items-center justify-center backdrop-blur-[1px]">
                                                <div className="bg-white rounded-full p-2 shadow-lg scale-100 transition-transform">
                                                    <Check className="w-8 h-8 md:w-10 md:h-10 text-[#92a7a3] stroke-[3]" />
                                                </div>
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* Timed Task Mode */}
                    {task.duration && (
                        <div className="flex flex-col items-center gap-6 mb-12">
                            <div className="w-56 h-56 rounded-full border-[12px] border-[#e3dddc] flex items-center justify-center animate-pulse bg-white relative">
                                <div className="absolute inset-0 rounded-full border-[12px] border-[#876d88] border-t-transparent animate-spin duration-[3000ms]" />
                                <Timer className="w-24 h-24 text-[#876d88]" />
                            </div>
                            <p className="text-4xl text-[#876d88] font-display font-bold">Die Zeit läuft!</p>
                        </div>
                    )}

                    <button
                        onClick={handleNext}
                        className="px-10 py-5 bg-[#876d88] text-white rounded-full font-display font-bold text-xl md:text-2xl flex items-center gap-4 hover:scale-105 transition-transform shadow-xl hover:bg-[#876d88]/90 mt-auto"
                    >
                        <span>{currentTaskIndex < data.tasks.length - 1 ? "Nächste Aufgabe" : "Abschließen & Urkunde"}</span>
                        <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
                    </button>

                </motion.div>
            </div>
        </div>
    );
};
