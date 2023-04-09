### Admin Dashboard

This is a dummy sales dashboard built using ReactJS and Material UI, with various features such as data tables, data grids, and PDF generation. You can view the [live demo here](https://admindashrjs.netlify.app).

The URL for this web app is not configured in the production server. Therefore, even after login, accessing different pages of dashboard by directly visiting to the links such as "https://productionURL/home" OR "https://productionURL/users" will not work. To access the dashboard, please log in using the provided credentials and explore the various pages by navigating through the links available on the sidebar and within the app

On the localhost server, simply visit "http://localhost:3000/home" to access the dashboard.

The dashboard uses various React hooks and dependencies, including:

- useContext
- useEffect
- useHistory
- useNavigate
- useRef
- useState
- Material UI's Data table and Data grid components
- styled-components for styling and animations
- JsPdf-Html2Canvas for generating and downloading PDFs
- React Circular Progressbar
- Recharts for displaying area charts and bar graphs
- uuidv4 for generating unique IDs

##### Developer's Note

- The code can be further refactored to improve its efficiency and maintainability.
- Searchbar does not work.
