import type { Movie } from '@/types/index';
import MovieCard from './MovieCard';

type Props = {
    movies: Movie[];
};

const Featured = ({ movies }: Props) => {
    // create copy so we don't modify the global reference
    const topThree = [...movies]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);

    return (
        <div className="my-20">
            <h2 className="text-4xl font-bold px-4  mb-8 text-foreground">
                Featured Movies
            </h2>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 px-4 gap-6">
                {topThree.map((m) => (
                    <MovieCard movie={m} key={m.id} />
                ))}
            </section>
        </div>
    );
};

export default Featured;
