const express = require('express');
const router = express.Router();

const blogController = require('../controllers/BlogController');

router.get('/', blogController.getMainPage)
router.get('/create', blogController.getCreateBlog);
router.post('/create', blogController.postCreateBlog)
router.get('/edit/:id', blogController.getEditBlog);
router.post('/edit/:id', blogController.postEditBlog)
router.get('/view/:id', blogController.getViewBlog)
router.delete('/delete/:id', blogController.postDeleteBlog)
router.get('*', blogController.get404);

module.exports = router;