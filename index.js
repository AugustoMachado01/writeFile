const http = require("http");
const fs = require("fs");

const port = 3000;

const server = http.createServer((req, res) => {
  const urlInfo = require("url").parse(req.url, true);
  const name = urlInfo.query.name;

  if (!name) {
    fs.readFile("index.html", function (error, data) {
      if (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.write("Erro ao ler o arquivo.");
        return res.end();
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);

      return res.end();
    });
  } else {
    fs.writeFile("file.txt", name, function (error) {
      if (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.write("Erro ao salvar o arquivo.");
        return res.end();
      }

      // Redirecionamento para a raiz
      res.writeHead(302, {
        Location: "/",
      });
      return res.end();
    });
  }
});

server.listen(port, () => {
  console.log(`servidor rodando na porta ${port}`);
});
