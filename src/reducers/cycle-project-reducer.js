import { createSlice } from '@reduxjs/toolkit';
import { cycleProjectsFetch } from '../actions/fetch-cycle-projects';


const { reducer, actions } = createSlice({
    name: 'cycleProjects',
    initialState: {
        isLoading: false,
        hasLoaded: false,
        projects: [],
    },
    reducers: {},
    extraReducers: {
        [cycleProjectsFetch.pending]: (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        },
        [cycleProjectsFetch.fulfilled]: (state, action) => {
            const projects = action.payload;
            return {
                isLoading: false,
                hasLoaded: true,
                projects,
            }
        },
    }
});

export { reducer, actions };
