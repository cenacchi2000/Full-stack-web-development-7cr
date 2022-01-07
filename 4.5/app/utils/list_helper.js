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

module.exports.totalLikes = (blogs) =>{
    let bestLikes = 0;
    let bestBlog = {};
    blogs.forEach((item) => {
        if(bestLikes < item.likes){
            bestBlog = item;
        }
    });
    return bestBlog;
}