import movies from '../../assets/sample_mflix.movies.json';
import type { Movie } from '../types';

// ain't no way we got native and type aware json import before GTA6 🥀
export default movies as Movie[];
