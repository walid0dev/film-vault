import type { Movie } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';

interface FormProps {
    movies: Movie[];
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AddMode extends FormProps {
    edit: false;
    movie: never;
}

interface EditMode extends FormProps {
    edit: true;
    movie: Movie;
}

type Props = AddMode | EditMode;

const Form = ({ movies, setMovies, isOpen, setOpen, edit, movie }: Props) => {
    const [formData, setFormData] = useState<Movie>(
        () =>
            movie || {
                id: '',
                title: '',
                plot: '',
                poster: '',
                date: '',
                rated: '',
                runtime: 0,
                rating: 0,
                votes: 0,
                genres: [],
                cast: [],
            }
    );
    useEffect(() => {
        if (edit && movie) {
            setFormData(movie);
        } else {
            setFormData({
                id: '',
                title: '',
                plot: '',
                poster: '',
                date: '',
                rated: '',
                runtime: 0,
                rating: 0,
                votes: 0,
                genres: [],
                cast: [],
            });
        }
    }, [edit, movie]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value.split(',').map((item) => item.trim()),
        }));
    };

    const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (edit) {
            const updatedMovies = movies.map((m) =>
                m.id === movie.id ? formData : m
            );
            setMovies(updatedMovies);
        } else {
            const newMovie = { ...formData, id: Date.now().toString() };

            setMovies([...movies, newMovie]);
        }

        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    return (
        isOpen && (
            <section className="fixed inset-0 z-9999 flex   overflow-y-scroll backdrop-blur-lg bg-popover/80">
                <form
                    onSubmit={handleSubmit}
                    className="bg-popover text-popover-foreground flex flex-col  justify-between gap-y-4 px-6 py-4 rounded-md w-full max-w-lg mx-auto h-fit"
                >
                    <h1 className="text-xl font-serif">
                        {edit ? 'Edit Movie' : 'Add a New Movie'}
                    </h1>

                    <div className="space-y-2">
                        <Label htmlFor="title">Movie Title</Label>
                        <Input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="The Great Gatsby"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="plot">Plot</Label>
                        <Textarea
                            id="plot"
                            name="plot"
                            placeholder="A mysterious millionaire throws extravagant parties..."
                            value={formData.plot}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="poster">Poster URL</Label>
                        <Input
                            id="poster"
                            name="poster"
                            type="url"
                            placeholder="https://example.com/poster.jpg"
                            value={formData.poster}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="date">Release Date</Label>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="rated">Rating (e.g. PG-13)</Label>
                            <Input
                                id="rated"
                                name="rated"
                                type="text"
                                placeholder="PG-13"
                                value={formData.rated}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="runtime">Runtime (mins)</Label>
                            <Input
                                id="runtime"
                                name="runtime"
                                type="number"
                                placeholder="142"
                                value={formData.runtime}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="rating">IMDb Rating</Label>
                            <Input
                                id="rating"
                                name="rating"
                                type="number"
                                step="0.1"
                                placeholder="8.2"
                                value={formData.rating}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="votes">IMDb Votes</Label>
                            <Input
                                id="votes"
                                name="votes"
                                type="number"
                                placeholder="500000"
                                value={formData.votes}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="genres">Genres</Label>
                        <Input
                            id="genres"
                            name="genres"
                            type="text"
                            placeholder="Drama, Romance"
                            value={formData.genres.join(', ')}
                            onChange={handleArrayChange}
                        />
                        <p className="text-xs text-muted-foreground">
                            Comma-separated values.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cast">Cast</Label>
                        <Input
                            id="cast"
                            name="cast"
                            type="text"
                            placeholder="Leonardo DiCaprio, Carey Mulligan"
                            value={formData.cast.join(', ')}
                            onChange={handleArrayChange}
                        />
                        <p className="text-xs text-muted-foreground">
                            Comma-separated values.
                        </p>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button
                            variant="ghost"
                            size={'lg'}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" size={'lg'}>
                            {edit ? 'Save Changes' : 'Add Movie'}
                        </Button>
                    </div>
                </form>
            </section>
        )
    );
};

export default Form;
