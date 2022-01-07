module.exports = mongoose => {
    return mongoose.model(
      "blogs",
      mongoose.Schema(
        {
          title: String,
          author: String,
          url: String,
          likes: Number
        },
        { timestamps: false }
      )
    );
  };