const router = require('express').Router();
let Content= require('../models/content.model');

router.route('/').get((req, res) => {
Content.find()
.then(contents => res.json(contents))
.catch(err => res.status(400).json('ERROR: ' + err));
});

router.route('/add').post((req, res)=>{
    const title= req.body.title;
    const description=req.body.description;
    const duration= Number(req.body.duration);
    const date= Date.parse(req.body.date);

    const newContent = new Content(
        { title,
        description,
        duration,
        date
    });
    newContent.save()
 .then(()=> res.json('Content added!'))
.catch(err => res.status(400).json('ERROR: ' +err));
});

router.route('/:id').get((req, res) => {
    Content.findById(req.params.id)
    .then(contents => res.json(contents))
    .catch(err => res.status(400).json('ERROR: ' + err));
    });


router.route('/:id').delete((req, res) => {
    Content.findByIdAndDelete(req.params.id)
    .then(()=> res.json('Content deleted'))
    .catch(err => res.status(400).json('ERROR: ' + err));
    });

router.route('/update/:id').post((req, res)=>{
    Content.findById(req.params.id)
    .then(contents=>{
        contents.title= req.body.title;
        contents.description= req.body.description;
        contents.duration= Number(req.body.duration);
        contents.date= Date.parse(req.body.date);

    contents.save()
    .then(()=> res.json('Content updated!'))
.catch(err => res.status(400).json('ERROR: ' +err));
})
.catch(err => res.status(400).json('ERROR: ' +err));
});
module.exports = router;