// const backendUrl = import.meta.env.VITE_LOCAL_API_URL;
const backendUrl = import.meta.env.VITE_SERVER_API_URL;

const projectUrl = `${backendUrl}/projects`;
const authUrl = `${backendUrl}/userAuthentication`;

export const ProjectEndPoints = {
  GetAllProjects: {
    endPoint: `${projectUrl}/getAllProjects`,
    method: "GET",
  },
  GetPodcastEpisodes: {
    endPoint: (projectId) => `${projectUrl}/${projectId}/getEpisodes`,
    method: "GET",
  },
  CreateProject: {
    endPoint: `${projectUrl}/create-newproject`,
    method: "POST",
  },

  UploadPodcast: {
    endPoint: (projectId) => `${projectUrl}/${projectId}/upload`,
    method: "POST",
  },

  DeletePodcast: {
    endPoint: (projectId, podcastId) =>
      `${projectUrl}/${projectId}/podcast/${podcastId}`,
    method: "DELETE",
  },
  UpdatePodcast: {
    endPoint: (projectId, podcastId) =>
      `${projectUrl}/${projectId}/podcast/${podcastId}`,
    method: "PATCH",
  },
};

export const AuthEndPoints = {
  SignUp: {
    endPoint: `${authUrl}/usersignin`,
    method: "POST",
  },
  Login: {
    endPoint: `${authUrl}/userlogin`,
    method: "POST",
  },

  GetUserDetails: {
    endPoint: `${authUrl}/userDetails`,
    method: "GET",
  },
};
