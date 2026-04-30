//import { useState } from 'react';
import type { Movie } from '@/types/index';
import MovieCard from './components/MovieCard';
import MovieCardExpanded from './components/MovieCardExpanded';
import { AnimatePresence } from 'motion/react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';
type Props = {
    movies: Movie[];
    selectedId: string | null;
    setSelectedId: (v: string | null) => void;
};
const MovieList = ({ movies, selectedId, setSelectedId }: Props) => {
    const selectedMovie = movies.find((m) => m.id === selectedId);
    const [ratingRange, setRatingRange] = useState([0, 10]);
    const [releaseDeteRange, setReleaseDateRange] = useState([1999, 2026]);
    return (
        <>
            <div className="text-foreground px-4">
                <h2 className="text-4xl font-bold   text-foreground">
                    Movies list
                </h2>
                <div className="flex w-full items-baseline gap-x-12 py-4">
                    <h3 className="text-2xl">Filter by</h3>
                   <div className='flex gap-12'>
                     <div className="min-w-64 max-w-xs flex  flex-col gap-4 py-4">
                        <div className="flex  justify-between">
                            <Label
                                htmlFor="slider-demo-temperature"
                                className="text-foreground text-lg "
                            >
                                label
                            </Label>
                            <span className="text-lg text-muted-foreground">
                                {ratingRange.join(' - ')}
                            </span>
                        </div>
                        <Slider
                            min={0}
                            max={10}
                            step={0.1}
                            minStepsBetweenThumbs={1}
                            value={ratingRange}
                            onValueChange={setRatingRange}
                        />
                    </div>
                    <div className="min-w-64 max-w-xs flex  flex-col gap-4 py-4">
                        <div className="flex  justify-between">
                            <Label
                                htmlFor="slider-release-date"
                                className="text-foreground text-lg "
                            >
                                Release Year
                            </Label>
                            <span className="text-lg text-muted-foreground">
                                {releaseDeteRange.join(' - ')}
                            </span>
                        </div>
                        <Slider
                            min={1990}
                            max={2026}
                            step={1}
                            value={releaseDeteRange}
                            onValueChange={setReleaseDateRange}
                        />
                    </div>
                   </div>
                </div>
            </div>
            <section className="grid grid-cols-4 px-4 py-4 gap-6">
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
