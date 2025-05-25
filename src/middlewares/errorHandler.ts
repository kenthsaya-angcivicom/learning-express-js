import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    // Default values
    const status = err.status || err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // Log error (could be replaced with a logger)
    console.error(`[${new Date().toISOString()}]`, err);

    // Show stack trace only in development
    const response: any = { message };
    if (process.env.NODE_ENV === 'development' && err.stack) {
        response.stack = err.stack;
        response.error = err;
    }

    res.status(status).json(response);
};



