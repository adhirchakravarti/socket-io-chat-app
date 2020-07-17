# What is it?

Chat application created using React and TypeScript

# How does it work?

Both the client and server use the Socket.io library which is a wrapper around Web Sockets. The Server is created using express and listens for connections on port 3002. The client sends a connection request on load. When the connection is established, a socket object is returned to both the client and the server; in addition to predefined events such as connect / disconnect, the socket can listen for and emit user defined events which can be acted upon by both the client and server.

In this particular app, Redux is used to maintain the application state for the frontend and also with the help of middleware communicate / listen for events between the client and the server.

The package manager for this application is yarn.

# How can we set it up?

1. Please ensure that you have Yarn (package manager) installed. This application was created using **Yarn version 1.22.4**

2. when the project files are unzipped into a directory, the dependancies (needed by application) must be installed using the following command:

`yarn install`

3. After the dependancies are successfully installed, the scripts to execute the application can be found in a file called `package.json`. To execute both the server and client together, you may run the following command:

`yarn dev`

To execute the server and client separately, please enter the commands in separate terminal windows:

`yarn dev-server` `yarn dev-client`

4. To execute the unit tests, the following command can be run:

`yarn test`

# Create a checkbox list of all the features required by this homework and check the ones you were able to accomplish

-   [x] You have to use React as your framework: Done
-   [] You have to use CSS preprocessors;
-   [x] You have to write the app in TypeScript;
-   [x] It should work on every desktop and phone, so you have to make responsive design. And it has to work both portrait and landscape orientation;
-   [x] It should work on desktop/tablet/phone at least on the following browsers: Chrome, Firefox and Safari. Consider the latest versions for each browser;
-   [x] Please, do not use any tool like or similar to create-react-app;
-   [x] Write at least some tests that would cover the main functionality of your app. We do not expect to be 100% test covered;
-   [x] Write clean, commented, small and modularized code;
-   [x] Working code, that works if we serve it with the http server and open in a browser;
