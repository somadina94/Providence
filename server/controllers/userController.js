const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const multer = require('multer');
const sharp = require('sharp');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3-transform');
const Email = require('../utils/email');

aws.config.update({
  accessKeyId: 'AKIAYSBZR4WBA3YNXOXP',
  secretAccessKey: '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',
  region: 'us-east-1',
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'somadina-test-app-bucket',
    shouldTransform: function (req, file, cb) {
      cb(null, /^image/i.test(file.mimetype));
    },
    transforms: [
      {
        key: function (req, file, cb) {
          cb(null, `${file.fieldname}-${req.user._id}-${Date.now()}.jpeg`);
        },
        transform: function (req, file, cb) {
          if (file.fieldname === 'photo') {
            cb(null, sharp().resize(800, 800).jpeg({ quality: 100 }));
          } else {
            cb(null, sharp().jpeg({ quality: 100 }));
          }
        },
      },
    ],
  }),
});

exports.uploadPhoto = upload.fields([{ name: 'photo', maxCount: 1 }]);

exports.createUser = catchAsync(async (req, res, next) => {
  // 1) Check if security answer already exist
  const existingUser = await User.findOne({
    securityAnswer: req.body.securityAnswer,
  });

  if (existingUser) {
    return next(
      new AppError(
        'A user already has that security answer, Please choose another answer.',
        401
      )
    );
  }

  // 2) Create user
  const user = await User.create(req.body);

  // 3) Send welcome email to user
  const url = `${req.protocol}://${req.get('host')}/account`;

  await new Email(user, url).sendWelcome();

  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const query = User.find(req.query);

  const users = await query;

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

exports.getUserById = catchAsync(async (req, res, next) => {
  if (req.params.id.length < 11) {
    return next();
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUserTransaction = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      $push: { transactions: req.body },
    },
    { new: true, runValidators: true }
  );

  if (!user) {
    return next(new AppError('No user found with that account number!', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Transaction added successfully!',
  });
});

exports.reverseTransaction = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id });

  if (!user) {
    return next(new AppError('No user found with that account number!', 404));
  }

  const balance = user.balance * 1;
  const reversed = req.body.amount * 1;
  const newBalance = balance + reversed;

  // update user
  user.balance = newBalance;
  user.transactions.push(req.body);

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'Transaction added successfully!',
  });
});

exports.deleteTransaction = catchAsync(async (req, res, next) => {
  await User.updateOne(
    { _id: req.params.id },
    { $pull: { transactions: { _id: req.body.transId } } },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID!', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const filterObject = (obj, ...allowedFileds) => {
  let newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFileds.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) diable user from being able to update pin
  if (req.body.pin || req.body.pinConfirm) {
    return next(
      new AppError(
        'This route is not for updating pin, please use /updatePin',
        401
      )
    );
  }
  // 2) assign photo to req obj
  if (req.files.photo === undefined) {
    return next(new AppError('You have not selected a photo yet', 401));
  }

  // 2) Filtered out unwanted fields that are not allowed to be updated
  const filteredObj = filterObject(req.body, 'photo');

  // 3) Upload photo
  if (req.files.photo) {
    req.files.photo.forEach((el) => {
      const [photo] = el.transforms;
      filteredObj.photo = photo.location;
    });
  }

  // 3) Update user data
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredObj, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.updateUserByAdmin = catchAsync(async (req, res, next) => {
  // 1) Update user data
  const user = await User.findOne({ _id: req.params.id });
  user.name = req.body.name;
  user.username = req.body.username;
  user.email = req.body.email;
  user.address = req.body.address;
  // user.pin = req.body.pin;
  // user.pinConfirm = req.body.pinConfirm;
  user.status = req.body.status;
  user.role = req.body.role;
  user.phone = req.body.phone;
  user.dateOfBirth = req.body.dateOfBirth;
  user.securityQuestion = req.body.securityQuestion;
  user.securityAnswer = req.body.securityAnswer;
  user.active = req.body.active;
  user.balance = req.body.balance;

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.blockUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({
    status: 'success',
    message: 'Account blocked successfully',
    data: {
      user,
    },
  });
});
