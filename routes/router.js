const express = require('express');
const router = new express.Router();
const USER = require('../modals/userSchema');


// CREATE USER
router.post("/register", async (req, res) => {
    console.log(req.body)
    const { id,name, email, mobile } = req.body;

    if (!name || !email || !mobile) {
        res.status(422).json({ error: "fill all the data" });
        console.log("All fields mandatory")
    }

    try {
        const preUser = await USER.findOne({ email: email })

        if (preUser) {
            res.status(422).json({ error: 'This user is already present' })
        } else {
            const finalUser = new USER({
                name, email, mobile
            })

            const storeData = await finalUser.save();
            console.log(storeData);
            res.status(201).json(storeData);
        }


    } catch (error) {
        console.log("error =>> ", error.message);
        res.status(400).json(error.message)
    }
});


// GET USERS DATA
router.get("/getUsers", async (req, res) => {
    try {
        const usersData = await USER.find();
        console.log('console the data' + usersData);
        res.status(201).json(usersData)
    } catch (error) {
        res.status(400).json(error.message)
        console.log('error' + error.message);
    }
})


// GET USER BY ID
router.get("/getUser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        //  console.log(id)
        const individualdata = await USER.findOne({ id: id })
        res.status(201).json(individualdata)
    } catch {
        res.status(400).json(individualdata)
        console.log("error" + error.message);
    }
});

// UPDATE USER
router.put('/editUser/:id', async(req, res) => {
    try {
    const userId = req.params.id;
    const {_id, name, email ,number} = req.body;
  
    console.log(userId,name,email,number);
    // Find the user by ID
    const user = await USER.findOneAndUpdate({_id :userId},req.body,{new:true});
    //   console.log('user===',user)
    res.status(201).json(user)
    } catch(error) {
        res.status(400).json(error.message)
        // console.log("error------------" + error);
    }
  });

// DELETE USER
router.delete('/deleteUser/:id',async(req,res)=>{
    const id = req.params.id;

    try{
           const doc = await USER.findOneAndDelete({_id:id});
           res.status(201).json(doc)
    }catch(err){
         console.log(err);
         res.status(400).json(err);
    }
  })


module.exports = router;