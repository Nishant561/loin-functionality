const { error } = require('console')
const app = require('./index')
const connectDatabase = require('./src/db/db')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({path:'config.env'})
const port = process.env.PORT || 3000

const __dirname = path.resolve()

app.use(express.static(path.join(__dirname,'/frontend/dist')))
app.get('*', (request,response)=>{
    response.sendFile(path.join(__dirname ,'frontend', 'dist','index.html'))
})
app.use(express.static())


connectDatabase()
.then(()=>{
    console.log("Database has been connected successfully.")
    app.listen(port , ()=>{
        console.log(`Server has been started on port ${port}`)
    })
})
.catch(()=>{
    console.log('Unable to connect database.')
})


