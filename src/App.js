import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [filter, setFilter] = useState([]);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://bajaj-finserv-backend-21bai10442.onrender.com/bfhl', JSON.parse(jsonInput));
            setResponseData(response.data);
        } catch (error) {
            console.error('Error submitting JSON', error);
        }
    };

    const handleFilterChange = (event, newValue) => {
        setFilter(newValue);
    };

    const filteredResponse = () => {
        if (!responseData) return null;
        let result = [];

        if (filter.includes('Numbers')) {
            result.push(`Numbers: ${responseData.numbers.join(',')}`);
        }
        if (filter.includes('Alphabets')) {
            result.push(`Alphabets: ${responseData.alphabets.join(',')}`);
        }
        if (filter.includes('Highest lowercase alphabet')) {
            result.push(`Highest lowercase alphabet: ${responseData.highest_lowercase_alphabet.join(',')}`);
        }

        return result.join('\n');
    };

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ mb: 2 }}>
                <TextField
                    label="API Input"
                    variant="outlined"
                    fullWidth
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder='Enter JSON'
                />
            </Box>
            <Box sx={{ mb: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                    Submit
                </Button>
            </Box>
            <Box sx={{ mb: 2 }}>
                <Autocomplete
                    multiple
                    options={['Numbers', 'Alphabets', 'Highest lowercase alphabet']}
                    onChange={handleFilterChange}
                    renderInput={(params) => <TextField {...params} variant="outlined" label="Multi Filter" />}
                />
            </Box>
            <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Filtered Response</Typography>
                <pre>{filteredResponse()}</pre>
            </Box>
        </Box>
    );
}

export default App;
