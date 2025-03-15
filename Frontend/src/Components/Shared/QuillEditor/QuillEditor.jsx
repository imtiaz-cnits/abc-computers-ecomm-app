"use client";  // Ensures this runs client-side

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import "react-quill/dist/quill.snow.css";  // Import default Quill styles

const QuillEditor = ({ value, onChange }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      // Optionally, you can access the Quill editor instance directly here
      console.log(quillRef.current.getEditor());
    }
  }, []);

  return <ReactQuill ref={quillRef} value={value} onChange={onChange} theme="snow" />;
}

export default QuillEditor;
