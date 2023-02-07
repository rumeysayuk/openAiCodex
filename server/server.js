import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import {Configuration, OpenAIApi} from "openai";

dotenv.config()

const configuration = new Configuration({
   apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)
const server = express();
server.use(cors());
server.use(express.json());

server.get("/", async (req, res) => {
   res.status(200).send({
      message: "Hello from codeX !"
   })
})

server.post("/", async (req, res) => {
   try {
      const prompt = req.body.prompt;

      const response = await openai.createCompletion({
         model: "text-davinci-003",
         prompt: `${prompt}`,
         temperature: 0,
         max_tokens: 3000,
         top_p: 1,
         frequency_penalty: 0.5,
         presence_penalty: 0,
      });
      res.status(200).send({
         bot: response.data.choices[0].text
      })
   } catch (e) {
      console.log("Error:", e)
      res.status(500).send(e || "Something went wrong")
   }
})

server.listen(process.env.PORT, () => {
   console.log(`Server is running on port ${process.env.PORT}`)
})
