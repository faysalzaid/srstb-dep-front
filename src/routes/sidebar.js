/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */


// import { useAuth } from '../hooks/useAuth'


// let secret;




// // const { authState } = useAuth(
// const useCheckPermission = () => {
//     const { authState } = useAuth()
//     if (authState.role === "admin") {
//         return secret = "admin"
//     } else if (authState.role === "planning") {
//         return secret = "planning"
//     } else if (authState.role === "finance") {
//         return secret = "finance"
//     } else if (authState.role === "engineer") {
//         return secret = "engineer"
//     }
// }

// useCheckPermission()

let routes;

routes = [{
        path: '/app/dashboard', // the url
        icon: 'HomeIcon', // the component being exported from icons/index.js
        name: 'Dashboard', // name that appear in Sidebar
        roles: ['admin', 'finance', 'design', 'client', 'roadquality', 'planning', 'engineer', 'contractadmin', 'hr', 'manager', 'pRelation']
    },
    {
        path: '/app/companies',
        icon: 'SunIcon',
        name: 'Companies',
        roles: ['admin', 'finance', 'design', 'roadquality', 'engineer', 'contractadmin', 'hr', 'manager', 'planning']
    },

    {
        path: '/app/bids',
        icon: 'FormsIcon',
        name: 'Bids',
        roles: ['admin', 'finance', 'engineer', 'manager', 'planning']
    },

    {
        path: '/app/users',
        icon: 'PeopleIcon',
        name: 'Users',
        roles: ['admin', 'finance', 'manager', 'hr']
    },
    {
        path: '/app/charts',
        icon: 'ChartsIcon',
        name: 'Charts',
        roles: ['admin', 'finance', 'design', 'roadquality', 'planning', 'engineer', 'contractadmin', 'hr', 'manager']
    },


    {
        path: '/app/chat',
        icon: 'ChatIcon',
        name: 'Chat',
        roles: ['admin', 'finance', 'design', 'client', 'roadquality', 'planning', 'engineer', 'contractadmin', 'hr', 'manager', 'pRelation']
    },
    {
        path: '/app/pglist',
        icon: 'TablesIcon',
        name: 'Projects',
        roles: ['admin', 'finance', 'roadquality', 'engineer', 'manager', 'planning']
    },
    {
        path: '/app/archives',
        icon: 'FaRegFileArchive',
        name: 'Archives',
        roles: ['admin', 'finance', 'design', 'engineer', 'pRelation']
    },

    {
        path: '/app/procurement',
        icon: 'FaCircleNotch',
        name: 'Procurement',
        roles: ['admin', 'finance', 'design', 'engineer']
    },
    {
        path: '/app/requests',
        icon: 'CardsIcon',
        name: 'Letter Requests',
        roles: ['admin', 'finance', 'hr']
    },

    // {
    //     path: '/app/designations',
    //     name: 'Designations',
    //     icon: 'PagesIcon',
    //     roles: ['admin', 'finance']
    // },
    // {
    //     path: '/app/employees',
    //     icon: 'MoonIcon',
    //     name: 'Employees',
    //     roles: ['admin', 'finance']
    // },
    {
        path: '/app/invoice',
        icon: 'FaFileInvoiceDollar',
        name: 'Invoices',
        roles: ['admin', 'finance']
    },
    {
        path: '/app/awards',
        icon: 'FaAward',
        name: 'Awards',
        roles: ['admin', 'finance']
    },
    {
        path: '/app/contract',
        icon: 'FaFileContract',
        name: 'Contracts',
        roles: ['admin', 'finance', 'contractadmin']
    },
    {
        name: 'Reports',
        icon: 'FaReadme',
        roles: ['admin', 'finance', 'roadquality'],
        routes: [{
            path: '/app/reports/projects',
            icon: 'FaRoute',
            name: 'Projects',
            roles: ['admin', 'finance', 'hr']
        }, ]
    },


    {
        name: 'Office Info',
        icon: 'PagesIcon',
        routes: [
            // submenu
            {
                path: '/app/employees',
                icon: 'MoonIcon',
                name: 'Employees',
                roles: ['admin', 'finance', 'hr']
            },
            {
                path: '/app/designations',
                name: 'Designations',
                icon: 'PagesIcon',
                roles: ['admin', 'finance', 'hr']
            },
            {
                path: '/app/departments',
                name: 'Departments',
                icon: 'SearchIcon',
                roles: ['admin', 'finance', 'hr']
            },
            {
                path: '/app/leavetypelist',
                name: 'LeaveType',
                icon: 'FaPills',
                roles: ['admin', 'finance', 'hr']
            },
            {
                path: '/app/leavelist',
                name: 'Leaves',
                icon: 'FaHandHoldingMedical',
                roles: ['admin', 'finance', 'hr']
            },
            {
                path: '/app/area',
                name: 'Areas',
                icon: 'FaPlaceOfWorship',
                roles: ['admin', 'finance', 'hr']
            },
            {
                path: '/app/payroll',
                name: 'Payroll',
                icon: 'FaMoneyCheckAlt',
                roles: ['admin', 'finance', 'hr']
            },

            {
                path: '/app/timesheet',
                name: 'M.timesheet',
                icon: 'FaUserClock',
                roles: ['admin', 'finance', 'hr']
            },


        ],
    },

    {
        path: '/app/bloglist',
        icon: 'FaHtml5',
        name: 'Website',
        roles: ['admin', 'pRelation']
    },

    // {
    //     name: 'Jobs',
    //     icon: 'FaForumbee',
    //     routes: [
    //         // submenu
    //         {
    //             path: '/app/candidates',
    //             icon: 'FaIoxhost',
    //             name: 'Candidates',
    //             roles: ['admin', 'finance', 'hr']
    //         },
    //         {
    //             path: '/app/candidate/shortlisted',
    //             icon: 'FaSlideshare',
    //             name: 'ShortListed',
    //             roles: ['admin', 'finance', 'hr']
    //         },
    //         {
    //             path: '/app/candidate/selected',
    //             icon: 'FaHandsHelping',
    //             name: 'Selected',
    //             roles: ['admin', 'finance', 'hr']
    //         },


    //     ],
    // },
    {
        path: '/app/settings',
        icon: 'BsFillGearFill',
        name: 'Settings',
        roles: ['admin', ]
    },
]

export default routes