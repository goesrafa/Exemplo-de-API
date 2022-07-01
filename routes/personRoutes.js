const router = require('express').Router()
const Person = require('../model/Person')

//criando dados - Create
router.post('/', async (req, res) => {

    //tratamento de dados
    //Exemplo {name: Rafaela, salary: 2000, approved: false}
    const { name, salary, approved } = req.body

    if (!name) {
        res.status(422).json({ error: 'O nome é obrigatório!!' })
        return
    }

    const person = {
        name,
        salary,
        approved,
    }
    try {

        await Person.create(person)

        res.status(201).json({ msg: 'Pessoa inserida com sucesso' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//Leitura dos dados - Red
router.get('/', async (req, res) => {
    try {
        const people = await Person.find()

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})
//Rotas dinamicas
router.get('/:id', async (req, res) => {
    //extraindo o dado da requisição
    const id = req.params.id

    try {
        const person = await Person.findOne({ _id: id })

        if (!person) {
            res.status(422).json({ msg: 'Usuário não cadastrado ou não encontrado!!' })
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//Atualização de dados - Update (PUT, *PATCH - ATUALIZAÇÃO PARCIAL*)
router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const { name, salary, approved } = req.body

    const person = {
        name,
        salary,
        approved,
    }

    try {
        const updatePerson = await Person.updateOne({ _id: id }, person)

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

//Deletando dados - DELETE
router.delete('/:id', async (req, res)=>{
    const id = req.params.id
    const person = await Person.findOne({_id: id})

    if(!person){
        res.status(422).json({msg: 'Usuário não encontrado'})
    }

    try {
        
        await Person.deleteOne({_id: id})

        res.status(200).json({msg:'Usuário removido com sucesso'})

    } catch (error) {
        res.status(500).json({error: error})
    }
   

})
module.exports = router