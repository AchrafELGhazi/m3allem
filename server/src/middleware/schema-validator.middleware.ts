import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateSchema = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validatedData = await schema.parseAsync(req.body);
      // using parseAsync to support future async validation (db checks, api calls...)
      req.body = validatedData;
      next();
    } catch (error: any) {
      if (error.errors) {
        const formattedErrors = error.errors.map((err: any) => ({
          path: err.path.join("."),
          message: err.message,
        }));

        res.status(400).json({
          message: "Validation failed",
          errors: formattedErrors,
        });
        return;
      }

      res.status(500).json({
        message: "Validation error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
};
