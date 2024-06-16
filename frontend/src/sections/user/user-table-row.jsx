import { useState } from 'react';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { useRouter } from 'src/routes/hooks';

export default function UserTableRow({
  rollNo,
  level,
}) {
  const [levelValue, setLevelValue] = useState(level || 'paragraph');
  const router = useRouter();

  const handleChange = (event) => {
    setLevelValue(event.target.value);
  };

  const handleTestClick = (e) => {
    // Add your test handling logic here
    router.push(`/exam/${e.id ? e.id : 1}`)
  };

  return (
    <TableRow hover tabIndex={-1}>
      <TableCell sx={{ paddingLeft: 5 }}>{rollNo}</TableCell>
      <TableCell>
        <FormControl fullWidth sx={{ ml: 20, width: 250 }}>
          <Select value={levelValue} onChange={handleChange}>
            <MenuItem value="paragraph">Paragraph</MenuItem>
            <MenuItem value="sentence">Sentence</MenuItem>
            <MenuItem value="words">Words</MenuItem>
            <MenuItem value="character">Character</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
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
  level: PropTypes.string,
};
