import { Router } from "express";
import usersData from '../../data/users'
import { NotFoundError } from "../../errors";

export const usersRouter = Router()

usersRouter.get('/', (req, res) => {
    const search = req.query.search
    if (search) {
        res.json(usersData.filter(users => users.name.includes(search as string)))
        return
    }
    res.json(usersData)
})

usersRouter.get('/:userId', (req, res, next) => {
    const userId = +req.params.userId
    const user = usersData.find(user => user.id == userId)
    if (!user) {
        next(new NotFoundError('User not Found'))
        return
    }
    res.json(usersData)
})

usersRouter.post('/', (req, res) => {
    const body = req.body
    console.log(body)
    res.json({
        id: 1,
        name: 'asad'
    })
})

usersRouter.put('/:userId', (req, res) => {
   const userId = req.params.userId
   const body = req.body
   console.log(body)
   res.json({
        id: userId
   })
})

