const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
const vairiavelAmbiente = String(process.env.ACESSO);

mongoose.connect(`mongodb+srv://${vairiavelAmbiente}@harry-potter.epxvqrp.mongodb.net/?retryWrites=true&w=majority&appName=HARRY-POTTER`).then(() => {
    console.log("Conectado!");
});

const Film = mongoose.model("film", {

    title: String,
    description: String,
    trailer: String
});

app.post("/", async(req, res) => {

    try {

        const film = new Film({
            title: req.body.title,
            description: req.body.description,
            trailer: req.body.trailer
        });
    
        await film.save();
    
        return res.send(film);
    } catch (error) {
        return console.log(error);
    }
});

app.get("/", async(req, res) =>{
    try {
        return res.send(await Film.find());
    } catch (error) {
        return console.log(error)
    }
});

app.get("/:id", async(req, res) => {
    try {
        const id = req.params.id;

        const film = await Film.findById(id);

        return res.send(film);
    } catch (error) {
        return console.log(error)
    }
});

app.delete("/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const film = await Film.findByIdAndDelete(id);

        return res.send(film);
    } catch (error) {
        return console.log(error);
    }
});

app.put("/:id", async(req, res) => {
    try {
        const id = req.params.id;

        const film = ({
            title: req.body.title,
            description: req.body.description,
            trailer: req.body.trailer
        },
        {
            new: true
        });

        const filmUpdate = await Film.findByIdAndUpdate(id, film);

        return res.send(filmUpdate);
    } catch (error) {
        return console.log(error);
    }
});

app.listen(3000);

