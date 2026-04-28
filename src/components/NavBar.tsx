import Logo from './Logo';
import { MdOutlineMovieFilter as AddIcon } from 'react-icons/md';
const NavBar = () => {
    return (
        <nav className="flex items-center justify-between px-4 py-2">
            <a href="/">
                <Logo />
            </a>
            <button className="group relative cursor-pointer hover:scale-105 transition-all duration-150 ease-in-out active:scale-95">
                <AddIcon className="fill-primary z-12 " size={36} />
            </button>
        </nav>
    );
};

export default NavBar;
