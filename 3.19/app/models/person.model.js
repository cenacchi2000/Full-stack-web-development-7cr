module.exports = mongoose => {
    return mongoose.model(
      "persons",
      mongoose.Schema(
        {
          name: String,
          number: Number
        },
        { timestamps: false }
      )
    );
  };