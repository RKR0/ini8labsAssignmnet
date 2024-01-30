import dotenv from 'dotenv'
import conn from '../config/dataBaseConn.js'

dotenv.config()





const userRegistration = async (req, res) => {
    let { name, email, phone_number,dateOfBirth,address} = req.body;


    if(!(name && email && phone_number && address)){
        res.status(400).send({ "status": "failed", "message": "Please Fill the Required Fields" })
    }
    if((/^[a-zA-Z ]+$/).test(name)===false){
        res.status(400).send({ "status": "failed", "message": "Please Enter Valid Name" })
    }
    if((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)===false){
        res.status(400).send({ "status": "failed", "message": "Please Enter Valid Email" })
    }
    if((/^\+?\d{10,}$/).test(phone_number)===false){
        res.status(400).send({ "status": "failed", "message": "Please Enter Valid Phone Number" })
    }
 


    try {
           let sql = `INSERT INTO registration (name, email, phone_number,address,dateOfBirth) VALUES (?,?,?,?,?)`
           const result = await conn.query(sql,[name,email, phone_number,address,dateOfBirth])
           res.status(201).send({"status": `User registered successfully with ID: ${result[0].insertId}`})
          } catch (error) {
            console.log(error)
            res.status(500).send({ "status": "failed", "message": "Unable to Register Due to InternalserverError" })
          }

  }



  const getUserById = async (req,res) => {

    let registerid = req.params.registerid;

    if(!(registerid)){
        res.status(400).send({ "status": "failed", "message": "Please Fill the Required Fields" })
    }

    try {

        let sql = `Select * from registration where  id =   ${registerid}`
  
        const result  = await conn.query(sql)
        if(result[0].length===0){
         res.status(404).send({ "status": "failed", "message": "Please Enter Valid User ID" })
         return;
       }
         res.status(200).json(result[0])
          
            } catch (error) {
              console.log(error)
              res.status(500).send({ "status": "failed", "message":"Internal Server Error" })
            }
}

const allUsers = async (req,res) => {

    try {

        let sql = `Select * from registration `
  
        const result  = await conn.query(sql)
         res.status(200).json(result[0])


            } catch (error) {
              console.log(error)
              res.status(500).send({ "status": "failed", "message": "Internal Server Error" })
            }
}

const deleteUser = async (req,res) => {

    let registerid = req.params.registerid;

    if(!(registerid)){
        res.status(400).send({ "status": "failed", "message": "Please Fill the Required Fields" })
    }

    try {
      let sql1 = `Select * from registration where  id =   ${registerid}`
  
      const result  = await conn.query(sql1)
      if(result[0].length===0){
       res.status(404).send({ "status": "failed", "message": "Please Enter Valid User ID" })
       return;
     }

        let sql = `Delete from registration where  id =   ${registerid}`
  
        await conn.query(sql)
        res.status(200).send({ "status": "sucess"})
 
          
            } catch (error) {
              console.log(error)
              res.status(500).send({ "status": "failed", "message": "Internal Server Error" })
            }
}

const updateUser = async (req,res) => {

  let registerid = req.params.registerid;
  let { name, email, phone_number,dateOfBirth,address} = req.body;


    if(!(name && email && phone_number && address)){
        res.status(400).send({ "status": "failed", "message": "Please Fill the Required Fields" })
    }
    if((/^[a-zA-Z ]+$/).test(name)===false){
        res.status(400).send({ "status": "failed", "message": "Please Enter Valid Name" })
    }
    if((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)===false){
        res.status(400).send({ "status": "failed", "message": "Please Enter Valid Email" })
    }
    if((/^\+?\d{10,}$/).test(phone_number)===false){
        res.status(400).send({ "status": "failed", "message": "Please Enter Valid Phone Number" })
    }

  if(!registerid){
      res.status(400).send({ "status": "failed", "message": "Please Fill the Required Fields" })
  }

  try {
    let sql1 = `Select * from registration where  id =   ${registerid}`
  
    const result  = await conn.query(sql1)
    if(result[0].length===0){
     res.status(404).send({ "status": "failed", "message": "Please Enter Valid User ID" })
     return;
   }
   


   let sql = `UPDATE registration
   SET name = ?, email = ?, phone_number = ?, address = ?, dateOfBirth = ?
   WHERE id = ${registerid}`
   const ans = await conn.query(sql,[name,email, phone_number,address,dateOfBirth])
   let sql2 = `Select * from registration where  id =   ${registerid}`
   const result2  = await conn.query(sql2)
      res.status(200).send({ "status": "sucess","data":result2[0]})

        
          } catch (error) {
            console.log(error)
            res.status(500).send({ "status": "failed", "message": "Internal Server Error" })
          }
}


  export default { userRegistration, getUserById, allUsers,deleteUser,updateUser};