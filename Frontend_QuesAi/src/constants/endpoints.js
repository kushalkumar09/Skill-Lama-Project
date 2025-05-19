const backendUrl = import.meta.env.VITE_LOCAL_API_URL;
// const backendUrl = import.meta.env.VITE_SERVER_API_URL;

const projectUrl = `${backendUrl}/projects`;
const authUrl = `${backendUrl}/userAuthentication`;

export const ProjectEndPoints = {
  GetAllProjects: {
    endPoint: `${projectUrl}/getAllProjects`,
    method: "GET",
  },
  CreateProject: {
    endPoint: `${projectUrl}/create-newproject`,
    method: "POST",
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
};
