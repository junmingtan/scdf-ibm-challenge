import React, { useState, useEffect } from 'react';
import { StaticGoogleMap, Marker } from 'react-static-google-map';

import { firebase, config } from '../../config/firebase';


function categorise_type(allAlerts) {
  const categorised_alerts = []

  // Categories: 0 - Fire, 1 - Chemical Spill, 2 - Accidents
  for (let i = 0; i < allAlerts.length; ++i) {
    if (allAlerts[i].type === "fire") {
      categorised_alerts.push({
        location : allAlerts[i].lat + "," + allAlerts[i].lng,
        color : "red",
        label : "F"
      });
    } else if (allAlerts[i].type === "firestation") {
      categorised_alerts.push({
        location : allAlerts[i].lat + "," + allAlerts[i].lng,
        color : "blue",
        label : "S"
      });
    } 
  }
  return categorised_alerts;
}

export default function Map() {
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
              const allAlerts = [];
              snapshot.forEach((doc) => allAlerts.push(doc.data()));

              // Categorise according to alert type
              const categorised_alerts = categorise_type(allAlerts);
              
              // Set the collected array as our state
              setAlerts(categorised_alerts);
          }, (error) => console.error(error));
  };

  if (!alerts) {
    return (
        <div>
            Loading...
      </div>
    )
  }

  return (
    <StaticGoogleMap size="400x500" className="img-fluid" apiKey={config["apiKey"]}>
      {alerts.map(alert => (
        <Marker color={alert.color} label={alert.label} location={alert.location} />
      ))}
    </StaticGoogleMap>
  );
}
