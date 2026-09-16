// src/pages/JobsByType.jsx
import { useEffect, useState } from "react";
import JobListing from "../components/JobListing";

const JobsByType = () => {
  const [jobs, setJobs] = useState([]);
  const [type, setType] = useState("Full-time");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobsByType = async () => {
      if (!type) return;
      setLoading(true);
      setError("");
      try {
        // Encode for safety in case type has spaces (“Part-time”)
        const res = await fetch(`/api/jobs/type/${encodeURIComponent(type)}`);
        if (!res.ok) throw new Error("Failed to fetch jobs by type");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchJobsByType();
  }, [type]);

  return (
    <div className="jobs-by-type">
      <h2>Jobs by Type</h2>

      <label>
        <span style={{ marginRight: 8 }}>Select job type:</span>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>
      </label>

      <div className="job-list" style={{ marginTop: 16 }}>
        {loading && <p>Loading...</p>}
        {!loading && error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && jobs.length === 0 && <p>No jobs found</p>}
        {!loading &&
          !error &&
          jobs.length > 0 &&
          jobs.map((job) => (
            <JobListing key={job._id || job.id} {...job} />
          ))}
      </div>
    </div>
  );
};

export default JobsByType;