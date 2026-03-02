const mongoose = require("mongoose");
const Subject = require("./models/Subject");
const Topic = require("./models/Topic");

mongoose.connect("mongodb://127.0.0.1:27017/elearning")
.then(() => console.log("MongoDB Connected for Seeding"));

async function seedData() {

    await Subject.deleteMany({});
    await Topic.deleteMany({});

    const python = await Subject.create({
        name: "Python",
        description: "Learn Python from basics to advanced"
    });

    const web = await Subject.create({
        name: "Web Development",
        description: "Learn HTML, CSS, JS and Backend"
    });

    await Topic.create([
        {
            title: "Introduction to Python",
            content: "Python is a powerful programming language.",
            order: 1,
            subject: python._id
        },
        {
            title: "Python Variables",
            content: "Variables store data values.",
            order: 2,
            subject: python._id
        },
        {
            title: "HTML Basics",
            content: "HTML is used to structure web pages.",
            order: 1,
            subject: web._id
        }
    ]);

    console.log("Demo Data Inserted");
    process.exit();
}

seedData();