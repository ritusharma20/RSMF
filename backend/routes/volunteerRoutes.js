import express from "express";
import { createVolunteer, getAllVolunteers ,deleteVolunteer,updateVolunteer,searchVolunteers} from "../controllers/volunteerController.js";

const router = express.Router();

// ✅ Submit Form
router.post("/create", createVolunteer);

// ✅ Admin View
router.get("/all", getAllVolunteers);

// ✅ DELETE ROUTE
router.delete("/:id", deleteVolunteer);

router.put("/:id", updateVolunteer);
//new serch route
router.get("search" ,searchVolunteers);


export default router;