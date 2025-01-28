const express = require('express')
const router = express.Router();

const Person = require('./../models/person')

router.post('/', async (req, res) => {
    try {
        const data = req.body;

        const newPerson = new Person(data);

        const savedPerson = await newPerson.save();
        console.log('data saved');
        res.status(200).json(savedPerson);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error" });
    }
})

// Get to get person
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error" });
    }
})

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == "manager" || workType == 'waiter') {
            const data = await Person.find({ work: workType });
            console.log('data fetched');
            res.status(200).json(data);
        } else {
            res.status(404).json({ error: "Invalid work type" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server Error" });
    }
})

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedPerson = await Person.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true //run Mongoose validations
        });
        if (!updatedPerson) {
            res.status(404).json({ error: "Person not found" });
        }
        console.log('data updated');
        res.status(200).json(updatedPerson);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error" });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPerson = await Person.findByIdAndDelete(id);
        if (!deletedPerson) {
            res.status(404).json({ error: "Person not found" });
        }
        console.log('data deleted');
        res.status(200).json({ message: "Person deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error" });
    }
})

// new comment
module.exports = router; 