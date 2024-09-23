import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Search } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { getChats, addMessage } from "../slices/chatsSlice";
import { setUserRole, clearUserRole } from '../slices/roleSice';

const ChatSidebar = ({ isOpen, onClose }) => {
    const { chats, messages_ } = useSelector((state) => state.chats);
    const dispatch = useDispatch();
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const userRole = useSelector((state) => state.userRole.role);
    const [searchTerm, setSearchTerm] = useState('');
    const [chatId, setchatId] = useState();
    const messagesEndRef = useRef(null);

    // console.log(userRole);
    console.log(chats, messages_);
    // console.log(inputMessage);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                console.log('userRole from chatSIdebar: ', userRole)
                await dispatch(getChats(userRole));
            } catch (err) {
                console.log(err);
            }
        };

        fetchChats();
    }, [dispatch]);

    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor);
        setchatId(doctor.chat_id);
        console.log(chatId);
        const doctorMessages = messages_.filter(msg => msg.chat_id === doctor.chat_id);
        setMessages(doctorMessages);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (message, chatId) => {
        if (inputMessage.trim() !== '') {


            const newMessage = {
                sender: userRole === "user" ? 'User' : 'Doctor',
                text: inputMessage,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setMessages(prevMessages => [...prevMessages, newMessage]);
            setInputMessage('');

            console.log(message, chatId);

            try {
                await dispatch(addMessage({ text: message, chatId: chatId }));
            } catch (err) {
                console.log(err);
            }

            // // Simulate a response from the doctor
            // setTimeout(() => {
            //     const responseMessage = {
            //         sender: 'doctor',
            //         text: "Thank you for your message. How can I assist you today?",
            //         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            //     };
            //     setMessages(prevMessages => [...prevMessages, responseMessage]);
            // }, 1000);
        }
    };

    const messageVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed top-0 right-0 h-full w-full sm:w-96 bg-emerald-50 shadow-lg overflow-hidden z-50 flex flex-col"
                >
                    <div className="bg-emerald-600 p-4 text-white flex justify-between items-center">
                        <h2 className="text-xl font-bold">Chat with Doctors</h2>
                        <button onClick={onClose} className="text-white hover:text-emerald-200">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-grow overflow-hidden">
                        {selectedDoctor ? (
                            <div className="flex flex-col h-full">
                                <div className="bg-emerald-100 p-4 flex items-center space-x-3">
                                    <button onClick={() => setSelectedDoctor(null)} className="text-emerald-600 hover:text-emerald-800">
                                        &larr;
                                    </button>
                                    {userRole == "user" ? (
                                        <>
                                            <img src={selectedDoctor.doctor_picture} alt={selectedDoctor.doctor_name} className="w-10 h-10 rounded-full" />
                                        </>
                                    ) : (
                                        <>
                                            <img src={selectedDoctor.user_picture} alt={selectedDoctor.user_name} className="w-10 h-10 rounded-full" />
                                        </>
                                    )}

                                    <div>
                                        {userRole == "user" ? (
                                            <>
                                                <h3 className="text-lg font-semibold">{selectedDoctor.doctor_name}</h3>
                                                <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
                                            </>
                                        ) : (
                                            <>
                                                <h3 className="text-lg font-semibold">{selectedDoctor.user_name}</h3>
                                                <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                                    {messages.map((msg, index) => (
                                        <motion.div
                                            key={index}
                                            variants={messageVariants}
                                            initial="hidden"
                                            animate="visible"
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[70%] p-3 rounded-lg ${msg.sender === 'User'
                                                ? 'bg-emerald-500 text-white'
                                                : 'bg-white text-emerald-800'
                                                }`}>
                                                <p className="break-words">{msg.text}</p>
                                                <p className="text-xs mt-1 opacity-75">{msg.time.substring(0, 5)}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                                <div className="bg-white p-4 border-t flex items-center space-x-2">
                                    <input
                                        type="text"
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage, chatId)}
                                        placeholder="Type a message..."
                                        className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
                                    />
                                    <button
                                        onClick={() => { handleSendMessage(inputMessage, chatId) }}
                                        className="bg-emerald-500 text-white p-2 rounded-r-lg hover:bg-emerald-600 transition-colors duration-300"
                                    >
                                        <Send size={20} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-y-auto h-full">
                                <div className="p-4 space-y-2">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search doctors..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full p-2 pl-10 rounded border focus:outline-none focus:ring-2 focus:ring-emerald-300"
                                        />
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    </div>
                                </div>
                                <ul className="space-y-2 p-4">
                                    {chats.map(doctor => (
                                        <motion.li
                                            key={doctor.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            onClick={() => handleDoctorSelect(doctor)}
                                            className="cursor-pointer"
                                        >

                                            <div className="flex items-center space-x-3 bg-white p-3 rounded-lg hover:bg-emerald-100 transition-colors duration-300 border border-emerald-200">
                                                {userRole == "user" ? (
                                                    <>
                                                        <img src={doctor.doctor_picture} alt={doctor.doctor_name} className="w-12 h-12 rounded-full" />
                                                    </>
                                                ) : (
                                                    <>
                                                        <img src={doctor.user_picture} alt={doctor.user_name} className="w-12 h-12 rounded-full" />
                                                    </>
                                                )}

                                                <div className="flex-grow">
                                                    <div className="flex justify-between items-baseline">
                                                        {userRole == "user" ? (
                                                            <>
                                                                <p className="font-semibold text-emerald-800">{doctor.doctor_name}</p>
                                                            </>
                                                        )
                                                            :
                                                            (
                                                                <>
                                                                    <p className="font-semibold text-emerald-800">{doctor.user_name}</p>
                                                                </>
                                                            )}

                                                        <p className="text-xs text-emerald-600">
                                                            {doctor.time_last_message.substring(0, 5)}
                                                        </p>
                                                    </div>
                                                    <p className="text-sm text-emerald-700">
                                                        {doctor.last_message.length > 30
                                                            ? doctor.last_message.substring(0, 31) + '...'
                                                            : doctor.last_message}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ChatSidebar;