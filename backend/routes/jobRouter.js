import express from "express";
import {deleteJob, getMyJobs, getalljobs, postJob, updateJob,getSingleJob} from '../controllers/jobController.js';
import {isAuth} from '../middlewares/auth.js'
const router  = express.Router();

router.get("/getall",getalljobs);
router.post("/post",isAuth,postJob);
router.get("/getmyjobs",isAuth,getMyJobs);
router.put("/update/:id",isAuth,updateJob);
router.delete("/deletejob/:id",isAuth,deleteJob);
router.get("/:id",isAuth,getSingleJob);
export default router;