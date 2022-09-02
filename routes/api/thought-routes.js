
const router = require('express').Router();
const { Thought, Reaction } = require('../../models')

// ROUTE TO GET ALL THOUGHTS
router.get('/', async (req, res) => {
    try {
        let thoughtData = await Thought.find();
        res.json(thoughtData);
    } catch (error) {
        res.status(500).json({ error });
    }
})

// ROUTE TO CREATE A NEW THOUGHT
router.post('/', async (req, res) => {
    try {
        let thoughtData = await Thought.create(req.body);
        res.json(thoughtData);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// ROUTE TO GET SINGLE THOUGHT BASED ON THOUGHT ID
router.get('/:thoughtId', async (req, res) => {
    try {
        let thoughtData = await Thought.findOne(
            { _id: req.params.thoughtId });

        res.json(thoughtData);
    } catch (error) {
        res.status(500).json({ error });
    }
})

// ROUTE TO UPDATE A THOUGHT
router.put('/:thoughtId', async (req, res) => {
    try {
        let thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        );
        res.json(thoughtData);
    } catch (error) {
        res.status(500).json({ error });
    }

})

// ROUTE TO DELETE A THOUGHT BASED ON THOUGHT ID
router.delete('/:thoughtId', async (req, res) => {
    try {
        let thought = await Thought.findOneAndDelete(
            { _id: req.params.thoughtId },
        );
        res.json(thought);
    } catch (error) {
        res.status(500).json({ error });
    }

});

// ROUTE TO ADD REACTION TO A THOUGHT
router.post('/:thoughtId/reactions', async (req, res) => {
    try {

        let newReaction = await Reaction.create(req.body);

        let thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: newReaction._id } },
        )

        res.json(thought);

    } catch (error) {
        res.status(500).json({ error });
    }
});

// ROUTE TO DELETE A REACTION ON A THOUGHT
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        let thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: req.params.reactionId } },
        )

        res.json('delete successful');
    } catch (error) {
        res.status(500).json({ error });
    }

})

module.exports = router;
