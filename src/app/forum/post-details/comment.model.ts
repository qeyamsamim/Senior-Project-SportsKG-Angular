export class Comment {
    constructor(
        public id: string,
        public comment: string,
        public postId: string,
        public postDate: Date,
        public userId: string
        ) {
    }
}
