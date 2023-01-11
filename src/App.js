import { useState } from 'react';
import { Main } from './components/Main';
import 'antd/dist/antd.css';
//import { Checkbox } from './components/Checkbox';
import { Switch } from './components/Switch';


function App() {

    const [dataState, setDataState] = useState({
        loaded: false,
        data: null
    })

    if (!dataState.loaded) {
        fetch("https://raw.githubusercontent.com/yoursaybikeways/data/main/cycle_projects.json")
            .then((r) => r.json())
            .then((data) => setDataState({loaded: true, data}));
    }

    return <Main dataLoaded={dataState.loaded} data={dataState.data} />
}

export default App;
