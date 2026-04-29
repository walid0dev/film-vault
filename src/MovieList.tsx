//import { useState } from 'react';
import type { Movie } from '@/types/index';
import MovieCard from './components/MovieCard';
import MovieCardExpanded from './components/MovieCardExpanded';
import { AnimatePresence } from 'motion/react';

type Props = {
    movies: Movie[];
    selectedId: string | null;
    setSelectedId: (v: string | null) => void;
};

const MovieList = ({ movies, selectedId, setSelectedId }: Props) => {
    const selectedMovie = movies.find((m) => m.id === selectedId);
    return (
        <>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 gap-6">
                {movies.map((m) => (
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
        </>
    );
};

export default MovieList;
