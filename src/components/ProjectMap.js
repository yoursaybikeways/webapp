import { Fragment, useState } from 'react';
import { Map } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import { BASEMAP } from '@deck.gl/carto';
import 'maplibre-gl/dist/maplibre-gl.css';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { get, getOr, map } from 'lodash/fp';
import { colorOfState } from '../colors';
import { Spin } from 'antd';


const projectToGeoJsonFeature = (project) => {
    const value = {
        type: 'Feature',
        geometry: get('geometry', project),
        properties: {
            url: get('url', project),
            tags: get('tags', project),
            state: get('state', project),
        },
        id: get('key', project)
    };
    return value;
};


const getLineColor = (o) => colorOfState(get('properties.state', o));

const ProjectMap = ({data, setMapLoaded}) => {
    const [viewState, setViewState] = useState({
        longitude: 151.1,
        latitude: -33.8,
        zoom: 10
    });

    const layerData = {
        type: 'FeatureCollection',
        features: map(projectToGeoJsonFeature, data)
    }

    const layer = new GeoJsonLayer({
        data: layerData,
        pickable: true,
        lineWidthMinPixels: 3,
        getLineColor: getLineColor
    });

    const onClick = (info, event) => console.log(info);

    return (
        <Map 
            mapLib={maplibregl}
            mapStyle={BASEMAP.POSITRON}
            viewState={viewState}
            onLoad={() => setMapLoaded(true)}
        >
            <DeckGL
                viewState={viewState}
                controller={true}
                onViewStateChange={({viewState}) => setViewState(viewState)}
                layers={[layer]}
                onClick={onClick}
                pickingRadius={10}
            />
        </Map>
    )
};

export { ProjectMap };
