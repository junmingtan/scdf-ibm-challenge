import React,{ useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

import firebase from './config/firebase';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

export default function IOTDataChart(props) {
  const theme = useTheme();

  const [data, setData] = useState(null);
  // Initialize with listening to our
    // messages collection. The second argument
    // with the empty array makes sure the
    // function only executes once
    useEffect(() => {
      listenForNewData();
  }, []);

  const listenForNewData = () => {
      firebase.firestore().collection('iot_devices/' + props.deviceId + '/vals')
          .onSnapshot((snapshot) => {
              // Loop through the snapshot and collect
              // the necessary info we need. Then push
              // it into our array
              var data = [];
              snapshot.forEach((doc) => {
                data.push(doc.data())
              });

              data.sort(function(a, b) {
                if (a.timestamp.seconds > b.timestamp.seconds) return 1;
                if (a.timestamp.seconds < b.timestamp.seconds) return -1;
                return 0;
              });

              // Select max. 50 datapoints and set the collected array as our state
              data = data.slice(Math.max(data.length - 50, 0));
              console.log(data);
              setData(data);
          }, (error) => console.error(error));
  };

  if (!data) {
    return (
        <div>
            Loading...
      </div>
    )
  }



  return (
    <React.Fragment>
        <LineChart
          width={1000}
          height={500}
          data={data}
          margin={{
            top: 10,
            right: 10,
            bottom: 10,
            left: 70,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Temperature
            </Label>
          </YAxis>
          <Line animationDuration={10} type="monotone" dataKey="val" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>

    </React.Fragment>
  );
}
