const router = require('express').Router();
const { User } = require("../../models")

// ROUTE THAT GETS ALL THE USERS
router.get('/', async (req, res) => {
    try {
        const userData = await User.find();
        res.json(userData);
    } catch (err) {
        res.status(500).json({ error });
    }
})

// ROUTE THAT CREATES A NEW USER
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        res.json(userData);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// ROUTE THAT GETS A SINGLE USER BASED ON USER ID
router.get('/:userId', async (req, res) => {
    try {
        const userData = await User.findOne(
            { _id: req.params.userId }
        );
        res.json(userData);
    } catch (error) {
        res.status(500).json({ error });
    }
})

// ROUTE THAT UPDATES A SINGLE USER
router.put('/:userId', async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true }
        );
        res.json(userData);
    } catch (error) {
        res.status(500).json({ error });
    }
})

// ROUTE THAT DELETES A SINGLE USER BASED ON USER ID
router.delete('/:userId', async (req, res) => {
    try {
        const userData = await User.findOneAndDelete(
            { _id: req.params.userId }
        );
        res.json(userData);
    } catch (error) {
        res.status(500).json({ error })
    }
});

// ROUTE THAT ADDS A FRIEND TO A USER
router.put('/:userId/friends/:friendId', async (req, res) => {
    try {
        let userData = await User.findOneAndUpdate(
            // find the user with the id in the params
            { _id: req.params.userId },
            // add friend to friends array
            { $push: { friends: req.params.friendId } },
        )
        console.log(req.body)
        res.json(userData);
    } catch (error) {
        res.status(500).json({ error })
    }

})

// ROUTE THAT DELETES A FRIEND FROM A USER'S FRIENDS, DONT DELETE THE FRIEND AS A USER THOUGH!
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
        );

        const updatedFriend = await User.findByIdAndUpdate(
            req.params.friendId,
            { $pull: { friends: req.params.id } },
        )
        res.json(updatedFriend && userData);
    } catch (error) {
        res.status(500).json({ error })
    }
});

module.exports = router;
