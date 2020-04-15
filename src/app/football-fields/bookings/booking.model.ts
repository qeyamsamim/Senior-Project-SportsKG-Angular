export class Booking {
    constructor(
        public id: string,
        public fieldId: string,
        public fieldName: string,
        public userId: string,
        public bookedDate: Date,
        public bookedTime: number,
        public bookingTime: Date
    ) {}
}
