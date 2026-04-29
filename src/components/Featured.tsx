import MovieCard from './MovieCard';
import type { Movie } from '../types';

type FeaturedProps = {
    movies: Movie[];
};

const Featured = ({ movies }: FeaturedProps) => {
    return (
        <div className=" mx-auto py-12 px-4">
            <h2 className="text-4xl font-bold  mb-8 text-foreground">
                Featured Movies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {movies
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 3)
                    .map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
            </div>
        </div>
    );
};

export default Featured;
