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