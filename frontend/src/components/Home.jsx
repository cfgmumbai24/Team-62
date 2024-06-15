import React, { useState, useEffect } from 'react';
import Tile from "./Tile";
import Navbar from "./Navbar";
import '../css/home.css';

const Home = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('http://localhost:3000/teacherHome');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTeachers(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="teacher">
        {loading && <p>Loading...</p>}
        {error && <p>Error fetching data: {error.message}</p>}
        {!loading && !error && (
          <div>
            <p>Teachers:</p>
            <ul>
              {teachers.map((teacher) => (
                <li key={teacher._id}>{teacher.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Tile />
    </>
  );
};

export default Home;
