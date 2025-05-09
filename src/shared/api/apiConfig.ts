import axios from "axios";
import {QueryClient} from "@tanstack/react-query";

export const API_URL = import.meta.env.VITE_API_URL;

export const apiInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

export const queryClient = new QueryClient();