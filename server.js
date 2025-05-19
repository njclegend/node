const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const port = 5000;

app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/legend')
.then(()=>console.log('connected'))
.catch(err=> console.log('error occured', err));

const profileSchema = new mongoose.Schema({
    name : {
        required : true,
        type : String,
        default : 'nameless'
    },
    email : {
        required : true,
        type : String,
        trim : true,
    }
});

const Profile = mongoose.model('Profile',profileSchema);


app.post('/add',(req,res)=>{

    const {name,email} = req.body;


const newProfile = new Profile({name , email });

newProfile.save()
.then(()=>{
    console.log("New user saved");
    res.status(201).send('User saved');
})
.catch(err => {
    console.error('failed to save the user' , err)
})
})


app.get('/getUsers',(req,res)=>{
    const Profile = mongoose.model('Profile',profileSchema);
    Profile.find()
    .then(Profiles => {
        res.json(Profiles);
    })
})


app.listen(port,()=>{
    console.log('App is running on port' , port)
})