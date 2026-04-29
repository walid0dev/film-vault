import NavBar from './components/NavBar';
import Hero from './components/Hero.tsx';
import './index.css';
import Movies from './data/movie-data.ts';
import { useState } from 'react';
import Featured from './components/Featured.tsx';
function App() {
    const [movies, setMovies] = useState(Movies);
    return (
        <main className="dark bg-background ">
            <NavBar />
            <Hero
                movie={movies.toSorted((a, b) => b.rating - a.rating).at(0)!}
            />
            <Featured movies={movies} />
        </main>
    );
}

export default App;
