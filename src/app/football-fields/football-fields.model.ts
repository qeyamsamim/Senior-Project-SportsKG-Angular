import { PlaceLocation } from '../home/location.model';

export class FootballField {
    constructor(
        public id: string,
        public name: string,
        public address: string,
        public imgUrl: string,
        public contNum: string,
        public location: PlaceLocation
        ) {
    }
}
