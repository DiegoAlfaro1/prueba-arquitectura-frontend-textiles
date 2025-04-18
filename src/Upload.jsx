import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

export default function Upload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Store the selected file
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Key should match backend expectation

    try {
      const response = await axios.post(`${API_URL}/s3/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": "api-key",
        },
        withCredentials: true,
      });

      alert("File uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <input type='file' onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
    </div>
  );
}
