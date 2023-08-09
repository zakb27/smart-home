# smart-home
A smart home mobile app written with React Native, is an app that connects to a raspberry pi as a host for smart devices as a proof of concept.

## Main functionality includes:
- User management in line with firebase
- Server functionality with a running raspberry pi that acts as a hub
- Testing using mocha and chai
- Account management such as changing email and password, profile picture etc.
- Sync with devices hard coded into server
- State can modify devices values and create schedules for them such as running at 50% at 9:00PM on a thursday
- Devices include, doors, temperature control, lights, dishwashers, washing machines etc.
- Room management (can move into devices rooms tied to account that can be created)
- Synchronisation
- Devices can be bookmarked
- Node server

## For future
- Use real IoT devices with AWS IoT device client or physicald evices
- More device supports

## How to run
Must have some phone emulator either XCode iOS simulator(MacOS only) or android studio's android simulator

I have included a way to run the server locally as I did not want to keep the raspberry pi running constantly.

1) Extract the smart home zip
2) Run npm install in the directory
3) Extract the server code
4) Run npm install in the server directory
5) Run the server with node
6) Find the IP of the machine running the system on, this can be done with running ipconfig in the terminal on windows
or ifconfig on macos terminal, should be under inet.
7) Navigate in the directory of smart-home to src/assets/key.js and then update the file inside with 
ip found in step 6
8) Run npx expo start in the directory of smart-home, press a to run an android simulator(which must be open) or i to run an ios simulator. 
9) The app should now be running the emulator ready to be used.


<img width="300" alt="Screenshot 2022-08-11 at 17 08 37" src="https://github.com/zakb27/smart-home/assets/46377498/1d757f6b-65d8-410a-b9a7-42434956a5e7">
<img width="300" alt="Screenshot 2022-08-11 at 17 08 37" src="https://github.com/zakb27/smart-home/assets/46377498/5b41afcf-0bef-414f-8896-4031f6586127">
<img width="300" alt="Screenshot 2022-08-11 at 17 08 37" src="https://github.com/zakb27/smart-home/assets/46377498/0c302962-6884-4c7c-8c56-4bb0074f8bfe">
<img width="300" alt="Screenshot 2022-08-11 at 17 08 37" src="https://github.com/zakb27/smart-home/assets/46377498/4c1cee53-57fd-43f3-b224-903f900874ab">
