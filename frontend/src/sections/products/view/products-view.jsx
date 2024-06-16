import React from "react";
// import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import ProductCard from "../product-card";
import { useState, useEffect } from "react";

export default function ProductsView() {
  // const students = [
  //   { id: 1, className: 'Mathematics', std: '1' },
  //   { id: 2, className: 'History', std: '2' },
  //   { id: 3, className: 'Science', std: '1' },
  //   // Add more classes as needed
  // ];

  // // Create an object to hold unique std and their classes
  // const stdClasses = students.reduce((acc, student) => {
  //   if (!acc[student.std]) {
  //     acc[student.std] = [];
  //   }
  //   // Check if the class already exists for the std
  //   const existingClass = acc[student.std].find(c => c.className === student.className);
  //   if (!existingClass) {
  //     acc[student.std].push({
  //       className: student.className,
  //       numberOfStudents: 1 // Initialize with 1 for the current student
  //     });
  //   } else {
  //     existingClass.numberOfStudents++; // Increment number of students for the existing class
  //   }
  //   return acc;
  // }, {});

  // return (
  //   <Container>
  //     <Typography variant="h4" sx={{ mb: 5 }}>
  //       Classes
  //     </Typography>

  //     <Grid container spacing={3}>
  //       {Object.entries(stdClasses).map(([std, classes]) => (
  //         <Grid key={std} item xs={12} sm={6} md={3}>
  //           <ProductCard std={std} students={classes} />
  //         </Grid>
  //       ))}
  //     </Grid>
  //   </Container>

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const student = [
  //    {
  //      _id: "1",
  //      studentRollNo: "S001",
  //      level: 1,
  //      standard: 1,
  //      teachers: ["teacher1"]
  //    },
  //    {
  //      _id: "2",
  //      studentRollNo: "S002",
  //      level: 1,
  //      standard: 1,
  //      teachers: ["teacher1"]
  //    },
  //    {
  //      _id: "3",
  //      studentRollNo: "S003",
  //      level: 1,
  //      standard: 2,
  //      teachers: ["teacher1"]
  //    }
  //    // This array can be updated dynamically based on your application's needs
  //  ];
  const targetStandard = 1; // Example static standard value

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/teacherHome"); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredStudents = students.filter(
    (stu) => stu.standard === targetStandard
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

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
        <p>Hello</p>
      )}
    </>
  );
}
