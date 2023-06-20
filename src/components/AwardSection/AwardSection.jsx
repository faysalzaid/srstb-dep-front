import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Badge,
  TableContainer,
  Label,
  Select,
} from "@windmill/react-ui";
import {
  ChatIcon,
  CartIcon,
  MoneyIcon,
  PeopleIcon,
  TrashIcon,
  EditIcon,
} from "../../icons";
import { AiFillEye } from "react-icons/ai";
import { FaDownload, FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "config/urlConfig";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";
import PageTitle from "components/Typography/PageTitle";
import { ErrorAlert, SuccessAlert } from "components/Alert";

function AwardSection({ bid, project, users, setBids, setProject }) {
  const [bidSelect, setBidSelect] = useState({ open: false, id: "" });

    useEffect(()=>{
        const data = bid.filter((b)=>b.selected)
        // console.log(data);
        setBids(data)
    },[])
  const onBidSelect = () => {
    setBidSelect({ open: true });
  };

  const onBidClose = () => {
    setBidSelect({ open: false });
  };

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

  return (
    <section className="contracts-section p-4 bg-white rounded-md shadow-md dark:bg-gray-700 dark:text-gray-300">
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

      {/* Modal Payment section */}

      {/* Modal Payment section */}
      <PageTitle>
        Award
       
      </PageTitle>

      <TableContainer className="mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>File</TableCell>
              <TableCell>Bid Owner</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bid?.length>0&&bid.map((bids) => (
              <TableRow key={bids.id}>
                
                <TableCell>
                  <span className="text-sm">
                    {bids?.Award?.date}
                  </span>
                </TableCell>
                <TableCell>
                <p className="text-sm font-semibold">
                    <a href={`${bids?.Award?.file}`} target='_blank'>
                     <FaDownload className=''/>
                  </a>
                </p>
                </TableCell>
                <TableCell>
                <span className="text-sm">
                    {bids.fullname}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Link to={`/app/awards/${bids?.Award?.id}`}>
                      <Button
                        layout="link"
                        size="icon"
                        aria-label="View"
                        style={{ color: "red" }}
                      >
                        <AiFillEye className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
}

export default AwardSection;
