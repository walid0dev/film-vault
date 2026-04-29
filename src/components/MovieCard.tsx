import { motion, AnimatePresence, type Variants } from 'motion/react';
import type { Movie } from '../types';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';
import { getRandomPatternImg } from '../utils';
import ImageFallback from './ui/ImageFallback';
type MovieCardProps = {
    movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div className="relative flex flex-col rounded-lg bg-card text-card-foreground shadow-lg overflow-hidden">
            <div className="relative h-92 w-full">
                <ImageFallback
                    src={movie.poster}
                    fallbackSrc={getRandomPatternImg()}
                    alt={movie.title}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white">
                        {movie.title}
                    </h3>
                    <p className="text-sm text-gray-300">
                        {movie.genres.join(', ')}
                    </p>
                </div>
            </div>

            <div className="p-4 grow ">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <FaStar className="text-yellow-500" />
                        <span className="font-bold">{movie.rating}</span>
                        <span className="text-sm text-muted-foreground">
                            ({movie.votes} votes)
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MovieCard;
