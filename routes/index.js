import express from 'express'
import db from '../db/conn.js'
import Search from '../models/search.js'

const indexrouter=express.Router()


//..................GET route start................................................................
indexrouter.get("/datas",async(req,res)=>{

    try{
        const get= await Search.find()

        res.status(201).send(get)

        }catch (error) {

        res.status(400).send(error)
    }
})
//..................GET route end..................................................................


//.....................................POST route start..............................................
indexrouter.post("/data",async(req,res)=>{

        try {            
            const record= new Search(req.body)

            const insert= await record.save()

            res.status(201).send(insert)

        } catch (error) {
            res.status(400).send(error)
        }
})
//.....................................POST route end................................................


//.................SEARCH route start................................................................

indexrouter.get("/search",async (req,res,next)=>{
   
try{
         
        let regex= req.query.name
    
        let regex1= req.query.city
              
        if(regex)
        {
        let regex = new RegExp(req.query.city,'i');
        }
        
        else
        {
        let regex1 = new RegExp(req.query.name,'i');
        }
        
    const filterd = await Search.find({ $and: [ { $or: [{name: regex },{city: regex1}]}]})
    
    res.send(filterd);
    
    }catch (error){
    
    res.send(error)
    }
    
    })
//.................SEARCH route end....................................................................


//..............................UPDATE method start....................................................
indexrouter.put("/data/:id",async (req,res)=>{

    try{
    
        const _id= req.params.id;
        
        const update= await Search.findByIdAndUpdate(_id, req.body)
        
        res.status(201).send(update)
    
    }catch(err){
   
    res.status(400).send(err)
                }
    })
//..............................UPDATE method END....................................................


//............................................DELETE route start.....................................
indexrouter.delete("/data/:id",async(req,res)=>{

    try{
     
        const _id= req.params.id

        const del= await Search.findByIdAndDelete(_id)

        res.status(201).send(del)
    }
    catch(err)
    {
        res.status(500).send(err)
    }
})
//............................................DELETE route end.....................................


export default indexrouter