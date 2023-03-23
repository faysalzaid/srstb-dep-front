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
        roles: ['admin', 'finance', 'planning', 'engineer']
    },
    {
        path: '/app/companies',
        icon: 'SunIcon',
        name: 'Companies',
        roles: ['admin', 'finance', 'planning']
    },

    {
        path: '/app/bids',
        icon: 'FormsIcon',
        name: 'Bids',
        roles: ['admin', 'finance']
    },

    {
        path: '/app/users',
        icon: 'PeopleIcon',
        name: 'Users',
        roles: ['admin', 'finance']
    },
    {
        path: '/app/charts',
        icon: 'ChartsIcon',
        name: 'Charts',
        roles: ['admin', 'finance', 'planning', 'engineer']
    },


    {
        path: '/app/chat',
        icon: 'ChatIcon',
        name: 'Chat',
        roles: ['admin', 'finance', 'planning', 'engineer']
    },
    {
        path: '/app/pglist',
        icon: 'TablesIcon',
        name: 'Projects',
        roles: ['admin', 'finance', 'planning', 'engineer']
    },
    {
        path: '/app/requests',
        icon: 'CardsIcon',
        name: 'Letter Requests',
        roles: ['admin', 'finance', 'planning']
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
        path: '/app/contract',
        icon: 'FaFileContract',
        name: 'Contracts',
        roles: ['admin', 'finance', 'planning']
    },
    {
        path: '/app/reports',
        icon: 'FaReadme',
        name: 'Reports',
        roles: ['admin', 'finance', 'planning']
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
                roles: ['admin', 'finance']
            },
            {
                path: '/app/designations',
                name: 'Designations',
                icon: 'PagesIcon',
                roles: ['admin', 'finance']
            },
            {
                path: '/app/departments',
                name: 'Departments',
                icon: 'SearchIcon',
                roles: ['admin', 'finance']
            },
            {
                path: '/app/leavetypelist',
                name: 'LeaveType',
                icon: 'FaPills',
                roles: ['admin', 'finance']
            },
            {
                path: '/app/leavelist',
                name: 'Leaves',
                icon: 'FaHandHoldingMedical',
                roles: ['admin', 'finance']
            },
            {
                path: '/app/payroll',
                name: 'Payroll',
                icon: 'FaMoneyCheckAlt',
                roles: ['admin', 'finance']
            },


        ],
    },
    {
        name: 'Jobs',
        icon: 'FaForumbee',
        routes: [
            // submenu
            {
                path: '/app/candidates',
                icon: 'FaIoxhost',
                name: 'Candidates',
                roles: ['admin', 'finance']
            },
            {
                path: '/app/candidate/shortlisted',
                icon: 'FaSlideshare',
                name: 'ShortListed',
                roles: ['admin', 'finance']
            },
            {
                path: '/app/candidate/selected',
                icon: 'FaHandsHelping',
                name: 'Selected',
                roles: ['admin', 'finance']
            },


        ],
    },
]

export default routes