const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
    minlength: 4,
    maxlength: 16,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  accountNumber: {
    type: Number,
    default: Math.floor(
      Math.random() * (7000000000 - 6000000000 + 1) + 6000000000
    ),
    unique: true,
  },
  balance: {
    type: Number,
    default: 0.0,
  },
  photo: {
    type: String,
    default:
      'https://somadina-test-app-bucket.s3.amazonaws.com/photo-6358362cb655b3c2e786229b-1667852419239.jpeg',
  },
  transferToken: String,
  transferTokenExpires: Date,
  pin: {
    type: String,
    minlength: 4,
    maxlength: 4,
    default: '0000',
    select: false,
  },
  pinConfirm: {
    type: String,
    minlength: 4,
    maxlength: 4,
    default: '0000',
    validate: {
      validator: function (el) {
        return el === this.pin;
      },
      message: 'Pins are not the same!',
    },
  },
  pinChangedAt: Date,
  pinResetToken: String,
  pinResetTokenExpires: Date,
  address: String,
  status: {
    type: String,
    enum: ['active', 'inactive', 'blocked'],
    default: 'active',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  token: Number,
  phone: String,
  dateOfBirth: Date,
  securityQuestion: String,
  securityAnswer: {
    type: String,
    unique: true,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  transactions: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      transactionType: {
        type: String,
        enum: ['debit', 'credit'],
      },
      transferType: {
        type: String,
        enum: ['Local transfer', 'International transfer'],
      },
      bankName: String,
      description: String,
      name: String,
      account: String,
      status: String,
      amount: Number,
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('pin')) return next();

  this.pin = await bcrypt.hash(this.pin, 12);

  this.pinConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('pin') || this.isNew) return next();

  this.pinChangedAt = Date.now() - 1000;

  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPin = async function (candidatePin, userPin) {
  return await bcrypt.compare(candidatePin, userPin);
};

userSchema.methods.changedPinAfterJwt = function (JWTTimestamp) {
  if (this.pinChangedAt) {
    const changedTimestamp = parseInt(this.pinChangedAt.getTime() / 1000, 10);

    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPinResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.pinResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.pinResetTokenExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.createTransferToken = function () {
  const token = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
  const tokenString = JSON.stringify(token);

  this.transferToken = crypto
    .createHash('sha256')
    .update(tokenString)
    .digest('hex');

  this.transferTokenExpires = Date.now() + 10 * 60 * 1000;

  return tokenString;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
