const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  };

  // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  user.pin = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, pin } = req.body;

  // 1) Check if username and pin  exists
  if (!username || !pin) {
    return next(new AppError('Please provide a username and pin', 400));
  }

  // 2) Check if user exists && pin is correct
  const user = await User.findOne({ username: username }).select('+pin');

  if (!user || !(await user.correctPin(pin, user.pin))) {
    return next(new AppError('Incorrect username or pin!', 401));
  }

  // 3) If everything ok, send token to client
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.loginAdmin = catchAsync(async (req, res, next) => {
  const { username, pin } = req.body;

  // 1) Check if username and pin  exists
  if (!username || !pin) {
    return next(new AppError('Please provide an username and pin', 400));
  }

  // 2) Check if user exists && pin is correct
  const user = await User.findOne({ username: username }).select('+pin');

  if (user.role !== 'admin') {
    return next(new AppError('Please login as admin.', 401));
  }

  if (!user || !(await user.correctPin(pin, user.pin))) {
    return next(new AppError('Incorrect username or pin!', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});

exports.verifylogin = catchAsync(async (req, res, next) => {
  const { securityAnswer } = req.body;

  // 1) Check if username and pin  exists

  // 2) Check if user exists && pin is correct
  const user = await User.findOne({ securityAnswer: securityAnswer });

  if (!user) {
    return next(new AppError('Your provided answer is incorrect', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it exists

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // if (req.headers.cookie && req.headers.cookie.startsWith('jwt')) {
  //   token = req.headers.cookie.split('=')[1];
  // }

  if (!token) {
    return next(
      new AppError('You are not logged in, please login to get access.', 401)
    );
  }
  // 2) Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token noLonger exists.', 401)
    );
  }

  // 4) Check if user changed password after token was issued
  if (currentUser.changedPinAfterJwt(decoded.iat)) {
    return next(
      new AppError('User recently changed password. please login again.', 401)
    );
  }

  // 5) Grant access to protected route.
  req.user = currentUser;
  next();
});

exports.logout = (req, res) => {
  const token = 'loggedout';
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 10 * 100),
  });
  res.status(200).json({ status: 'success', token });
};

exports.loggedIn = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there

  if (!req.body.jwt) {
    return next(
      new AppError('You are not logged in, please login to continue', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(
    req.body.jwt,
    process.env.JWT_SECRET
  );

  // 3) Check if user still exist
  const freshUser = await User.findById(decoded.id);

  if (!freshUser) {
    return next(new AppError('Unathorized', 401));
  }

  if (freshUser.securityAnswer !== req.body.securityAnswer) {
    return next(new AppError('Incorrect answer, try again', 401));
  }

  // 4) Check if user changed password after the token was issued
  // if (freshUser.changedPinAfterjwt(decoded.iat)) {
  //   return next(
  //     new AppError('You recently changed password, login to continue', 400)
  //   );
  // }
  res.locals.user = freshUser;

  res.status(200).json({
    status: 'success',
    data: {
      user: freshUser,
    },
  });
});

exports.isLoggedIn = async (req, res, next) => {
  // 1) Getting token and check if it's there
  const jwt = req.rawHeaders[req.rawHeaders.length - 1].split('=')[1];

  // if (req.cookies.jwt) {
  if (jwt) {
    try {
      // 2) Verification token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 3) Check if user still exist
      const freshUser = await User.findById(decoded.id);

      if (!freshUser) {
        return next();
      }

      // 4) Check if user changed password after the token was issued
      if (freshUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }
      // There is a logged in user
      res.locals.user = freshUser;

      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.restictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You are not authorized to perform this action.', 403)
      );
    }
    next();
  };
};

exports.forgotPin = catchAsync(async (req, res, next) => {
  // 1) Get user with posted username
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return next(new AppError('Username entered does not exist.', 404));
  }
  // 2) Generate random reset token
  const resetToken = user.createPinResetToken();

  await user.save({ validateBeforeSave: false });

  // 3) Send it to users email
  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/reset-pin/${resetToken}`;

    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'pin reset url sent to email!',
    });
  } catch (err) {
    user.pinResetToken = undefined;
    user.pinResetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email, try again later!',
        500
      )
    );
  }
});

exports.resetPin = catchAsync(async (req, res, next) => {
  // 1) Get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    pinResetToken: hashedToken,
    pinResetTokenExpires: { $gt: Date.now() },
  });
  // 2) If token has not expired and there is user, set the new pin
  if (!user) {
    return next(new AppError('Token is invalid or has expired.', 400));
  }

  user.pin = req.body.pin;
  user.pinConfirm = req.body.pinConfirm;
  user.pinResetToken = undefined;
  user.pinResetTokenExpires = undefined;

  await user.save({ validateBeforeSave: false });
  // 3) update changedPinAt property for the user
  // 4) Log the user in, send jwt
  createSendToken(user, 200, req, res);
});

exports.updatePin = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user._id).select('+pin');
  // 2) Check if posted current pin is correct
  if (!(await user.correctPin(req.body.pinCurrent, user.pin))) {
    return next(new AppError('Your current password is wrong.', 401));
  }
  if (req.body.pin !== req.body.pinConfirm) {
    return next(
      new AppError('Your new pin and confirm new pin are not the same', 401)
    );
  }
  // 3) If correct, update pin
  user.pin = req.body.pin;
  user.pinConfirm = req.body.pinConfirm;
  await user.save({ validateBeforeSave: false });

  // 4) log user in, send jwt
  createSendToken(user, 200, req, res);
});

exports.sendTransferCode = catchAsync(async (req, res, next) => {
  // Get user
  const user = await User.findById(req.user._id);

  // Add token to User
  const code = user.createTransferToken();
  await user.save({ validateBeforeSave: false });

  // send Email with the code to client
  try {
    await new Email(user, code).sendTransferToken();
  } catch (err) {
    user.transferToken = undefined;
    user.transferTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error processing your transaction, try again!',
        500
      )
    );
  }

  res.status(200).json({
    status: 'success',
    message: 'Transfer token sent to email!',
  });
});

exports.localTransfer = catchAsync(async (req, res, next) => {
  // 1) Get transaction data from the req obj
  const userData = req.body.userData;
  const receipientData = req.body.receipientData;
  const token = crypto
    .createHash('sha256')
    .update(req.body.token)
    .digest('hex');

  // 2) Get users to be updated
  const user = await User.findOne({
    transferToken: token,
    transferTokenExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new AppError(
        'You submitted an invalid or expired token. Token is only valid for 10 mins.',
        401
      )
    );
  }

  const receipient = await User.findOne({
    accountNumber: userData.account,
  });

  if (!receipient) {
    return next(
      new AppError('There account number you entered is incorrect!', 401)
    );
  }
  const userCurrentBalance = user.balance * 1;
  const receipientIncoming = receipientData.amount * 1;
  const userOutgoing = userData.amount * 1;

  if (userCurrentBalance - userOutgoing < 0) {
    return next(
      new AppError(
        'You do not have sufficient funds to complete this transfer!',
        400
      )
    );
  }

  const userNewBalance = user.balance - userOutgoing;
  const receipientNewBalance = receipient.balance + receipientIncoming;

  // 3) Update debited user
  user.balance = userNewBalance;
  user.transactions.push(userData);
  user.transferToken = undefined;
  user.transferTokenExpires = undefined;
  await user.save({ validateBeforeSave: false });

  // 4 Update receipient (credited user)
  receipient.balance = receipientNewBalance;
  receipient.transactions.push(receipientData);
  receipient.save({ validateBeforeSave: false });

  // 5) Send Alerts to users

  res.status(200).json({
    status: 'success',
    message: 'Transfered successfully!',
  });
});

exports.IntTransfer = catchAsync(async (req, res, next) => {
  // 1) Get transaction data from the req obj
  const userData = req.body.userData;
  const token = crypto
    .createHash('sha256')
    .update(req.body.token)
    .digest('hex');

  // 2) Get users to be updated
  const user = await User.findOne({
    transferToken: token,
    transferTokenExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new AppError(
        'You submitted an invalid or expired token. Token is only valid for 10 mins.',
        401
      )
    );
  }

  // 3) covert amount from string to number
  const userCurrentBalance = user.balance * 1;
  const userOutgoing = userData.amount * 1;
  const userNewBalance = user.balance - userOutgoing;

  if (userCurrentBalance - userOutgoing < 0) {
    return next(
      new AppError(
        'You do not have sufficient funds to complete this transfer!',
        400
      )
    );
  }

  // 3) Update debited user
  user.balance = userNewBalance;
  user.transactions.push(userData);
  user.transferToken = undefined;
  user.transferTokenExpires = undefined;
  await user.save({ validateBeforeSave: false });

  // 4) Send Alerts to users

  res.status(200).json({
    status: 'success',
    message: 'Transfered successfully!',
  });
});
