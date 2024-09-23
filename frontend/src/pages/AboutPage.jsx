import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Award, Users, Clock, ChevronDown } from 'lucide-react';

const AboutUsPage = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const stats = [
    { icon: Heart, value: '10,000+', label: 'Patients Served' },
    { icon: Award, value: '50+', label: 'Awards Won' },
    { icon: Users, value: '200+', label: 'Expert Doctors' },
    { icon: Clock, value: '24/7', label: 'Support' },
  ];

  const milestones = [
    { year: '2010', event: 'Carelth founded with a mission to provide accessible healthcare' },
    { year: '2015', event: 'Expanded services to include telemedicine and remote patient monitoring' },
    { year: '2018', event: 'Opened state-of-the-art research facility for innovative medical solutions' },
    { year: '2020', event: 'Launched mobile app for easy appointment booking and health tracking' },
    { year: '2023', event: 'Established partnerships with leading hospitals worldwide' },
  ];

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100"
    >
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2091&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-emerald-900 opacity-50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-4 text-center"
          >
            About Carelth
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-center max-w-2xl"
          >
            Revolutionizing healthcare with compassion and innovation
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-12 h-12 text-white animate-bounce" />
        </motion.div>
      </section>

      {/* Mission and Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-xl p-8">
              <h2 className="text-3xl font-bold text-emerald-700 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-700">
                At Carelth, our mission is to provide accessible, high-quality healthcare to all, leveraging cutting-edge technology and compassionate care to improve lives and build healthier communities.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-xl p-8">
              <h2 className="text-3xl font-bold text-emerald-700 mb-4">Our Vision</h2>
              <p className="text-lg text-gray-700">
                We envision a world where everyone has access to personalized, efficient, and effective healthcare solutions, empowering individuals to lead healthier and happier lives.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="bg-emerald-600 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-white text-center mb-12"
          >
            Our Impact
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <stat.icon className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-emerald-100">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-emerald-700 text-center mb-12"
          >
            Our Story
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col md:flex-row items-center "
              >
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <div className="text-2xl font-bold text-emerald-500">{milestone.year}</div>
                </div>
                <div className="md:w-3/4 md:pl-8 border-l-4 border-emerald-500">
                  <p className="text-lg max-sm:text-sm max-sm:pl-2 text-gray-700">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-emerald-700 text-center mb-12"
          >
            Our Leadership Team
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {[
              { name: 'Dr. Emily Chen', role: 'Chief Medical Officer', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' },
              { name: 'Michael Thompson', role: 'Chief Technology Officer', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80' },
              { name: 'Sarah Patel', role: 'Chief Operations Officer', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80' },
            ].map((member, index) => (
              <motion.div key={index} variants={itemVariants} className="bg-white rounded-lg shadow-xl overflow-hidden">
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-emerald-700 mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-white mb-6"
          >
            Join Us in Shaping the Future of Healthcare
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-emerald-100 mb-8"
          >
            Whether you're a patient, healthcare professional, or innovator, there's a place for you in the Carelth community.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-emerald-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-emerald-100 transition duration-300"
          >
            Get Involved
          </motion.button>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutUsPage;