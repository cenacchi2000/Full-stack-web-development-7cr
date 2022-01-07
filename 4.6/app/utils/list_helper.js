module.exports.dummy = (blogs) =>{
    console.log(blogs);
    return 1;
}

module.exports.totalLikes = (blogs) =>{
    let likes = 0;
    blogs.forEach((item) => {
        likes += item.likes
    });
    return likes;
}

module.exports.favoriteBlog = (blogs) =>{
    let bestLikes = 0;
    let bestBlog = {};
    blogs.forEach((item) => {
        if(bestLikes < item.likes){
            bestBlog = item;
        }
    });
    return bestBlog;
}

module.exports.mostBlogs = (blogs) =>{
    let totalBlog = 0;
    let sortBlog = [];
    let mostBlog = {};
    blogs.forEach((item) => {
        if(typeof sortBlog[item.author] === 'undefined') {
            sortBlog[item.author] = {}

            sortBlog[item.author] = {
                author: item.author,
                blogs: 1
            }
        }
        else {
            let author_blog = sortBlog[item.author].blogs;
            sortBlog[item.author] = {
                author: item.author,
                blogs: 1+author_blog
            }
        }
        
        if(totalBlog < sortBlog[item.author].blogs){
            mostBlog = sortBlog[item.author];
        }
    });
    return mostBlog;
}