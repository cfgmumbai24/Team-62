import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import '../css/tile.css';

const Tile = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Replace this URL with your actual API endpoint
      const response = await fetch('http://localhost:3000/teacherHome');
      const data = await response.json();
      setStudents(data);
    };

    fetchData();
  }, []);

  const numberOfStudents = students.length;

  return (
    <>
      <Link to="/std" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Card className="card-style">
          <CardContent>
            <Typography className="title">STD: 1st</Typography>
            <Typography className="text">Students: {numberOfStudents}</Typography>
          </CardContent>
        </Card>
      </Link>
    </>
  )
}

export default Tile
