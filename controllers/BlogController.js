const Blog = require('../models/Blog');

const MAIN_PAGE = 'main_page.ejs';

const ALERT_BOX_DELETION_TEXT = {
    header:'WARNING',
    title:'Deleting Post!',
    description: 'Deleting a post is permanent. You will not recover it in any way ',
    confirmationText: 'Delete Anyway',
    confirmStyle: 'btn-danger'
}

exports.getMainPage = async (req, res) => {
    const existingBlogs = await Blog.findAll();
    console.log(existingBlogs);
    res.render(MAIN_PAGE, {existingBlogs, alert: ALERT_BOX_DELETION_TEXT});
}

exports.getCreateBlog = (req, res) => {
    res.render('blog.ejs', {siteTitle: 'Create a new Post', action: 'create'});
}

exports.postCreateBlog = async (req, res) => {
    let postContent = req.body
    console.log(postContent);
    await Blog.create({ ...req.body});
    //res.sendStatus(201);
    const existingBlogs = await Blog.findAll();
    res.render(MAIN_PAGE, {existingBlogs, alert: ALERT_BOX_DELETION_TEXT, overlayText: 'New post created!'})
};

exports.getEditBlog = async (req, res) => {
    const post = await Blog.findByPk(Number(req.params.id));
    if(post !== null){
        res.render('blog.ejs', {siteTitle: 'Edit your post', content: 'Holis', action: `edit/${req.params.id}`, post});
    } else {
        const existingBlogs = await Blog.findAll();
        res.render(MAIN_PAGE, {existingBlogs, alert: ALERT_BOX_DELETION_TEXT ,overlayText: 'Post not found...'})
    }
}

exports.postEditBlog =  async (req, res) => {
    await Blog.update({...req.body},       
        {  where: {
        id: req.params.id,
      }});
    const existingBlogs = await Blog.findAll();
    res.render(MAIN_PAGE, {existingBlogs, alert: ALERT_BOX_DELETION_TEXT, overlayText: 'Post Updated!'}) 
}

exports.getViewBlog = async (req, res) => {
    const post = await Blog.findByPk(Number(req.params.id));
    if(post !== null){
        res.render('blog.ejs', {siteTitle: 'Read your post', content: 'Holis', action: 'view', post});
    } else {
    const existingBlogs = await Blog.findAll();
    // show 404 
    res.render(MAIN_PAGE, {existingBlogs, alert: ALERT_BOX_DELETION_TEXT, overlayText: 'Post not found...'})
    }
} 

exports.postDeleteBlog = async (req, res)=>{
    console.log(req.params.id);
    await Blog.destroy({
        where: {
          id: req.params.id,
        },
    });
    res.sendStatus(200);
} 

exports.get404 =  (req, res) => {
    res.status(404).send("<div>404 Not Found</div>");
}