const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/", (req, res) => {

  const title = req.body.title;
  const description = req.body.description;
  const image = req.body.image; 
  const author = req.body.author;
  db.query(
    "INSERT INTO uploads (title,description,image,author) VALUES (?,?,?,?)",[title,description,image,author],
    (err, results) => {
      if (err) {
        throw err;
      } else {
        console.log(results);
        res.send(results);
      }
    }
  );
});

router.get("/",(req,res) => {
  db.query("SELECT * FROM uploads",(err,results)=> {
    if(err) throw err;
    else res.send(results);
  })
});

// router.get("/like",(req,res) => {
//   db.query("SELECT userLiking FROM Likes WHERE userLiking = ? and postId = ?",[userLiking,postId],(err,results) => {
//     if(err) throw err;
//     else {
//       console.log(results);
//     }
//   })
// })

router.post("/like",(req,res) =>{

  const userLiking = req.body.userLiking;
  const postId = req.body.postId;


  if(userLiking === undefined || userLiking == null || userLiking == '') return;
  db.query("SELECT userLiking FROM Likes WHERE userLiking = ? and postId = ?",[userLiking,postId],(err,result) => {
    if(err) throw err;
    if(result.length===0) {
      //  console.log(result);
      db.query("INSERT INTO Likes (userLiKing,postId) VALUES (?,?)",[userLiking,postId], (err,results) => {
        if(err) throw err;
        else {
          db.query("UPDATE uploads SET likes = likes + 1 WHERE id = ?",postId,(err1,result1s)=>{
            if(err1) throw err1;
            console.log("u r liking");
            res.send(result1s);
          })
        } 
      })
     }
  }) 

 
})

router.get("/byUser/:username",(req,res) => {
 
  let author = req.params.username;
  db.query("SELECT * FROM uploads WHERE author = ? ",author,(err,results) =>{ 
     if(err) {
       console.log(err);
     } 
     else res.send(results);
  });
  
})

module.exports = router;


