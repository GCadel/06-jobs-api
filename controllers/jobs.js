const createJob = async (req, res) => {
  res.send("create job");
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
