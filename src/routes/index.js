import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() =>
    import ('../pages/Dashboard'))

const Charts = lazy(() =>
    import ('../pages/Charts'))

const Page404 = lazy(() =>
    import ('../pages/404'))

// const ProfilePage = lazy(() =>
//     import ('../components/Profile/Profile'))


const Companylist = lazy(() =>
    import ('../pages/CompanyList'))
const CompanyDetail = lazy(() =>
    import ('../pages/companyDetail'))

const InvoiceDetailPage = lazy(() =>
    import ('../components/invoices/InvoiceDetailPage'))

const InvoiceList = lazy(() =>
    import ('../components/invoices/InvoiceList'))

const ContractList = lazy(() =>
    import ('../components/Contracts/ContractList'))
const ContractDetail = lazy(() =>
    import ('../components/Contracts/ContractDetail'))

const UnAuthorized = lazy(() =>
    import ('../components/UnAuthorized/UnAuthorized'))


const PgDetail = lazy(() =>
    import ('../components/newProjects/PGDetail'))

const PgList = lazy(() =>
    import ('../components/newProjects/PGList'))


const LeaveTypeList = lazy(() =>
    import ('../components/LeaveTypes/LeaveType'))
const LeaveList = lazy(() =>
    import ('../components/Leaves/LeaveList'))

const PayrollList = lazy(() =>
    import ('../components/payroll/PayrollList'))
const payrollDetail = lazy(() =>
    import ('../components/payroll/PayrollDetail'))

const LeaveDetail = lazy(() =>
    import ('../components/Leaves/LeaveDetail'))


const CandidateList = lazy(() =>
    import ('../components/Candidates/CandidatesList'))

const CandidateDetail = lazy(() =>
    import ('../components/Candidates/CandidatesDetail'))
const ShortListedCandidates = lazy(() =>
    import ('../components/Candidates/ShortListed'))
const SelectedCandidates = lazy(() =>
    import ('../components/Candidates/Selected'))
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
    // const EmployeeDetail = lazy(() =>
    //     import ('../pages/EmployeeDetail'))
const UsersList = lazy(() =>
    import ('../pages/UsersList'))
const UsersDetail = lazy(() =>
    import ('../pages/UsersDetail'))

const LetterRequests = lazy(() =>
    import ('../components/LetterRequest/LetterRequest')
)

const LetterRequestsDetail = lazy(() =>
    import ('../components/LetterRequest/LetterRequestDetail')
)

const Chat = lazy(() =>
    import ('../components/Chat/Chat'))
const Projects = lazy(() =>
    import ('../components/Projects/Projects')
)

const Messages = lazy(() =>
    import ('../components/Messages/Messages'))

const PaymentDetail = lazy(() =>
    import ('../components/payment/PaymentDetail'))

const EmployeeDetail = lazy(() =>
    import ('../pages/EmployeeDetail'))

const Timesheet = lazy(() =>
    import ('../components/Timesheet/Timesheet'))

const ProjectReport = lazy(() =>
    import ('../components/Reports/ProjectReport'))


const TimesheetDetail = lazy(() =>
    import ('../components/Timesheet/TimesheetDetail'))
const Settings = lazy(() =>
        import ('../components/Settings/Settings'))
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
        roles: ['admin', 'finance', 'design', 'client', 'roadquality', 'engineer', 'contractadmin', 'hr']
    },
    {
        path: '/bids',
        component: BidsList,
        roles: ['admin', 'finance', 'engineer']
    },

    {
        path: '/bids/:id',
        component: BidDetail,
        roles: ['admin', 'finance', 'engineer']
    },

    {
        path: '/companies',
        component: Companylist,
        roles: ['admin', 'finance', 'design', 'engineer', 'hr']
    },
    {
        path: '/companies/:id',
        component: CompanyDetail,
        roles: ['admin', 'finance', 'design', 'engineer', 'hr']
    },
    {
        path: '/departments/:id',
        component: DepartmentDetail,
        roles: ['admin', 'finance', 'hr']
    },

    {
        path: '/users',
        component: UsersList,
        roles: ['admin', 'finance']
    },
    {
        path: '/users/:id',
        component: UsersDetail,
        roles: ['admin', 'finance']
    },

    {
        path: '/charts',
        component: Charts,
        roles: ['admin', 'finance', 'design', 'client', 'roadquality', 'engineer', 'contractadmin']
    },
    {
        path: '/designations',
        component: DesignationList,
        roles: ['admin', 'finance', 'hr']
    },
    {
        path: '/designations/:id',
        component: DesignationDetail,
        roles: ['admin', 'finance', 'hr']
    },
    {
        path: '/departments',
        component: DepartmentList,
        roles: ['admin', 'finance', 'hr']
    },
    {
        path: '/employees',
        component: EmployeeList,
        roles: ['admin', 'finance', 'hr']
    },
    {
        path: '/employees/:id',
        component: EmployeeDetail,
        roles: ['admin', 'finance', 'hr']
    },

    {
        path: '/404',
        component: Page404,
    },


    {
        path: '/requests',
        component: LetterRequests,
        roles: ['admin', 'finance', 'hr']
    },

    {
        path: '/requests/:id',
        component: LetterRequestsDetail,
        roles: ['admin', 'finance', 'hr']
    },



    {
        path: '/chat',
        component: Chat,
        roles: ['admin', 'finance', 'design', 'client', 'roadquality', 'engineer', 'contractadmin', 'hr']
    },
    {
        path: '/invoice',
        component: InvoiceList,
        roles: ['admin', 'finance']
    },
    {
        path: '/invoice/:id',
        component: InvoiceDetailPage,
        roles: ['admin', 'finance']
    },
    {
        path: '/payment/:id',
        component: PaymentDetail,
        roles: ['admin', 'finance']
    },
    {
        path: "/contract",
        component: ContractList,
        roles: ['admin', 'finance', 'contractadmin']
    },
    {
        path: "/contract/:id",
        component: ContractDetail,
        roles: ['admin', 'finance', 'contractadmin']
    },
    {
        path: "/pglist",
        component: PgList,
        roles: ['admin', 'finance', 'design', 'engineer']
    },
    {
        path: "/pglist/:id",
        component: PgDetail,
        roles: ['admin', 'finance', 'design', 'engineer']
    },
    {
        path: "/auther",
        component: UnAuthorized,
        roles: ['admin', 'finance', 'planning', 'engineer']
    },
    {
        path: "/leavetypelist",
        component: LeaveTypeList,
        roles: ['admin', 'finance', 'hr']
    },
    {
        path: "/leavelist",
        component: LeaveList,
        roles: ['admin', 'finance', 'hr']
    },
    {
        path: "/leave/:id",
        component: LeaveDetail,
        roles: ['admin', 'finance', 'hr']
    },
    {
        path: "/payroll",
        component: PayrollList,
        roles: ['admin', 'finance', 'hr']
    },
    {
        path: "/payroll/:id",
        component: payrollDetail,
        roles: ['admin', 'finance', 'hr']
    },
    {
        path: "/candidates",
        component: CandidateList,
        roles: ['admin', 'finance', 'hr']
    },
    {
        path: "/candidates/:id",
        component: CandidateDetail,
        roles: ['admin', 'finance', 'hr']
    },
    {
        path: "/candidate/shortlisted",
        component: ShortListedCandidates,
        roles: ['admin', 'finance', 'hr']
    },
    {
        path: "/candidate/selected",
        component: SelectedCandidates,
        roles: ['admin', 'finance', 'hr']
    }, {
        path: "/timesheet",
        component: Timesheet,
        roles: ['admin', 'finance', 'hr']
    },
    {
        path: "/timesheet/:id",
        component: TimesheetDetail,
        roles: ['admin', 'finance', 'hr']
    },
    {
        path: "/settings",
        component: Settings,
        roles: ['admin']
    }, ,
    {
        path: "/reports/projects",
        component: ProjectReport,
        roles: ['admin', 'roadquality']
    },

    // {
    //     path: "/profile",
    //     component: ProfilePage,
    //     roles: ['admin', 'roadquality']
    // },
]

export default routes