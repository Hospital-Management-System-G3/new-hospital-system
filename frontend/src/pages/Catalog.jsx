import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctorsAndNurses } from '../slices/catalogSlice';
import Card from "../components/Card";
import { Search } from "lucide-react";
import ReactPaginate from 'react-paginate';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// Make sure to install react-slick:
// npm install react-slick slick-carousel

function HeroSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
    };

    const slides = [
        {
            image: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            title: "Guardians of Health",
            description: "Doctors are the frontline defenders of our well-being, tirelessly working to keep us healthy and save lives."
        },
        {
            image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            title: "Compassionate Care",
            description: "Beyond medical expertise, doctors provide emotional support and guidance through our most challenging times."
        },
        {
            image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            title: "Advancing Medicine",
            description: "Through research and innovation, doctors continually push the boundaries of medical science, improving lives worldwide."
        }
    ];

    return (
        <div className="relative overflow-hidden">
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className="relative h-[60vh] md:h-[80vh]">
                        <div 
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ 
                                backgroundImage: `url(${slide.image})`,
                            }}
                        ></div>
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">{slide.title}</h2>
                            <p className="text-xl md:text-2xl text-center max-w-3xl">{slide.description}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

function Physiotherapy() {
    // ... (previous Physiotherapy component code)
     const dispatch = useDispatch();
    const { doctorsNurses, loading, error } = useSelector((state) => state.users);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 8; // Adjust as needed

    const handleRoleChange = (e) => {
        const selectedRole = e.target.value;
        setSelectedRole(selectedRole);
        setCurrentPage(0); // Reset to first page when changing role
    };

    useEffect(() => {
        dispatch(fetchDoctorsAndNurses(selectedRole));
    }, [dispatch, selectedRole]);

    const filteredDoctorsNurses = doctorsNurses.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pageCount = Math.ceil(filteredDoctorsNurses.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentPageData = filteredDoctorsNurses.slice(offset, offset + itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-900"></div>
        </div>
    );
    if (error) {
        toast.error(`Error: ${error}`);
        return <Toaster />;
    }



    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-green-50 min-h-screen"
        >
            <HeroSlider />
            <div className="container mx-auto px-4 py-12">
                <Toaster position="top-right" />
                <h1 className="text-4xl font-bold mb-8 text-center text-green-900">Doctors and Nurses</h1>
                { <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 py-12 bg-green-50 min-h-screen"
        >
           
            <div className="mb-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="relative w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(0); // Reset to first page when searching
                        }}
                        className="pl-10 pr-4 py-3 w-full border-2 border-green-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" size={24} />
                </div>
                <select
                    value={selectedRole}
                    onChange={handleRoleChange}
                    className="border-2 border-green-300 rounded-full px-6 py-3 bg-white text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                >
                    <option value="all">All</option>
                    <option value="doctor">Doctors</option>
                    <option value="nurse">Nurses</option>
                </select>
            </div>
            <AnimatePresence>
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {currentPageData.map((user, index) => (
                        <Card key={user.id || `${user.username}-${index}`} username={user.username} profilepic={user.profilepic} role={user.role} />
                    ))}
                </motion.div>
            </AnimatePresence>
            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"flex justify-center items-center mt-8 space-x-2"}
                pageLinkClassName={"px-4 py-2 rounded-full bg-white text-green-800 border border-green-300 hover:bg-green-100 transition duration-300"}
                previousLinkClassName={"px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition duration-300"}
                nextLinkClassName={"px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition duration-300"}
                disabledClassName={"opacity-50 cursor-not-allowed"}
                activeClassName={"bg-black-500 opacity-40 text-white"}
            />
        </motion.div>}
            </div>
        </motion.div>
    );
}

export default Physiotherapy;