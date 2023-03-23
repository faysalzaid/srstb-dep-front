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
const EmployeeDetail = lazy(() =>
    import ('../pages/EmployeeDetail'))
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
        roles: ['admin', 'finance', 'planning', 'engineer']
    },
    {
        path: '/bids',
        component: BidsList,
        roles: ['admin', 'finance']
    },

    {
        path: '/bids/:id',
        component: BidDetail,
        roles: ['admin', 'finance']
    },

    {
        path: '/companies',
        component: Companylist,
        roles: ['admin', 'finance', 'planning']
    },
    {
        path: '/companies/:id',
        component: CompanyDetail,
        roles: ['admin', 'finance', 'planning']
    },
    {
        path: '/departments/:id',
        component: DepartmentDetail,
        roles: ['admin', 'finance']
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
        roles: ['admin', 'finance', 'planning', 'engineer']
    },
    {
        path: '/designations',
        component: DesignationList,
        roles: ['admin', 'finance']
    },
    {
        path: '/designations/:id',
        component: DesignationDetail,
        roles: ['admin', 'finance']
    },
    {
        path: '/departments',
        component: DepartmentList,
        roles: ['admin', 'finance']
    },
    {
        path: '/employees',
        component: EmployeeList,
        roles: ['admin', 'finance']
    },
    {
        path: '/employees/:id',
        component: EmployeeDetail,
        roles: ['admin', 'finance']
    },

    {
        path: '/404',
        component: Page404,
    },


    {
        path: '/requests',
        component: LetterRequests,
        roles: ['admin', 'finance', 'planning', 'engineer']
    },

    {
        path: '/requests/:id',
        component: LetterRequestsDetail,
        roles: ['admin', 'finance']
    },



    {
        path: '/chat',
        component: Chat,
        roles: ['admin', 'finance', 'planning', 'engineer']
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
        roles: ['admin', 'finance', 'planning']
    },
    {
        path: "/contract/:id",
        component: ContractDetail,
        roles: ['admin', 'finance', 'planning']
    },
    {
        path: "/pglist",
        component: PgList,
        roles: ['admin', 'finance', 'planning', 'engineer']
    },
    {
        path: "/pglist/:id",
        component: PgDetail,
        roles: ['admin', 'finance', 'planning', 'engineer']
    },
    {
        path: "/auther",
        component: UnAuthorized,
        roles: ['admin', 'finance', 'planning', 'engineer']
    },
    {
        path: "/leavetypelist",
        component: LeaveTypeList,
        roles: ['admin', 'finance']
    },
    {
        path: "/leavelist",
        component: LeaveList,
        roles: ['admin', 'finance']
    },
    {
        path: "/leave/:id",
        component: LeaveDetail,
        roles: ['admin', 'finance']
    },
    {
        path: "/payroll",
        component: PayrollList,
        roles: ['admin', 'finance']
    },
    {
        path: "/payroll/:id",
        component: payrollDetail,
        roles: ['admin', 'finance']
    },
    {
        path: "/candidates",
        component: CandidateList,
        roles: ['admin', 'finance']
    },
    {
        path: "/candidates/:id",
        component: CandidateDetail,
        roles: ['admin', 'finance']
    },
    {
        path: "/candidate/shortlisted",
        component: ShortListedCandidates,
        roles: ['admin', 'finance']
    },
    {
        path: "/candidate/selected",
        component: SelectedCandidates,
        roles: ['admin', 'finance']
    }
]

export default routes