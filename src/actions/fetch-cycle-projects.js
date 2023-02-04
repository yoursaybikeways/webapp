import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const cycleProjectsIndexFetch = createAsyncThunk(
    'cycleProjectsIndex/fetch',
    async () => {
        const response = await axios.get("https://raw.githubusercontent.com/yoursaybikeways/data/main/cycle_projects/index.json");
        return response.data; 
    }
);

const cycleProjectsFetch = createAsyncThunk(
    'cycleProjects/fetch',
    async () => {
        const response = await axios.get("https://raw.githubusercontent.com/yoursaybikeways/data/main/cycle_projects.json");
        return response.data.projects;
    }
);

const cycleProjectDetailsFetch = createAsyncThunk(
    'cycleProjectDetails/fetch',
    async ({ key }) => {
        const response = await axios.get(`https://raw.githubusercontent.com/yoursaybikeways/data/main/cycle_projects/${key}/details.json`);
        return response.data;
    }
);

const cycleProjectGeometryFetch = createAsyncThunk(
    'cycleProjectGeometry/fetch',
    async ({ key }) => {
        const response = await axios.get(`https://raw.githubusercontent.com/yoursaybikeways/data/main/cycle_projects/${key}/geometry.json`);
        return response.data;
    }
);

export { cycleProjectsFetch };
