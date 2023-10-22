import express from "express";
import axios from "axios";

const app = express();
const port = 5000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "luffy";
const yourPassword = "Pirateking";
const yourAPIKey = "f28ea174-1678-42a2-baaf-a49543469d1c";
const yourBearerToken = "25ed367f-e4b4-4d92-918a-881d0b3e22d4";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  
  try{
    const response = await axios.get(API_URL + 'random');
    res.render('index.ejs', {content: JSON.stringify(response.data)});
  }
    catch (error){
      console.error('Failed to make request', error.message);
      res.status(500).send('Failed to fetch. Please try again');
    }
  
});

app.get("/basicAuth", (req, res) => {
  //to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
 
  const URL = API_URL + 'all?page=2';
  
   axios.get(URL, {
      auth: {
        username: "luffy",
        password: "Pirateking",
      },
    });
  res.render('index.ejs', {content: JSON.stringify(result.data)})
});

app.get("/apiKey", async(req, res) => {
  //to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  
  try{
  const response = await axios.get(API_URL+'filter',{
    params:{
      score: 5,
      apikey: yourAPIKey
    }
  });
  res.render('index.ejs', {content: JSON.stringify(response.data)});}
  catch{
    console.error('Failed to make request: ', error.message);
    res.status(500).send('Failed to Fetch');
  }

});

const config={
  headers: {Authorization: `Bearer ${yourBearerToken}`},
};

app.get("/bearerToken", async(req, res) => {
  try{
  const response = await axios.get(API_URL+'secrets/2', config);
  res.render('index.ejs', {content: JSON.stringify(response.data)} );
} catch(error){
  res.status(400).send(error.message);


}
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
