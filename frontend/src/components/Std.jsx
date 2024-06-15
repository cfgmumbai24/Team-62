import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import NotFound from './NotFound';
import '../css/std.css';

const Std = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
const student = [
   {
     _id: "1",
     studentRollNo: "S001",
     level: 1,
     standard: 1,
     teachers: ["teacher1"]
   },
   {
     _id: "2",
     studentRollNo: "S002",
     level: 1,
     standard: 1,
     teachers: ["teacher1"]
   },
   {
     _id: "3",
     studentRollNo: "S003",
     level: 1,
     standard: 2,
     teachers: ["teacher1"]
   }
   // This array can be updated dynamically based on your application's needs
 ];
  const targetStandard = 1; // Example static standard value

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3000/teacherHome'); // Replace with your actual API endpoint
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       setStudents(data);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

   const filteredStudents = student.filter(stu => stu.standard === targetStandard);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error fetching data: {error.message}</p>;
//   }

  return (
    <>
      {filteredStudents.length > 0 ? (
        <div className="students">
          <Grid container spacing={2}>
            {filteredStudents.map((stu) => (
              <Grid item key={stu._id} xs={12} sm={6} md={4}>
                <div>
                  <p>Level: {stu.level}</p>
                  <p>Roll No: {stu.studentRollNo}</p>
                  <p>Standard: {stu.standard}</p>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default Std;
