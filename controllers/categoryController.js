const Category = require('../models/categoryModel');

exports.createCategory = async (req, res) => {
    const category = new Category({
        name: req.body.name,
    });
   
    category.save()
       .then((result) => {
            res.status(200).json({ message: 'category created!', result });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
}

exports.fetchSingleCategory = async (req, res) => {
    //GET categories from db
    try {
        const category = await Category.findOne({name: req.params.name}).populate("subjects");
        // return user 
        res.json({
            statusCode: 200,
            message: 'Category gotten successfully',
            category
        })
    } catch (err) {
        res.status(500).json({message: "Request not successful"});
    }
    
}

exports.fetchCategorySubject = async (req, res) => {
    // destructuring the category name and subject Id from request parameters
    const {name, subjectId} = req.params
    try {
        const categoryName = await Category.findOne({ name: name}).populate("subjects");
        if (!categoryName) {
            return res.status(404).json({message: 'Category does not exist'})
        }

        // find requested subject from its category array
        const search =  await categoryName.subjects.find(({_id}) => _id == subjectId)

        res.json({
            statusCode: 200,
            message: 'Category gotten successfully',
            search
        })

    
    } catch (err) {
         return res.status(500).json({message: "Query Incorrect", err})
    }
    
    }
