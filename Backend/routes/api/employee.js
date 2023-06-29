import express from 'express';
import multer from 'multer';
import Employee from '../../models/Employee.js';
import EmergencyContacts from '../../models/EmergencyContacts.js';
import FamilyDetail from '../../models/FamilyDetail.js';
import Qualification from '../../models/Qualification.js';
import ProfessionalQualification from '../../models/ProfessionalQualification.js';
import ProfileLinks from '../../models/ProfileLinks.js';
const router = express.Router();
import Joi from 'joi';
import { protect } from '../../middleware/authMiddleware.js';
import fs from 'fs';
import path from 'path';


router.get('/all', protect, (req, res) => {
    Employee.find()
    .then((employee) => res.json(employee))
    .catch((err) => res.status(404).json({ noemployeefound: 'No employee found' }));
});


router.get('/greeting-employeedata',  protect, (req, res) => {
  Employee.find().select( '_id firstname birth_date date_of_anniversary profileimg')
  .then((employee) => res.json(employee))
  .catch((err) => res.status(404).json({ noemployeefound: 'No employee found' }));
});

router.post('/addemployee',protect, (req, res) => {
  
    Employee.create({employee_id: req.body.employee_id.employee_id,
      firstname: req.body.employee_id.addfirstname, 
      email: req.body.employee_id.addemail, 
      designation: req.body.employee_id.adddesignation, 
      gender: req.body.employee_id.addgender, 
      birth_date: req.body.employee_id.addbirth_date, 
      date_of_anniversary: req.body.employee_id.adddate_of_anniversary, 
      address: req.body.employee_id.addaddress, 
      city: req.body.employee_id.addcity, 
      state: req.body.employee_id.addstate, 
      country: req.body.employee_id.addcountry, 
      pincode: req.body.employee_id.addpincode, 
      employee_status: req.body.employee_id.addemployee_status,
      experience: req.body.employee_id.addexperience, 
      nationality: req.body.employee_id.addnationality,
      marital_status: req.body.employee_id.addmarital_status,
      account_type: req.body.employee_id.addaccount_type})
      .then((employee) => res.json({ msg: 'employee added successfully', data: employee }))
      .catch(() => res.status(400).json({ error: 'Unable to add this employee' }));
  });

router.post('/employeeinfo',protect,(req,res) => {
    let emp_id = (req.body.employee_id);
    Employee.findOne({employee_id: emp_id})    
    .then((employee) => res.json(employee))
      .catch(() => res.status(400).json({ error: 'Unable to find this employee' }));
});


router.get('/:id', (req, res) => {
    Employee.findById(req.params.id)
    .then((employee) => res.json(employee))
    .catch((err) => res.status(404).json({ noemployeefound: 'No employee found' }));
});


router.patch('/employeeupdate', protect, async (req, res) => {
  function validateUser(user)
  {
    const JoiSchema = Joi.object({
      _id: Joi.string()
            .required(),
      employee_id: Joi.number()
                    .required(),
      firstname: Joi.string()
                  .min(3)
                  .max(30)
                  .required(),
                    
        email: Joi.string()
               .email()
               .min(5)
               .max(50),
        designation: Joi.string()
                .required(),
        gender: Joi.string()
                .valid('Male')
                .valid('Female'),
        birth_date : Joi.date()
              .required(),
        date_of_anniversary: Joi.date()
                .required(),
        address : Joi.string()
                .required(),
        city : Joi.string()
                .required(),
        state : Joi.string()
                .required(),
        country : Joi.string()
                .required(),
        pincode : Joi.number()
                .required(),
        // employee_status : Joi.string()
        //         .valid('Active')
        //         .valid('In Active'),
        experience : Joi.string()
                  .required(),
        nationality : Joi.string()
                  .required(),
        marital_status : Joi.string()
                .valid('Married')
                .valid('Unmarried'),
    }).options({ abortEarly: false });
  
    return JoiSchema.validate(user)
  }
  const result = validateUser(req.body._id)
    if(result.error)
    {  
      res.status(400).json({details :result.error.details})
    }
    else{
      Employee.find({_id: req.body._id._id})
      .then((response) => 
          {
            if(!response.length){
              // Employee.find({email: req.body._id.email})
              // .then((response) => 
              //   {
              //     if(!response.length){
              //       Employee.updateOne({employee_id: req.body._id.employee_id}, { $set: {firstname : req.body._id.firstname, email: req.body._id.email,designation : req.body._id.designation,gender: req.body._id.gender,address : req.body._id.address,city : req.body._id.city,state : req.body._id.state,country : req.body._id.country,pincode : req.body._id.pincode,employee_status : req.body._id.employee_status,experience : req.body._id.experience,nationality : req.body._id.nationality,marital_status : req.body._id.marital_status}})
              //       .then((employee) => res.json({ msg: 'Updated successfully' }))
              //       .catch((err) =>
              //         res.status(400).json({ error: 'Unable to update the Database' })
              //       );
              //     }
              //     // else{}
              //   })
              // .catch((err) =>
              //   res.status(400).json({ error: 'Unable to update the Database' }));
              res.json({msg: "Not found"})
            }
            else{
              Employee.find({_id: req.body._id._id, email: req.body._id.email})
              .then((response) => {
                if(!response.length){
                  Employee.find({email: req.body._id.email})
                  .then((response) => {
                    if(!response.length){
                      Employee.updateOne({employee_id: req.body._id.employee_id}, { $set: {firstname : req.body._id.firstname, email: req.body._id.email,designation : req.body._id.designation,gender: req.body._id.gender,birth_date: req.body._id.birth_date,date_of_anniversary : req.body._id.date_of_anniversary,address : req.body._id.address,city : req.body._id.city,state : req.body._id.state,country : req.body._id.country,pincode : req.body._id.pincode,experience : req.body._id.experience,nationality : req.body._id.nationality,marital_status : req.body._id.marital_status}})
                      .then((employee) => res.json({ msg: 'Updated successfully' }))
                      .catch((err) =>
                        res.status(400).json({ error: 'Unable to update the Database' })
                      );
                    }
                    else{
                      res.status(400).json({msg: "Email is already thier Please use another one"})
                    }
                  })
                }
                else{
                  Employee.updateOne({_id: req.body._id._id}, { $set: {firstname : req.body._id.firstname, email: req.body._id.email,designation : req.body._id.designation,gender: req.body._id.gender,birth_date: req.body._id.birth_date,date_of_anniversary : req.body._id.date_of_anniversary,address : req.body._id.address,city : req.body._id.city,state : req.body._id.state,country : req.body._id.country,pincode : req.body._id.pincode,employee_status : req.body._id.employee_status,experience : req.body._id.experience,nationality : req.body._id.nationality,marital_status : req.body._id.marital_status}})
                    .then((employee) => res.json({ msg: 'Updated successfully' }))
                    .catch((err) =>
                      res.status(400).json({ error: 'Unable to update the Database' })
                    );
                }
              })
              
            }
          }

        )
      .catch((err) =>
      res.status(400).json({ error: 'Unable to find in the Database' }) );
    
    }
});


router.delete('/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, req.body)
    .then((employee) => res.json({ mgs: 'employee entry deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such an employee' }));
});

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


router.post('/profileimgadd', protect , upload.single('profileimg') ,(req,res) => {

  Employee.updateOne({employee_id :req.body.employee_id}, 
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

//EmergencyContacts

router.get('/', (req, res) => {
    EmergencyContacts.find()
    .then((EC) => res.json(EC))
    .catch((err) => res.status(404).json({ nocontactfound: 'No contact found' }));
});

router.post('/addemergencycontact', protect, (req, res) => {
    EmergencyContacts.create({employee_id: req.body.employee_id.employee_id, 
      name: req.body.employee_id.AddECname, 
      relation: req.body.employee_id.AddECrelation,
      contact: req.body.employee_id.AddECcontact  })
      .then((EC) => res.json({ msg: 'EmergencyContact added successfully' }))
      .catch(() => res.status(400).json({ error: 'Unable to add this contact' }));
});

router.post('/emergencyinfo', protect, (req,res) => {
    let emp_id = JSON.parse(JSON.stringify(req.body.employee_id));
    EmergencyContacts.find({employee_id: emp_id})  
    .then((employee) => res.json(employee))
      .catch(() => res.status(400).json({ error: 'Unable to find this contact' }));
});

router.post('/editEC', protect ,(req,res) => {
  EmergencyContacts.findOneAndUpdate({_id : req.body._id},{name: req.body.name, relation: req.body.relation, contact : req.body.contact })  
    .then((response) => res.json(response))
    .catch(() => res.status(400).json({ error: 'Unable to find this detail' }));
});

router.post('/deleteEC', protect ,(req,res) => {
  EmergencyContacts.findByIdAndDelete(req.body._id)
      .then((EC) => res.json(EC))
      .catch(() => res.status(400).json({ error: 'Unable to find this id' }));
})

//FamilyDetail

router.get('/', (req, res) => {
    FamilyDetail.find()
    .then((EC) => res.json(EC))
    .catch((err) => res.status(404).json({ nocontactfound: 'No contact found' }));
});

router.post('/addfamilydetail', protect , (req, res) => {
    FamilyDetail.create({employee_id: req.body.employee_id.employee_id,
     name: req.body.employee_id.AddFDname,
     relation: req.body.employee_id.AddFDrelation})
      .then((EC) => res.json({ msg: 'familydetail added successfully' }))
      .catch(() => res.status(400).json({ error: 'Unable to add this familydetail' }));
});

router.post('/familydetail', protect , (req,res) => {
    let emp_id = JSON.parse(JSON.stringify(req.body.employee_id));
    FamilyDetail.find({employee_id: emp_id})  
    .then((employee) => res.json(employee))
      .catch(() => res.status(400).json({ error: 'Unable to find this detail' }));
});

router.post('/editFD', protect , (req,res) => {
  FamilyDetail.findOneAndUpdate({_id : req.body._id},{name: req.body.name, relation: req.body.relation })  
    .then((response) => res.json(response))
    .catch(() => res.status(400).json({ error: 'Unable to find this detail' }));
});

router.post('/deleteFD', protect , (req,res) => {
  FamilyDetail.findByIdAndDelete(req.body._id)
      .then((FD) => res.json(FD))
      .catch(() => res.status(400).json({ error: 'Unable to find this id' }));
})

// Qualification

router.get('/', (req, res) => {
    Qualification.find()
    .then((QC) => res.json(QC))
    .catch((err) => res.status(404).json({ noQCfound: 'No Qualification found' }));
});

router.post('/addqualification', protect, (req, res) => {
  function validateUser(user)
  {
    const JoiSchema = Joi.object({
      employee_id: Joi.number()
                    .required(),
      degree: Joi.string()
                  .required(),
      institute: Joi.string()
                  .required(),
      from_date :  Joi.date()
                  .required(),
      to_date : Joi.date()
                .required(),
      complete_year :  Joi.number()
                  .required(),
      gpa_Score : Joi.number()
                  .required(),

    }).options({ abortEarly: false });
  
    return JoiSchema.validate(user)
  }
  const result = validateUser(req.body.employee_id)
    if(result.error)
    {  
      res.status(400).json({details :result.error.details})
    }
    else{

      Qualification.create({employee_id: req.body.employee_id.employee_id,
        degree : req.body.employee_id.degree,
        institute : req.body.employee_id.institute,
        from_date :  req.body.employee_id.from_date,
        to_date : req.body.employee_id.to_date,
        complete_year : req.body.employee_id.complete_year,
        gpa_Score : req.body.employee_id.gpa_Score,
      })
        .then((QC) => res.json({ msg: ' Qualification added successfully' }))
        .catch(() => res.status(400).json({ error: 'Unable to add this Qualification' }));
    }
});

router.post('/qualificationdetail', protect , (req,res) => {
    let emp_id = JSON.parse(JSON.stringify(req.body.employee_id));
    Qualification.find({employee_id: emp_id})  
    .then((QC) => res.json(QC))
      .catch(() => res.status(400).json({ error: 'Unable to find this detail' }));
});

router.post('/editQua',protect, (req,res) => {
  function validateUser(user)
  {
    const JoiSchema = Joi.object({
      _id: Joi.string()
            .required(),
      degree: Joi.string()
                  .min(3)
                  .max(30)
                  .required(),
      institute: Joi.string()
                  .min(3)
                  .max(30)
                  .required(),
      from_date :  Joi.date()
                  .required(),
      to_date : Joi.date()
                .required(),
      complete_year :  Joi.number()
                  .required(),
      gpa_Score : Joi.number()
                  .required(),

    }).options({ abortEarly: false });
  
    return JoiSchema.validate(user)
  }
  const result = validateUser(req.body)
    if(result.error)
    {  
      res.status(400).json({details :result.error.details})
    }
    else{
      Qualification.findOneAndUpdate({_id : req.body._id},{degree : req.body.degree, institute : req.body.institute, from_date : req.body.from_date, to_date : req.body.to_date, complete_year : req.body.complete_year, gpa_Score : req.body.gpa_Score })  
        .then((response) => res.json(response))
        .catch(() => res.status(400).json({ error: 'Unable to find this detail' }));
    }
});

router.post('/deleteQua',protect, (req,res) => {
  Qualification.findByIdAndDelete(req.body._id)
      .then((Qua) => res.json(Qua))
      .catch(() => res.status(400).json({ error: 'Unable to find this id' }));
})

// ProfessionalQualification

router.get('/', (req, res) => {
    ProfessionalQualification.find()
    .then((PQC) => res.json(PQC))
    .catch((err) => res.status(404).json({ noPQCfound: 'No ProfessionalQualification found' }));
});

router.post('/pqadd', protect , (req, res) => {
    ProfessionalQualification.create({employee_id : req.body.employee_id.employee_id,
    company: req.body.employee_id.company,
    job_title: req.body.employee_id.job_title,
    from_date: req.body.employee_id.pq_from_date,
    to_date: req.body.employee_id.pq_to_date})
      .then((PQC) => res.json({ msg: 'ProfessionalQualification added successfully' }))
      .catch(() => res.status(400).json({ error: 'Unable to add this ProfessionalQualification' }));
});

router.post('/pqdetail', protect ,(req,res) => {
    let emp_id = JSON.parse(JSON.stringify(req.body.employee_id));
    ProfessionalQualification.find({employee_id: emp_id})  
    .then((PQC) => res.json(PQC))
      .catch(() => res.status(400).json({ error: 'Unable to find this detail' }));
});

router.post('/editPQ', protect ,(req,res) => {
  ProfessionalQualification.findOneAndUpdate({_id : req.body._id},{company: req.body.company,job_title: req.body.job_title, from_date: req.body.from_date, to_date: req.body.to_date })  
    .then((response) => res.json(response))
    .catch(() => res.status(400).json({ error: 'Unable to find this detail' }));
});

router.post('/pqdelete', protect ,(req,res) => {
  ProfessionalQualification.findByIdAndDelete(req.body._id)
      .then((PQC) => res.json(PQC))
      .catch(() => res.status(400).json({ error: 'Unable to find this id' }));
})

//profile-links

router.post('/profile-links', protect, (req,res) => {
  ProfileLinks.findOne({employee_id: req.body.employee_id})
      .then((response) => 
      {
        if(!response){
          res.json({msg : "No Data"})
        }else{
          res.json(response)
        }
      }
       )
      .catch((e) => res.status(400).json(e))
})

router.post('/profile-links-edit', protect, (req,res) => {
  
  function validateLinks(links)
  {
    const JoiLinkSchema = Joi.object({
        employee_id: Joi.number().required(),
        websiteUrl : Joi.string().required(),
        githubUrl: Joi.string().required(),
        twitterUrl: Joi.string().required(),
        instagramUrl: Joi.string().required(),
        facebookUrl: Joi.string().required()
    })

    return JoiLinkSchema.validate(links)
  }
  const resultLink = validateLinks(req.body.data)
    if(resultLink.error)
    {  
      res.status(400).json({Errordetails :resultLink.error.details})
    }else{
      ProfileLinks.find({employee_id: req.body.data.employee_id})
      .then((response) => 
          {
            if(!response.length){
              ProfileLinks.create({employee_id : req.body.data.employee_id, websiteUrl: req.body.data.websiteUrl,githubUrl: req.body.data.githubUrl, twitterUrl: req.body.data.twitterUrl, instagramUrl: req.body.data.instagramUrl, facebookUrl: req.body.data.facebookUrl})
                .then((response) => res.json(response))
                .catch(() => res.status(400).json({ error: 'Unable to Add this detail' }));
            }
            else{
              ProfileLinks.findOneAndUpdate({employee_id : req.body.data.employee_id},{websiteUrl: req.body.data.websiteUrl,githubUrl: req.body.data.githubUrl, twitterUrl: req.body.data.twitterUrl, instagramUrl: req.body.data.instagramUrl, facebookUrl: req.body.data.facebookUrl})  
                .then((response) => res.json(response))
                .catch(() => res.status(400).json({ error: 'Unable to find this detail' }));
            }
          })
        .catch((e) => res.status(400).json(e));
      }
});


export default router
