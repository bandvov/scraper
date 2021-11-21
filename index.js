const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const PORT = 5000;

const app = express();

const url = "https://theguardian.com/uk";
const articles = [];
axios.get(url).then((res) => {
  const html = res.data;
  const $ = cheerio.load(html);
  $(".fc-item__title").each(function () {
    const title = $(this).text();
    const url = $(this).find("a").attr("href");
    articles.push({ title, url });
  });
});

app.get("*", (req, res) => {
  res.send(articles);
});
app.listen(PORT, () => {
  console.log("Start on port %s", PORT);
});
