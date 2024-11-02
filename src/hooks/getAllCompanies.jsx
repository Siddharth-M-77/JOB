import { setCompanies } from "@/redux/companySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT } from "@/utils/constant";

// Convert this into a custom hook
const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });
        
        if (response.data.message) {
          dispatch(setCompanies(response.data.companies)); // Dispatching action to update Redux state
          console.log("Fetched Companies:", response.data.companies);
        }
      } catch (error) {
        console.error("Error fetching companies", error); // Add error handling
      }
    };
    
    fetchCompanies();
  }, [dispatch]); 
};

export default useGetAllCompanies;
