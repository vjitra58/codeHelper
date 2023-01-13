import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from CodeX!",
  });
});

app.post("/", async (req, res) => {
  const prompt = req.body.prompt;

  const options = {
    method: "POST",
    url: "https://api.writesonic.com/v2/business/content/chatsonic?engine=premium",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "X-API-KEY": `${process.env.API_KEY}`,
    },
    data: {
      enable_google_results: "true",
      enable_memory: false,
      input_text: `${prompt}`,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      //   console.log(response);
      res.status(200).send({
        bot: response.data.message,
      });
    })
    .catch(function (error) {
      res.status(500).send(error || "something went wrong");
    });
});

app.listen(5000, () =>
  console.log("AI server started on http://localhost:5000")
);
