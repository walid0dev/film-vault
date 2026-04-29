import type { Movie } from '@/types/index';
import MovieCard from './MovieCard';
import MovieCardExpanded from './MovieCardExpanded';
import { AnimatePresence } from 'motion/react';

type Props = {
    movies: Movie[];
    selectedId: string | null;
    setSelectedId: (v: string | null) => void;
};

const Featured = ({ movies, selectedId, setSelectedId }: Props) => {
    const selectedMovie = movies.find((m) => m.id === selectedId);
    return (
        <div className="my-20">
            <h2 className="text-4xl font-bold px-4  mb-8 text-foreground">
                Featured Movies
            </h2>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 px-4 gap-6">
                {movies
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 3)
                    .map((m) => (
                        <MovieCard
                            movie={m}
                            key={m.id}
                            onClick={() => setSelectedId(m.id)}
                        />
                    ))}
            </section>
            <AnimatePresence>
                {selectedMovie && (
                    <MovieCardExpanded
                        movie={selectedMovie}
                        onClose={() => setSelectedId(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Featured;
