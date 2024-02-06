const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000 // "Radiofrekvens"


const migrationhelper = require('./migrationhelper')

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())

const { sequelize, Employee, SalaryPayment } = require('./models')





app.get('/api/employees/:userId',async (req,res)=>{
    console.log(req.params.userId)

    try {
        const user = await Employee.findOne({
          where: { userId:req.params.userId }
        })
        console.log(user)
        let result = {
            name:user.name,
            birthDate:user.birthDate,
            hourlySalary: user.hourlySalary,
            userid:user.userId,
            phone:user.phone,
            employedAt:user.employedAt,
            hej:user.salaryPayments
        }
        return res.json(result)
      } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
      }


});

app.delete('/api/employees/:anvId',async (req,res)=>{
    const uuid = req.params.uuid
    try {
      const user = await Employee.findOne({ where: { userId:uuid } })
  
      await user.destroy()
  
      return res.json({ message: 'Employee deleted!' })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
});

app.put('/api/employees/:anvId',async (req,res)=>{
    const uuid = req.params.anvId
    const {name,birthDate,hourlySalary,employedAt} = req.body

    try {

        const user = await Employee.findOne({
            where: { userId:uuid}
          })
  
      user.name = name
      user.birthDate = birthDate 
      user.hourlySalary     = hourlySalary
      user.employedAt = employedAt
  
      await user.save()
  
      return res.status(204).json({err:'ok'})
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }

});


 


app.post('/api/employees',async (req,res)=>{

    const {name,birthDate,hourlySalary,employedAt} = req.body
    try {
        const user = await Employee.create({name, hourlySalary, birthDate, employedAt })
    
        return res.json(user)
      } catch (err) {
        console.log(err)
        return res.status(500).json(err)
      }



    //console.log(req.body.name)
    //req.body.name
    //req.body.birthDate
    //req.bodyhourlySalary.   
    // ta det som finnas i body skapa nytt objekt och lägg in i arrayen
    // returnera 201 Created
    res.status(201).send('Created')
});

app.get('/api/employees',async (req,res)=>{
    let employees = await Employee.findAll()
    let result = employees.map(p=>({
        userid: p.userid,
        name: p.name
    }))
     res.json(result)
});


app.listen(port, async () => {
    const a = await SalaryPayment.findOne({where:{id:1},include:'employee'})
    console.log(a.employee)
        await migrationhelper.migrate()
//    await sequelize.sync({alter:true})
    await sequelize.authenticate()
    console.log(`Example app listening2 on port ${port}`)
})
  