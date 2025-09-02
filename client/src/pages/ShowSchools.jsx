import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ShowSchools.css";

function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    axios.get("/api/getSchools")
      .then(res => setSchools(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="show-schools">
      <h2>Schools</h2>
      <div className="school-list">
        {schools.map((school, index) => (
          <div className="school-card" key={index}>
            <div className="image-wrapper">
              {school.image ? (
                <img src={`/schoolImages/${school.image}`} alt={school.name} />
              ) : (
                <div className="placeholder-img">No Image</div>
              )}
            </div>
            <div className="school-details">
              <h3>{school.name}</h3>
              <p><strong>Address:</strong> {school.address}</p>
              <p><strong>City:</strong> {school.city}</p>
              <p><strong>State:</strong> {school.state}</p>
              <p><strong>Contact:</strong> {school.contact}</p>
              <p><strong>Email:</strong> {school.email_id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowSchools;
