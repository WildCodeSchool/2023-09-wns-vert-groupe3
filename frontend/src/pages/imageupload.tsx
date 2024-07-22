import axios from "axios";
import { useState } from "react";

const UploadPage = () => {
  const [file, setFile] = useState<File>();
  const [imageURL, setImageURL] = useState<string>();
  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (file) {
             const url = "http://localhost:8000/upload";
            // const url = "/upload";
            const formData = new FormData();
            formData.append("file", file, file.name);
            try {
              const response = await axios.post(url, formData);
              setImageURL(`http://localhost:8000${response.data.filename}`);
            //   setImageURL(response.data.filename);
              console.log("response data filename : ", response.data.filename);
              
            } catch (err) {
              console.log("error", err);
            }
          } else {
            alert("select a file to upload");
          }
        }}
      >
        <h1>React File Upload</h1>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <button type="submit">Upload Image</button>
      </form>

      {imageURL ? (         
         <>
         {console.log("image URL : ", imageURL)}
          <br />
          <img
            width={500}
            alt="uploadedImg"
            src={imageURL}
          />
          <br />
        </>
      ) : null}
      <button
        onClick={() => {
          console.log("post this to backend: " + imageURL);
        }}
      >
        Add new image
      </button>
    </div>
  );
};

export default UploadPage;
