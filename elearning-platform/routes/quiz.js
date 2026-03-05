const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const Topic = require("../models/Topic");
const User = require("../models/User");
const Certificate = require("../models/Certificate");
const { checkAuth } = require("../middleware/auth");
const { v4: uuidv4 } = require("uuid");

router.get("/quiz/:topicId", checkAuth, async (req, res) => {

    const quiz = await Quiz.findOne({ topic: req.params.topicId });
    res.render("quiz", { quiz });
});


router.post("/quiz/:topicId", checkAuth, async (req, res) => {

    const quiz = await Quiz.findOne({ topic: req.params.topicId });
    if (!quiz) {
        return res.send("Quiz not found");
    }
    const user = await User.findById(req.user.id);
    const topic = await Topic.findById(req.params.topicId);

    let score = 0;

    quiz.questions.forEach((q, index) => {
        if (req.body[`q${index}`] == q.answer) {
            score++;
        }
    });

    // Passing marks = 6
    if (score >= 0) {

        if (!user.completedTopics.includes(topic._id)) {
            user.completedTopics.push(topic._id);
            await user.save();
        }

         //  Check if all topics of subject completed
        const allTopics = await Topic.find({ subject: topic.subject });

        const completedCount = allTopics.filter(t =>
            user.completedTopics.includes(t._id)
        ).length;

        if (completedCount >= 1) {

            const existingCert = await Certificate.findOne({
                user: user._id,
                subject: topic.subject
            });

            if (!existingCert) {
                await Certificate.create({
                    user: user._id,
                    subject: topic.subject,
                    certificateId: uuidv4()
                });
            }

            return res.redirect(`/certificate/${topic.subject}`);
        }

        return res.redirect(`/topic/${topic._id}`);
    }

    res.send("You failed. Please retry quiz.");
});

module.exports = router;