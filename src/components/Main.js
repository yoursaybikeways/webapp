import { Fragment, useState } from 'react';
import { ProjectMap } from './ProjectMap';
import { Row, Col, Card, Spin } from 'antd';
import { getOr, get, map, filter } from 'lodash/fp';
import { ProjectStatusCard } from './ProjectStatusCard';
import { InfoCard } from './InfoCard';


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
    const [picked, setPicked] = useState(null);
    const pickedProject = getOr({})(0)(filter(
        (p) => p.key === picked,
        getOr([])('projects')(data)
    ));

    const projects = filter(
        (p) => selectedStates.includes(get('state.key', p)),
        getOr([], 'projects', data)
    );

    return (
        <Row>
            <Col flex={4}>
                <Spin spinning={!(dataLoaded && mapLoaded)}>
                    <div style={{height: '100vh', padding: '8px 0px 8px 8px'}}>
                        <ProjectMap data={projects} setMapLoaded={setMapLoaded} setPicked={setPicked} picked={picked}/>
                    </div>
                </Spin>
            </Col>
            <Col flex={1} style={{padding: 8, maxWidth: 300}}>
                <ProjectStatusCard 
                    loading={!dataLoaded} 
                    stateOptions={states}
                    selectedStates={selectedStates}
                    setSelectedStates={setSelectedStates}
                />
                <InfoCard picked={pickedProject} />
            </Col>
        </Row>
    )
};

export { Main };
