export default class Address {
    latitude: number;
    longitude: number;
    city: string | null;
    country: string | null;
    formattedAddress: string | null;
    postalCode: string | null;
    region: string | null;
    street: string | null;
    streetNumber: string | null;
    subRegion: string | null;

    constructor(
        latitude: number,
        longitude: number,
    ) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.city = null;
        this.country = null;
        this.formattedAddress = null;
        this.postalCode = null;
        this.region = null;
        this.street = null;
        this.streetNumber = null;
        this.subRegion = null;
    }


}