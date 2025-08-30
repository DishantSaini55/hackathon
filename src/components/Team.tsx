import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

const Team = () => {
  const teamMembers = [
    {
      name: 'Dishant',
      role: 'DEVELOPER',
      image: '/DISHANT1.jpg', // Using Dishant's preferred photo
      bio: 'Third year ECE student passionate about full-stack development and campus innovation.',
      social: {
        github: '#', // Add GitHub link when available
        linkedin: '#',
        email: 'dishant@nsut.ac.in'
      }
    },
    {
      name: 'Rohit',
      role: 'DEVELOPER',
      image: '/ROHIT.jpg', // Using Rohit's actual photo
      bio: 'Backend specialist focused on robust and scalable campus solutions.',
      social: {
        github: '#', // Add GitHub link when available
        linkedin: '#',
        email: 'rohit@nsut.ac.in'
      }
    },
    {
      name: 'Nishant',
      role: 'DEVELOPER',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400', // Placeholder image
      bio: 'Frontend developer creating intuitive user experiences for campus applications.',
      social: {
        github: '#', // Add GitHub link when available
        linkedin: '#',
        email: 'nishant@nsut.ac.in'
      }
    },
    {
      name: 'Shubham',
      role: 'DEVELOPER',
      image: '/SHUBHAM.jpg', // Using Shubham's actual photo
      bio: 'Creative designer focused on making campus navigation simple and beautiful.',
      social: {
        github: '#', // Add GitHub link when available
        linkedin: '#',
        email: 'shubham@nsut.ac.in'
      }
    }
  ]

  return (
    <section id="team" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Meet the team
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Meet the students who've lived it, struggled through it, and now want to fix it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="card p-6 text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative mb-6"
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    style={{ 
                      objectPosition: member.name === 'Dishant' ? 'center 30%' : 'center center',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-genie-500/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {member.name}
              </h3>
              
              <p className="text-genie-600 font-semibold mb-3">
                {member.role}
              </p>
              
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {member.bio}
              </p>

              <div className="flex justify-center space-x-3">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={member.social.github}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
                >
                  <Github className="w-4 h-4 text-gray-600" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={member.social.linkedin}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
                >
                  <Linkedin className="w-4 h-4 text-gray-600" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={`mailto:${member.social.email}`}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 text-gray-600" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary"
          >
            See all team
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Team