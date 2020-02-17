export class News {
    constructor(
        public id: string,
        public title: string,
        public text: string,
        public imgUrl: string,
        public postDate: Date
    ) {}
}