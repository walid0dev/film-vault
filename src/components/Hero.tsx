import { FaStar } from 'react-icons/fa';
import type { Movie } from '../types/index.ts';
import { Button } from './ui/button.tsx';
import { MdInfo as InfoIcon } from 'react-icons/md';
import ImageFallback from './ui/ImageFallback.tsx';
type HeroProps = {
    movie: Movie;
};

const Hero = ({ movie }: HeroProps) => {
    return (
        <section
            className="relative h-[80vh] w-full bg-cover bg-center"
            style={{
                backgroundImage: `url(${movie.poster})`,
            }}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-lg" />
            <div className="relative z-10 flex h-full items-center justify-end p-8 md:p-16">
                <div className="w-full max-w-md rounded-2xl bg-card/80 p-6 shadow-2xl backdrop-blur-md">
                    <div className="flex gap-6">
                        <ImageFallback
                            src={movie.poster}
                            alt={movie.title}
                            className="h-48 w-32 rounded-lg object-cover shadow-lg"
                        />
                        <div className="flex flex-col justify-between">
                            <div>
                                <h1 className="font-serif text-3xl font-bold text-card-foreground">
                                    {movie.title}
                                </h1>
                                <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>{movie.runtime} min</span>
                                    <div className="flex items-center gap-1">
                                        <FaStar className="h-4 w-4 fill-amber-400 text-amber-400" />
                                        <span>{movie.rating}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {movie.genres.slice(0, 2).map((genre) => (
                                    <span
                                        key={genre}
                                        className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <p className="mt-4 font-sans text-sm leading-relaxed text-card-foreground/90">
                        {movie.plot}
                    </p>
                    <div className="mt-6 flex gap-4">
                        <Button size={'lg'}>Watch Trailer</Button>
                        <Button variant="secondary" size={'lg'}>
                            <InfoIcon />
                            More Info
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
