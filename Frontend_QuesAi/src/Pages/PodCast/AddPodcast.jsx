import { useState } from "react";
import { useLocation, useParams } from "react-router";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import UploadOptionCard from "./components/UploadOptionCard.jsx";
import FileList from "./components/FileList.jsx";
import FileUpload from "./components/FileUpload.jsx";
import YoutubeUploadModal from "./Modals/YouTubeModal/YouTubeUploadModal.jsx";
import YouTubeIcon from "../../assets/images/YoutubeIcon.svg";
import RssFeedIcon from "../../assets/images/RssFeedIcon.svg";
import UploadFileIcon from "../../assets/images/UploadFileIcon.svg";
import useFetchData from "../../hooks/useFetchData.jsx";
import { ProjectEndPoints } from "../../constants/endpoints.js";
import "./styles/styles.css";

const AddPodcast = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const projectName = location.state?.projectName ?? "Sample Project";

  const { GetAllProjects ,UploadPodcast} = ProjectEndPoints
  const {endpoint} = GetAllProjects;
  const uploadEndpoint = UploadPodcast.endPoint(projectId);

  const { data, loading } = useFetchData(endpoint);

  const [isYoutubeModalOpen, setYoutubeModalOpen] = useState(false);

  const toogleYouTubeUpload = () => {
    setYoutubeModalOpen((prev) => !prev);
  };

  const handleYouTubeUpload = async (data) => {
    console.log("Uploaded YouTube data:", data);

    const response = await fetch(uploadEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({podcastName: data.name,podcastTranscript:data.transcript}),
    });
    console.log(response);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Topbar ProjectName={projectName} />
        <h1 className="page-title">Add Podcast</h1>
        <div className="upload-options">
          <UploadOptionCard title="RSS Feed" icon={RssFeedIcon} />
          <UploadOptionCard
            title="Youtube Video"
            icon={YouTubeIcon}
            openModal={toogleYouTubeUpload}
          />
          <UploadOptionCard title="Upload Files" icon={UploadFileIcon} />
        </div>

        {isYoutubeModalOpen && (
          <YoutubeUploadModal
            isOpen={toogleYouTubeUpload}
            onClose={toogleYouTubeUpload}
            onUpload={handleYouTubeUpload}
          />
        )}

        {loading && <p>Loading...</p>}
        {data ? <FileList /> : <FileUpload />}
      </div>
    </div>
  );
};

export default AddPodcast;
