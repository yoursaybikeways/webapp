import { useState } from 'react';
import { Main } from './components/Main';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { cycleProjectsFetch } from './actions/fetch-cycle-projects';
import { get } from 'lodash/fp';


function App() {
    const hasLoaded = useSelector(get(['cycleProjects', 'hasLoaded']));
    const isLoading = useSelector(get(['cycleProject', 'isLoading']));
    const dispatch = useDispatch();
    useEffect(() => {
        if (!(hasLoaded || isLoading)) {
            dispatch(cycleProjectsFetch());
        }
    }, [dispatch, isLoading, hasLoaded]);

    const data = useSelector(get('cycleProjects'));

    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path="/" 
                    element={<Main dataLoaded={hasLoaded && !isLoading} data={data} />}
                />
                <Route 
                    path="/projects/:id" 
                    element={<Main dataLoaded={hasLoaded && !isLoading} data={data} />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
