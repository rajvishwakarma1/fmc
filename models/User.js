const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Ensure unique index for username
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
}, { timestamps: true });

// Unique index for username
userSchema.index({ username: 1 }, { unique: true });

// Enable autoIndex in development
if (process.env.NODE_ENV !== 'production') {
  mongoose.set('autoIndex', true);
}

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method for password comparison
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Consistent serialization: remove password
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
