import React from "react";
import FilterCard from "./FilterCard";
import { motion } from "framer-motion";
import Job from "./Job";
import { useSelector } from "react-redux";

const Jobs = () => {
  // Fetch jobs data from the Redux store
  const {allJobs} = useSelector((state) => state.job); 

  return (
    <div>
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5 flex-col md:flex-row">
          <div className="w-full md:w-1/5">
            <FilterCard />
          </div>
          {allJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {allJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job._id} // Ensure job._id exists
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
