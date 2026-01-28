const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { BadRequestError, NotFoundError } = require("../errors");

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  return res.status(StatusCodes.CREATED).json(job);
};

const updateJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
    body: { company, position },
  } = req;

  if (company === "") {
    throw new BadRequestError("Company required");
  }

  if (position === "") {
    throw new BadRequestError("Position required");
  }

  const job = await Job.findOneAndUpdate(
    {
      _id: jobId,
      createdBy: userId,
    },
    req.body,
    { runValidators: true, new: true },
  );

  if (!job) {
    throw new NotFoundError("Invalid job ID");
  }

  res.status(StatusCodes.OK).json({ job });
};

const getAllJobs = async (req, res) => {
  // Getting jobs attached to the user
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ count: jobs.length, jobs });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFoundError(`Invalid job ID`);
  }

  res.status(StatusCodes.OK).send({ job });
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOneAndDelete({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFoundError("Invalid job ID");
  }

  res.status(StatusCodes.ACCEPTED).send({ msg: "Job Posting Deleted" });
};

module.exports = { createJob, updateJob, deleteJob, getJob, getAllJobs };
