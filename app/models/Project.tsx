import Address from "./Address";
import Coordinates from "./Coordinates";

export default class Project {
    _id: string | null;
    user_id: string;
    user_firstname: string;
    user_email: string;
    date: Date | null;
    type: number; // see in Constants/ProjectDetails.ts
    categorie: number; // see in Constants/ProjectDetails.ts
    nbRooms: number | null;
    nbBedrooms: number | null;
    nbBathrooms: number | null;
    surface: number | null;
    surfaceMin: number | null;
    surfaceMax: number | null;
    gardenSurface: number | null;
    gardenSurfaceMin: number | null;
    gardenSurfaceMax: number | null;
    surfaceExt: number | null;
    parking: number | null;
    budgetMin: number | null;
    budgetMax: number | null;
    description: string;
    zoneId: number | null;
    address: Address | null;
    addressString: string | null;
    coords: Coordinates | null;
    status: number; // 0: en attente, 1: en cours, 2: termin
    isPublic: boolean;

    constructor(
        user_id: string,
        user_firstname: string,
        user_email: string,
    ) {
        this._id = null;
        this.user_id = user_id;
        this.user_firstname = user_firstname;
        this.user_email = user_email;
        this.date = null;
        this.type = 0;
        this.categorie = 0;
        this.description = '';
        this.zoneId = null;
        this.address = null;
        this.addressString = null;
        this.coords = null;
        this.status = 0;
        this.isPublic = true;
        this.nbRooms = 0;
        this.nbBedrooms = 0;
        this.nbBathrooms = 0;
        this.surface = 0;
        this.surfaceMin = 0;
        this.surfaceMax = 0;
        this.gardenSurface = 0;
        this.gardenSurfaceMin = 0;
        this.gardenSurfaceMax = 0;
        this.surfaceExt = 0;
        this.parking = 0;
        this.budgetMin = 0;
        this.budgetMax = 0;

    }

}