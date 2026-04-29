import { useState } from 'react';
import { getRandomPatternImg } from '../../utils/index.ts';
type ImageFallbackProps = {
    fallbackSrc?: string;
} & React.ComponentProps<'img'>;

const ImageFallback = ({
    src,
    fallbackSrc = getRandomPatternImg(),
    ...props
}: ImageFallbackProps) => {
    const [errored, setErrored] = useState(false);
    const handlError = () => {
        if (!errored) {
            setErrored(true);
        }
    };
    return (
        <img
            {...props}
            src={errored ? fallbackSrc : src}
            onError={handlError}
        />
    );
};

export default ImageFallback;
