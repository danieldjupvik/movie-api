const mongoose = require('mongoose');

const hideVProperty = (req, res, next) => {
  // Store the original `json` function
  const originalJson = res.json;

  // Override the `json` function to remove `__v` property and change `_id` to `movieId`
  res.json = function (body) {
    const modifyObject = (obj) => {
      if (obj && typeof obj === 'object') {
        if (Array.isArray(obj)) {
          return obj.map((item) => modifyObject(item));
        } else if (obj instanceof mongoose.Document) {
          // Convert Mongoose document to plain JavaScript object, remove __v, and change _id to movieId
          const { __v, _id, ...rest } = obj.toObject();
          return { movieId: _id, ...rest };
        } else {
          const { __v, _id, ...rest } = obj;
          const modifiedObj = Object.fromEntries(
            Object.entries(rest).map(([key, value]) => [
              key,
              modifyObject(value),
            ])
          );
          if (_id) {
            modifiedObj.movieId = _id;
          }
          return modifiedObj;
        }
      } else {
        return obj;
      }
    };

    const cleanedBody = modifyObject(body);
    originalJson.call(res, cleanedBody); // Use the stored `json` function
  };

  next();
};

module.exports = hideVProperty;
