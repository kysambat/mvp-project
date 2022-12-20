import express from "express";
import postgres from "postgres";
import { readFile } from "node:fs/promises"

const app = express();
const sql = postgres({ database: 'recipe_tracker'});

app.use(express.json());
app.use(express.static("client"))


app.get("/recipe", (req,res) => {
    sql `SELECT * FROM recipe`.then((result) => {
        res.json(result)
    });
});

app.post("/recipe", (req, res) => {
    const { dish, ingredients, instructions } = req.body;
    sql `INSERT INTO recipe (dish, ingredients, instructions) VALUES (${dish}, ${ingredients}, ${instructions}) RETURNING *`.then(
        (result) => {
            res.send(result[0])
        }
    )
});


app.listen(9000);