import { Router} from "express";
import { findOrCreate,getCommentByBK,retrieveLast3Comment, retrieveAllComment, signup,updatedCommentByID } from "./comment.service.js";
const router=Router() 
router.post("/signup",async(req,res,next)=>{
const user= await signup(req.body)
return res.status(201).json({message:"comments created",user})
});
router.patch("/:id", async (req, res, next) => {
  const {id} = req.params;
  const {userId,content} = req.body; 
  if (!userId) {
    return res.status(400).json({ message: "userId is required in body" });
  }
  if (!content) {
        return res.status(400).json({ message: "content is required in body" });

  }
  const updateComment = await updatedCommentByID({ id, userId,content} );
  return res
    .status(200)
    .json({ message: "comment updated Successfully", updateComment });
});
router.post("/findOrCreate",async(req,res,next)=>{
const {userId,content,postId} = req.body; 
  if (!userId || !postId || !content) {
      return res.status(400).json({
        message: "userId, postId and content are required",
      }); }
  const user= await findOrCreate({ userId, postId, content }) 
      return res.status(200).json({

      message: user.created? "comment created successfully": "comment already exists",comment: user.comment
});    });

router.get("/newest/:postid",async(req,res,next)=>{
  const{postid}=req.params
const result=await retrieveLast3Comment(postid) 
return  res.json({result})
})

router.get("/search/",async (req,res,next)=>{
      const { content } = req.query; // content=the
    const user =await retrieveAllComment(content)
    return res.status(200).json({user})

})
router.get("/details/:id",async(req,res,next)=>{
  const getComment=await getCommentByBK(req.params)
  return res.status(200).json({getComment})
})
export default router
   