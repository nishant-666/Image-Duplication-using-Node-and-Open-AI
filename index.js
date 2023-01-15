const { Configuration, OpenAIApi } = require("openai");
const sharp = require("sharp");

const fs = require("fs");
var id = "id" + Math.random().toString(16).slice(2);
const configuration = new Configuration({
  apiKey: `Add your own API Key`,
});

const openai = new OpenAIApi(configuration);

const getImage = () => {
  let inputFile = "sample3.jpg";
  let outputFile = `${id}.png`;
  sharp(inputFile)
    .resize({ height: 512, width: 512 })
    .toFile(outputFile)
    .then(() => generateImage())
    .catch(function () {
      console.log("Error occured");
    });
};

const generateImage = async () => {
  let response = await openai.createImageVariation(
    fs.createReadStream(`${id}.png`),
    1,
    "512x512"
  );
  console.log(response.data.data[0].url);
};

getImage();
