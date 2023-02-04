import { combineReducers } from '@reduxjs/toolkit';
import { reducer as cycleProjectsReducer } from './cycle-project-reducer';

const rootReducer = combineReducers({
    cycleProjects: cycleProjectsReducer,
});

export { rootReducer };
