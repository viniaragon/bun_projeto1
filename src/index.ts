import { Hono } from 'hono'
import *as db from './db' 

const app = new Hono()

const baseHtml = (children: string) => {
  return `
  <html>
    <head>
    <script src="https://unpkg.com/htmx.org@1.9.10" integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC" crossorigin="anonymous"></script>
    <script src="https://cdn.tailwindcss.com"></script>   
      <title>Home</title>
    </head>
    <body>
      ${children}
    </body>
  </html>
  `
}

const form = `
  <form hx-post="/pacientes" hx-swap="beforeend" hx-target="#paciente-list">
    <input type="text" name="paciente" placeholder="Nome do Paciente"/>
    <button type="submit">Adicionar</button>
  </form>
  <ul id="paciente-list">
    
`


app.get('/', (c) =>{
  return c.html(baseHtml(form))
})

app.post('/pacientes', async (c) => {
  const body= await c.req.parseBody()
  const paciente = body.paciente

  db.addPaciente(paciente as string)

  return c.html(`
  <li class= "">${paciente}</li>`)
})

export default {
  port: 5000,
  fetch: app.fetch,
}






