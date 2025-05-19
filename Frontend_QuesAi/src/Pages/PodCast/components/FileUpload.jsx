import { CloudUploadIcon } from "lucide-react";

const FileUpload = () => {
  return (
    <div className="file-upload-container">
      <CloudUploadIcon size={64} className="cloud-upload"/>
      <p className="upload-instruction">
        Select a file or drag and drop here 
        <span className="upload-subtext">
          (Podcast Media or Transcription Text)
        </span>
      </p>
      <p className="upload-filetypes">
        MP4, MOV, MP3, WAV, PDF, DOCX or TXT file
      </p>
      <button className="select-file-btn">Select File</button>
    </div>
  );
};

export default FileUpload;
