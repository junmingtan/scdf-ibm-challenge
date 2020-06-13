import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';

import { config, firebase } from './config/firebase';

// const rows = [
//   createData(0, '16 Mar, 2019', '16:00:24', '75849603', 'Tupelo, MS', 'Fire'),
//   createData(1, '16 Mar, 2019', '15:56:09', '85937284', 'London, UK', 'Chemical Spill'),
//   createData(2, '16 Mar, 2019', '13:44:59', '19205847', 'Boston, MA', 'Fire'),
//   createData(3, '16 Mar, 2019', '10:20:10', '49503854', 'Gary, IN', 'Medical Emergency'),
//   createData(4, '16 Mar, 2019', '08:46:36', '34845933', 'Long Branch, NJ', 'Medical Emergency'),
// ];

function App() {

  let latitude = 0;
  let longitude = 0;
  let hrate = 0;
  let btemp = 0;
  let pid = 0;
  let pid1 = 0;
  let pid2 = 0;
  let task = "";
  let fatigue = "0%";
  let evalulation = "";
  let report = "";
  const db = firebase.firestore();

  const sendLocation = () => {
    postFiretruckLocation(37.860362, -122.266963);
    setTimeout(() => postFiretruckLocation(37.860684, -122.264522), 2000);
    setTimeout(() => postFiretruckLocation(37.860989, -122.262256), 4000);    
    setTimeout(() => postFiretruckLocation(37.861407, -122.258985), 6000);
    setTimeout(() => postFiretruckLocation(37.863272, -122.258685), 8000);
    setTimeout(() => postFiretruckLocation(37.865138, -122.258433), 10000);
    setTimeout(() => postFiretruckLocation(37.865380, -122.256367), 12000);
    setTimeout(() => postFiretruckLocation(37.865705, -122.253913), 14000);
    setTimeout(() => postFiretruckLocation(37.865935, -122.251351), 16000);
    setTimeout(() => postFiretruckLocation(37.867791, -122.251915), 18000);
    setTimeout(() => postFiretruckLocation(37.869165, -122.252219), 20000);
    setTimeout(() => postFiretruckLocation(37.870545, -122.252582), 22000);
  }

  function postFiretruckLocation(lat, lng) {
    db.collection("stage3_locations").doc("firetruck").set({
      type: "firetruck",
      lat: lat,
      lng: lng
    }).then(function (docRef) {
      console.log("Document written with ID: ");
    }
    );
  }

  const handleClick = () => {
    hrate = document.getElementById("hrate").value;
    btemp = document.getElementById("btemp").value;
    pid1 = document.getElementById("pid1").value;
    task = document.getElementById("task").value;
    fatigue = document.getElementById("fatigue").value;
    getLocation();
  }

  const sendEvaluation = () => {
    evalulation = document.getElementById("evaluation").value;
    pid = document.getElementById("pid").value;
    db.collection("situation").doc(pid).set({
      timestamp: new Date(),
      evalulation: evalulation
    }).then(function (docRef) {
      console.log("Document written with ID: ");
    }
    );
  }

  const sendReport = () => {
    evalulation = document.getElementById("report").value;
    pid2 = document.getElementById("pid2").value;
    db.collection("post").doc(pid2).set({
      timestamp: new Date(),
      evalulation: evalulation
    }).then(function (docRef) {
      console.log("Document written with ID: ");
    }
    );
  }

  function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
    } else {
      console.log("location failed")
    }
  }

  function setPosition(position) {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;
    //reverseGeocoding();
    post();
  }

  function post() {
    db.collection("firemen_IoT").doc(pid1).set({
      timestamp: new Date(),
      lat: latitude,
      lng: longitude,
      temperature: btemp,
      heartrate: hrate,
      fatigue: fatigue,
      task: task
    }).then(function (docRef) {
      console.log("Document written with ID: ");
    }
    );
  }

  return (
    <div className="App">
        <center>Firefighter Mock Device - Dispatch Updates</center><br></br>
        <Button variant="primary" onClick={sendLocation}>Live Location Updates</Button>
        <br></br><br></br>
        <hr></hr>



        <center>Firefighter Mock Device - Situation Evaluation</center><br></br>
        <label for="pid">Personnel: </label>
        <select id="pid">
          <option value="FDkK3y183wyUnDkNxVTT">John Terry</option>
          <option value="aWojEljeS5lCH6ilFa5m">Sean Lee</option>
          <option value="eFaAxSrwbf9S3FDBfAh3">Tom Cruise</option>
  =     </select>
        <br></br><br></br>
        <textarea id="evaluation" rows="4" cols="75"></textarea>
        <br></br><br></br>
        <Button variant="primary" onClick={sendEvaluation}>Send Evaluation</Button>
        <br></br><br></br>
        <hr></hr>

        <br></br>
        <center>Firefighter Mock Device - Firefighting Updates</center><br></br>
        <label for="pid1">Personnel: </label>
        <select id="pid1">
          <option value="FDkK3y183wyUnDkNxVTT">John Terry</option>
          <option value="aWojEljeS5lCH6ilFa5m">Sean Lee</option>
          <option value="eFaAxSrwbf9S3FDBfAh3">Tom Cruise</option>
  =     </select>
        <br></br><br></br>
        <label for="task">Task: </label>
        <select id="task">
          <option value="Water Hose 1">Water Hose 1</option>
          <option value="Water Hose 2">Water Hose 2</option>
          <option value="Enter building">Enter building</option>
  =     </select>
        <br></br><br></br>
        <label for="hrate">Heart rate: </label>
        <input type="text" id="hrate" name="hrate" ></input>
        <br></br><br></br>
        <label for="btemp">Body temperature: </label>
        <input type="text" id="btemp" name="btemp"></input>
        <br></br><br></br>
        <label for="fatigue">Fatigue Level: </label>
        <input type="text" id="fatigue" name="fatigue"></input>
        <br></br><br></br>
        <Button variant="primary" onClick={handleClick}>Send Updates</Button>
        <br></br><br></br>
        <hr></hr>

        <br></br>
        <center>Firefighter Mock Device - Post Emergency Reports</center><br></br>
        <label for="pid2">Personnel: </label>
        <select id="pid2">
          <option value="FDkK3y183wyUnDkNxVTT">John Terry</option>
          <option value="aWojEljeS5lCH6ilFa5m">Sean Lee</option>
          <option value="eFaAxSrwbf9S3FDBfAh3">Tom Cruise</option>
  =     </select>
        <br></br><br></br>
        <textarea id="report" rows="4" cols="75"></textarea>
        <br></br><br></br>
        <Button variant="primary" onClick={sendReport}>Send Report</Button>
        <br></br><br></br>
        <hr></hr>

    </div>
  );
}

export default App;
