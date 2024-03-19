import { Router } from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = Router();
const SKILLS_COLLECTION = db.collection("skills");

// Endpoint for getting list of skills

router.get("/", async (req, res) => {
    let results = await SKILLS_COLLECTION.find({}).toArray();
    res.send(results).status(200);
})

// Endpoint for getting a single skill by id
router.get("/:id", async (req, res) => {
    let query = { _id: new ObjectId(req.params.id)};
    let results = await SKILLS_COLLECTION.findOne(query);

    !results ? res.send("Not Found").status(404) : res.send(results).status(200);
})

// Endpoint for adding a single skill
router.post("/", async (req, res) => {
    try {
        let newSkill = {
            skill: req.body.skill,
            proficiency: req.body.proficiency,
        };

    let results = await SKILLS_COLLECTION.insertOne(newSkill);
    res.send(results).status(201);

    } catch (error) {
        console.error(error);
    }
})

// Endpoint for updating a skill
router.patch("/:id", async (req, res) => {
    try {
        const query = {_id: new ObjectId(req.params.id)};
        const updates = {
            $set: {
                skill: req.body.skill,
                proficiency: req.body.proficiency,
            },
        };

        let results = await SKILLS_COLLECTION.updateOne(query, updates);
        res.send(results).status(201);
        
    } catch (error) {
        console.error(error)
        
    }
})

// Endpoint for deleting a skill
router.delete("/:id", async (req, res) => {
    try {
        const query = {_id: new ObjectId(req.params.id)};

    let results = await SKILLS_COLLECTION.deleteOne(query);
    res.send(results).status(200);    
    } catch (error) {
        console.error(error);
    };
}); 

export default router;
