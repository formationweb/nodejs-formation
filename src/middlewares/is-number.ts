import { z } from "zod"
import { BadRequestError } from "../errors"

export function isIdNumberMiddleware(paramId: string) {
    return (req, res, next) => {
        try {
            z.number().parse(+req.params[paramId])
            next()
        }
        catch (err) {
            next(new BadRequestError())
        }
    }
}