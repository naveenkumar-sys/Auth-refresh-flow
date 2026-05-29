import axios from "axios";

//api instance with interceptors
const API = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

//add token to request automatically
API.interceptors.request.use((config) => {
    //get token from local storage  
    const token = localStorage.getItem("token");
    //if token is present, add it to the request headers and it structure are { headers: { Authorization: "Bearer " + token } }
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    //return the config to the caller and it structure are the config object  strucure is { headers: { Authorization: "Bearer " + token } }
    return config;
});

//handle 401 error and refresh token automatically and retry the request once if it fails 
API.interceptors.response.use(

    (response) => response,  //if request is successful, return response

    async (error) => {
        //if request is failed, check for 401 error and if it is, try to refresh the token

        const originalRequest = error.config;
        //prevent infinite loop
        if (error.response?.status === 401 && !originalRequest._retry) {

            originalRequest._retry = true;
            //try to refresh the token by sending a request to the refresh endpoint with cookies  
            try {

                const response =
                    await axios.post(
                        "http://localhost:3000/api/user/refresh",
                        {},
                        {
                            withCredentials: true,
                        }
                    );

                localStorage.setItem("token", response.data.accessToken);
                //retry the original request with the new token (once) and it set to config headers to make the request successful 
                originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                //retry the original request with the new token (once) and it set to config headers to make the request successful
                return API(originalRequest);

            } catch (err) {
                //if refresh token fails, remove the token and user from local storage and redirect to login page
                localStorage.removeItem("token");
                //remove user from local storage
                localStorage.removeItem("user");
                //show error message
                toast.error("Session expired. Please login again.");
                //redirect to login page
                window.location.href = "/login";
                //return the error to the caller    
                return Promise.reject(err);
            }
        }
        //if request is failed and it is not 401 error, return the error to the caller  
        return Promise.reject(error);
    }
);

export default API;