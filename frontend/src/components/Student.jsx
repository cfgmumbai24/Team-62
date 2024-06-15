import React, { useEffect, useState } from 'react';

const Student = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const getClassAndTeacherStudents = async () => {
            try {
                const response = await fetch('/api/students/by-class-and-teacher', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        classId: '',
                        teacherId: 'yourTeacherId'
                    }),
                });
                const data = await response.json();
                setStudents(data.students);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        getClassAndTeacherStudents();
    }, []);

    return (
        <div>
            {students.map((student) => (
                <div key={student._id}>
                    <p>Level: {student.level}</p>
                    <p>Roll No: {student.studentRollNo}</p>
                    <p>Standard: {student.standard}</p>
                </div>
            ))}
        </div>
    );
};

export default Student;