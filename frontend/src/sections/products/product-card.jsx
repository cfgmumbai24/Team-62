import React from 'react';
import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ std, students }) => {
  // Calculate number of students in the current class
  const numberOfStudents = students.length;

  return (
    <Link to="/user" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card className="card-style">
        <CardContent>
          <Typography className="title">Std: {std}</Typography>
          {students.map((student, index) => (
            <Typography key={index} className="text">
              Students: {student.numberOfStudents}
            </Typography>
          ))}
        </CardContent>
      </Card>
    </Link>
  );
}

export default ProductCard;
