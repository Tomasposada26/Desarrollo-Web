import express from 'express';
import expressLayouts from 'express-ejs-layouts'; 
import path from 'path';
import type { Application } from 'express';
import Routes from './routes/Routes.js';

class Index {
    static startServer(): void {
        const app: Application = express();
        const PORT = process.env.PORT || 3005;

        app.set('view engine', 'ejs');
        app.set('views', path.join(process.cwd(), 'src/views'));
        app.use(express.static('src/public'));
        app.use(expressLayouts);
        app.set('layout', 'layouts/app'); 
        
        app.use(Routes.initializeRoutes());

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
}

Index.startServer();