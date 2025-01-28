const express = require('express')
const router = express.Router();

const MenuItem = require('./../models/menu')

router.post('/', async (req, res) => {
    try {
        const data = req.body;

        const newItem = new MenuItem(data);

        const savedItem = await newItem.save();
        console.log('data saved');
        res.status(200).json(savedItem);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error" });
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error" });
    }
})

router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste;
        if (taste == "sour" || taste == "sweet" || taste == "spicy") {
            const data = await MenuItem.find({ taste: taste });
            console.log('data fetched');
            res.status(200).json(data);
        } else {
            res.status(404).json({ error: "Invalid taste" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Internal server error" });
    }
})

router.put('/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const updatedItem = await MenuItem.findByIdAndUpdate(id, data, {new: true, runValidators: true});
        if (!updatedItem) {
            res.status(404).json({ error: "Item not found" });
        }
        console.log('data updated');
        res.status(200).json(updatedItem);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error" });
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const id = req.params.id;
        const deletedItem = await MenuItem.findByIdAndDelete(id);
        if (!deletedItem) {
            res.status(404).json({ error: "Item not found" });
        }
        console.log('data deleted');
        res.status(200).json({ message: "Item deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error" });
    }
})

module.exports = router;