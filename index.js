const express = require('express')
const moongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const PORT = process.env.PORT || 8080
const todoRoutes = require('./routes/todos')

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)

function mongoCon() {
    moongoose.connect(
        'mongodb+srv://fiasko:ras01@cluster0.6hpde.mongodb.net/todos', 
        {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
        }
    )
}

async function start() {
    try {
        
        app.listen(PORT, () => {
            mongoCon()
            console.log('server start')
        })
    } catch (e) {
        console.log(e)
    }
}


start()

