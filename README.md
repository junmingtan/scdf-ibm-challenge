# REmergency
## Team Name
Renaissance.io
## Team Members
- Sim Zhi Qi : Renaissance Engineering Programme Y4 Computer Science
- Tan Jun Ming : Renaissance Engineering Programme Y4 Computer Science
- Jordan Liew Yi An : Renaissance Engineering Programme Y4 Computer Science
## Description
We are tackling the problem statement of "Integrating with a smart environment". We primarily want to tackle the issue of tackling emergencies through early intervention and dectection measures and thereby increasing the optimisation of emergency resources. The idea we are proposing consist of a command centre system that acts as a notification and alert centre which takes in information from various sensors and IoT devices around the island to alert of any emergencies. Data could also come from peer-to-peer sharing via SCDF apps such as myResponder. All the raw data from the sensors would then be analyse and a alert will be generated on the dashboard if an emergency has been detected. The command centre can then go through each emergency and obtain live information from the various centre throughout the emergency response duration. The command centre could go through a live walk through with the CFRs on how to tackle the emergency based on all the data obtained from all the sensors, IoT as well as the CFR via the mission screen.  

## Pitch Video
https://youtube.com
## Software Architecture
![Software Architecture](https://user-images.githubusercontent.com/35727668/84587726-52ed7100-ae54-11ea-9ae1-dbca20bdb100.png)
\* Implementation not present in prototype due to time constraint during the challenge
## Detailed Solution
### Emergency Prediction
Insert SS of dashboard
<br/>
Our solution to early intervention is via the use of multiple IoT devices and sensors connected to a centralised database constantly sending data and metrics. Using predictive analytics on the data obtained from the sensors island wide, potential emergencies can be identified based on severity of the issue and therefore an detect an issue earlier for early intervention mesures such as warning stakeholders/CFRs in advance. With the power of all the data coming through from the various IoT sensors, an incident can be detected way before any emergency call is made and an analysis of the situation can be done by SCDF at the command centre to decide how to best tackle the situation with the most optimised use of emergency resources based on the data from the sensors as well as from various other sources such as video feeds from instagram, myResponder apps and also based on status from myResponder application on CFRs status.

### Command centre stages
A command centre personnel could click through the centralised system to track a current accident and decide on the response from SCDF based on all the data. Throughout the accident duration, the personnel can click between stages for to obtain the various data. 
#### Stage 1 - Emergency Overview
Insert SS of stage 1
<br/>
This stage allows the command centre personnel to have an overview of the situation.

### Stage 2 - myResponders
Insert SS of stage 2
<br/>
This stage allows the command centre personnel to view the current CFRs in the area and determine how best to provide resources based on CFRs response and based on severity of the situation.

### Stage 3 - Mission
![stage3_1](https://user-images.githubusercontent.com/35727668/84588101-0fe0cd00-ae57-11ea-83ce-9af75cc2e07d.png)
By clicking the "COMMAND CENTRE" button proceeds the user to the next page to view more essential data of the accident onsite.
![stage3_2](https://user-images.githubusercontent.com/35727668/84588103-12432700-ae57-11ea-8545-597f843efdb8.png)
This stage allows the command centre personnel to assess the whole response of the accident across the whole duration and evaluate how best to tackle the siuation. The command centre personnel could also connect directly with the CFRs to coordinate the response based on all the data they have. It also allows the command centre to track the various video footage received from the various data source such as instagram, myResponder application and the various IoT devices. 

### Stage 4 - Post Mission
Insert SS of stage 4
<br/>
This stage allows the command centre personnel to wrap up the mission where the key data from the mission is displayed and logged for future references. 

A detailed solution slide deck can be found here:
https://docs.google.com/presentation/d/1KAlw0cn_9UtT0k2HLVHjqsPeX6B1_LbZO9Zg87hZK0g/edit#slide=id.g6c52a2e8d8_0_177

## Project Roadmap
![Roadmap](https://user-images.githubusercontent.com/35727668/84587763-ae1f6380-ae54-11ea-905f-9da98e8eb6b2.png)
## Installation & Setup
Use live demo to run through the prototype

## Live demo 
https://renaissance-io.us-south.cf.appdomain.cloud/
\* Hosted on IBM Cloud
## Technology used
- ReactJs
- IBM Cloud
- IBM Cloud Functions
- IBM Cloudant*
- IBM Watson*
- Docker*
- NodeJS*
- TensorFlow*
<br/>
\* Implementation not present in prototype due to time constraint during the challenge