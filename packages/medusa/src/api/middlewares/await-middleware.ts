import { NextFunction, Request, RequestHandler, Response } from "express"

type handler = (req: Request, res: Response) => Promise<void>

export default (fn: handler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req?.errors?.length) {
      return res.status(400).json({
        errors: req.errors,
        message:
          "Provided request body contains errors. Please check the data and retry the request",
      })
    }

    return fn(req, res).catch(next)
  }
}

/**
 * @schema multiple_errors
 * title: "Multiple Errors"
 * x-resourceId: multiple_errors
 * type: object
 * properties:
 *  errors:
 *    type: array
 *    description: Array of errors
 *    items:
 *      $ref: "#/components/schemas/error"
 *  message:
 *    type: string
 *    default: "Provided request body contains errors. Please check the data and retry the request"
 */
