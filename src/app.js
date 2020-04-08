const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository)

  return response.status(200).json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const repositoriesIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoriesIndex < 0) response.status(400).json({ error: 'Repository not found' })

  const repository = {
    id,
    title,
    url,
    techs
  }

  repositories[repositoriesIndex] = repository

  return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  if (repositoryIndex < 0) response.status(400).json({ error: 'Repository not found' })

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  repositories.splice(repositoryIndex, 1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const repositoriesIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoriesIndex < 0) response.status(400).json({ error: 'Repository not found' })

  let { likes } = repositories[repositoriesIndex]

  const repository = {
    ...repositories[repositoriesIndex],
    likes: likes+1
  }

  repositories[repositoriesIndex] = repository

  return response.json(repository)
});

module.exports = app;
