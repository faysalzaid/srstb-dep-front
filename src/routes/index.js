import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() =>
    import ("../pages/Dashboard"));

const Charts = lazy(() =>
    import ("../pages/Charts"));

const Page404 = lazy(() =>
    import ("../pages/404"));

const ProfilePage = lazy(() =>
    import ("../components/Profile/Profile"));

const Companylist = lazy(() =>
    import ("../pages/CompanyList"));
const CompanyDetail = lazy(() =>
    import ("../pages/companyDetail"));

const InvoiceDetailPage = lazy(() =>
    import ("../components/invoices/InvoiceDetailPage")
);

const InvoiceList = lazy(() =>
    import ("../components/invoices/InvoiceList"));

const ContractList = lazy(() =>
    import ("../components/Contracts/ContractList"));
const ContractDetail = lazy(() =>
    import ("../components/Contracts/ContractDetail")
);

const UnAuthorized = lazy(() =>
    import ("../components/UnAuthorized/UnAuthorized")
);

const PgDetail = lazy(() =>
    import ("../components/newProjects/PGDetail"));

const PgList = lazy(() =>
    import ("../components/newProjects/PGList"));

const LeaveTypeList = lazy(() =>
    import ("../components/LeaveTypes/LeaveType"));
const LeaveList = lazy(() =>
    import ("../components/Leaves/LeaveList"));

const PayrollList = lazy(() =>
    import ("../components/payroll/PayrollList"));
const payrollDetail = lazy(() =>
    import ("../components/payroll/PayrollDetail"));

const LeaveDetail = lazy(() =>
    import ("../components/Leaves/LeaveDetail"));

const CandidateList = lazy(() =>
    import ("../components/Candidates/CandidatesList")
);

const CandidateDetail = lazy(() =>
    import ("../components/Candidates/CandidatesDetail")
);
const ShortListedCandidates = lazy(() =>
    import ("../components/Candidates/ShortListed")
);
const SelectedCandidates = lazy(() =>
    import ("../components/Candidates/Selected")
);
const BidsList = lazy(() =>
    import ("../pages/BidList"));
const BidDetail = lazy(() =>
    import ("../pages/BidDetail"));

const DepartmentList = lazy(() =>
    import ("../pages/DepartmentList"));
const DepartmentDetail = lazy(() =>
    import ("../pages/DepartmentDetail"));
const DesignationList = lazy(() =>
    import ("../pages/DesignationList"));
const DesignationDetail = lazy(() =>
    import ("../pages/DesignationDetail"));
const EmployeeList = lazy(() =>
    import ("../pages/EmployeeList"));
// const EmployeeDetail = lazy(() =>
//     import ('../pages/EmployeeDetail'))
const UsersList = lazy(() =>
    import ("../pages/UsersList"));
const UsersDetail = lazy(() =>
    import ("../pages/UsersDetail"));

const LetterRequests = lazy(() =>
    // import ('../components/LetterRequest/LetterRequest')
    import ("../components/LetterRequest/NewLetterRequest")
);

const LetterRequestsDetail = lazy(() =>
    import ("../components/LetterRequest/LetterRequestDetail")
);

const Chat = lazy(() =>
    import ("../components/Chat/Chat"));
const Projects = lazy(() =>
    import ("../components/Projects/Projects"));
const BlogList = lazy(() =>
    import ("../components/BlogDash/BlogList"));


const BlogDetail = lazy(() =>
    import ("../components/BlogDash/BlogDetail"));

const Messages = lazy(() =>
    import ("../components/Messages/Messages"));

const PaymentDetail = lazy(() =>
    import ("../components/payment/PaymentDetail"));

const EmployeeDetail = lazy(() =>
    import ("../pages/EmployeeDetail"));

const Timesheet = lazy(() =>
    import ("../components/Timesheet/Timesheet"));

const ProjectReport = lazy(() =>
    import ("../components/Reports/ProjectReport"));

const TimesheetDetail = lazy(() =>
    import ("../components/Timesheet/TimesheetDetail")
);
const Settings = lazy(() =>
    import ("../components/Settings/Settings"));

const ArchiveList = lazy(() =>
    import ("../components/Archives/ArchiveList"));

const AwardList = lazy(() =>
    import ("../components/Awards/AwardList"));

const AwardDetail = lazy(() =>
    import ("../components/Awards/AwardLetterDetail")
);

const ProcurementList = lazy(() =>
    import ("../components/Procurement/ProcurementList")
);

const ProcurementDetail = lazy(() =>
    import ("../components/Procurement/ProcurementDetail")
);

const AreaList = lazy(() =>
    import ("../components/Areas/AreaList"));

const AreaDetail = lazy(() =>
    import ("../components/Areas/AreaDetail"));

// New Routes
const MoneyRequest = lazy(() =>
    import ("../request_pages/contents/MoneyRequest")
);

const FuelRequest = lazy(() =>
    import ("../request_pages/contents/FuelRequest"));

const CarRentalRequest = lazy(() =>
    import ("../request_pages/contents/CarRental")
);

const EquipmentRequest = lazy(() =>
    import ("../request_pages/contents/EquipmentRequest")
);

const OthersRequest = lazy(() =>
    import ("../request_pages/contents/OthersRequest")
);

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
        path: "/dashboard", // the url
        component: Dashboard, // view rendered
        roles: [
            "admin",
            "manager",
            "finance",
            "design",
            "client",
            "planning",
            "roadquality",
            "engineer",
            "contractadmin",
            "hr",
            "pRelation"
        ],
    },
    {
        path: "/bids",
        component: BidsList,
        roles: ["admin", "finance", "engineer", "manager", "planning"],
    },

    {
        path: "/bids/:id",
        component: BidDetail,
        roles: ["admin", "finance", "engineer", "manager", "planning"],
    },

    {
        path: "/companies",
        component: Companylist,
        roles: [
            "admin",
            "finance",
            "design",
            "engineer",
            "hr",
            "manager",
            "planning",
        ],
    },
    {
        path: "/companies/:id",
        component: CompanyDetail,
        roles: [
            "admin",
            "finance",
            "design",
            "engineer",
            "hr",
            "manager",
            "planning",
        ],
    },
    {
        path: "/departments/:id",
        component: DepartmentDetail,
        roles: ["admin", "finance", "hr"],
    },

    {
        path: "/users",
        component: UsersList,
        roles: ["admin", "finance", "manager", "hr"],
    },
    {
        path: "/users/:id",
        component: UsersDetail,
        roles: ["admin", "finance", "manager", "hr"],
    },

    {
        path: "/charts",
        component: Charts,
        roles: [
            "admin",
            "finance",
            "design",
            "planning",
            "roadquality",
            "engineer",
            "contractadmin",
            "manager",
        ],
    },
    {
        path: "/designations",
        component: DesignationList,
        roles: ["admin", "finance", "hr"],
    },
    {
        path: "/designations/:id",
        component: DesignationDetail,
        roles: ["admin", "finance", "hr"],
    },
    {
        path: "/departments",
        component: DepartmentList,
        roles: ["admin", "finance", "hr"],
    },
    {
        path: "/employees",
        component: EmployeeList,
        roles: ["admin", "finance", "hr"],
    },
    {
        path: "/employees/:id",
        component: EmployeeDetail,
        roles: ["admin", "finance", "hr"],
    },

    {
        path: "/404",
        component: Page404,
    },

    {
        path: "/requests",
        component: LetterRequests,
        roles: ["admin", "finance", "hr"],
    },

    {
        path: "/requests/:id",
        component: LetterRequestsDetail,
        roles: ["admin", "finance", "hr"],
    },

    {
        path: "/chat",
        component: Chat,
        roles: [
            "admin",
            "manager",
            "finance",
            "design",
            "client",
            "planning",
            "roadquality",
            "engineer",
            "contractadmin",
            "hr",
            "pRelation"
        ],
    },
    {
        path: "/invoice",
        component: InvoiceList,
        roles: ["admin", "finance"],
    },
    {
        path: "/invoice/:id",
        component: InvoiceDetailPage,
        roles: ["admin", "finance"],
    },
    {
        path: "/payment/:id",
        component: PaymentDetail,
        roles: ["admin", "finance"],
    },
    {
        path: "/contract",
        component: ContractList,
        roles: ["admin", "manager", "finance", "contractadmin"],
    },
    {
        path: "/contract/:id",
        component: ContractDetail,
        roles: ["admin", "finance", "contractadmin"],
    },
    {
        path: "/pglist",
        component: PgList,
        roles: [
            "admin",
            "finance",
            "roadquality",
            "engineer",
            "manager",
            "planning",
        ],
    },
    {
        path: "/pglist/:id",
        component: PgDetail,
        roles: [
            "admin",
            "finance",
            "roadquality",
            "engineer",
            "manager",
            "planning",
        ],
    },
    {
        path: "/auther",
        component: UnAuthorized,
        roles: ["admin", "finance", "planning", "engineer"],
    },
    {
        path: "/leavetypelist",
        component: LeaveTypeList,
        roles: ["admin", "finance", "hr"],
    },
    {
        path: "/leavelist",
        component: LeaveList,
        roles: ["admin", "finance", "hr"],
    },
    {
        path: "/leave/:id",
        component: LeaveDetail,
        roles: ["admin", "finance", "hr"],
    },
    {
        path: "/payroll",
        component: PayrollList,
        roles: ["admin", "finance", "hr"],
    },
    {
        path: "/payroll/:id",
        component: payrollDetail,
        roles: ["admin", "finance", "hr"],
    },
    {
        path: "/candidates",
        component: CandidateList,
        roles: ["admin", "finance", "hr"],
    },
    {
        path: "/candidates/:id",
        component: CandidateDetail,
        roles: ["admin", "finance", "hr"],
    },
    {
        path: "/candidate/shortlisted",
        component: ShortListedCandidates,
        roles: ["admin", "finance", "hr"],
    },
    {
        path: "/candidate/selected",
        component: SelectedCandidates,
        roles: ["admin", "finance", "hr"],
    },
    {
        path: "/timesheet",
        component: Timesheet,
        roles: ["admin", "finance", "hr"],
    },
    {
        path: "/timesheet/:id",
        component: TimesheetDetail,
        roles: ["admin", "finance", "hr"],
    },
    {
        path: "/settings",
        component: Settings,
        roles: ["admin"],
    }, ,
    {
        path: "/reports/projects",
        component: ProjectReport,
        roles: ["admin", "roadquality", "finance"],
    },

    {
        path: "/profile",
        component: ProfilePage,
        roles: ['admin', 'finance', 'design', 'client', 'roadquality', 'planning', 'engineer', 'contractadmin', 'hr', 'manager', 'pRelation']

    },

    {
        path: "/archives",
        component: ArchiveList,
        roles: ["admin", "roadquality", 'pRelation', "finance"],
    },
    {
        path: "/awards",
        component: AwardList,
        roles: ["admin", "roadquality", "finance"],
    },
    {
        path: "/awards/:id",
        component: AwardDetail,
        roles: ["admin", "roadquality", "finance"],
    },
    {
        path: "/procurement/",
        component: ProcurementList,
        roles: ["admin", "roadquality"],
    },
    {
        path: "/procurement/:id",
        component: ProcurementDetail,
        roles: ["admin", "roadquality"],
    },

    {
        path: "/area",
        component: AreaList,
        roles: ["admin", "roadquality"],
    },
    {
        path: "/area/:id",
        component: AreaDetail,
        roles: ["admin", "roadquality"],
    },

    // Extra Routes

    {
        path: "/money_request",
        component: MoneyRequest,
        roles: ["admin", "finance", "hr"],
    },
    {
        path: "/fuel_request",
        component: FuelRequest,
        roles: ["admin", "finance", "hr"],
    },
    {
        path: "/car_rental_request",
        component: CarRentalRequest,
        roles: ["admin", "finance", "hr"],
    },
    {
        path: "/equipment_request",
        component: EquipmentRequest,
        roles: ["admin", "finance", "hr"],
    },
    {
        path: "/others_request",
        component: OthersRequest,
        roles: ["admin", "finance", "hr"],
    },
    {
        path: "/bloglist",
        component: BlogList,
        roles: ["admin", "finance", "hr", "pRelation"],
    },
    {
        path: "/bloglist/:id",
        component: BlogDetail,
        roles: ["admin", "finance", "hr", "pRelation"],
    },
];

export default routes;