import React, { useState } from "react";
import ReactQuill from "react-quill";
import "../../assets/css/requestPages.css";
import "../../assets/css/quill.css";
import "../../../node_modules/react-quill/dist/quill.snow.css";

export default function OthersRequest() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e);
  };

  return (
    <div className=" my-div mt-6 mb-16 dark:text-gray-200">
      <section className=" not_printable">
        <p className=" text-center font-semibold text-2xl my-5">
          SRS-RB Letter Request
        </p>
        <ReactQuill
          placeholder="Write Something Here...."
          modules={OthersRequest.modules}
          value={value}
          onChange={handleChange}
        />
        <p className=" font-semibold text-center text-2xl py-8">
          Letter request preview
        </p>

        <div className="flex justify-center mb-6">
          <button
            className=" rounded-md px-16 py-2 border border-gray-300"
            onClick={() => {
              window.print();
            }}
          >
            Print
          </button>
        </div>
      </section>

      <section className=" quill-preview px-8 py-8  ">
        <div dangerouslySetInnerHTML={{ __html: value }} />
      </section>
    </div>
  );
}

OthersRequest.modules = {
  toolbar: [
    [{ header: ["3", false] }, { header: 1 }, { header: 2 }],
    ["bold", "italic", "underline", "strike"],
    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],
    [{ list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["image"],
    [{ color: [] }],
    ["clean"],
  ],
};
