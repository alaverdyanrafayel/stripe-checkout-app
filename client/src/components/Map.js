// @flow

import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

type Props = {
    latitude: number,
    longitude: number,
    width: string,
    height: string,
    zoomControl: boolean
};

const Map = ({
    latitude,
    longitude,
    width,
    height,
    zoomControl = false
}: Props) => {
    const GoogleMapExample = withGoogleMap(props => (
        <GoogleMap
            defaultOptions={{
                // these following 7 options turn certain controls off see link below
                streetViewControl: false,
                scaleControl: false,
                mapTypeControl: false,
                panControl: false,
                zoomControl,
                rotateControl: false,
                fullscreenControl: false
            }}
            defaultCenter={{ lat: latitude, lng: longitude }}
            defaultZoom={10}
            disableDefaultUI
        />
    ));

    return (
        <div>
            <GoogleMapExample
                containerElement={<div style={{ height, width }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
};
export default Map;
