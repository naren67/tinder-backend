import express from 'express'
import mongoose from 'mongoose'
import cards from './tinderCards.js'
import Cors from 'cors'

//password
//t3TyjnjKR65K5czu

//app config
const app = express()
const port = process.env.PORT || 4000

const connection_url = 'mongodb+srv://naren:t3TyjnjKR65K5czu@cluster0.cqinl.mongodb.net/tinderdb?retryWrites=true&w=majority'

//middleware
app.use(express.json())
app.use(Cors())


//db config
mongoose.connect(connection_url,{
          useNewUrlParser:true,
          useCreateIndex:true,
          useUnifiedTopology:true
})

//API endpoint
app.get('/',(req,res)=>{
          res.status(200).send('lets go bitch')
})

app.post('/tinder/cards',(req,res)=>{
          const dbCard = req.body

          cards.create(dbCard,(err,data)=>{
                    if (err){
                              res.status(500).send(err)
                    }
                    else{
                              res.status(201).send(data)
                    }
          })
})


app.get('/tinder/cards',(req,res)=>{

          cards.find((err,data)=>{
                    if(err){
                              res.status(500).send(err)
                    }
                    else{
                              res.status(200).send(data)
                    }
          })
})

//listen 
app.listen(port,()=>{
          console.log('server started')
})