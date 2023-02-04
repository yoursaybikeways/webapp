import { Fragment, useState } from 'react';
import { ProjectMap } from './ProjectMap';
import { Row, Col, Card, Spin } from 'antd';
import { getOr, get, map, filter, pipe } from 'lodash/fp';
import { ProjectStatusCard } from './ProjectStatusCard';
import { InfoCard } from './InfoCard';
import { BurgerMenu } from './BurgerMenu';
import { Modal } from './Modal';
import { useParams, useNavigate } from 'react-router-dom';


const SideCard = ({loading, children}) => {
    return (
        <Spin spinning={loading}>
            <Card style={{margin: '4px 0px' }}>
                {children}
            </Card>
        </Spin>
    )
};


const states = [
    {"value": "draft", "label": "Draft", "description": "Early designs are available to view"},
    {"value": "open-for-comment", "label": "Open for comment", "description": "The project page has an open survey for community feedback"},
    {"value": "under-review", "label": "Under review", "description": "Community feedback has been collected and designs may be modified accordingly"},
    {"value": "approved", "label": "Approved", "description": "The project has been approved, but yet to be built"},
    {"value": "under-construction", "label": "Under construction", "description": "Construction has begun"},
    {"value": "partially-constructed", "label": "Partially constructed", "description": "Elements of the desgin have been constructed and are operating, but more is yet to come"},
    {"value": "operating", "label": "Operating", "description": "The project has been fully completed and is in use"},
    {"value": "cancelled", "label": "Cancelled", "description": "The project has been cancelled and won't progress further" }
]


const Main = ({dataLoaded, data}) => {
    const [collapsed, setCollapsed] = useState(false);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [selectedStates, setSelectedStates] = useState(
        map(
            (s) => s.value,
            states
        )
    );
    const picked = pipe(
        useParams,
        get('id'),
        parseInt,
        (i) => isNaN(i) ? null : i,
    )();
    const pickedProject = getOr({})(0)(filter(
        (p) => p.key === picked,
        getOr([])('projects')(data)
    ));

    const projects = filter(
        (p) => selectedStates.includes(get('state.key', p)),
        getOr([], 'projects', data)
    );

    const [showInfoModal, setShowInfoModal] = useState(true);
    
    const navigate = useNavigate();
    const setPicked = (id) => id === null ? navigate("/") : navigate(`/projects/${id}`);
    return (
        <div style={{height: '100vh'}}>
            <Spin spinning={!(dataLoaded && mapLoaded)}>
                <div style={{height: '100vh'}}>
                    <ProjectMap data={projects} setMapLoaded={setMapLoaded} setPicked={setPicked} picked={picked}/>
                </div>
            </Spin>
            <BurgerMenu>
                <input type="button" value="help" onClick={() => setShowInfoModal(true)} />
                <ProjectStatusCard 
                    loading={!dataLoaded} 
                    stateOptions={states}
                    selectedStates={selectedStates}
                    setSelectedStates={setSelectedStates}
                />
                <InfoCard picked={pickedProject} />
                <Modal shown={showInfoModal} onOutsideClick={() => setShowInfoModal(!showInfoModal)}>
                    <h1>Yoursaybikeways</h1>
                    <p>Hi! Yoursaybikeways is a very amateur project that has arisen 
                        from an obsession with council cycleway feedback surveys
                        and a desire to see them all laid out on a map. </p>
                    <p>I've organised my trawling of the various feedback websites of the councils 
                        across Sydney into this map. I've drawn the proposed cycleways and tried as
                        best I can to categorise their current state using only the information
                        available on project websites.</p>
                    <h2>How to use it</h2>
                        <p>Each project is shown on the map, colour coded by their state. Each colour can be toggled
                        on or off using the switches in the menu on the left.</p>
                        <p>Clicking on a project on the map selects it, and more details can be seen in the menu
                        on the left.</p>
                        <p>The menu can be hidden and shown so you can see more of the map by clicking the blue pill on its right.</p>
                    <h2>How can I contribute?</h2>
                        <p>I've set up a google form if you think any of the data is out-of-date, or a proejct is missing.
                        You can find that form <a href="https://docs.google.com/forms/d/e/1FAIpQLSd-nRaC-jMttWvNpSFyFDlTSNax85bsKXV3zPqrCvofcQVDDw/viewform?usp=sf_link" target="_blank">here</a>.</p>
                    <input type="button" value="close" onClick={() => setShowInfoModal(false)} />
                </Modal>
            </BurgerMenu>
        </div>
    )
};

export { Main };
