import express from "express";
import upload from "../middleware/upload.js"; // check path
import { createVolunteer, getAllVolunteers ,deleteVolunteer,updateVolunteer,searchVolunteers,getPending,getApproved,acceptVolunteer,rejectVolunteer} from "../controllers/volunteerController.js";

const router = express.Router();

// ✅ Submit Form
router.post("/create", upload.single("cv"), createVolunteer);// ✅ Admin View
router.get("/all", getAllVolunteers);

// ✅ DELETE ROUTE
router.delete("/:id", deleteVolunteer);

router.put("/:id", updateVolunteer);
//new serch route
router.get("search" ,searchVolunteers);
router.get("/pending", getPending);
router.get("/approved", getApproved);
router.put("/accept/:id", acceptVolunteer);
router.delete("/reject/:id", rejectVolunteer);

export default router;