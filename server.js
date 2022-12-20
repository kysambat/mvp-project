import express from "express";
import postgres from "postgres";
import { readFile } from "node:fs/promises"
import cors from "cors"

const app = express();

const sql = postgres(process.env.DATABASE_URL);

app.use(express.json());
app.use(express.static("client"))
app.use(cors())


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