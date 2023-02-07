import express from 'express';
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from 'cors';
import path from "path"
import {Configuration, OpenAIApi} from "openai";

dotenv.config()


const configuration = new Configuration({
   apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)
const app = express();

app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
})

app.use(cors());
app.use(express.json());

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))

app.get("/", async (req, res) => {
   res.status(200).send({
      message: "Hello from codeX !"
   })
})

app.post("/", async (req, res) => {
   try {
      const prompt = req.body.prompt;

      const response = await openai.createCompletion({
         model: "text-davinci-003",
         prompt: `${prompt}`,
         temperature: 0,
         max_tokens: 3000,
         top_p: 1,
         frequency_penalty: 0.5,
         presence_penalty: 0
      });
      res.status(200).send({
         bot: response.data.choices[0].text
      })
   } catch (e) {
      console.log("Error:", e)
      res.status(500).send(e || "Something went wrong")
   }
})

app.listen(process.env.PORT, () => {
   console.log(`Server is running on port ${process.env.PORT}`)
})
