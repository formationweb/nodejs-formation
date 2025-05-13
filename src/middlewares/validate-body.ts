import { BadRequestError } from "../errors"

export function validateBodyMiddleware(schemaDto) {
    return (req, res, next) => {
        try {
            req.body = schemaDto.parse(req.body)
            next()
        }
        catch (err) {
            console.log(err)
            next(new BadRequestError(err.message))
        }
    }
}