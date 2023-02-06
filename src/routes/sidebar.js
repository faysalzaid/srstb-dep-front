/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [{
        path: '/app/dashboard', // the url
        icon: 'HomeIcon', // the component being exported from icons/index.js
        name: 'Dashboard', // name that appear in Sidebar
    },
    {
        path: '/app/companies',
        icon: 'SunIcon',
        name: 'Companies',
    },
    // {
    //     path: '/app/clients',
    //     icon: 'FormsIcon',
    //     name: 'Clients',
    // },
    {
        path: '/app/bids',
        icon: 'FormsIcon',
        name: 'Bids',
    },

    // {
    //     path: '/app/projects',
    //     icon: 'FormsIcon',
    //     name: 'Projects',
    // },
    {
        path: '/app/users',
        icon: 'PeopleIcon',
        name: 'Users',
    },
    {
        path: '/app/charts',
        icon: 'ChartsIcon',
        name: 'Charts',
    },
    {
        path: '/app/buttons',
        icon: 'ButtonsIcon',
        name: 'Buttons',
    },


    {
        path: '/app/chat',
        icon: 'ChatIcon',
        name: 'Chat',
    },
    {
        path: '/app/projects_list',
        icon: 'ChatIcon',
        name: 'Projects',
    },
    {
        path: '/app/messages',
        icon: 'ChatIcon',
        name: 'Messages',
    },
    {
        name: 'Office Info',
        icon: 'PagesIcon',
        routes: [
            // submenu
            {
                path: '/app/departments',
                name: 'Departments',
            },
            {
                path: '/app/designations',
                name: 'Designations',
            },
            {
                path: '/app/employees',
                icon: 'FormsIcon',
                name: 'Employees',
            },

        ],
    },
]

export default routes