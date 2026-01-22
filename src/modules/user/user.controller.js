import { Router } from "express";
import { getUserBYEmail, RetrieveUser, addNewAccount, updateProfile } from "./user.service.js";
const router=Router()

router.post("/signup" ,async (req,res,next)=>{
    const user =await addNewAccount (req.body)
    return res.status(201).json({message:"User Add Successfully",user    })

})

router.put("/:userID" ,async (req,res,next)=>{
    const user =await updateProfile(req.body,req.params.userID)
    return res.status(200).json({message:"User Add Or Updated successfully",user    })

})
router.get("/email/" ,async (req,res,next)=>{
    const user =await getUserBYEmail (req.query)
    return res.status(200).json({user})

})
router.get("/:id" ,async (req,res,next)=>{
    const user =await RetrieveUser(req.params)
    return res.status(200).json({user}) 

})
export default router