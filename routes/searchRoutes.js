const express = require("express");
const router = express.Router();

const model = require("../models/placeModel");

router.get("/search",(req,res)=>{

 const q = req.query.q;

 model.searchPlaces(q,(err,data)=>{
  if(err) return res.json(err);
  res.json(data);
 });

});

router.get("/history",(req,res)=>{

 const db = require("../config/db");

 const sql = "SELECT * FROM seattle_history";

 db.query(sql,(err,data)=>{

  if(err) return res.json(err);

  res.json(data);

 });

});

router.get("/autocomplete",(req,res)=>{

 const q = req.query.q;

 model.autoComplete(q,(err,data)=>{
  if(err) return res.json(err);
  res.json(data);
 });

});

module.exports = router;