import NavBar from './components/NavBar';
import Hero from './components/Hero.tsx';
import './index.css';
import Movies from './data/movie-data.ts';
import { useState } from 'react';
function App() {
    const [movies, setMovies] = useState(Movies);
    return (
        <main className="dark bg-background h-dvh">
            <NavBar />
            <Hero
                movie={movies.toSorted((a, b) => b.rating - a.rating).at(0)!}
            />
        </main>
    );
}

export default App;
