
const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/register", (req, res) => {

  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "INSERT INTO users (username,password) VALUES (?,?)",[username,password],
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

router.post("/login", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    db.query(
      "SELECT * FROM users WHERE username = ?",username,
      (err, results) => {
        if (err) {
          throw err;
        } 
        if(results.length>0) {
            console.log(results[0]);
            if(password == results[0].password) {
                res.send({loggedIn:true , username:username});
            } else {
                res.send({loggedIn:false , message:"incorrect username or password"});
            }
        } else {
            res.send({loggedIn:false, message:"username doesnot exist"});
        }
      }
    );
})


router.get("/search/:username",(req,res) => {
  const search = req.params.username.substring(1);
  if(search !== undefined) {
  db.query(`SELECT * FROM uploads WHERE author like ? `,"%"+search+"%",(err,results) =>{
    if(err) console.error(err);
    else {
      console.log(results);
      res.send(results);
    }
  })
 }
})  

module.exports = router;
