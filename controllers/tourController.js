const TourService = require('../services/tourService');

const createTour = async (req, res) => {
  const newTour = await TourService.createTour(req.body);

  res.status(201).json(newTour);
};

const getTours = async (req, res) => {
  const tours = await TourService.getTours(req);

  res.status(200).json(tours);
};

const getTourById = async (req, res) => {
  const { tourId } = req.params;

  const tour = await TourService.getTourById(tourId);

  res.status(200).json(tour);
};

const updateTour = async (req, res) => {
  const { tourId } = req.params;
  const updateData = req.body;

  const updatedTour = await TourService.updateTour(tourId, updateData);

  res.status(200).json(updatedTour);
};

const deleteTour = async (req, res) => {
  const { tourId } = req.params;

  await TourService.deleteTour(tourId);

  res.status(204).end();
};

const getToursStats = async (req, res) => {
  const stats = await TourService.getToursStats();

  res.status(200).json(stats);
};

const getMonthlyPlan = async (req, res) => {
  const { year } = req.params;
  const stats = await TourService.getMonthlyPlan(Number(year));

  res.status(200).json(stats);
};

module.exports = {
  createTour,
  getTours,
  getTourById,
  updateTour,
  deleteTour,
  getToursStats,
  getMonthlyPlan,
};
