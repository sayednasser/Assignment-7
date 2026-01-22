import { Router } from "express";
import { deleteUserByID, getAllPost, getAllPostAndCountComment, signup } from "./post.service.js";
const router = Router();
router.post("/signup", async (req, res, next) => {
  const post = await signup(req.body);
  return res.status(201).json({ message: "post Created Successfully", post });
});
router.delete("/:id", async (req, res, next) => {
  const {id} = req.params;
  const {userid} = req.body; 
  if (!userid) {
    return res.status(400).json({ message: "userId is required in body" });
  }
  const deletePost = await deleteUserByID({ id, userid} );
  return res
    .status(200)
    .json({ message: "post deleted Successfully" });
});
router.get("/details",async(req,res,next)=>{
  const getPost=await getAllPost(req.body)
  return res.status(200).json({getPost})

});
router.get("/comment-count",async(req,res,next)=>{
  const getPost=await getAllPostAndCountComment(req.body)
  return res.status(200).json({getPost})

})

export default router;
