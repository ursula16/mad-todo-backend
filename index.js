import dotenv from 'dotenv';
import express from 'express';
import todoModel from './Schema/schema.js';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
dotenv.config();
//middleware
app.use(cors());
app.use(express.json());

const PORT =  process.env.PORT || 5000;

const db = process.env.DB_URL;
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
.then(() => console.log('Connected to DB'))
.catch(err => console.log(err));
// //get
// app.get('/home',(req,res) => {
//     res.send("welcome fauzia");
// })

// // post

// app.post('/Todo/createTodo',(req,res) => {
//     res.send("to create data in DB");
// })

// //patch
// app.patch('/Todo',(req,res) => {
//     res.send("to update some date in the database");
// })
// //put
// app.put('/Todo',(req,res) => {
//     res.send("to update the entire date in the database");
// })
// //delete
// app.delete('/Todo',(req,res) => {
//     res.send("we are back home");
// })
app.get('/',(req, res) =>{
    res.send('Welcom M.A.D todo backend API');
})
// Get all todos
app.get('/todos',async(req, res) =>{
const allTodos = await todoModel.find({});
if(allTodos){
//sucess
return res.status(200).json({
    message:'Todos fetched successfully',
    data: allTodos
});
}else // error
{
    return res. status(500).json({
        message:'Ooops!, unable to fetch todos'
    });
};
});
// Get all category todos
app.get('/todos/:category',async (req, res)=> {
const {category} = req.params;
const allCategoryTodos = await todoModel.find({})
.where('category').equals(category)
if(allCategoryTodos){
    // success
    return res.status(200).json({
        message: `${category} todos fetched succesfully`,
            data: allCategoryTodos
        });
     } else{

             return res.status(500).json({
                    message:`todos fetched${category} success`,
                    data: allCategoryTodos
                
                })
                    
            }});
                app.post('/todo', async(req, res)=>{
                    const {todoTitle, category} = req.body
                   // const{userName, email, password, address, age}
                    const newTodo = await todoModel.create(
                      //  userName, email, password, address, age,
                      todoTitle,
                      category
                        
                  )
                  if(newTodo){
                    //success
                    return res.status(200).json({
                        message: 'Todo created sucessfully',
                        data:newTodo
                    })
                }else{
                    return res.status(500).json({
                        message:'Error creating newTodo'
                    });

                }
                })
                    
                    // const userSchema = Schema({
                    //     userName:{
                    //         type:String,
                    //         required: true
                    //     },
                    //     address:{
                    //         type: String,
                    //         required:true,
                    //         email:{
                    //             type:String,
                    //             required: true

                    //         },
                    //         age: {
                    //             type: Number,
                    //             required: true
                    //         },
                    //        password: {
                    //            type: String,
                    //            required: true
                    //        } 
                    //     }
                    // })
                    app.delete('/todo/:id',async(req, res)=>{
                        const{id} = req.params;
                        const deletedTodo = await todoModel.findByIdAndDelete(id);
                        if(deletedTodo){
                            //success
                            return res.status(200).json({
                                message:'Todo deleted successfully'

                            })
                        }else{
                            return res.status(500).json({
                                message: 'error deleting Todo'
                            })
                        }
                    })
                   

            
        
    









                    
                






app.listen((PORT), () => {
console.log(`listening on port ${PORT}`);
})
