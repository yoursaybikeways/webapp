import { Fragment, useState } from 'react';
import { Map } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import { BASEMAP } from '@deck.gl/carto';
import 'maplibre-gl/dist/maplibre-gl.css';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { get, getOr, map } from 'lodash/fp';
import { colorOfState, colorToRGBArray } from '../colors';
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


const getLineColor = (picked) => {
    return (o) => {
        if (picked === null) {
            return colorOfState(get('properties.state', o));
        } else if (get('id', o) === picked) {
            return colorToRGBArray("#ff7700");
        } else {
            return colorToRGBArray("#d3d3d3");
        }
    }
}

const getFillColor = (picked) => {
    return (o) => {
        if (picked === null) {
            return colorOfState(get('properties.state', o)).concat([100]);
        } else if (get('id', o) === picked) {
            return colorToRGBArray("#ff7700").concat([100]);
        } else {
            return colorToRGBArray("#d3d3d3").concat([100]);
        }
    }
}

const getLineWidth = (picked) => {
    return (o) => {
        if (picked === null) {
            return 3;
        } else if (get('id', o) === picked) {
            return 5;
        } else {
            return 3;
        }
    }
}

const ProjectMap = ({data, setMapLoaded, setPicked, picked}) => {
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
        getLineColor: getLineColor(picked),
        getLineWidth: getLineWidth(picked),
        getFillColor: getFillColor(picked),
        lineWidthUnits: 'pixels',
        lineCapRounded: true,
        lineJointRounded: true,
    });

    const onClick = (info) => setPicked(getOr(null)('object.id')(info));

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
