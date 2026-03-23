import {Yarn} from '../types/yarn';
import {Needles} from '../types/needles';

export type Project = {
    id: number;
    headline: string;
    photo: string;
    recipe: string;
    materials: Yarn;
    tension: string;
    washing_rec: string;
    needles: Needles;
    category: string[];
    notes: string;
}

