import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { MdOutlineMovieFilter as AddIcon } from 'react-icons/md';
const NavBar = () => {
    return (
        <nav className="flex items-center justify-between px-4 py-2">
            <a href="/">
                <Logo />
            </a>
            <Button size={'lg'} className="cursor-pointer">
                <AddIcon className="fill-primary-foreground z-12 " size={36} />{' '}
                Add movie
            </Button>
        </nav>
    );
};

export default NavBar;
