const APIFeatures = require('../utils/apiFeatures');
const Tour = require('../models/tourModel');
const { createError } = require('../utils/errorHellpers');
const { tourErrors } = require('../consts/errors');

const { TOUR_NOT_FOUND, ALREADY_EXIST } = tourErrors;

const TourService = {
  createTour: async (body) => {
    const duplicatedTour = await Tour.findOne({ name: body.name }).exec();

    if (duplicatedTour) {
      throw createError(409, ALREADY_EXIST);
    }

    const newTour = await Tour.create(body);

    return newTour;
  },

  getTours: async (req) => {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    return tours;
  },

  getTourById: async (tourId) => {
    const tour = await Tour.findById(tourId).lean().exec();

    if (!tour) {
      throw createError(404, TOUR_NOT_FOUND);
    }

    return tour;
  },

  updateTour: async (tourId, updateData) => {
    const updatedTour = await Tour.findByIdAndUpdate(tourId, updateData, {
      new: true,
      runValidators: true,
    })
      .lean()
      .exec();

    if (!updatedTour) {
      throw createError(404, TOUR_NOT_FOUND);
    }

    return updatedTour;
  },

  deleteTour: async (tourId) => {
    const tour = await Tour.findByIdAndRemove(tourId).exec();

    if (!tour) {
      throw createError(404, TOUR_NOT_FOUND);
    }
  },

  getToursStats: async () => {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          ratingsNum: { $sum: '$ratingsQuantity' },
          toursNum: { $sum: 1 },
          avgRating: { $avg: '$ratingAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 }, //* 1 для по зростанню
      },
    ]);

    return stats;
  },

  getMonthlyPlan: async (year) => {
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          toursNum: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { toursNum: -1 },
      },
      // {
      //   $limit: 12
      // }
    ]);

    return plan;
  },
};

module.exports = TourService;
