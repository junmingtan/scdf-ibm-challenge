import React, { useState, useEffect } from 'react';
import { StaticGoogleMap, Marker, Path } from 'react-static-google-map';
import { firebase, config } from '../../config/firebase';


  function generateMarkers(locations) {
      const markers = [];

      for (let i=0; i<locations.length; ++i) {
          if (locations[i].type == "fire") {
              markers.push({
                location : locations[i].lat + "," + locations[i].lng,
                anchor : "center",
                iconURL : "http://icons.iconarchive.com/icons/google/noto-emoji-travel-places/48/42697-fire-icon.png"
              })
          } else if (locations[i].type == "firestation") {
            markers.push({
                location : locations[i].lat + "," + locations[i].lng,
                anchor: "bottomright",
                iconURL : "https://www.shareicon.net/data/32x32/2016/07/07/792262_building_512x512.png"
              })
          } else if (locations[i].type == "firetruck") {
            markers.push({
                location : locations[i].lat + "," + locations[i].lng,
                anchor : "center",
                iconURL : "http://icons.iconarchive.com/icons/icons-land/transport/48/FireTruck-icon.png"
              })
          } else if (locations[i].type == "ambulance") {
            markers.push({
                location : locations[i].lat + "," + locations[i].lng,
                anchor : "bottom",
                iconURL : "http://icons.iconarchive.com/icons/google/noto-emoji-travel-places/64/42545-ambulance-icon.png"
              })
          } else if (locations[i].type == "congestion") {
            markers.push({
                location : locations[i].lat + "," + locations[i].lng,
                anchor : "center",
                iconURL : "https://i.imgur.com/okNQgji.png"
              })
          }
      }
      return markers;
  }

  
  export default function LargeMap() {
    const [alerts, setAlerts] = useState(null);
    // Initialize with listening to our
    // messages collection. The second argument
    // with the empty array makes sure the
    // function only executes once
    useEffect(() => {
        listenForAlerts();
    }, []);
  
  
    // Use firestore to listen for changes within
    // our newly created collection
    const listenForAlerts = () => {
        firebase.firestore().collection('stage3_locations')
            .onSnapshot((snapshot) => {
                // Loop through the snapshot and collect
                // the necessary info we need. Then push
                // it into our array
                const locations = [];
                snapshot.forEach((doc) => locations.push(doc.data()));
  
                // Categorise according to alert type
                const categorised_alerts = generateMarkers(locations);
                // Set the collected array as our state
                setAlerts(categorised_alerts);
            }, (error) => console.error(error));
    };

    if (!alerts) {
      return (
          <div>
              Loading Map...
        </div>
      )
    }
  
    return (
      <StaticGoogleMap size="640x600" scale="1" className="img-fluid" apiKey={config["apiKey"]}>
        {alerts.map(alert => (
          <Marker size="tiny" location={alert.location} iconURL={alert.iconURL} anchor={alert.anchor}/>
        ))}
        <Path
            points={[
                '37.860362, -122.266963',
                '37.861407, -122.258985',
                '37.865138, -122.258433',
                '37.865705, -122.253913',
                '37.865935, -122.251351',
                '37.870545, -122.252582',
            ]}
        />      
        <Path
            points={[
                '37.861407, -122.258985',
                '37.861786, -122.253530',
            ]}
            color="red"
        />      
      </StaticGoogleMap>
    );
  }