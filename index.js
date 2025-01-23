// console.log("rk")
// const http =require("http");
// const express=require("express")
// const app=express()

// const server = http.createServer(app)




// const item=[{
//     id:1,
//     name:"rahul"
// },{
//     id:2,
//     name:"rk"
// }]


// app.get("/",(req,res)=>{
//     const students=[
//         {id:3,name:"rt"}
//     ]
//     res.json(students)
// })

// app.get("/singledata",(req,res)=>{
//    const {id} =  req.query;
//     if(id){
//         const res = item.find((item)=>item.id === Number(id))
//          return res.json(res);
//     }
//     else{
//         return res.json("sutha modu");
//     }
//     res.json(students)
// })


// const PORT=8000
// server.listen(PORT,()=>{
//     console.log(`http://localhost:${PORT}`)
// })
///////////////////////////////



console.log("rk");
const http = require("http");
const mongoose = require('mongoose');

const { v4: uuidv4 } = require('uuid');
const express = require("express");
const app = express();
const PORT = 8000;
app.use(express.json())

const server = http.createServer(app);


const mongoURI = 'mongodb+srv://rahulr2023it:Ds09RLJLw4AMP0Tg@cluster0.mnedt.mongodb.net/test'; // Replace with your MongoDB URI
mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT , ()=>{
      console.log("server is running")
    })
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


  const expenseSchema = new mongoose.Schema({
    id:{type:String,required:true,unique:true},
    title:{type:String,required:true},
    amount:{type:Number,required:true},
  })
  const expenseModel = mongoose.model("expense_tracker" , expenseSchema)


  app.post("/expense" , async(req , res)=>{
    const {title , amount} = req.body;
    const newexpense = new expenseModel({
      id:uuidv4(),
      title: title,
      amount:amount,
    })
  
    const saveexpense = await newexpense.save();
    res.status(200).json(saveexpense);
  })

// app.get("/api/some/:id",async (req , res)=>{
  
//   const {id} = req.params;  // find by title
//   //const user = await User.findOne({ email });
//   const data = await expenseModel.deleteOne({id});
//   console.log(data);
//   // if(data){

//   //   // data.title="summa";  // to update and save data in  db
//   //   await data.save();
//   //   console.log(data);
//   //   res.json("some")
//   // }
// })

app.get("/api/something",async (req , res)=>{
  const {title , amount} = req.body;
  const newexpense = new expenseModel({
    id:uuidv4(),
    title: title,
    amount:amount,
  })

  const saveexpense = await newexpense.save();
  res.status(200).json(saveexpense);
})



const item = [
  { id: 1, name: "rahul" },
  { id: 2, name: "rk" }
];

// app.get("/", (req, res) => {
//   const students = [{ id: 3, name: "rt" }];
//   res.json(students);
// });



app.get("/summa/:id" ,(req , res)=>{

    const {id} = req.params;

    if(id){

        const resu = item.find((it)=>it.id === Number(id));
console.log(req.body)
        res.json(resu);
    }
    else{
    res.json("hello there")
    }
})

app.get("/datas/:id" , (req , res)=>{

    const {id} = req.params;
    if(id){
        const resul = item.find((it)=>it.id === Number(id));
        if(resul){
        res.json(resul);
        }
    }
})


// Route with parameter in the URL
app.get("/singledata/:id", (req, res) => {
  const { id } = req.params; // Extract `id` from route parameters
  const result = item.find((item) => item.id === Number(id)); // Find the item by ID

  if (result) {
    return res.json(result); // Respond with the found item
  } else {
    return res.status(404).json({ error: "Item not found" }); // Respond if the item does not exist
  }
});



// server.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
