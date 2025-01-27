import { fetchWrapper } from '../utils/FetchWrapper';

const baseUrl = 'https://geo.api.gouv.fr';

export const geoApiGouvService = {
    getByCoords,
    //getCommunesByDepartement,
};


function getByCoords(lat: number, lon: number) {
    return fetchWrapper.get(`${baseUrl}/communes?lat=${lat}&lon=${lon}&fields=code,nom,population,contour,departement,region,centre,codeEpci,'`);
}

function getCommunesByDepartement(departement: string) {
    return fetchWrapper.get(`${baseUrl}/communes?codeDepartement=${departement}&fields=code,nom,population,contour,`);
}

