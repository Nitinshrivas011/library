const express = require('express');
const mongoose= require('mongoose');
const app     = express();
// const port    = 5001;
const MyBook  = require('./models/books');
const cors    = require('cors')
// Configuring env variables
require('dotenv').config()
const PORT    = process.env.PORT || 5001
const mongo   = process.env.MONGO_URI

//Middleware
app.use(express.json());
app.use(cors())

mongoose.connect(mongo)
    .then(()=> console.log("DB connected"))
    .catch((err)=> console.log(err));
    
app.get("/", (req, res)=>{
    res.send("I like books");
});

app.get("/books", async (req,res)=> {
    try{
        const books = await MyBook.find();
        return res.status(201).json(books);
    } catch(error){
        res.status(500).json({message : "Failed to fetch books"});
    }
});

app.get("/books/:id", async (req,res)=>{
    MyBook.findById(req.params.id).then(data=>res.send(data));
    console.log(`The book id is ${req.params.id}`);
    try{
        const book = await MyBook.findById(req.params.id);
        if (!book) return res.status(404).json({message : "Book not found"});
        res.json(book);
    }catch(error){
        res.status(500).json({message : "Failed to fetch book!"})
    }
});

app.post("/books", async (req, res)=>{
    const {title, author, year} = req.body;
    try{
        const newBook = new MyBook({title, author, year});
        await newBook.save().then(data=>res.send(data));
    } catch(error){
        res.status(500).json({message : "Failed tp add book"});
    }
});

app.put("/books/:id", async (req,res)=>{
    const {title, author, year} = req.body;
    try{
        const updatedBook = await MyBook.findByIdAndUpdate(
            req.params.id,{title, author, year}, 
            {new : true}
        );
        if(!updatedBook) return res.status(404).json({message : "Book not found"});
        res.json(updatedBook);

    } catch(error){
        res.status(500).json({message : "Failed to update data!"})
    }
});

app.delete("/books/:id",async (req,res)=>{
    try{
        const deletedBook = await MyBook.findByIdAndDelete(req.params.id);
        if(!deletedBook) return res.status(404).json({message : "Book not found"})
        res.json({message : `Book of id ${req.params.id} is deleted successfuly!`});
    }catch(error){
        res.status(500).json({message : "Failed to update the book!"});
    }
});

app.listen(PORT, ()=>{
    console.log(`App is running on ${PORT}`);
});

