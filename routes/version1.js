var express = require('express');
var router = express.Router();

// TODO - Convert the Delete and Update methods to Instance Methods
// - Make Update method more robust

const PostModel = require('../models/posts');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.send('Welcom to my API').status(200);
});

router.get('/all', async (req, res, next) => {
    const allPosts = await PostModel.getAll();
    console.log('all posts are: ', allPosts);
    res.json(allPosts).status(200);
});

router.get('/post/:post_id?', async (req, res, next) => {
    const postId = req.params.post_id;
    const thePost = await PostModel.getById(postId);
    res.json(thePost).status(200);
});

router.get('/post/delete/:post_id?', async (req,res,next) => {
    const postId = req.params.post_id;
    const response = await PostModel.removeEntry(postId);

    if (response.command === "DELETE" && response.rowCount >= 1) {
        res.sendStatus(200);
    }else {
        res.send(`Could not delete Post ID: ${postId}`).status(409);
    }
});

router.post('/post/entry', async (req,res,next) => {
    const {title, content, author_id} = req.body;
    console.log('req.body',req.body);

    const response = await PostModel.createEntry(title, content, author_id);
    if (response.command === "INSERT" && response.rowCount >= 1) {
        res.sendStatus(200)
    } else {
        console.log('err')
        res.send(`Could not add new blog post ${title}`).status(409);
    }
    
});

router.put("/post/update/:post_id?", async (req,res) => {
    const postId = req.params.post_id;
    const {content} = req.body;
    const repsonse = await PostModel.updateEntry(postId, 'content', content); 
    if (response.command ==="UPDATE" && response.rowCount >= 1) {
        res.sendStatus(200);
    }else {
        res.send(`Could not update Post ID ${postId}`.status(409));
    }
    console.log(reponse);
    res.sendStatus(200);
})

module.exports = router;