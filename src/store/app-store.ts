import moviesData from '@/data/movie-data';
import type { Movie } from '@/types';

const storageKey = 'movies';

export type RatingRange = [number, number];
export type ReleaseYearRange = [number, number];

export type AppState = {
    movies: Movie[];
    selectedId: string | null;
    isFormOpen: boolean;
    editingId: string | null;
    ratingRange: RatingRange;
    releaseYearRange: ReleaseYearRange;
};

type Listener = () => void;

function isMovieArray(value: unknown): value is Movie[] {
    return Array.isArray(value);
}

function loadMoviesFromStorage(): Movie[] | null {
    try {
        if (typeof window === 'undefined') return null;
        const raw = window.localStorage.getItem(storageKey);
        if (!raw) return null;
        const parsed: unknown = JSON.parse(raw);
        if (!isMovieArray(parsed)) return null;
        return parsed;
    } catch {
        return null;
    }
}

export function saveMoviesToStorage(movies: Movie[]) {
    try {
        if (typeof window === 'undefined') return;
        window.localStorage.setItem(storageKey, JSON.stringify(movies));
    } catch {
        // ignore (private mode, quota, etc.)
    }
}

const initialMovies = loadMoviesFromStorage() ?? moviesData;

function getYearBounds(movies: Movie[]): { minYear: number; maxYear: number } {
    let minYear = Number.POSITIVE_INFINITY;
    let maxYear = Number.NEGATIVE_INFINITY;

    for (const movie of movies) {
        const year = new Date(movie.date).getFullYear();
        if (!Number.isFinite(year)) continue;
        if (year < minYear) minYear = year;
        if (year > maxYear) maxYear = year;
    }

    if (!Number.isFinite(minYear) || !Number.isFinite(maxYear)) {
        const currentYear = new Date().getFullYear();
        return { minYear: 1900, maxYear: currentYear };
    }

    return { minYear, maxYear };
}

const { minYear: dataMinYear, maxYear: dataMaxYear } = getYearBounds(initialMovies);
const currentYear = new Date().getFullYear();
const defaultMaxYear = Math.max(dataMaxYear, currentYear);

let state: AppState = {
    movies: initialMovies,
    selectedId: null,
    isFormOpen: false,
    editingId: null,
    ratingRange: [0, 10],
    releaseYearRange: [dataMinYear, defaultMaxYear],
};

const listeners = new Set<Listener>();

export function getAppState(): AppState {
    return state;
}

export function setAppState(next: AppState | ((prev: AppState) => AppState)) {
    state = typeof next === 'function' ? (next as (p: AppState) => AppState)(state) : next;
    for (const listener of listeners) listener();
}

export function subscribeAppState(listener: Listener) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

export function openForm() {
    setAppState((prev) => ({ ...prev, isFormOpen: true, editingId: null }));
}

export function editMovie(id: string) {
    setAppState((prev) => ({ ...prev, isFormOpen: true, editingId: id }));
}

export function closeForm() {
    setAppState((prev) => ({ ...prev, isFormOpen: false, editingId: null }));
}

export function selectMovie(id: string | null) {
    setAppState((prev) => ({ ...prev, selectedId: id }));
}

export function setRatingRange(range: RatingRange) {
    setAppState((prev) => ({ ...prev, ratingRange: range }));
}

export function setReleaseYearRange(range: ReleaseYearRange) {
    setAppState((prev) => ({ ...prev, releaseYearRange: range }));
}

export function upsertMovie(movie: Movie) {
    setAppState((prev) => {
        const existingIndex = prev.movies.findIndex((m) => m.id === movie.id);
        const movies = [...prev.movies];
        if (existingIndex === -1) {
            movies.push(movie);
        } else {
            movies[existingIndex] = movie;
        }
        return { ...prev, movies };
    });
}

export function addMovie(movie: Omit<Movie, 'id'> & { id?: string }) {
    const id = movie.id ?? Date.now().toString();
    upsertMovie({ ...(movie as Movie), id });
}

export function deleteMovie(id: string) {
    setAppState((prev) => {
        const movies = prev.movies.filter((m) => m.id !== id);
        const selectedId = prev.selectedId === id ? null : prev.selectedId;
        return { ...prev, movies, selectedId };
    });
}
