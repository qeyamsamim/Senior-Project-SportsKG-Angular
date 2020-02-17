export class Post {
    constructor(
        public id: string,
        public content: string,
        public postDate: Date,
        public posterId: string
        ) {
    }
}
