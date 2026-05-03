import { useEffect, useState } from 'react';
import type { Movie } from '@/types';
import {
    closeForm,
    deleteMovie,
    editMovie,
    getAppState,
    openForm,
    saveMoviesToStorage,
    selectMovie,
    setRatingRange,
    setReleaseYearRange,
    subscribeAppState,
    addMovie,
    upsertMovie,
} from '@/store/app-store';

export function useAppStore() {
    const [state, setState] = useState(() => getAppState());

    useEffect(() => {
        return subscribeAppState(() => {
            setState(getAppState());
        });
    }, []);

    return {
        state,
        actions: {
            openForm,
            closeForm,
            selectMovie,
            setRatingRange,
            setReleaseYearRange,
            editMovie,
            addMovie,
            upsertMovie,
            deleteMovie,
        },
    };
}

export function usePersistMovies() {
    const {
        state: { movies },
    } = useAppStore();

    useEffect(() => {
        saveMoviesToStorage(movies);
    }, [movies]);
}

export function getSortedMovies(movies: Movie[]) {
    return [...movies].sort((a, b) => b.rating - a.rating);
}

export function getVisibleMovies(params: {
    movies: Movie[];
    ratingRange: [number, number];
    releaseYearRange: [number, number];
}) {
    const { movies, ratingRange, releaseYearRange } = params;
    const [minRating, maxRating] = ratingRange;
    const [minYear, maxYear] = releaseYearRange;
    return getSortedMovies(movies).filter((movie) => {
        const ratingOk = movie.rating >= minRating && movie.rating <= maxRating;

        const year = new Date(movie.date).getFullYear();
        const yearOk = year >= minYear && year <= maxYear;
        return ratingOk && yearOk;
    });
}
