import type { Movie } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
type FormProps = {
    movies: Movie[];
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Form = ({ movies, setMovies, isOpen, setOpen }: FormProps) => {
    // no reasone for this to be a controlled form so ¯\_(ツ)_/¯
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newMovie: Movie = {
            id: Date.now().toString(),
            title: formData.get('title') as string,
            plot: formData.get('plot') as string,
            poster: formData.get('poster') as string,
            date: formData.get('date') as string,
            rated: formData.get('rated') as string,
            runtime: Number(formData.get('runtime')),
            rating: Number(formData.get('rating')),
            votes: Number(formData.get('votes')),
            genres: (formData.get('genres') as string)
                .split(',')
                .map((g) => g.trim()),
            cast: (formData.get('cast') as string)
                .split(',')
                .map((c) => c.trim()),
        };
        setMovies([...movies, newMovie]);
        e.currentTarget.reset();
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    }
    return isOpen && (
        <section className="fixed inset-0 z-50 flex   overflow-y-scroll backdrop-blur-lg bg-popover/80">
            <form onSubmit={handleSubmit} className="bg-popover text-popover-foreground flex flex-col  justify-between gap-y-4 px-6 py-4 rounded-md w-full max-w-lg mx-auto h-fit"
                >
                <h1 className="text-xl font-serif">Add a New Movie</h1>

                <div className="space-y-2">
                    <Label htmlFor="title">Movie Title</Label>
                    <Input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="The Great Gatsby"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="plot">Plot</Label>
                    <Textarea
                        id="plot"
                        name="plot"
                        placeholder="A mysterious millionaire throws extravagant parties..."
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="poster">Poster URL</Label>
                    <Input
                        id="poster"
                        name="poster"
                        type="url"
                        placeholder="https://example.com/poster.jpg"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="date">Release Date</Label>
                        <Input id="date" name="date" type="date" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="rated">Rating (e.g. PG-13)</Label>
                        <Input id="rated" name="rated" type="text" placeholder="PG-13" />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="runtime">Runtime (mins)</Label>
                        <Input id="runtime" name="runtime" type="number" placeholder="142" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="rating">IMDb Rating</Label>
                        <Input
                            id="rating"
                            name="rating"
                            type="number"
                            step="0.1"
                            placeholder="8.2"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="votes">IMDb Votes</Label>
                        <Input id="votes" name="votes" type="number" placeholder="500000" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="genres">Genres</Label>
                    <Input id="genres" name="genres" type="text" placeholder="Drama, Romance" />
                    <p className="text-xs text-muted-foreground">
                        Comma-separated values.
                    </p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="cast">Cast</Label>
                    <Input id="cast" name="cast" type="text" placeholder="Leonardo DiCaprio, Carey Mulligan" />
                    <p className="text-xs text-muted-foreground">
                        Comma-separated values.
                    </p>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="ghost" size={'lg'} onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button type='submit' size={'lg'}>Add Movie</Button>
                </div>
            </form>
        </section>
    );
};

export default Form;
