const express = require("express");
const router = express.Router();

const Subject = require("../models/Subject");
const Topic = require("../models/Topic");
const User = require("../models/User");

const { checkAuth } = require("../middleware/auth");


    // Home page
router.get("/", async (req, res) => {
    const subjects = await Subject.find();
    //res.render("home", { subjects });
    res.json(subjects);
});


        //subject page 
router.get("/subject/:id", checkAuth, async (req, res) => {

    const subject = await Subject.findById(req.params.id);
    const topics = await Topic.find({ subject: subject._id })
                              .sort({ order: 1 });

    res.render("subject", { subject, topics });
});


//Topic page (lock system)
router.get("/topic/:id", checkAuth, async (req, res) => {

    const topic = await Topic.findById(req.params.id);
    const user = await User.findById(req.user.id);

    // topics of same subject in order...
    const topics = await Topic.find({ subject: topic.subject })
                              .sort({ order: 1 });

    const currentIndex = topics.findIndex(t =>
        t._id.toString() === topic._id.toString()
    );

    //  allow directly(for first topic )
    if (currentIndex === 0) {
        return res.render("topic", { topic });
    }

            // to get previous topic
    const previousTopic = topics[currentIndex - 1];

    const isCompleted = user.completedTopics.some(t =>
        t.toString() === previousTopic._id.toString()
    );

    // If previous topic not completed = redirect to quiz
    if (!isCompleted) {
        return res.redirect(`/quiz/${previousTopic._id}`);
    }

        //  show topic
    res.render("topic", { topic });
});


module.exports = router;