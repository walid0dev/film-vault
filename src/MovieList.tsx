//import { useState } from 'react';
import type { Movie } from '@/types/index';
import MovieCard from './components/MovieCard';
import MovieCardExpanded from './components/MovieCardExpanded';
import { AnimatePresence } from 'motion/react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useAppStore, getVisibleMovies } from './hooks';

const MovieList = () => {
    const {
        state: { movies, selectedId, ratingRange, releaseYearRange },
        actions,
    } = useAppStore();
    let minYear = new Date().getFullYear();
    let maxYear = new Date().getFullYear();
    for (const movie of movies) {
        const year = new Date(movie.date).getFullYear();
        if (!Number.isFinite(year)) continue;
        if (year < minYear) minYear = year;
        if (year > maxYear) maxYear = year;
    }

    const visibleMovies = getVisibleMovies({
        movies,
        ratingRange,
        releaseYearRange,
    });

    console.log('visibleMovies', visibleMovies);

    const selectedMovie = movies.find((m) => m.id === selectedId);
    return (
        <>
            <div className="text-foreground px-4">
                <h2 className="text-4xl font-bold   text-foreground">
                    Movie list
                </h2>
                <div className="flex w-full items-baseline gap-x-12 py-4">
                    <h3 className="text-2xl">Filter by</h3>
                    <div className="flex gap-12">
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
                                onValueChange={(v) =>
                                    actions.setRatingRange(
                                        v as [number, number]
                                    )
                                }
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
                                    {releaseYearRange.join(' - ')}
                                </span>
                            </div>
                            <Slider
                                min={minYear}
                                max={Math.max(
                                    maxYear,
                                    new Date().getFullYear()
                                )}
                                step={1}
                                value={releaseYearRange}
                                onValueChange={(v) =>
                                    actions.setReleaseYearRange(
                                        v as [number, number]
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
            <section className="grid grid-cols-4 px-4 py-4 gap-6">
                {visibleMovies.map((m: Movie) => (
                    <MovieCard
                        movie={m}
                        key={m.id}
                        onClick={() => actions.selectMovie(m.id)}
                        classes={'cursor-pointer'}
                    />
                ))}
            </section>
            <AnimatePresence>
                {selectedMovie && (
                    <MovieCardExpanded
                        movie={selectedMovie}
                        onClose={() => actions.selectMovie(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default MovieList;
