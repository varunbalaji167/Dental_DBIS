// import { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import DentistNavbar from "./DentistNavbar";
// import { useAuth } from "../contexts/AuthContext";
// import { FaUser, FaPhone, FaBriefcase, FaMedkit } from "react-icons/fa";

// const DentistProfile = () => {
//   const { dentistId } = useAuth();
//   const [formData, setFormData] = useState({
//     name: "",
//     phone_no: "",
//     experience: "",
//     specialization: "",
//   });
//   const [isUpdating, setIsUpdating] = useState(false);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}profiles/dentist`,
//           {
//             params: { dentistId },
//           }
//         );

//         if (response.data && response.data.dentist) {
//           const profile = response.data.dentist;
//           setFormData({
//             name: profile.name,
//             phone_no: profile.phone_no,
//             experience: profile.experience,
//             specialization: profile.specialization,
//           });
//           setIsUpdating(true);
//         } else {
//           setIsUpdating(false);
//         }
//       } catch (error) {
//         console.error(
//           "Error fetching dentist profile:",
//           error.response?.data || error.message
//         );
//         toast.error(
//           `Failed to fetch dentist profile: ${
//             error.response?.data?.message || error.message
//           }`
//         );
//       }
//     };

//     if (dentistId) {
//       fetchProfile();
//     }
//   }, [dentistId]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       let response;
//       if (isUpdating) {
//         response = await axios.put(
//           `${import.meta.env.VITE_API_BASE_URL}profiles/dentist`,
//           { ...formData, dentistId }
//         );
//       } else {
//         response = await axios.post(
//           `${import.meta.env.VITE_API_BASE_URL}profiles/dentist`,
//           { ...formData, dentistId }
//         );
//       }

//       toast.success(response.data.message || "Profile saved successfully.");
//       setIsUpdating(true);
//     } catch (error) {
//       toast.error(
//         `Failed to ${isUpdating ? "update" : "create"} profile: ${
//           error.response?.data?.message || error.message
//         }`
//       );
//     }
//   };

//   return (
//     <>
//       <DentistNavbar />
//       <div className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-100 py-12 px-4">
//         <div className="max-w-2xl mx-auto bg-white border border-gray-300 rounded-2xl shadow-2xl p-8">
//           <h2 className="text-3xl font-extrabold text-teal-700 text-center mb-6">
//             {isUpdating ? "Update" : "Create"} Your Profile
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Name */}
//             <div>
//               <label className="flex items-center text-sm font-semibold text-teal-900 mb-1">
//                 <FaUser className="text-teal-500 mr-2" /> Full Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-400 outline-none"
//                 required
//               />
//             </div>

//             {/* Phone Number */}
//             <div>
//               <label className="flex items-center text-sm font-semibold text-teal-900 mb-1">
//                 <FaPhone className="text-teal-500 mr-2" /> Phone Number
//               </label>
//               <input
//                 type="text"
//                 name="phone_no"
//                 value={formData.phone_no}
//                 onChange={handleChange}
//                 maxLength={10}
//                 className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-400 outline-none"
//                 required
//               />
//             </div>

//             {/* Experience */}
//             <div>
//               <label className="flex items-center text-sm font-semibold text-teal-900 mb-1">
//                 <FaBriefcase className="text-teal-500 mr-2" /> Experience
//               </label>
//               <input
//                 type="text"
//                 name="experience"
//                 value={formData.experience}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-400 outline-none"
//                 required
//               />
//             </div>

//             {/* Specialization */}
//             <div>
//               <label className="flex items-center text-sm font-semibold text-teal-900 mb-1">
//                 <FaMedkit className="text-teal-500 mr-2" /> Specialization
//               </label>
//               <input
//                 type="text"
//                 name="specialization"
//                 value={formData.specialization}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-400 outline-none"
//                 required
//               />
//             </div>

//             {/* Submit Button */}
//             <div>
//               <button
//                 type="submit"
//                 className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white text-base font-semibold rounded-xl shadow-md transition duration-300"
//               >
//                 {isUpdating ? "Update Profile" : "Create Profile"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DentistProfile;

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import DentistNavbar from "./DentistNavbar";
import { useAuth } from "../contexts/AuthContext";
import { FaUser, FaPhone, FaBriefcase, FaMedkit } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import Footer from "../Footer";

const DentistProfile = () => {
  const { dentistId } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    phone_no: "",
    experience: "",
    specialization: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchToastId = useRef(null);
  const submitToastId = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoadingProfile(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}profiles/dentist`,
          { params: { dentistId } }
        );

        if (response.data?.dentist) {
          const profile = response.data.dentist;
          setFormData({
            name: profile.name || "",
            phone_no: profile.phone_no || "",
            experience: profile.experience || "",
            specialization: profile.specialization || "",
          });
          setIsUpdating(true);
        } else {
          setIsUpdating(false);
          setFormData({
            name: "",
            phone_no: "",
            experience: "",
            specialization: "",
          });
        }
      } catch (error) {
        toast.dismiss(fetchToastId.current);
        fetchToastId.current = toast.error(
          `Failed to fetch profile: ${
            error.response?.data?.message || error.message
          }`
        );
      } finally {
        setLoadingProfile(false);
      }
    };

    if (dentistId) fetchProfile();
  }, [dentistId]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let response;
      if (isUpdating) {
        response = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}profiles/dentist`,
          { ...formData, dentistId }
        );
      } else {
        response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}profiles/dentist`,
          { ...formData, dentistId }
        );
      }

      toast.dismiss(submitToastId.current);
      submitToastId.current = toast.success(
        isUpdating
          ? "Profile updated successfully!"
          : "Profile created successfully!"
      );
      setIsUpdating(true);
    } catch (error) {
      toast.dismiss(submitToastId.current);
      submitToastId.current = toast.error(
        `Failed to ${isUpdating ? "update" : "create"} profile: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100">
      <DentistNavbar />
      <div className="flex justify-center items-center py-12 px-4">
        <div className="w-full max-w-2xl p-8 bg-white border border-gray-200 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-extrabold text-center text-teal-700 mb-6">
            {isUpdating ? "Update" : "Create"} Your Profile
          </h2>

          {loadingProfile ? (
            <div className="flex justify-center text-teal-600">
              <Loader2 className="animate-spin w-6 h-6" />
              <span className="ml-2">Loading profile...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Input Fields */}
              {[
                {
                  icon: <FaUser />,
                  label: "Full Name",
                  name: "name",
                  type: "text",
                },
                {
                  icon: <FaPhone />,
                  label: "Phone Number",
                  name: "phone_no",
                  type: "text",
                  maxLength: 10,
                },
                {
                  icon: <FaBriefcase />,
                  label: "Experience",
                  name: "experience",
                  type: "text",
                },
                {
                  icon: <FaMedkit />,
                  label: "Specialization",
                  name: "specialization",
                  type: "text",
                },
              ].map(({ icon, label, name, type, maxLength }) => (
                <div key={name}>
                  <label className="flex items-center text-sm font-semibold text-teal-900 mb-1">
                    <span className="text-teal-500 mr-2">{icon}</span> {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    maxLength={maxLength}
                    className="w-full p-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    required
                  />
                </div>
              ))}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white text-base font-semibold rounded-xl shadow-md transition disabled:opacity-60 flex items-center justify-center"
                >
                  {submitting && (
                    <Loader2 className="animate-spin h-5 w-5 mr-2 text-white" />
                  )}
                  {isUpdating ? "Update Profile" : "Save Profile"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default DentistProfile;
