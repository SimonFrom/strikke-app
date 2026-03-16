import {Yarn} from '../types/yarn';
import {Needles} from '../types/needles';

export type Project = {
    id: number;
    headline: string;
    photo: string;
    recipe: string;
    materials: Yarn;
    tension: string;
    washingRec: string;
    needles: Needles;
    category: string[];
    notes: string;
}

export const projectsData: Project[] = [
    {
        id: 1,
        headline: "Stribet hue til vinter",
        photo: "https://picsum.photos/400/300?random=1",
        recipe: "https://hobbii.dk/collections/free-patterns/products/hp-dntd5p-yarn-yolk-placemat",
        materials: {
            id: 1,
            make: "Drops",
            model: "Alaske",
            type: "Uldgarn",
            color: "Mørkeblå",
            amount: 150,
        },
        tension: "14 masker x 20 pinde = 10x10 cm",
        washingRec: "Håndvask 30°",
        needles: {
            id: 1,
            length: 40,
            type: "Rundpind",
            diameter: 5,
        },
        category: ["hue", "vinter", "begynder"],
        notes: "Hello"
    },
    {
        id: 2,
        headline: "Klassisk sweater i merino",
        photo: "https://picsum.photos/400/300?random=2",
        recipe: "https://hobbii.dk/collections/free-patterns/products/hp-dntd5p-yarn-yolk-placemat",
        materials: {
            id: 2,
            make: "Sandnes",
            model: "Tynn Merino Ulltwist",
            type: "Merinould",
            color: "Cremehvid",
            amount: 400,
        },
        tension: "22 masker x 30 pinde = 10x10 cm",
        washingRec: "Maskinvask 30° uldprogram",
        needles: {
            id: 2,
            length: 80,
            type: "Rundpind",
            diameter: 3.5,
        },
        category: ["sweater", "mellem", "merino"],
        notes: "Hello"
    },
    {
        id: 3,
        headline: "Sommertop i bomuld",
        photo: "https://picsum.photos/400/300?random=3",
        recipe: "https://hobbii.dk/collections/free-patterns/products/hp-dntd5p-yarn-yolk-placemat",
        materials: {
            id: 3,
            make: "Drops",
            model: "Safran",
            type: "Bomuldsgarn",
            color: "Støvet rosa",
            amount: 200,
        },
        tension: "24 masker x 32 pinde = 10x10 cm",
        washingRec: "Maskinvask 40°",
        needles: {
            id: 3,
            length: 60,
            type: "Rundpind",
            diameter: 3,
        },
        category: ["top", "sommer", "bomuld"],
        notes: "Hello"
    },
];