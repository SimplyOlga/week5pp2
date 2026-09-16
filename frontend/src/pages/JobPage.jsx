import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const JobPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  const deleteJob = async (id) => {
      try {
      const response = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });
      if (!response.ok) {
        throw new Error("Failed to delete the job");
      }

      console.log("Job deleted successfully"); 

    } catch (error) {
    console.error("Error deleting job:", error.message);
  }
};



  useEffect(() => {
    const fetchJob = async() => {
      const res = await fetch(`/api/jobs/${id}`)
      const data = await res.json();
      setJob(data)
      
    }; fetchJob();
  })

  if (!job) {
    return <div>Loading...</div>;
  }


  const onDeleteJob = () => {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (!confirm) return;
    deleteJob(id);
    navigate("/");
  };


  return (
    <div className="job-details">
      <h2>{job.title}</h2>
      <p>Type: {job.type}</p>
      <p>Description: {job.description}</p>
      <p>Company: {job.company.name}</p>
      <p>Contact Email: {job.company.contactEmail}</p>
      <p>Contact Phone: {job.company.contactPhone}</p>
      <p>Location: {job.location}</p>
      <p>Salary: {job.salary}</p>
      <p>Posted Date: {job.postedDate}</p>
      <Link to={`/edit-job/${id}`}>
        <button>Edit Job</button>
      </Link>
      <button onClick={onDeleteJob}>Delete Job</button>
    </div>
  ); 
};

export default JobPage; 

