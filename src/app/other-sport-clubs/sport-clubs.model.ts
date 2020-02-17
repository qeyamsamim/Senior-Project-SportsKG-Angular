import { PlaceLocation } from '../home/location.model';

export class SportClubs {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public address: string,
        public contactNum: string,
        public imgUrl: string,
        public location: PlaceLocation
    ) {}
}