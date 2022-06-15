const express=require('express')
const app=express()
const mysql=require('mysql2')
const cors=require('cors')
//require("dotenv").config()

const db=mysql.createConnection({
    user:'root',
    host:'127.0.0.1',
    password:'soumik',
    database:'todo'
})
app.use(cors())
app.use(express.json())
app.get('/',(req,res)=>{

    res.send("Hello From Express (React Native integration)")
})

//create
app.post('/create',(req,res)=>{
    const info=req.body.info
    const id=req.body.id
    db.query('INSERT INTO todo_table(id, info) VALUES(?,?);',
    [id, info], (err, result)=>{
        console.log(result)
        if(err) console.log(err)
        else res.send("Values Inserted")
    })
})

//read
app.get('/gettodo',(req,res)=>{

    db.query('SELECT * FROM todo_table;', (err, result)=>{
        if(err) console.log(err)
        else res.send(result)
    })    
})
//update
app.put('/updatetodo',(req,res)=>{
    const id=req.body.id
    const info=req.body.info
    db.query("UPDATE todo_table SET info=? WHERE id=?;",[info, id], (err, result)=>{
        if(err) console.log(err)
        else res.send(result)
    })
})

//delete // working // on id generation 
app.delete('/delete/:id',(req,res)=>{
    const id=req.params.id
    console.log(id)
    db.query("DELETE FROM todo_table WHERE id=?;", [id],(err, result)=>{
        if(err) console.log(err)
        else res.send(result)
    })
    
})
app.listen(process.env.PORT || 5000,()=>{
    console.log("App running on server")
})