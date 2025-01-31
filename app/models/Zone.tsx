export default class Zone {
    code: string;
    nom: string;
    contour: number[][];
    centre: number[];
    population: number;
    departement: string;
    region: string;
    nbProjets: number;
    nbContacts: number;
    isNew: boolean;
    isSelected: boolean;

    constructor(code: string, nom: string, contour: number[][], centre: number[], population: number, departement: string, region: string, nbContacts: number, nbProjects: number, isNew: boolean, isSelected: boolean) {
        this.code = code;
        this.nom = nom;
        this.contour = contour;
        this.centre = centre;
        this.population = population;
        this.departement = departement;
        this.region = region;
        this.nbProjets = nbProjects;
        this.nbContacts = nbContacts;
        this.isNew = isNew;
        this.isSelected = isSelected;
    }


}