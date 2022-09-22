import { Fragment, useState } from 'react';
import { Map } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import { BASEMAP } from '@deck.gl/carto';
import 'maplibre-gl/dist/maplibre-gl.css';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { Overlay, Pane, Spinner } from 'evergreen-ui';
import { get, getOr, map } from 'lodash/fp';
import { defaultTheme } from 'evergreen-ui/';


const colors = defaultTheme.tokens.colors;


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


function colorToRGBArray(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
}

const getLineColor = (o) => {
    switch (get('properties.state.key', o)) {
        case "draft":
            return colorToRGBArray(colors.gray400);
            break;
        case "open-for-comment":
            return colorToRGBArray(colors.orange500);
            break;
        case "under-review":
            return colorToRGBArray(colors.blue300);
            break;
        case "approved":
            return colorToRGBArray(colors.blue500);
            break;
        case "under-construction":
            return colorToRGBArray(colors.blue700);
            break;
        case "operating":
            return colorToRGBArray(colors.green600);
            break;
        case "superceded":
            return colorToRGBArray(colors.gray200);
            break;
        default:
            return colorToRGBArray(colors.gray900)
    }
}

const ProjectMap = ({loaded, data}) => {
    const [viewState, setViewState] = useState({
        longitude: 151.1,
        latitude: -33.8,
        zoom: 10
    });

    const layerData = {
        type: 'FeatureCollection',
        features: map(projectToGeoJsonFeature, getOr([], 'projects', data))
    }

    const layer = new GeoJsonLayer({
        data: layerData,
        pickable: true,
        lineWidthMinPixels: 3,
        getLineColor: getLineColor
    });
    const [mapLoaded, setMapLoaded] = useState(false);

    const onClick = (info, event) => console.log(info);

    return (
        <Fragment>
            <Overlay isShown={!(loaded && mapLoaded)} shouldCloseOnClick={false}>
                <Pane 
                    style={{display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            height: '100%'}}>
                    <Spinner />
                </Pane>
            </Overlay>
            <Map 
                mapLib={maplibregl}
                mapStyle={BASEMAP.VOYAGER}
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
        </Fragment>
    )
};

export { ProjectMap };
