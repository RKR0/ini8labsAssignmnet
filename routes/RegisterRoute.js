import express from 'express';
import registerController from '../controller/RegisterController.js';


const router = express.Router();

// public 
router.post('/add',  registerController.userRegistration)
router.delete('/delete/registerid/:registerid', registerController.deleteUser)
router.put('/update/registerid/:registerid', registerController.updateUser)
router.get('/registerid/:registerid', registerController.getUserById)
router.get('/', registerController.allUsers)

export default router