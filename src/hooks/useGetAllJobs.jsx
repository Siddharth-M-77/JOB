// import { setAllJobs } from '@/redux/jobSlice'
// import { JOB_API_END_POINT } from '@/utils/constant'
// import axios from 'axios'
// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// const useGetAllJobs = () => {
//     const dispatch = useDispatch();
//     const {searchedQuery} = useSelector(store=>store.job);
//     useEffect(()=>{
//         const fetchAllJobs = async () => {
//             try {
//                 const res = await axios.get(`${JOB_API_END_POINT}/getAllJobs?keyword=${searchedQuery}`,{withCredentials:true});
//                 if(res.data.success){
//                     dispatch(setAllJobs(res.data.jobs));
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchAllJobs();
//     },[])
// }

// export default useGetAllJobs
import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                // Get the token from local storage
                const token = localStorage.getItem('token'); // Replace 'token' with your actual token key

                const res = await axios.get(`${JOB_API_END_POINT}/getAllJobs?keyword=${searchedQuery}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true,
                });

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                } else {
                    console.error("Error fetching jobs:", res.data.message);
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchAllJobs();
    }, [searchedQuery, dispatch])
};

export default useGetAllJobs;
