const { Schema, model } = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'The tour must have a name'],
      unique: true,
      trim: true,
      maxLength: [30, 'The max length of name is 30 words'],
    },
    slug: {
      type: String,
    },
    duration: {
      type: Number,
      require: [true, 'The tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'The tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'The tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty must be easy or medium or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.0,
      min: [1.0, 'The rating must be above 1.0'],
      max: [5.0, 'The rating must be below 5.0'],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'The tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (value) {
          return value < this.price;
        },
        message: 'Discount ({VALUE}) should be less than price',
      },
    },
    description: {
      type: String,
      trim: true,
    },
    summary: {
      type: String,
      required: [true, 'The tour must have a summary'],
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'The tour must have a imageCover'],
    },
    images: {
      type: [String], //array of strings
    },
    available: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: {
      type: [Date],
    },
    secret: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

module.exports = model('Tour', tourSchema);
