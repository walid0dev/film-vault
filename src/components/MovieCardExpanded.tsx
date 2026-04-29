import { motion } from 'motion/react';
import type { Movie } from '../types';
import { FaStar, FaTimes } from 'react-icons/fa';
import ImageFallback from './ui/ImageFallback';
import { getRandomPatternImg } from '../utils';

type MovieCardExpandedProps = {
    movie: Movie;
    onClose: () => void;
};

const MovieCardExpanded = ({ movie, onClose }: MovieCardExpandedProps) => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-background/20 backdrop-blur-md z-40"
                onClick={onClose}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    layoutId={movie.id}
                    className="relative w-3/5  bg-card text-card-foreground rounded-2xl shadow-lg overflow-hidden"
                >
                    <div className="relative h-72">
                        <ImageFallback
                            src={movie.poster}
                            fallbackSrc={getRandomPatternImg()}
                            alt={movie.title}
                            className="h-full w-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white">
                            <motion.h2
                                className="text-4xl font-bold"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: { delay: 0.2 },
                                }}
                            >
                                {movie.title}
                            </motion.h2>
                            <motion.p
                                className="text-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: { delay: 0.3 },
                                }}
                            >
                                {movie.genres.join(', ')}
                            </motion.p>
                        </div>
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white bg-black/30 rounded-full p-2 hover:bg-black/60 transition-colors"
                        >
                            <FaTimes />
                        </button>
                    </div>
                    <motion.div
                        className="p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <h3 className="text-xl font-bold mb-2">Plot</h3>
                                <p className="text-muted-foreground">
                                    {movie.plot}
                                </p>
                                <h3 className="text-xl font-bold mt-4 mb-2">
                                    Cast
                                </h3>
                                <p className="text-muted-foreground">
                                    {movie.cast.join(', ')}
                                </p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <FaStar className="text-yellow-500 text-2xl" />
                                    <div>
                                        <span className="font-bold text-2xl">
                                            {movie.rating}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            /10
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <p>
                                        <span className="font-semibold">
                                            Rated:
                                        </span>{' '}
                                        {movie.rated}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            Runtime:
                                        </span>{' '}
                                        {movie.runtime} min
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            Released:
                                        </span>{' '}
                                        {new Date(
                                            movie.date
                                        ).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            Votes:
                                        </span>{' '}
                                        {movie.votes.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
};

export default MovieCardExpanded;
