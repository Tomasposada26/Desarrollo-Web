export class Book {
    constructor(
        public id: number,
        public title: string,
        public category: string,
        public price: number,
        public stock: number
    ) { }

    public static findById(books: Book[], id: number): Book {
        const book = books.find(book => book.id === id);
        if (!book) {
            throw new Error(`Book with id ${id} not found`);
        }
        return book;
    }

    public getFormattedPrice(): string {
        return this.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    public getImageUrl(): string {
        return `https://picsum.photos/seed/book-${this.id}/536/354`;
    }
}
