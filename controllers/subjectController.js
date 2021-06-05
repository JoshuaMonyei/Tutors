const Subject = require('../models/subjectModel');
const Category = require('../models/categoryModel');



exports.createSubjects = async (req, res) => {
     // check if subject already exists
    try {
        let check = await Category.findOne({name: req.body.category}).populate("subjects");
        const search =  check.subjects.find(({name}) => name == req.body.name)
            if (search) {
                return res.status(404).json({message: "Subject already exists in this category"})
            }
        //  Retrieving data from the POST request
        const subject = new Subject({
            name: req.body.name,
            category: req.body.category,
            isRegistered: req.body.isRegistered
        });
        subject.save()
        .then((savedSubject) => {
            res.status(200).json({message: "New subject created", savedSubject})    
        })
        Category.findOne({name: subject.category}, (err, category) => {
            // Add new created subject to the category subjects array field
            category.subjects.push(subject);
            category.save();
        })
    } catch (err) {
        return res.status(500).json({err});
    }
}

exports.fetchSubject = async (req, res) => {
    try {
        const subject = await Subject.findOne({name: req.params.name}).populate("lessons");
             // return subject
        res.status(200).json({message: 'Subject gotten successfully', subject
        });
       
    } catch (err) {
        res.status(500).json({message: "Request not successful"});
    }   
    
}

exports.updateSingleSubject = function (req, res) {
    Subject.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        category: req.body.category
    }, (err, subject) => {
        if (!subject) {
            return res.status(404).json({message: 'Subject not found'})
        }
        else if (err) {
            return res.status(500).json({message: err})
        }
        else {
            Subject.save((err, savedSubject) => {
                if (err) {
                    return res.status(500).json({message: err})
                } else {
                    return res.status(200).json({message: 'Intern updated successfully', savedSubject})
                }
            }) 
        }  
    })
}


exports.deleteSingleSubject = function (req, res) {
    Subject.findByIdAndDelete(req.params.id, (err, subject) => {
        if (!subject) {
            return res.status(404).json({message: 'Subject was not found'})
        }
        else if (err) {
            return res.status(500).json({message: err})
        }
        else {
            return res.status(202).json({message: 'Subject deleted successfully'})
        }
    })
}