/**
 * Custom API error classes for consistent error handling
 */

export class ApiError extends Error {
    constructor(
        public statusCode: number,
        message: string,
        public code?: string,
        public details?: unknown
    ) {
        super(message);
        this.name = 'ApiError';
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
    }

    toJSON() {
        return {
            error: {
                code: this.code || 'API_ERROR',
                message: this.message,
                statusCode: this.statusCode,
                ...(this.details && typeof this.details === 'object' ? this.details : { details: this.details }),
            },
        };
    }
}

// Predefined error classes for common scenarios
export class BadRequestError extends ApiError {
    constructor(message: string, details?: unknown) {
        super(400, message, 'BAD_REQUEST', details);
        this.name = 'BadRequestError';
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message: string = 'Unauthorized') {
        super(401, message, 'UNAUTHORIZED');
        this.name = 'UnauthorizedError';
    }
}

export class ForbiddenError extends ApiError {
    constructor(message: string = "Forbidden", details?: Record<string, string | number>) {
        super(403, message, "FORBIDDEN", details);
        this.name = "ForbiddenError";
    }
}

export class NotFoundError extends ApiError {
    constructor(message: string = 'Resource not found') {
        super(404, message, 'NOT_FOUND');
        this.name = 'NotFoundError';
    }
}

export class ValidationError extends ApiError {
    constructor(message: string, details?: unknown) {
        super(422, message, 'VALIDATION_ERROR', details);
        this.name = 'ValidationError';
    }
}

export class RateLimitError extends ApiError {
    constructor(message: string = 'Rate limit exceeded', retryAfter?: number) {
        super(429, message, 'RATE_LIMIT_EXCEEDED', { retryAfter });
        this.name = 'RateLimitError';
    }
}

export class InternalServerError extends ApiError {
    constructor(message: string = 'Internal server error', details?: unknown) {
        super(500, message, 'INTERNAL_SERVER_ERROR', details);
        this.name = 'InternalServerError';
    }
}

/**
 * Helper function to handle errors in API routes
 */
export function handleApiError(error: unknown): Response {
    // Log error for debugging (in production, use proper logging service)
    console.error('API Error:', error);

    // Handle known API errors
    if (error instanceof ApiError) {
        return Response.json(error.toJSON(), { status: error.statusCode });
    }

    // Handle Zod validation errors
    if (error && typeof error === 'object' && 'issues' in error) {
        const zodError = error as { issues: Array<{ path: string[]; message: string }> };
        return Response.json(
            {
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Validation failed',
                    statusCode: 422,
                    details: zodError.issues.map((issue) => ({
                        path: issue.path.join('.'),
                        message: issue.message,
                    })),
                },
            },
            { status: 422 }
        );
    }

    // Handle unknown errors
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';

    // In production, don't expose internal error details
    if (process.env.NODE_ENV === 'production') {
        return Response.json(
            {
                error: {
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'An internal server error occurred',
                    statusCode: 500,
                },
            },
            { status: 500 }
        );
    }

    // In development, show more details
    return Response.json(
        {
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                message,
                statusCode: 500,
                ...(error instanceof Error && { stack: error.stack }),
            },
        },
        { status: 500 }
    );
}
