const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { BadRequestError, NotFoundError } = require("../errors");

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  return res.status(StatusCodes.CREATED).json(job);
};

const updateJob = async (req, res) => {
  res.send("update job");
};

const getAllJobs = async (req, res) => {
  res.send("get jobs");
};

const getJob = async (req, res) => {
  res.send("get a job");
};

const deleteJob = async (req, res) => {
  res.send("delete job");
};

module.exports = { createJob, updateJob, deleteJob, getJob, getAllJobs };
