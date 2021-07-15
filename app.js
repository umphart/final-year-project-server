const express = require('express');
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

const db = mysql.createPool({
    host: "localhost",
    user:"root", 
    password:"password",
    database:"mydata"
});
 app.use(cors());
 app.use(express.json())
 app.use(express.urlencoded({extended:true}))

 
// get from course table
app.get('/api/get-course', (_req, res) =>{
  const sqlSelect ="SELECT * FROM courselist";
      db.query(sqlSelect, (err, result)=>{
        if (err) return res.status(400).json({err})
        res.status(201).json({result})
   
     })
 })



// get from lecturers table
app.get('/api/get-lecturers', (_req, res) =>{
  const sqlSelect ="SELECT * FROM lecturers";
      db.query(sqlSelect, (err, result)=>{
        if (err) return res.status(400).json({err})
        res.status(201).json({result})
        
          })
 })
 
 // get from computer dept table
app.get('/api/get-dept-comp', (_req, res) =>{
  const sqlSelect ="SELECT * FROM lecturers WHERE dept= 'computer science' ";
      db.query(sqlSelect, (err, result)=>{
        if (err) return res.status(400).json({err})
        res.status(201).json({result})
     })
 })
// get from cyber dept table
app.get('/api/get-dept-cyber', (req, res) =>{
  const sqlSelect ="SELECT * FROM lecturers WHERE dept= 'cyber security' ";
      db.query(sqlSelect, (err, result)=>{
        if (err) return res.status(400).json({err})
        res.status(201).json({result})
     })
 })
 // get from it dept table
app.get('/api/get-dept-it', (req, res) =>{
  const sqlSelect ="SELECT * FROM lecturers WHERE dept= 'information tech' ";
      db.query(sqlSelect, (err, result)=>{
        if (err) return res.status(400).json({err})
        res.status(201).json({result})
     })
 })
//------------------------------------------------------------------------
 // get software dept from lectures courselist  table
 app.get('/api/get-dept-software', (req, res) =>{
  const sqlSelect ="SELECT * FROM lecturers WHERE dept= 'Software Engr' ";
      db.query(sqlSelect, (err, result)=>{
        if (err) return res.status(400).json({err})
        res.status(201).json({result})
     })
 })
//------------------------------------------------------------------------
 app.get('/api/get-leveloneCourse', (req, res) =>{
  const sqlSelect ="SELECT * FROM courselist WHERE level= 'level 100' ";
      db.query(sqlSelect, (err, result)=>{
        if (err) return res.status(400).json({err})
        res.status(201).json({result})
     })
 })
 //------------------------------------------------------------------------
 app.get('/api/get-levelTwoCourse', (req, res) =>{
  const sqlSelect ="SELECT * FROM courselist WHERE level= 'level 200' ";
      db.query(sqlSelect, (err, result)=>{
        if (err) return res.status(400).json({err})
        res.status(201).json({result})
     })
 })
 //------------------------------------------------------------------------
 app.get('/api/get-levelThreeCourse', (req, res) =>{
  const sqlSelect ="SELECT * FROM courselist WHERE level= 'level 300' ";
      db.query(sqlSelect, (err, result)=>{
        if (err) return res.status(400).json({err})
        res.status(201).json({result})
     })
 })
 //------------------------------------------------------------------------
 app.get('/api/get-levelFourCourse', (req, res) =>{
  const sqlSelect ="SELECT * FROM courselist WHERE level= 'level 400' ";
      db.query(sqlSelect, (err, result)=>{
        if (err) return res.status(400).json({err})
        res.status(201).json({result})
     })
 })

//------------------------------------------------------------------------
//get from venue table
app.get('/api/get-venue', (req, res) =>{
  const sqlSelect ="SELECT * FROM venuelist";
      db.query(sqlSelect, (err, result)=>{
        if (err) return res.status(400).json({err})
        res.status(201).json({result})
     })
 })
 //------------------------------------------------------------------------
 // post to  course  table
  app.post('/api/insert-leveloneCourse', (req, res )=>{
    console.log("hittes");    
    const cCode = req.body.cCode;
    const cTitle =  req.body.cTitle;
    const cCore =  req.body.cCore;   
    const level = req.body.level;
    const sqlInsert ="INSERT INTO courselist (cCode, cTitle, cCore, level) VALUES (?,?,?,?)"
    db.query(sqlInsert, [cCode, cTitle, cCore, level], (err , result)=>{
      
      if (err) return res.status(400).json({err})
      res.status(201).json({result})
    });
     
});
//------------------------------------------------------------------------
   
app.post('/api/insert-lecturers', (req, res )=>{
  const name = req.body.name;
  const email =  req.body.email;
  const dept =  req.body.dept;   
   const sqlInsert ="INSERT INTO lecturers (name, email, dept) VALUES (?,?,?)"
 db.query(sqlInsert, [name, email, dept], (err , result)=>{
  if (err) return res.status(400).json({err})
  res.status(201).json({result})

     });
   
});
//------------------------------------------------------------------------
// post to venue table

app.post('/api/insert-venue', (req, res )=>{
  const vName = req.body.vName;
  const vCapacity =  req.body.vCapacity;
   const sqlInsert ="INSERT INTO venuelist (vName, vCapacity) VALUES (?,?)";
  db.query(sqlInsert,[vName, vCapacity],(err, result)=>{
    res.send(result)
  
   });
   
  })
  //------------------------------------------------------------------------
// delete from course table
app.delete("/api/delete-course/:id", (req, res)=>{
   const id = req.params.id

    db.query("DELETE  FROM courselist  WHERE id =?", id, (err, result)=>{
      if (err){
        console.log(err);
      }else{
        res.send(result)
      }
    }) 
})


//------------------------------------------------------------------------
// delete from lecturers table
app.delete("/api/delete-lect/:id", (req, res)=>{
  const id = req.params.id
   db.query("DELETE  FROM lecturers  WHERE id = ?", id, (err, result)=>{
     if (err){
       console.log(err);
     }else{
       res.send("mee")
     }
   }) 
})
//------------------------------------------------------------------------
//delete from venue table
app.delete("/api/delete-venue/:id", (req, res)=>{
 
  const id = req.params.id
  db.query("DELETE FROM venuelist  WHERE id = ?", id, (err , result)=>{
    if (err){
      console.log(err);
    }
}) 
});
app.put("/api/update-course/:id", (req, res)=>{
    let unassignedlect
    let randomLect
    const id = req.params.id
    console.log(id);
    const sqlSelect ="SELECT * FROM courselist WHERE id =?" ;
     db.query(sqlSelect, id, (err, result)=>{
      if (err) return res.status(500).json({err})
      if(result[0].assigned) {
        return res.status(200).json({msg:"course has already been assigned", assigned: 1})
      }
      else {
        const sqlSelect ="SELECT * FROM lecturers";
        db.query(sqlSelect, (err, result)=>{
          unassignedlect = result.filter(lecturer=>{
            return lecturer.assigned != 1
          })
          randomLect = unassignedlect[Math.floor(Math.random()*unassignedlect.length)]
          const lecturerid = randomLect.id
          const sqlUdate ="UPDATE course SET assigned = 1, lecturerid =?  WHERE id =?";
          db.query(sqlUdate, [lecturerid,id], (err , result)=>{
          if (err) {
            return res.status(501).json({err})
          }
          const lctUdate ="UPDATE lecturer SET assigned = 1, assignedCourseId =  WHERE id =?";
          
          res.status(201).json({msg:"course assigned successfully", assigned:0})
        }) 
        })
      }
    })
})
 app.get("/", (err, res)=>{
   res.send("Developing in progress")

 })

  app.listen(9000, ()=>{
    console.log("app..................")
});