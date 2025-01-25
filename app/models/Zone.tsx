export default class Zone {
    code: string;
    nom: string;
    contour: number[][];
    centre: number[];
    population: number;
    departement: string;
    region: string;

    constructor(code: string, nom: string, contour: number[][], centre: number[], population: number, departement: string, region: string) {
        this.code = code;
        this.nom = nom;
        this.contour = contour;
        this.centre = centre;
        this.population = population;
        this.departement = departement;
        this.region = region;
    }


}