import { Button } from "@mui/material";
import axios from "axios";
import { url } from "config/urlConfig";
import React from "react";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiDeleteBin6Fill, RiDeleteBin6Line } from "react-icons/ri";

export const AgreementSection = ({
  agreementFile,
  setAgreementFile,
  handleAgreementDelete,
  setOpenError,
  setOpenSuccess,
  id,
}) => {
  const [getFile, setGetFile] = useState({ file: "" });
  const [agreementId, setAgreementId] = useState({ id: "" });
  const handleFileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", getFile.file);
    formData.append("EmployeeId", id);

    // console.log(formData);
    await axios
      .post(`${url}/agreement`, formData, { withCredentials: true })
      .then((resp) => {
        if (resp.data.error) {
          setOpenError({ open: true, message: `${resp.data.error}` });
        } else {
          console.log(resp.data);
          setAgreementFile({
            file: resp.data.file,
            status: true,
            id: resp.data.id,
          });

          setOpenSuccess({ open: true, message: "Successfully Added" });
        }
      })
      .catch((error) => {
        // console.log(error.response);
        setOpenError({ open: true, message: `${error.response.data.error}` });
      });
  };
  return (
    <div className=" bg-white p-2 rounded-md dark:bg-gray-800">
      {/* Files LIst section */}
      <div className="flex flex-col gap-4 mt-4">
        {agreementFile.file ? (
          <div className="relative flex justify-between items-center bg-white rounded-md p-4 shadow-md dark:bg-gray-700 dark:text-gray-300">
            <div className="flex-1 truncate">
              <a href={`${agreementFile.file}`} target="_blank">
                Agreement File
              </a>
            </div>
            <button
              onClick={() => handleAgreementDelete(agreementFile.id)}
              className="text-red-500 hover:text-red-600"
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        ) : (
          <p className="relative flex justify-between items-center bg-white dark:bg-gray-700 dark:text-gray-300 rounded-md p-4 shadow-md">
            No Agreement file choosen
          </p>
        )}
      </div>

      {/* End Files List */}

      {agreementFile.file ? (
        ""
      ) : (
        <form
          onSubmit={handleFileSubmit}
          className="flex flex-col items-center mt-2"
        >
          <label
            htmlFor="file"
            className="w-full max-w-xs p-4 rounded-lg shadow-lg cursor-pointer text-center bg-gradient-to-r from-purple-400 to-pink-500 text-black hover:from-pink-500 hover:to-purple-400 transition duration-300 dark:bg-gray-700 dark:text-gray-300"
          >
            <FaCloudUploadAlt className=" mx-auto mb-2" />
            <span className="text-sm font-semibold">Upload Doc</span>
          </label>
          <input
            type="file"
            id="file"
            className="hidden"
            name="attach"
            onChange={(e) => setGetFile({ file: e.target.files[0] })}
          />
          {getFile.file && (
            <div className="w-full max-w-xs p-2 mt-4 rounded-lg shadow-lg bg-white text-center dark:bg-gray-700 mb-3">
              <p className="text-gray-600 dark:text-gray-300">
                {getFile.file.name}
              </p>
            </div>
          )}
          <Button
            type="submit"
            className=" mt-4 mb-6 px-6 py-2 rounded-lg shadow-lg text-white bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 transition duration-300 dark:bg-gray-700"
            disabled={!getFile.file}
          >
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};
