export class Post {
    userId: number
    id: number
    title: string
    body: string

    constructor(data) {
        this.userId = data.userId
        this.id = data.id
        this.title = data.title
        this.body = data.body
    }
}