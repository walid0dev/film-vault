import { motion } from 'motion/react';
import type { Movie } from '../types';
import { FaStar } from 'react-icons/fa';
import { getRandomPatternImg } from '../utils';
import ImageFallback from './ui/ImageFallback';

type MovieCardProps = {
    movie: Movie;
    onClick: () => void;
};

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
    return (
        <motion.div
            layoutId={movie.id}
            onClick={onClick}
            className="relative hover:scale-105 hover:shadow-lg duration-150 ease-in-out transition-all flex flex-col rounded-2xl corner-scoop bg-card text-card-foreground shadow-lg overflow-hidden cursor-pointer"
        >
            <div className="relative h-92 w-full">
                <ImageFallback
                    src={movie.poster}
                    fallbackSrc={getRandomPatternImg()}
                    alt={movie.title}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-foreground">
                        {movie.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
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
