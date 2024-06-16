import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";

export default function UserTableRow({ rollNo, level }) {
  const [levelId, setLevel] = useState("");
  const [referenceText, setReferenceText] = useState("");

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/teacherHome/Teacher02"
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch level data");
        }
        const data = await response.json();
        setLevel(data); // Assuming 'levelName' is the field you want to display
      } catch (error) {
        console.error("Error fetching level data:", error);
        setLevel("Error"); // Placeholder or error handling
      }
    };

    fetchLevel();
  }, [level]);

  const handleTestClick = async () => {
    try {
      const response = await fetch("http://localhost:3000/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials in the request
        body: JSON.stringify({ level: "3", langType: "M" }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch reference text");
      }
      const data = await response.json();
      setReferenceText(data); // Assuming your API response has a field 'referenceText'
      console.log("Fetched reference text:", data); // Log the fetched data
    } catch (error) {
      console.error("Error fetching reference text:", error);
      setReferenceText("Error"); // Placeholder or error handling
    }
  };

  return (
    <TableRow hover tabIndex={-1}>
      <TableCell sx={{ paddingLeft: 5 }}>{rollNo}</TableCell>
      <TableCell>{level}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          onClick={handleTestClick}
          sx={{ ml: 20 }} // Add left margin for the button
        >
          Take Test
        </Button>
      </TableCell>
    </TableRow>
  );
}

UserTableRow.propTypes = {
  rollNo: PropTypes.string.isRequired,
  levelId: PropTypes.string.isRequired,
};
