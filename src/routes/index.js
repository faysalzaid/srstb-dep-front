import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() =>
    import ('../pages/Dashboard'))
const Forms = lazy(() =>
    import ('../pages/Forms'))
const Cards = lazy(() =>
    import ('../pages/Cards'))
const Charts = lazy(() =>
    import ('../pages/Charts'))
const Buttons = lazy(() =>
    import ('../pages/Buttons'))
const Modals = lazy(() =>
    import ('../pages/Modals'))
const Tables = lazy(() =>
    import ('../pages/Tables'))
const Page404 = lazy(() =>
    import ('../pages/404'))
const Blank = lazy(() =>
    import ('../pages/Blank'))

const Companylist = lazy(() =>
    import ('../pages/CompanyList'))
const CompanyDetail = lazy(() =>
    import ('../pages/companyDetail'))


const BidsList = lazy(() =>
    import ('../pages/BidList'))
const BidDetail = lazy(() =>
    import ('../pages/BidDetail'))

const DepartmentList = lazy(() =>
    import ('../pages/DepartmentList'))
const DepartmentDetail = lazy(() =>
    import ('../pages/DepartmentDetail'))
const DesignationList = lazy(() =>
    import ('../pages/DesignationList'))
const DesignationDetail = lazy(() =>
    import ('../pages/DesignationDetail'))
const EmployeeList = lazy(() =>
    import ('../pages/EmployeeList'))
const EmployeeDetail = lazy(() =>
    import ('../pages/EmployeeDetail'))
const UsersList = lazy(() =>
    import ('../pages/UsersList'))
const UsersDetail = lazy(() =>
    import ('../pages/UsersDetail'))
const ProjectList = lazy(() =>
    import ('../pages/projectList'))
const ProjectDetail = lazy(() =>
    import ('../components/Projects/ProjectDetail'))



const Chat = lazy(() =>
    import ('../components/Chat/Chat'))
const Projects = lazy(() =>
    import ('../components/Projects/Projects')
)

const Messages = lazy(()=> 
   import ('../components/Messages/Messages'))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [{
        path: '/dashboard', // the url
        component: Dashboard, // view rendered
    },
    {
        path: '/forms',
        component: Forms,
    },
    {
        path: '/bids',
        component: BidsList,
    },

    {
        path: '/bids/:id',
        component: BidDetail,
    },
    {
        path: '/companies',
        component: Companylist
    },
    {
        path: '/companies/:id',
        component: CompanyDetail
    },
    {
        path: '/departments/:id',
        component: DepartmentDetail
    },
    {
        path: '/cards',
        component: Cards,
    },

    {
        path: '/users',
        component: UsersList,
    },
    {
        path: '/users/:id',
        component: UsersDetail,
    },

    {
        path: '/charts',
        component: Charts,
    },
    {
        path: '/buttons',
        component: Buttons,
    },
    {
        path: '/modals',
        component: Modals,
    },
    {
        path: '/tables',
        component: Tables,
    },
    {
        path: '/designations',
        component: DesignationList,
    },
    {
        path: '/designations/:id',
        component: DesignationDetail,
    },
    {
        path: '/departments',
        component: DepartmentList,
    },
    {
        path: '/employees',
        component: EmployeeList,
    },
    {
        path: '/employees/:id',
        component: EmployeeDetail,
    },

    {
        path: '/404',
        component: Page404,
    },
    {
        path: '/blank',
        component: Blank,
    },
    {
        path: '/projects',
        component: ProjectList,
    },
    {
        path: '/messages',
        component: Messages,
    },
    {
        path: '/projects/:id',
        component: ProjectDetail,
    },

    {
        path: '/chat',
        component: Chat,
    },
    {
        path: '/projects_list',
        component: Projects,
    },
]

export default routes