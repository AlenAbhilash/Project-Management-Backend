const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const projectController = require('../Controller/projectController');
const jwtMiddleware = require('../Middileware/jwtMiddileware');
const multerConfig = require('../Middileware/muliterMiddileWare');
 
//regsiter
router.post('/register', userController.register);
//login
router.post('/login', userController.login);
//add project
router.post('/addproject', jwtMiddleware, multerConfig.single('projectImage'), projectController.addproject)
router.get('/getHomeProject', projectController.getHomeProject)
router.get('/getAllProject', jwtMiddleware, projectController.getAllProject)
router.get('/getUserProject', jwtMiddleware, projectController.getUserProject)
router.put('/project/edit/:pid', jwtMiddleware, multerConfig.single('projectImage'), projectController.editUserProject)
router.delete('/project/delete/:pid', jwtMiddleware, projectController.deleteProject)

module.exports = router;
