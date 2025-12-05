import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    image: string;
    overlayOpacity?: number;
}

export const ImageBackground = ({ image, overlayOpacity = 0.5 }: Props) => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
            <AnimatePresence mode="wait">
                <motion.div
                    key={image}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src={image}
                        alt="background"
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div
                        className="absolute inset-0 bg-black transition-opacity duration-1000"
                        style={{ opacity: overlayOpacity }}
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
