
import { NODE_ENV, port } from '../config/config.service.js'
import { testConnection,syncConnection } from './DB/connection.db.js'
import { authRouter, commentRouter, postRouter, userRouter } from './modules/index.js'
import express from 'express'
async function bootstrap() {
    const app = express()
        // connect db
    await testConnection()
    await syncConnection()
    //convert buffer data
    app.use(express.json())
    //application routing
    app.use('/auth', authRouter)
    app.use('/user', userRouter)
    app.use('/post', postRouter)
    app.use('/comment', commentRouter)


    app.get('/', (req, res) => res.send('Hello World!'))
 
    //invalid routing
    app.use('{/*dummy}', (req, res) => {
        return res.status(404).json({ message: "Invalid application routing" })
    })

    //error-handling
    app.use((error, req, res, next) => {
        const status = error.cause?.status ?? 500
        return res.status(status).json({
            error_message:
                status == 500 ? 'something went wrong' : error.message ?? 'something went wrong',
            stack: NODE_ENV == "development" ? error.stack : undefined
        })
    })
    
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}
export default bootstrap