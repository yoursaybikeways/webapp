import { useState } from 'react';
import { Main } from './components/Main';
import 'antd/dist/antd.css';


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

    return <Main dataLoaded={dataState.loaded} data={dataState.data} />
}

export default App;
