import express from "express"
import {employerGetAllApplications,
        jobseekerDeleteApplication,
        jobseekerGetAllApplications,
        postApplication
      } from '../controllers/applicationController.js';
import {isAuth} from '../middlewares/auth.js';
const router  = express.Router()

router.get("/jobseeker/getall",isAuth,jobseekerGetAllApplications);
router.get("/employer/getall",isAuth,employerGetAllApplications);
router.delete("/delete/:id",isAuth,jobseekerDeleteApplication);
router.post("/post",isAuth,postApplication)

export default router