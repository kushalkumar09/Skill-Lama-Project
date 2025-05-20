import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import UploadOptionCard from "./components/UploadOptionCard.jsx";
import FileList from "./components/FileList.jsx";
import FileUpload from "./components/FileUpload.jsx";
import YouTubeIcon from "../../assets/images/YoutubeIcon.svg";
import RssFeedIcon from "../../assets/images/RssFeedIcon.svg";
import UploadFileIcon from "../../assets/images/UploadFileIcon.svg";
import useFetchData from "../../hooks/useFetchData.jsx";
import { AuthEndPoints, ProjectEndPoints } from "../../constants/endpoints.js";
import "./styles/styles.css";
import EditTranscript from "./components/EditTranscript.jsx";
import AccountSettings from "./components/AccountSettings.jsx";
import YoutubeUploadModal from "./Modals/YouTubeModal/YoutubeUploadModal.jsx"

const AddPodcast = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const projectName = location.state?.projectName ?? "Sample Project";

  //user Details
  const [userInfo, setUserInfo] = useState(null);

  const { endPoint, method } = AuthEndPoints.GetUserDetails;

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetch(endPoint, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }
        const data = await response.json();
        setUserInfo(data.user);
      } catch (error) {
        console.error("Error fetching user info:", error);
        alert("Failed to fetch user info. Please try again.");
      }
    };
    getUserInfo();
  }, []);

  const { GetPodcastEpisodes, UploadPodcast, DeletePodcast, UpdatePodcast } =
    ProjectEndPoints;
  const getProjectendpoint = GetPodcastEpisodes.endPoint(projectId);
  const uploadEndpoint = UploadPodcast.endPoint(projectId);

  const { data, loading } = useFetchData(getProjectendpoint);

  const [podcasts, setPodcasts] = useState([]);
  const [activeView, setActiveView] = useState("rss");
  const [isYoutubeModalOpen, setYoutubeModalOpen] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [openUserSetting, setOpenUserSetting] = useState(null);


  useEffect(() => {
    if (data?.podcastLinks) {
      setPodcasts(data.podcastLinks);
    }
  }, [data]);

  const handleViewChange = (view) => {
    setActiveView(view);
    setYoutubeModalOpen(view === "youtube");
  };

  const handleFileView = (file) => {
    setSelectedPodcast(file);
  };

  const handleSaveTranscript = async (updatedPodcast) => {
    try {
      const response = await fetch(
        UpdatePodcast.endPoint(projectId, updatedPodcast._id),
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            podcastTranscript: updatedPodcast.podcastTranscript,
          }),
        }
      );

      if (response.ok) {
        alert("Transcript saved!");
        setPodcasts((prev) =>
          prev.map((p) => (p._id === updatedPodcast._id ? updatedPodcast : p))
        );
        setSelectedPodcast(null);
      } else {
        alert("Failed to save transcript.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error.");
    }
  };

  const handleYouTubeUpload = async (data) => {
    try {
      const response = await fetch(uploadEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          podcastName: data.name,
          podcastTranscript: data.transcript,
        }),
      });

      if (response.ok) {
        const newPodcast = await response.json();
        setPodcasts(newPodcast.project.podcastLinks);
        setYoutubeModalOpen(false);
        setActiveView("rss");
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  const handleFileDelete = async (file) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      const response = await fetch(
        DeletePodcast.endPoint(projectId, file._id),
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        alert("File deleted successfully!");
        setPodcasts((prev) => prev.filter((p) => p._id !== file._id));
      } else {
        alert("Error deleting file.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error.");
    }
  };

  const renderActiveView = () => {
    if (loading) return <p>Loading...</p>;

    switch (activeView) {
      case "rss":
        return podcasts.length > 0 ? (
          <FileList
            episodes={podcasts}
            projectId={projectId}
            onView={handleFileView}
            onDelete={handleFileDelete}
          />
        ) : (
          <p style={{textAlign:"center"}}>No podcasts found. Upload a podcast to get started.</p>
        );
      case "upload":
        return <FileUpload />;
      case "youtube":
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar openUserSetting={()=>setOpenUserSetting(true)} userInfo={userInfo}/>
      <div className="main-content">
        <Topbar ProjectName={projectName} />

        {selectedPodcast ? (
          <EditTranscript
            podcast={selectedPodcast}
            onBack={() => setSelectedPodcast(null)}
            onSave={handleSaveTranscript}
          />
        ) :(openUserSetting)?<AccountSettings onBack={() => setOpenUserSetting(null)} userInfo={userInfo}/>: (
          <>
            <h1 className="page-title">Add Podcast</h1>

            <div className="upload-options">
              <UploadOptionCard
                title="RSS Feed"
                icon={RssFeedIcon}
                onClick={() => handleViewChange("rss")}
              />
              <UploadOptionCard
                title="Youtube Video"
                icon={YouTubeIcon}
                onClick={() => handleViewChange("youtube")}
              />
              <UploadOptionCard
                title="Upload Files"
                icon={UploadFileIcon}
                onClick={() => handleViewChange("upload")}
              />
            </div>

            {isYoutubeModalOpen && (
              <YoutubeUploadModal
                isOpen={true}
                onClose={() => {
                  setYoutubeModalOpen(false);
                  setActiveView("rss");
                }}
                onUpload={handleYouTubeUpload}
              />
            )}

            {renderActiveView()}
          </>
        )}
      </div>
    </div>
  );
};

export default AddPodcast;
