import axios from "axios";
import toast from "react-hot-toast";

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
        //this condition prevents infinite loop for the request to refresh endpoint When the failed request is:/user/refresh the interceptor says:"This IS the refresh endpoint itself. Don't try refreshing again. Just return the error."
        if (originalRequest.url === "/user/refresh") {
            return Promise.reject(error);
        }
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

//complerte of this interceptor flow diagram is:
// Create Product
//      ↓
// API.post("/product/create")
//      ↓
// Access token expired
//      ↓
// Backend returns 401
//      ↓
// Response Interceptor catches 401
//      ↓
// POST /user/refresh -> (use axios.post) (IMPORTANT: NOT API) -> 401 agin and again because we are using API.post instead of axios.post  and API is intercepting all the requests including the refresh token request
//      ↓
// New access token received
//      ↓
// originalRequest.headers.Authorization = newToken
//      ↓
// return API(originalRequest)
//      ↓
// Create Product called AGAIN automatically
//      ↓
// 200 Success