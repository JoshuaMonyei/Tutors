const Subject = require('../models/subjectModel');
const Lesson = require('../models/lessonModel');
const Category = require('../models/categoryModel');

exports.createLessons = async (req, res) => {
    // check if subject already exists
    let check = await Category.findOne({name: req.body.category}).populate("subjects");
    if (!check) {
        return res.status(404).json({message: "Category deoes not exist!"})
    }
    const search =  check.subjects.find(({name}) => name == req.body.subject)
    if (!search) {
        return res.status(404).json({message: "Subject deoes not exist in this category!"})
        
    }
    // Retrieving data from the POST request
    const lesson = new Lesson({
        name: req.body.name,
        category: req.body.category,
        subject: req.body.subject,
        content: req.body.content
    });

    lesson.save()
    .then((savedLesson) => {
        res.status(200).json({message: "New lesson created", savedLesson})  
    })
    .catch((error) => {
        res.status(500).json({message: "Error saving lesson", error });  
    })
    Subject.findOne({name: lesson.subject}, (err, subject) => {
        // Add new created subject to the category subjects array field
        subject.lessons.push(lesson);
        subject.save();
    })
}

exports.fetchLessons = async (req, res) => {
    Lesson.find({}, (err, lessons) => {
        if (err) {
            return res.status(500).json({message: 'Request not successful', err})
        } else {
            return res.status(200).json({lessons})
        }
    })  
}

exports.fetchSingleLesson = async (req, res) => {
    Lesson.findOne({_id: req.params.lessonId}, (err, lesson) => {
        if (!lesson) {
            return res.status(404).json({message: "Lesson with the requested ID does not exist"})
        }
        if (err) {
            return res.status(500).json({message: "Request not successful", err});
        }
        else {
            return res.status(200).json({lesson})
        }


    })
}

exports.updateSingleLesson = async (req, res) => {
    Lesson.findByIdAndUpdate(req.params.lessonId, {
        name: req.body.name,
        category: req.body.category,
        subject: req.body.subject,
        content: req.body.content
    }, (err, lesson) => {
        if (!lesson) {
            return res.status(404).json({message: 'Lesson with the ID does not exist'})
        }
        else if (err) {
            return res.status(500).json({message: err})
        }
        else {
            lesson.save((err, savedLesson) => {
                if (err) {
                    return res.status(500).json({message: err})
                } else {
                    return res.status(200).json({message: 'Lesson updated successfully', savedLesson})
                }
            }) 
        }  
    })
}

exports.deleteSingleLesson = function (req, res) {
    Subject.findByIdAndDelete(req.params.lessonId, (err, lesson) => {
        if (!lesson) {
            return res.status(404).json({message: 'Lesson was not found'})
        }
        else if (err) {
            return res.status(500).json({message: err})
        }
        else {
            return res.status(202).json({message: 'Lesson deleted successfully'})
        }
    })
}