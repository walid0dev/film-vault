import hollowedBoxes from '../../assets/hollowed-boxes.png';
import largeTriangles from '../../assets/large-triangles.png';
import quantumGradient from '../../assets/quantum-gradient.png';

const patterns = [hollowedBoxes, largeTriangles, quantumGradient];

export const getRandomPatternImg = () =>
    patterns[Math.floor(Math.random()) * patterns.length];

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
