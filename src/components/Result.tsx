import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Trophy } from 'lucide-react';
import type { GameContent } from '../types';
import confetti from 'canvas-confetti';

interface Props {
    data: GameContent['result'];
    score: number;
    totalQuestions: number;
    onRestart: () => void;
}

export const Result = ({ data, score, totalQuestions, onRestart }: Props) => {
    const percentage = (score / totalQuestions) * 100;
    const isSuccess = percentage >= 50;

    useEffect(() => {
        if (isSuccess) {
            const duration = 3000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#92a7a3', '#876d88']
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#92a7a3', '#876d88']
                });

                if (Date.now() < end) requestAnimationFrame(frame);
            };

            frame();
        }
    }, [isSuccess]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-[#e3dddc] text-center w-full">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="glass-panel p-6 md:p-12 max-w-5xl w-full flex flex-col items-center bg-white/80 my-8"
            >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-[#876d88]/10 rounded-full flex items-center justify-center mb-6 md:mb-8 shrink-0">
                    <Trophy className="w-10 h-10 md:w-12 md:h-12 text-[#876d88]" />
                </div>

                <h1 className="font-display text-4xl md:text-7xl text-[#876d88] mb-4 md:mb-6 font-bold">
                    {isSuccess ? data.successTitle : "Fast geschafft!"}
                </h1>

                <p className="text-lg md:text-2xl text-[#7c7a7c] mb-8 md:mb-10 max-w-3xl leading-relaxed font-body">
                    {isSuccess ? data.successMessage : "Ein bisschen Übung fehlt noch zum Meistertitel. Versuch es gerne nochmal!"}
                </p>

                <div className="flex flex-col items-center gap-2 mb-8 md:mb-10 p-4 md:p-6 bg-white/50 rounded-2xl w-full md:w-2/3 border border-white/60">
                    <span className="text-xs md:text-sm uppercase tracking-widest text-[#7c7a7c]/60 font-bold">Ergebnis Theorie</span>
                    <span className="text-4xl md:text-6xl font-display font-bold text-[#92a7a3]">
                        {score} <span className="text-2xl md:text-3xl text-[#7c7a7c]/40 font-normal">/ {totalQuestions}</span>
                    </span>
                </div>

                {isSuccess && (
                    <div className="w-full max-w-3xl aspect-[1.414] bg-white text-slate-900 border-[8px] md:border-[12px] border-double border-[#92a7a3]/30 p-4 md:p-14 mb-8 md:mb-10 relative shadow-xl rotate-1 hover:rotate-0 transition-transform duration-500 shrink-0">
                        <div className="border border-[#7c7a7c]/10 h-full flex flex-col items-center justify-center text-center p-2 md:p-4">
                            <h2 className="font-display text-2xl md:text-5xl mb-2 md:mb-3 text-[#876d88] font-bold">Meisterbrief</h2>
                            <p className="italic text-base md:text-xl mb-3 md:mb-6 font-serif text-gray-500">Hiermit wird bestätigt, dass</p>
                            <p className="text-3xl sm:text-5xl md:text-7xl font-cursive text-[#92a7a3] mb-3 md:mb-6 font-display font-bold">Roswitha</p>
                            <p className="text-sm md:text-lg text-gray-600 font-body">die Nähprüfung am 60. Geburtstag erfolgreich bestanden hat.</p>
                        </div>
                    </div>
                )}

                <button
                    onClick={onRestart}
                    className="flex items-center gap-3 text-[#7c7a7c] hover:text-[#876d88] transition-colors mt-4 text-base md:text-lg font-medium py-4 px-8 rounded-full hover:bg-black/5"
                >
                    <RefreshCw className="w-5 h-5" />
                    <span>Nochmal versuchen</span>
                </button>
            </motion.div>
        </div>
    );
};
