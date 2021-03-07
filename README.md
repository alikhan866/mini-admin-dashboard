# mini-admin-dashboard
This repository contains a mini admin dashboard for adding,deleting and updating users with proper form validations. The UI is based on ant-design

## Structure

`/src/containers/Content/Content` contains both the navbar aswell as the body container and all components are rendered in this container according to different `routes`

`/src/router` contains all the routes for the web-app

`/src/components/AddUser/AddUser` contains the component for adding users to the web-app ( This component is loaded on the path `add-user` 

`/src/components/UserList/UserList` contains the editable table and the corresponding `input` or `select` edits as required.

### State management

`redux` is used for state management in the application ( i.e to update,delete and adding users ) 
