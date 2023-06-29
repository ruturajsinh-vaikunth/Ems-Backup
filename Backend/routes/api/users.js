import express, { response } from 'express'
import Users from '../../models/userModel.js'
const router = express.Router();
import { protect } from '../../middleware/authMiddleware.js';
import bcrypt from 'bcryptjs';
import ForgotPassword from '../../models/ForgotPassword.js';
import fs from 'fs';
import path from 'path';
import multer from 'multer';

router.get('/', protect, (req, res) => {
  Users.find().select('_id employee_id firstName email account_type status')
  .then((users) => res.json(users))
  .catch((err) => res.status(404).json({ nousersfound: 'No users found' }));
});

router.post('/filter-user', protect, (req, res) => {
  // only one field search
  if(req.body.employee_id !== '' && req.body.email === '' && req.body.account_type === '' && req.body.status === ''){
     Users.find({employee_id : req.body.employee_id}).select('_id employee_id firstName email account_type status')
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ nousersfound: 'No users found' }));
  }
  if(req.body.employee_id === '' && req.body.email !== '' && req.body.account_type === '' && req.body.status === ''){
    Users.find({email : req.body.email}).select('_id employee_id firstName email account_type status')
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ nousersfound: 'No users found' }));
  }
  if(req.body.employee_id === '' && req.body.email === '' && req.body.account_type !== '' && req.body.status === ''){
    Users.find({account_type : req.body.account_type}).select('_id employee_id firstName email account_type status')
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ nousersfound: 'No users found' }));
  }
  if(req.body.employee_id === '' && req.body.email === '' && req.body.account_type === '' && req.body.status !== ''){
    Users.find({status : req.body.status}).select('_id employee_id firstName email account_type status')
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ nousersfound: 'No users found' }));
  }


  // two field search
  if(req.body.employee_id !== '' && req.body.email !== '' && req.body.account_type === '' && req.body.status === ''){
    Users.find({employee_id : req.body.employee_id, email : req.body.email}).select('_id employee_id firstName email account_type status')
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ nousersfound: 'No users found' }));
  }
  if(req.body.employee_id !== '' && req.body.email === '' && req.body.account_type !== '' && req.body.status === ''){
    Users.find({employee_id : req.body.employee_id, account_type : req.body.account_type}).select('_id employee_id firstName email account_type status')
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ nousersfound: 'No users found' }));
  }
  if(req.body.employee_id !== '' && req.body.email === '' && req.body.account_type === '' && req.body.status !== ''){
    Users.find({employee_id : req.body.employee_id, status : req.body.status}).select('_id employee_id firstName email account_type status')
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ nousersfound: 'No users found' }));
  }

  if(req.body.employee_id === '' && req.body.email !== '' && req.body.account_type !== '' && req.body.status === ''){
    Users.find({email : req.body.email, account_type : req.body.account_type}).select('_id employee_id firstName email account_type status')
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ nousersfound: 'No users found' }));
  }
  if(req.body.employee_id === '' && req.body.email !== '' && req.body.account_type === '' && req.body.status !== ''){
    Users.find({email : req.body.email, status : req.body.status}).select('_id employee_id firstName email account_type status')
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ nousersfound: 'No users found' }));
  }
  if(req.body.employee_id === '' && req.body.email === '' && req.body.account_type !== '' && req.body.status !== ''){
    Users.find({account_type : req.body.account_type, status : req.body.status}).select('_id employee_id firstName email account_type status')
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ nousersfound: 'No users found' }));
  }


  //three field search
  if(req.body.employee_id !== '' && req.body.email !== '' && req.body.account_type !== '' && req.body.status === ''){
    
    Users.find({employee_id : req.body.employee_id, email : req.body.email, account_type : req.body.account_type}).select('_id employee_id firstName email account_type status')
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ nousersfound: 'No users found' }));
  }
  if(req.body.employee_id !== '' && req.body.email !== '' && req.body.account_type === '' && req.body.status !== ''){
    Users.find({employee_id : req.body.employee_id, email : req.body.email, status : req.body.status}).select('_id employee_id firstName email account_type status')
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ nousersfound: 'No users found' }));
  }
  if(req.body.employee_id === '' && req.body.email !== '' && req.body.account_type !== '' && req.body.status !== ''){
    Users.find({email : req.body.email, account_type : req.body.account_type, status : req.body.status}).select('_id employee_id firstName email account_type status')
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ nousersfound: 'No users found' }));
  }
  if(req.body.employee_id !== '' && req.body.email === '' && req.body.account_type !== '' && req.body.status !== ''){
    Users.find({employee_id : req.body.employee_id, account_type : req.body.account_type, status : req.body.status}).select('_id employee_id firstName email account_type status')
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ nousersfound: 'No users found' }));
  }

  if(req.body.employee_id !== '' && req.body.email !== '' && req.body.account_type !== '' && req.body.status !== ''){
    Users.find({employee_id : req.body.employee_id, email : req.body.email, account_type : req.body.account_type, status : req.body.status}).select('_id employee_id firstName email account_type status')
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ nousersfound: 'No users found' }));
  }


});

router.post('/edituser', protect,  (req,res) => {
    Users.findOneAndUpdate({_id: req.body.id},{firstName: req.body.Name, email: req.body.UserEmail,account_type: req.body.AccountType, status: req.body.Status })
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ nousersfound: 'No users found' }));
})

router.post('/editpassword', protect, async (req,res) => {

  const user = await Users.findOne({ _id : req.body.id })
  // return user obj if their password matches
  if (user && (await user.matchPassword(req.body.oldPassword))) { 
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)
    Users.findOneAndUpdate({_id: req.body.id},{password: password })
    .then((users) => res.json({Msg: "Password Updated"}))
    .catch((err) => res.status(404).json({ nousersfound: 'No users found' }));
  }else{
      res.status(404).json({Msg: "Enter correct Old Password"})
  }
})

router.post('/deleteuser', protect, (req,res) => {

  
    Users.findOneAndUpdate({_id : req.body.id},{status: "Deleted"})
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ nousersfound: 'No users found' }));
});


router.post('/resetpassword', (req,res) => {
  Users.findOne({email: req.body.email})
    .then((users) => {
      if(users === null){
        res.status(400).json("Email Id not Exists")
      }
      else{
        function randomString(len) {
          var str = "";                                // String result
          for (var i = 0; i < len; i++) {              // Loop `len` times
            var rand = Math.floor(Math.random() * 62); // random: 0..61
            var charCode = rand += rand > 9 ? (rand < 36 ? 55 : 61) : 48; // Get correct charCode
            str += String.fromCharCode(charCode);      // add Character to str
          }
          return str; // After all loops are done, return the concatenated string
        }

        const StringGenerator = randomString(6)

        const ResetLink = StringGenerator 

      

        function addMinutes(date, minutes) {
          date.setMinutes(date.getMinutes() + minutes);
        
          return date;
        }
        
        const result1 = addMinutes(new Date(), 10);

        let newDateTime = new Date(result1).toLocaleString()

        ForgotPassword.create({email : req.body.email, reset_link : ResetLink, time : newDateTime })
        .then((response) => res.json(response))
        .catch((err) => res.status(404).json("Error" + err));
      }
    })
    .catch((err) => {
      console.log(err);
    });
})

router.post('/findresetlink', (req,res) => {
  ForgotPassword.findOne({reset_link: req.body.string})
  .then((data) => res.json(data))
  .catch((e) => res.status(400).json(e))
})

router.post('/editpasswordbyemail', async (req,res) => {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)
    Users.findOneAndUpdate({email: req.body.email},{ password: password })
    .then((users) => res.json({Msg: "Password Updated"}))
    .catch((err) => res.status(404).json({ nousersfound: 'No users found' }));
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    let str = (file.mimetype).toString();
    let Trimstr = str.substring(str.indexOf("/") + 1);
    let filename =  (file.originalname).toString() + "." + Trimstr
    cb(null, filename)
  },
})

const upload = multer({ storage: storage })


router.post('/Adminprofileimgadd', protect , upload.single('profileimg') ,(req,res) => {

  Users.updateOne({_id :req.body._id}, 
    {$set : {
      profileimg: req.file.filename
    } })
    .then((data) => 
    {
      res.json(data)
      const oldPath = path.join('public/images', req.body.oldImage);
      if(fs.existsSync(oldPath)){
      fs.unlink(oldPath, (err) => {
        if(err){
          console.error(err)
          return;
        }
      })
    }
    }

)
.catch((err) => res.status(404))
})

router.post('/adminbyid', protect, (req,res) => {
  Users.findOne({_id: req.body._id})
  .then((user) => res.json(user))
  .catch((err) => res.status(404).json({ nousersfound: 'No user found' }));
})


router.post('/managerbyid', protect, (req,res) => {
  Users.findOne({employee_id: req.body.employee_id})
  .then((user) => res.json(user))
  .catch((err) => res.status(404).json({ nousersfound: 'No user found' }));
})


export default router;