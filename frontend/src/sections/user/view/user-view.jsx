import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Stack, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../utils';

export default function UserPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [standards, setStandards] = useState([]);
  const [selectedStandard, setSelectedStandard] = useState('');

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('studentRollNo');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/teacherHome/Teacher01');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setStudents(data);
        setError(null);

        // Extract unique standards from students data
        const uniqueStandards = [...new Set(data.map(student => student.standard))];
        setStandards(uniqueStandards);

        // Initialize filteredStudents with all students initially
        setFilteredStudents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleStandardChange = (event) => {
    const selectedStd = event.target.value;
    setSelectedStandard(selectedStd);

    // Filter students based on selected standard
    if (selectedStd === '') {
      setFilteredStudents(students); // Show all students if no standard is selected
    } else {
      const filteredData = students.filter(student => student.standard === selectedStd);
      setFilteredStudents(filteredData);
    }
  };

  const dataFiltered = applyFilter({
    inputData: filteredStudents,
    comparator: getComparator(order, orderBy),
  });

  const rowCount = dataFiltered.length; // Adjust rowCount based on filtered data

  return (
    <Container sx = {{ width: 1100}}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Students</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Student
        </Button>
      </Stack>

      <Card>
        <Stack direction="row" spacing={2} sx={{ p: 2 }}>
          <FormControl fullWidth sx={{ minWidth: 120 }}>
            <InputLabel id="standard-label">Standard</InputLabel>
            <Select
              labelId="standard-label"
              value={selectedStandard}
              onChange={handleStandardChange}
            >
              <MenuItem value="">All</MenuItem>
              {standards.map(std => (
                <MenuItem key={std} value={std}>{std}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset'}}>
            <Table sx={{ Width: "100%" }}>
              <UserTableHead
                rowCount={rowCount} // Pass rowCount based on filtered data
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'studentRollNo', label: 'Roll No.' },
                  { id: 'level', label: 'Level' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {loading ? (
                  <TableEmptyRows height={77} emptyRows={rowsPerPage} />
                ) : (
                  <>
                    {dataFiltered
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((student) => (
                        <UserTableRow
                          key={student._id}
                          rollNo={student.studentRollNo}
                          level={student.level}
                        />
                      ))}
                  </>
                )}
                {error && <TableNoData />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={rowCount} // Adjust count based on filtered data
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
