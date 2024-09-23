import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import ChatSidebar from '../componentUser/chatSidebar';
 
import { useDispatch, useSelector } from "react-redux";
import { setUserRole, clearUserRole } from '../slices/roleSice';
 
import { Heart, Activity, Clipboard, Hospital, Calendar, Users, HeartPulse, Stethoscope, Thermometer, Pill, BriefcaseMedical, Menu, X, Facebook, Twitter, Instagram, Linkedin, MessageCircle, Send, Search } from 'lucide-react';
import Map from './Map';


const servicesData = [
    { title: 'General Checkup', icon: Activity, description: 'Comprehensive health assessments for your well-being.' },
    { title: 'Specialized Care', icon: Heart, description: 'Expert treatment for specific health conditions.' },
    { title: 'Emergency Services', icon: Hospital, description: '24/7 rapid response for urgent medical needs.' },
];

const ServicePopup = ({ service, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <motion.div
            className="bg-white rounded-lg p-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
            <p>{service.description}</p>
            <button className="mt-4 bg-emerald-500 text-white px-4 py-2 rounded" onClick={onClose}>
                Close
            </button>
        </motion.div>
    </div>
);


const floatingIcons = [Heart, Activity, Clipboard, Hospital, Calendar, Users, Stethoscope, Thermometer, Pill, BriefcaseMedical, Heart, Activity, Clipboard, Hospital, Calendar];

const FloatingIcon = ({ Icon, delay }) => {
    const controls = useAnimation();

    
    useEffect(() => {
        controls.start({
            y: [0, Math.random() * 40 - 20],
            x: [0, Math.random() * 40 - 20],
            transition: {

                y: { duration: 2, repeat: Infinity, repeatType: 'reverse', delay },
                x: { duration: 2, repeat: Infinity, repeatType: 'reverse', delay: delay + 0.5 }
            }
        });
    }, [controls, delay]);

    return (
        <motion.div
            className="absolute"
            animate={controls}
            style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
            }}
        >
            <Icon size={24} className="text-orange-400 opacity-50" />
        </motion.div>
    );
};


const AutoSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { title: "Expert Care", description: "Our team of board-certified specialists ensures top-quality healthcare, utilizing the latest medical advancements for your well-being.", icon: Stethoscope },
        { title: "Modern Facilities", description: "Experience healthcare in our state-of-the-art facilities, equipped with cutting-edge technology for accurate diagnosis and effective treatment.", icon: Hospital },
        { title: "Patient-Centric Approach", description: "Your comfort and well-being are our top priorities. We provide personalized care tailored to your unique health needs and preferences.", icon: Heart },
        { title: "24/7 Support", description: "Our dedicated team is available round the clock to address your health concerns and provide immediate assistance whenever you need it.", icon: Calendar },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="bg-emerald-100 py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    {(() => {
                        const Icon = slides[currentSlide].icon;
                        return <Icon size={64} className="text-emerald-600 mx-auto mb-4" />;
                    })()}
                    <h2 className="text-3xl font-bold mb-4 text-emerald-800">{slides[currentSlide].title}</h2>
                    <p className="text-xl text-emerald-700">{slides[currentSlide].description}</p>
                </motion.div>
            </div>
        </section>
    );
};

const LoadingScreen = ({ onLoadingComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onLoadingComplete();
        }, 2000);
        return () => clearTimeout(timer);
    }, [onLoadingComplete]);

    return (
        <div className="fixed inset-0 bg-emerald-500 flex flex-col items-center justify-center z-50">
            <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: [0, 1.2, 1], rotate: 360 }}
                transition={{ duration: 2, times: [0, 0.8, 1] }}
                className="text-white mb-4"
            >
                <HeartPulse size={100} />
            </motion.div>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-white text-3xl font-bold"
            >
                Your Health, Our Priority
            </motion.h2>
        </div>
    );
};

const AutoSliderImage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { title: "State-of-the-Art Facilities", image: "https://www.purapharm.com/wp-content/uploads/2015/04/IMG_5134-hi-res-retouch-28Mar18-resized.jpg" },
        { title: "Dedicated Healthcare Professionals", image: "https://medicolink.com/wp-content/uploads/2019/04/medical-doctor-jobs-in-denmark-with-medical-recruitment-company-2-1030x427.png" },
        { title: "Patient-Centric Care", image: "https://www.intelichart.com/hs-fs/hubfs/Patient-Centric%20Care.png?width=914&name=Patient-Centric%20Care.png" },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-96 overflow-hidden">
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                >
                    <img src={slides[currentSlide].image} alt={slides[currentSlide].title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <h2 className="text-4xl font-bold text-white text-center">{slides[currentSlide].title}</h2>
                    </div>
                </motion.div>
            </AnimatePresence>
        </section>
    );
};

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const userRole = useSelector((state) => state.userRole.role);

    console.log(userRole);

    const handleLoadingComplete = () => {
        setIsLoading(false);
    };

    if (isLoading) {
        return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100">

            <main>
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video 
      src="https://v1.pinimg.com/videos/iht/720p/3c/c5/cf/3cc5cf54cf55a508865efc08f97a60db.mp4"
        autoPlay 
        loop 
        muted 
        className="absolute w-full h-full object-cover"
      >
        {/* <source src="../componentUser/video/video.mp4" type="video/mp4" />
        Your browser does not support the video tag. */}
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          Your Health, Our Priority
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8"
        >
          Experience modern healthcare with the help of experienced doctors.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-emerald-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-emerald-600 transition duration-300 text-lg"
        >
          Get Started
        </motion.button>
      </div>
    </section>

    <section className="py-20 bg-white relative overflow-hidden px-16 max-sm:px-1">
                    <div className="container mx-auto px-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl font-bold text-center mb-12 text-emerald-900"
                        >
                            Our Services
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {servicesData.map((service, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-emerald-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300"
                                >
                                    <service.icon className="text-emerald-500 w-16 h-16 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold mb-2 text-emerald-900">{service.title}</h3>
                                    <p className="text-emerald-800">{service.description}</p>
                                    {/* <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="mt-4 bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600 transition duration-300"
                                        onClick={() => setSelectedService(service)}
                                    >
                                        Learn More
                                    </motion.button> */}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {selectedService && (
                    <AnimatePresence>
                        <ServicePopup service={selectedService} onClose={() => setSelectedService(null)} />
                    </AnimatePresence>
                )}

          

                <AutoSliderImage />

                <section className="py-20 bg-emerald-600 text-white relative overflow-hidden">
                    <div className="container mx-auto px-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl font-bold text-center mb-12"
                        >
                            Why Choose Us
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {[
                                { value: '5000+', label: 'Patients Treated' },
                                { value: '98%', label: 'Patient Satisfaction' },
                                { value: '50+', label: 'Specialist Doctors' },
                                { value: '24/7', label: 'Patient Support' },
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                                    <p className="text-xl">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    {floatingIcons.map((Icon, index) => (
                        <FloatingIcon
                            key={index}
                            Icon={Icon}
                            delay={index * 0.2}
                        />
                    ))}
                </section>

                <section className="py-20 bg-white relative overflow-hidden px-16 max-sm:px-1">
                    <div className="container mx-auto px-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl font-bold text-center mb-12 text-emerald-900"
                        >
                            Featured Services
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { title: 'Modern Technology', description: 'State-of-the-art equipment for accurate diagnosis', image: 'https://www.raconteur.net/wp-content/uploads/2021/04/Future-hospital.jpg' },
                                { title: 'Expert Care', description: 'Experienced doctors providing personalized treatment', image: 'https://content.gallup.com/origin/gallupinc/GallupSpaces/Production/Cms/WORKPLACEV9CMS/2bgqjhmw_0iifqf_p8twtq.jpg' },
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-emerald-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300"
                                >
                                    <img src={feature.image} alt={feature.title} className="w-full h-64 object-cover" />
                                    <div className="p-6">
                                        <h3 className="text-2xl font-semibold mb-2 text-emerald-900">{feature.title}</h3>
                                        <p className="text-emerald-800">{feature.description}</p>
                                        {/* <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="mt-4 bg-emerald-500 text-white px-6 py-2 rounded-full hover:bg-emerald-600 transition duration-300"
                                        >
                                            Learn More
                                        </motion.button> */}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    {floatingIcons.map((Icon, index) => (
                        <FloatingIcon
                            key={index}
                            Icon={Icon}
                            delay={index * 0.2}
                        />
                    ))}
                </section>
            </main>

            <AutoSlider />



            {userRole == null ? (
                <>

                </>
            ) : (
                <>
                    <motion.button
                        className="fixed bottom-4 right-4 bg-emerald-500 text-white p-4 rounded-full shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsChatOpen(true)}
                    >
                        <MessageCircle size={24} />
                    </motion.button>
                </>
            )}

            <ChatSidebar isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />


 
        </div>
    );
};

export default HomePage;