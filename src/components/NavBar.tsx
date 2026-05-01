import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { MdOutlineMovieFilter as AddIcon } from 'react-icons/md';
import { openForm } from '@/store/app-store';

const NavBar = () => {
    return (
        <nav className="flex items-center justify-between px-4 py-2 sticky top-0 bg-background z-100">
            <a href="/">
                <Logo />
            </a>
            <Button
                size={'lg'}
                className="cursor-pointer"
                onClick={openForm}
            >
                <AddIcon className="fill-primary-foreground z-12 " size={36} />{' '}
                Add movie
            </Button>
        </nav>
    );
};

export default NavBar;
