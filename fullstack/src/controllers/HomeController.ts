import type { Request, Response } from 'express';
import { books } from '../data/books.js';
import { Book } from '../models/Book.js';

export class HomeController {

    static index(req: Request, res: Response): void {

        const viewData: { [key: string]: any } = {};
        viewData["title"] = "Home";

        res.render('home/index', { viewData: viewData });

    }

    static about(req: Request, res: Response): void {

        const viewData: { [key: string]: any } = {};
        viewData["title"] = "About";

        res.render('home/about', { viewData: viewData });

    }

    static contact(req: Request, res: Response): void {

        const viewData: { [key: string]: any } = {};
        viewData["title"] = "Contact";

        res.render('home/contact', { viewData: viewData });

    }

    static list(req: Request, res: Response): void {

        const viewData: { [key: string]: any } = {};
        viewData["title"] = "Books";
        viewData["books"] = books;

        res.render('home/books', { viewData: viewData });

    }

    static show(req: Request, res: Response): void {

        const id = parseInt(req.params.id ?? '', 10);

        try {
            const book = Book.findById(books, id);

            const viewData: { [key: string]: any } = {};
            viewData["title"] = book.title;
            viewData["book"] = book;

            res.render('home/show', { viewData: viewData });
        } catch (error) {
            res.status(404).send('Book not found');
        }

    }

}