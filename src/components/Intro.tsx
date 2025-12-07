import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { GameContent } from '../types';

interface Props {
    data: GameContent['intro'];
    onStart: () => void;
}

export const Intro = ({ data, onStart }: Props) => {
    return (
        <div className="min-h-screen bg-[#e3dddc] flex items-center justify-center p-6 md:p-16 overflow-x-hidden">

            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">

                {/* Left Column: Text */}
                <div className="flex flex-col items-start text-left z-10 order-2 md:order-1">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl mb-[calc(var(--spacing)*8)] md:mb-[calc(var(--spacing)*10)] text-[#876d88] font-light tracking-wide leading-tight md:leading-none">
                            {data.title}
                        </h1>
                        <h2 className="font-display text-xl md:text-3xl font-medium tracking-[0.2em] text-[#7c7a7c] uppercase mb-8 md:mb-12">
                            {data.subtitle}
                        </h2>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onStart}
                            className="group px-8 py-4 md:px-10 md:py-5 bg-[#92a7a3] text-white rounded-full font-display font-bold text-lg md:text-xl flex items-center gap-4 shadow-xl hover:bg-[#876d88] transition-all duration-300"
                        >
                            <span>Prüfung Starten</span>
                            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </motion.div>
                </div>

                {/* Right Column: Image */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative order-1 md:order-2 mb-8 md:mb-0"
                >
                    <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white/50 rotate-3 hover:rotate-0 transition-transform duration-700 ease-out">
                        <img
                            src="/assets/images/PSX_20250902_132850.jpg"
                            alt="Roswitha"
                            className="w-full h-auto object-cover max-h-[50vh] md:max-h-[70vh]"
                        />
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#876d88]/10 rounded-full blur-3xl -z-10" />
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#92a7a3]/20 rounded-full blur-3xl -z-10" />
                </motion.div>

            </div>
        </div>
    );
};
