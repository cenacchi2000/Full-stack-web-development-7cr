module.exports = mongoose => {
    return mongoose.model(
      "users",
      mongoose.Schema(
        {
            name: String,
            username: String,
            password: String
        },
        { timestamps: false }
      )
    );
  };