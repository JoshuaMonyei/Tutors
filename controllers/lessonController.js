const Subject = require('../models/subjectModel');
const Lesson = require('../models/lessonModel');
const Category = require('../models/categoryModel');

exports.createLessons = async (req, res) => {
    // check if subject already exists
   try {
       let check = await Category.findOne({name: req.body.category}).populate("subjects");
       const search =  check.subjects.find(({name}) => name == req.body.subject)
        if (!search) {
            res.status(404).json({message: "Subject deoes not exist in this category!"})
        }
        // Retrieving data from the POST request
       else { 
           Lesson.create ({
           name: req.body.name,
           category: req.body.category,
           text: req.body.text,
           subject: req.body.subject       
       }, (err, newLesson => {
           res.status(200).json({message: "New Lesson created", newLesson})}));

       
       Subject.findOne({name: req.body.subject}, (err, subject) => {
           // Add new created subject to the category subjects array field
           subject.lessons.push(lesson);
           subject.save();
       })
    }
   } catch (err) {
       return res.status(500).json({err});
   }
}