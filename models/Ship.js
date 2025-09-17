const mongoose = require('mongoose');

const shipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Ship name is required'],
      trim: true,
    },
    dateTime: {
      type: Date,
      required: true,
      default: Date.now,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);


// Consistent serialization: add id, remove _id and __v
shipSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  }
});

const Ship = mongoose.model('Ship', shipSchema);

module.exports = Ship;
