export default interface IZone {
    code: string;
    nom: string;
    contour: number[][];
    centre: number[];
    population: number;
    departement: string;
    region: string;
    limit50000: boolean;
}