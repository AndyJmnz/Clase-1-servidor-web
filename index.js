const express = require("express")
const bodyParser = require('body-parser');
const app = express()
const port = 3010

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let materias = [
    {id:1, name:"Web"},
    {id:2, name:"Mate"},
    {id:3, name:"Ingles"}
]

app.get('/', (req, res) => {
  res.send(materias)
})

//por body
app.post('/agregar', (req, res) => {
    const { id, name } = req.body
    materias.push({id, name})
    res.status(200).send({id, name});
})

//por body
app.patch('/modificar', (req, res) => {
   //destructurar el objeto con los mismos nombres de la url
    const { id, name} = req.body
    const ModMat = materias.find((mat) => id == mat.id)
    ModMat.name = name
    res.status(200).send("Materia Modificada Correctamente")
})

//por parametros en la ruta
app.delete('/eliminar/:id', (req, res) => {
    const id = req.params.id
    const EliMat = materias.filter((mat) => id != mat.id)
    materias = EliMat
    res.send(materias)
})

//por parametros en la ruta
app.get('/buscar/:id', (req, res) => {
    const id = req.params.id
    const BusMat = materias.find((mat) => id == mat.id)
    res.send(BusMat)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})