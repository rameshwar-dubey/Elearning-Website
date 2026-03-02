const express = require("express");
const router = express.Router();
const Certificate = require("../models/Certificate");
const Subject = require("../models/Subject");
const { checkAuth } = require("../middleware/auth");

router.get("/certificate/:subjectId", checkAuth, async (req, res) => {

    const cert = await Certificate.findOne({
        user: req.user.id,
        subject: req.params.subjectId
    }).populate("subject");

    if (!cert) return res.redirect("/dashboard");

    res.render("certificate", { cert });
});

module.exports = router;