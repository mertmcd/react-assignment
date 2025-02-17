import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.replace("/login");
    }
    return Promise.reject(new Error(error.message));
  }
);

export const fetchProducts = async (currentPage: number, limit: number) => {
  const response = await axiosInstance.get(
    `/products?limit=${limit}&skip=${(currentPage - 1) * limit}`
  );
  return response.data;
};

export const fetchProduct = async (id: string) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};
