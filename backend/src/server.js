import express from "express";

const app = express()

app.get('/api/1/' , async (req,res ) => {
  res.send("hi")
  

})

app.listen(5000 , () => {
  console.log("App runnign on port 5000")
})
