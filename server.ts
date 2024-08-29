import cors from "cors";
import express,{Request, Response} from "express";

const app = express();
app.use(cors());

app.get("/", (req: Request, res : Response) => {

    res.send('Hello World!');
});

app.listen(3000, () => console.log("Server started on port 3000 \t http://localhost:3000"));