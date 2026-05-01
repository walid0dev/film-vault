import NavBar from './components/NavBar';
import Hero from './components/Hero.tsx';
import './index.css';
import Featured from './components/Featured.tsx';
import MovieList from './MovieList.tsx';
import Form from './components/Form.tsx';
import { useAppStore, usePersistMovies, getSortedMovies } from './hooks';
function App() {
    const {
        state: { movies, editingId },
    } = useAppStore();

    usePersistMovies();

    const topMovie = getSortedMovies(movies).at(0);

    return (
        <main className="dark bg-background text-foreground">
            <NavBar />
            {topMovie && <Hero movie={topMovie} />}
            <Featured movies={movies} />
            <MovieList />
            <Form key={editingId ?? 'new'} />
        </main>
    );
}

export default App;
