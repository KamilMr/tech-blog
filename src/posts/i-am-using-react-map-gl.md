---
date: 2025-08-22
language: English
title: I am using react-map-gl
subtitle: react-map-gl bridges imperative map controls with React
tags:
  - react
  - mapbox
---

The `react-map-gl` package makes using MapLibre GL JS and Mapbox GL in React easy. What's interesting is how it uses imperative patterns within React's declarative world.

Here maps are imperative - you tell them to "fly to this location" or "zoom to this level." 
## What Is react-map-gl?

`react-map-gl` is  React wrapper for Mapbox GL and MapLibre GL that provides both declarative components and imperative controls.

I think of it as a controlled component that exposes imperative methods. The map state is still managed declaratively, but you can trigger imperative actions like `flyTo()` when needed.

### Basic Map Setup

```jsx
<Map  
    mapboxAccessToken="<Mapbox access token>"  
    initialViewState={{  
        longitude: -122.4,  
        latitude: 37.8,  
        zoom: 14  
    }}  
    style={{width: 600, height: 400}}  
    mapStyle="mapbox://styles/mapbox/streets-v9"  
/>
```

### Adding Data Visualization

```jsx
<Map {...mapProps}>
  <Source id="my-data" type="geojson" data={geoJsonData}>
    <Layer
      id="data-layer"
      type="fill"
      paint={{
        'fill-color': '#088',
        'fill-opacity': 0.8
      }}
    />
  </Source>
</Map>
```

## Some Benefits?

- `<Source>` and `<Layer>` components describe what to render
-  Many methods like `flyTo()` for smooth interactions  
- Works with hooks, state management, and React patterns

- **`<Map>`**: Main container component
- **`<Source>`**: Tells map what data to render
- **`<Layer>`**: Describes how data should be visualized

The pattern works because the map instance handles the heavy rendering while React manages the data flow and user interactions.

The image: 
![map](/images/map.png)

# Links

- [react-map-gl documentation](https://visgl.github.io/react-map-gl/)
- [Mapbox GL JS API](https://docs.mapbox.com/mapbox-gl-js/api/)