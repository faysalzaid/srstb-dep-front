import { EditIcon, TrashIcon } from "icons";
import { useState, React } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Badge,
  TableContainer,
} from "@windmill/react-ui";
import "../overview/overview.css";
import { AiFillEye, AiFillDelete, AiFillEdit } from "react-icons/ai";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
} from "@windmill/react-ui";
import PageTitle from "components/Typography/PageTitle";
import { FaEdit, FaRemoveFormat } from "react-icons/fa";
import { FaPlusCircle, FaCheckCircle, FaRegMoneyBillAlt } from "react-icons/fa";
import axios from "axios";
import { url } from "config/urlConfig";
import { ErrorAlert, SuccessAlert } from "components/Alert";
import { useContext } from "react";
import { AuthContext } from "hooks/authContext";

function BudgetList({ id, budgets, setBudgets, invoiceIds }) {
  const { authState } = useContext(AuthContext);
  // console.log(budgets);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState({
    open: false,
    budgetId: "",
    paid: "",
    budgetTrackId: "",
  });

  const [budgetForm, setBudgetForm] = useState({
    year: "",
    allocatedBudget: 0,
    utilizedBudget: 0,
  });
  const [paymentForm, setPaymentForm] = useState({ date: "" });
  const [budgettrackForm, setBudgetTrackForm] = useState({
    date: "",
    utilized: "",
  });
  const [isUtilized, setIsUtilized] = useState({
    open: false,
    id: "",
    date: "",
    allocatedBudget: "",
    utilizedBudget: "",
    year: "",
  });

  // Alert logic and initialization
  const [openSuccess, setOpenSuccess] = useState({ open: false, message: "" });

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess({ open: false, message: "" });
  };

  const [openError, setOpenError] = useState({ open: false, message: "" });

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError({ open: false, message: "" });
  };
  // alert logic and initialization

  const deleteBudget = async () => {
    await axios.get(`${url}/budget/delete/${isDeleteOpen.id}`).then((resp) => {
      if (resp.data.error) {
        setOpenError({ open: true, message: "Error Occured" });
      } else {
        const newData = budgets.filter((bd) => bd.id !== isDeleteOpen.id);
        setBudgets(newData);
        setOpenSuccess({ open: true, message: "Successfully Deleted" });
        closeDelete();
      }
    });
  };

  const handleUtilization = async (event) => {
    event.preventDefault();
    const newCalc =
      parseFloat(isUtilized.utilizedBudget) +
      parseFloat(budgettrackForm.utilized);
    const request = {
      year: isUtilized.year,
      allocatedBudget: parseFloat(isUtilized.allocatedBudget),
      utilizedBudget: newCalc,
      ProjectId: id,
      date: budgettrackForm.date,
      utilized: parseFloat(budgettrackForm.utilized),
      createdBy: authState.username,
    };
    // console.log(request,isUtilized.id);
    await axios
      .post(`${url}/budget/${isUtilized.id}`, request, {
        withCredentials: true,
      })
      .then((resp) => {
        // console.log(resp.data);
        if (resp.data.error) {
          setOpenError({ open: true, message: `${resp.data.error}` });
        } else {
          setOpenSuccess({ open: true, message: "Successfully Added" });
          // console.log('this is resp.data',resp.data);
          setBudgets(resp.data);
          onUtilizedClose();
        }
      });

    // console.log('this is id',isUtilized.id);
  };

  const budgetApprove = async (bid) => {
    await axios
      .post(`${url}/budget/approve/${bid}`, { withCredentials: true })
      .then((resp) => {
        if (resp.data.error) {
          setOpenError({ open: true, message: `${resp.data.error}` });
        } else {
          const data = resp.data.filter((bd) => bd.ProjectId == id);
          setBudgets(data);
          setOpenSuccess({ open: true, message: "Operation Success" });
        }
      });
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const request = {
      year: budgetForm.year,
      allocatedBudget: parseFloat(budgetForm.allocatedBudget),
      utilizedBudget: parseFloat(budgetForm.utilizedBudget),
      ProjectId: id,
    };

    await axios
      .post(`${url}/budget`, request, { withCredentials: true })
      .then((resp) => {
        if (resp.data.error) {
          setOpenError({ open: true, message: `${resp.data.error}` });
        } else {
          setBudgets((prev) => [...prev, resp.data]);
          setOpenSuccess({ open: true, message: "Successfully Added" });
          onClose();
        }
      });
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    // console.log('clicked');
    const request = {
      date: paymentForm.date,
      amountReceived: parseInt(isPaymentOpen.paid),
      InvoiceId: invoiceIds,
      budgetId: isPaymentOpen.budgetId,
      invoiced: 1,
      budgetTrackId: isPaymentOpen.budgetTrackId,
      createdBy: authState.username,
      ProjectId: id,
    };
    // console.log(request);
    await axios
      .post(`${url}/payment`, request, { withCredentials: true })
      .then((resp) => {
        if (resp.data.error) {
          setOpenError({ open: true, message: `${resp.data.error}` });
        } else {
          setBudgets(resp.data);
          setOpenSuccess({
            open: true,
            message: "Invoiced Payment Successfully",
          });
          onPaymentClose();
        }
      });
  };

  const budgetTrackDelete = async (btrackid) => {
    // e.preventDefault()
    // console.log(btrackid);
    const request = {
      InvoiceId: invoiceIds,
      ProjectId: id,
    };
    await axios
      .post(`${url}/budget/budgettrackDelete/${btrackid}`, request, {
        withCredentials: true,
      })
      .then((resp) => {
        if (resp.data.error) {
          setOpenError({ open: true, message: `${resp.data.error}` });
        } else {
          setBudgets(resp.data);
          setOpenSuccess({
            open: true,
            message: "Successfully Deleted The Installment",
          });
        }
      })
      .catch((error) => {
        setOpenError({ open: true, message: `${error}` });
      });
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const onPaymentOpen = () => {
    setIsPaymentOpen(true);
  };

  const onPaymentClose = () => {
    setIsPaymentOpen(false);
  };

  const onUtilizedClose = () => {
    setIsUtilized({ open: false });
  };

  const onUtilizedOpen = (data) => {
    setIsUtilized({ open: true });
  };

  const [isDeleteOpen, setIsDeleteOpen] = useState({ open: false, id: "" });

  const closeDelete = () => {
    setIsDeleteOpen({ open: false });
  };
  //   const openDelete = (id)=>{
  //     setIsDeleteOpen({open:true,id:id})
  // }

  return (
    <>
      <section className=" w-full overflow-hidden contracts-section p-4 mb-6 rounded-md shadow-md dark:bg-gray-700 ">
        <ErrorAlert
          open={openError.open}
          handleClose={handleCloseError}
          message={openError.message}
          horizontal="right"
        />
        <SuccessAlert
          open={openSuccess.open}
          handleClose={handleCloseSuccess}
          message={openSuccess.message}
          horizontal="right"
        />

        {/* Delete Confirm section */}
        <Modal isOpen={isDeleteOpen.open} onClose={closeDelete}>
          <ModalHeader>Confirm Action</ModalHeader>
          <ModalBody>
            <span>Are you sure you want to perform this action?</span>
          </ModalBody>
          <ModalFooter>
            <button
              className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
              onClick={deleteBudget}
            >
              Confirm
            </button>
          </ModalFooter>
        </Modal>

        {/* End of delete Section */}
        {/* Modal Payment section */}
        <Modal isOpen={isPaymentOpen.open} onClose={onPaymentClose}>
          <form onSubmit={handlePayment}>
            <ModalHeader>
              <span className="text-lg font-medium text-gray-700">
                Add Payment
              </span>
            </ModalHeader>
            <ModalBody>
              <div className="mb-4">
                <label
                  className="mt-2 block text-gray-700 font-bold mb-2"
                  htmlFor="year"
                >
                  <span>Date</span>
                </label>
                <input
                  className="form-input block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 bg-transparent dark:border-gray-600"
                  type="date"
                  name="date"
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, date: e.target.value })
                  }
                  required
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                className="bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Make Payment"}
              </Button>
            </ModalFooter>
          </form>
        </Modal>
        {/* Modal Payment section */}

        {/* Modal Utilization section */}
        <Modal isOpen={isUtilized.open} onClose={onUtilizedClose}>
          <form onSubmit={handleUtilization}>
            <ModalHeader>
              <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Utilize Budget
              </span>
            </ModalHeader>
            <ModalBody>
              <div className="mb-4">
                <label
                  className="mt-2 block text-gray-700 dark:text-gray-300 font-bold mb-2"
                  htmlFor="year"
                >
                  <span>Date</span>
                </label>
                <input
                  className="form-input block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 bg-transparent dark:border-gray-600"
                  type="date"
                  name="date"
                  onChange={(e) =>
                    setBudgetTrackForm({
                      ...budgettrackForm,
                      date: e.target.value,
                    })
                  }
                  required
                />
                <input
                  className="mt-2 form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 bg-transparent dark:border-gray-600"
                  type="number"
                  name="utilized"
                  step={"0.01"}
                  onChange={(e) =>
                    setBudgetTrackForm({
                      ...budgettrackForm,
                      utilized: e.target.value,
                    })
                  }
                  placeholder="Utilizing"
                  required
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                className="bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Make Payment"}
              </Button>
            </ModalFooter>
          </form>
        </Modal>
        {/* Modal Utilization section */}

        {/* Modal section */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Add New Budget
              </span>
            </ModalHeader>
            <ModalBody>
              <div className="mb-4">
                <label
                  className="mt-2 block text-gray-700 font-bold mb-2"
                  htmlFor="year"
                >
                  <span className=" dark:text-gray-300">Year</span>
                </label>
                <input
                  className="form-input block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 bg-transparent dark:border-gray-600"
                  type="date"
                  name="year"
                  onChange={(e) =>
                    setBudgetForm({ ...budgetForm, year: e.target.value })
                  }
                  required
                />
                <label
                  className="mt-2 block text-gray-700 font-bold mb-2"
                  htmlFor="year"
                >
                  <span className=" dark:text-gray-300">Allocated Budget</span>
                </label>
                <input
                  type="number"
                  className="form-input block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 bg-transparent dark:border-gray-600"
                  name="allocatedBudget"
                  step="0.01"
                  onChange={(e) =>
                    setBudgetForm({
                      ...budgetForm,
                      allocatedBudget: e.target.value,
                    })
                  }
                  required
                />

                <label
                  className="mt-2 block text-gray-700 font-bold mb-2"
                  htmlFor="year"
                >
                  <span className=" dark:text-gray-300">Utilized Budget</span>
                </label>
                <input
                  type="number"
                  className="form-input block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 bg-transparent dark:border-gray-600"
                  name="utilizedBudget"
                  onChange={(e) =>
                    setBudgetForm({
                      ...budgetForm,
                      utilizedBudget: e.target.value,
                    })
                  }
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                className="bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Make Payment"}
              </Button>
            </ModalFooter>
          </form>
        </Modal>
        {/* Modal section */}

        <PageTitle>
          Budgets{" "}
          <Button className="ml-4" size="small" onClick={onOpen}>
            add Budget
          </Button>
        </PageTitle>
        <div></div>

        {/* <div className="flex flex-col bg-black  "> */}
        {/* <div className=" bg-blue-500 "> */}
        <div className=" shadow border-b border-gray-200 dark:border-gray-900 sm:rounded-lg py-0 sm:px-2 overflow-x-scroll ">
          {/* <div className="shadow overflow-hidden border-b border-gray-200 dark:border-gray-900 sm:rounded-lg"> */}
          <table className="  bg-cool-gray-50 dark:bg-transparent">
            <thead className="bg-white dark:bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Year
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Allocated Budget
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Utilized Budget
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Remaining Budget
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Invoice
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Utilize
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Edit
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Delete
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Approve
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Expand
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">View details</span>
                </th>
              </tr>
            </thead>
            {budgets?.map((row, rowIndex) => (
              <tbody
                className=" min-w-full bg-cool-gray-50 divide-y divide-gray-200 dark:bg-transparent dark:text-gray-300"
                key={rowIndex}
              >
                <>
                  <tr className=" border-b border-gray-300 dark:border-gray-900 ">
                    <td className="px-6 py-4 whitespace-nowrap">{row.year}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ETB{" "}
                      {parseFloat(row.allocatedBudget).toLocaleString({
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ETB{" "}
                      {parseFloat(row.utilizedBudget).toLocaleString({
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ETB{" "}
                      {parseFloat(row.remainingBudget).toLocaleString({
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    {parseFloat(row.remainingBudget) === 0 ? (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge type="success">FullyPaid</Badge>{" "}
                      </td>
                    ) : (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge type="danger">Partially </Badge>
                      </td>
                    )}
                    <td
                      className=" px-6 py-4 whitespace-nowrap"
                      style={{ color: "green" }}
                    >
                      {row.approved ? (
                        <FaRegMoneyBillAlt
                          className="ml-3"
                          onClick={() =>
                            setIsUtilized({
                              open: true,
                              id: row.id,
                              year: row.year,
                              allocatedBudget: row.allocatedBudget,
                              utilizedBudget: row.utilizedBudget,
                            })
                          }
                        />
                      ) : (
                        <Badge type="danger">UnApproved</Badge>
                      )}
                    </td>
                    <td
                      className=" px-6 py-4 whitespace-nowrap"
                      style={{ color: "blue" }}
                    >
                      <FaEdit className="ml-3" />
                    </td>
                    <td
                      className=" px-6 py-4 whitespace-nowrap"
                      style={{ color: "red" }}
                    >
                      <AiFillDelete
                        className="ml-4"
                        onClick={() =>
                          setIsDeleteOpen({ open: true, id: row.id })
                        }
                      />
                    </td>
                    {authState.role === "finance" ||
                    authState.role === "admin" ? (
                      <td className="px-6  py-4 whitespace-nowrap">
                        <Button
                          size="small"
                          style={{
                            background: row.approved ? "green" : "red",
                          }}
                          onClick={() => budgetApprove(row.id)}
                        >
                          {row.approved ? "Approved" : "Approve"}
                        </Button>
                      </td>
                    ) : (
                      <td className="px-6  py-4 whitespace-nowrap">
                        <Badge type="danger">UnAuthorized</Badge>
                      </td>
                    )}
                    <td className=" px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                        onClick={() => setIsExpanded(!isExpanded)}
                      >
                        {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                      </button>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 whitespace-nowrap">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200 bg-gray-50 dark:bg-gray-800">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Date
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Utilized
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Created By
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Add To Payment
                                </th>
                                <th
                                  scope="col"
                                  className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Delete
                                </th>
                              </tr>
                            </thead>
                            {/* <tbody className="bg-white divide-y divide-gray-200 dark:text-gray-100 dark:bg-gray-700"> */}
                            <tbody className="  divide-y divide-gray-200 ">
                              {row.bugetTracks?.map((detail, index) => (
                                <tr
                                  key={index}
                                  className=" border-b border-gray-200 dark:border-gray-600"
                                >
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {detail.date}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    ETB{" "}
                                    {parseFloat(
                                      detail?.utilized
                                    )?.toLocaleString()}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {detail.createdBy}
                                  </td>

                                  {detail.invoiced === 0 ? (
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <Badge type="danger">
                                        <FaPlusCircle
                                          onClick={() =>
                                            setIsPaymentOpen({
                                              open: true,
                                              paid: detail.utilized,
                                              budgetTrackId: detail.id,
                                            })
                                          }
                                          className="mt-1 mr-1"
                                        />
                                        Invoice{" "}
                                      </Badge>{" "}
                                    </td>
                                  ) : (
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <Badge>
                                        <FaCheckCircle className="mt-1 mr-1" />
                                        Invoiced{" "}
                                      </Badge>
                                    </td>
                                  )}
                                  <td
                                    style={{ color: "red" }}
                                    className="mr-6 px-6"
                                  >
                                    <AiFillDelete
                                      onClick={() =>
                                        budgetTrackDelete(detail.id)
                                      }
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              </tbody>
            ))}
          </table>
        </div>
      </section>
    </>
  );
}

export default BudgetList;
