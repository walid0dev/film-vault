import NavBar from './components/NavBar';
import Hero from './components/Hero.tsx';
import './index.css';
import Movies from './data/movie-data.ts';
import { useState } from 'react';
import Featured from './components/Featured.tsx';
import MovieList from './MovieList.tsx';
import Form from './components/Form.tsx';
function App() {
    const [movies, setMovies] = useState(Movies);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isFormOpen, setFormOpen] = useState(false);

    return (
        <main className="dark bg-background ">
            <NavBar setFormOpen={setFormOpen} />
            <Hero
                movie={movies.toSorted((a, b) => b.rating - a.rating).at(0)!}
            />
            <Featured
                movies={movies}
            />
            <MovieList
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                movies={movies}
            />
            <Form
                movies={movies}
                setMovies={setMovies}
                isOpen={isFormOpen}
                setOpen={setFormOpen}
            />
        </main>
    );
}

export default App;
