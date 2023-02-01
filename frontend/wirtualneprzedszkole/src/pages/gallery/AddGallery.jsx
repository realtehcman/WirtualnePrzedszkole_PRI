import React from "react";
import "./Gallery.scss";
import axios from "axios";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const AddGallery = ({ files, setFiles, removeFile }) => {
  const uploadHandler = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    file.isUploading = true;
    setFiles([...files, file]);

    // upload file
    const formData = new FormData();
    formData.append("newFile", file, file.name);
    axios
      .post("http://localhost:8080/api/file/uploadMultiFiles/152", formData)
      .then((res) => {
        file.isUploading = false;
        setFiles([...files, file]);
      })
      .catch((err) => {
        // inform the user
        console.error(err);
        removeFile(file.name);
      });
  };

  return (
    <>
      <div class="file-card">
        <div className="file-inputs">
          <input type="file" onChange={uploadHandler} />
          <button>
            <i>
              <UploadFileIcon></UploadFileIcon>
            </i>
            Upload
          </button>
        </div>

        <p className="main">Supported files</p>
        <p className="info">PDF, JPG, PNG</p>
      </div>
    </>
  );
};

export default AddGallery;
