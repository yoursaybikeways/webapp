import { useState } from 'react';
import { Pane } from 'evergreen-ui';
import { ProjectMap } from './components/ProjectMap';


function App() {

    const [dataState, setDataState] = useState({
        loaded: false,
        data: null
    })

    if (!dataState.loaded) {
        fetch("cycle_projects.json")
            .then((r) => r.json())
            .then((data) => setDataState({loaded: true, data}));
    }

    return (
        <Pane width="100vw" height="100vh" position="absolute">
            <ProjectMap loaded={dataState.loaded} data={dataState.data} />
        </Pane>
    );
}

export default App;
