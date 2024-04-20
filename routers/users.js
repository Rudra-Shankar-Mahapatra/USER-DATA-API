const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

router.get('/:id', async(req,res)=>{
    try{
         const user = await User.findById(req.params.id)
         res.json(user)
    }catch(err){
        res.send('Error'+ err)
    }
})

router.post('/', async (req, res) => {
    console.log(req.body);
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        phoneno: req.body.phoneno
    });

    try {
        const u1 = await user.save();
        res.json(u1);
    } catch (err) {
        res.status(500).send('Error saving user: ' + err.message);
    }
});


router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (req.body.username) {
            user.username = req.body.username;
        }
        if (req.body.password) {
            user.password = req.body.password;
        }
        if (req.body.phoneno) {
            user.phoneno = req.body.phoneno;
        }

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(404).send('Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send('User deleted successfully');
    } catch (err) {
        res.status(500).send('Error deleting user');
    }
});


module.exports = router