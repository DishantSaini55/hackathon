import React from 'react'
import { motion } from 'framer-motion'
import { Instagram, Linkedin, Mail } from 'lucide-react'

const Team = () => {
  const teamMembers = [
    {
      name: 'Dishant',
      // role: 'FULLSTACK DEVELOPER',
      image: '/Dishu.jpg', // Using Dishant's preferred photo
      bio: 'Third year ECE student passionate about full-stack development and campus innovation.',
      social: {
        instagram: 'https://www.instagram.com/dishantsaini55/', // Add Instagram link when available
        linkedin: 'https://www.linkedin.com/in/dishant-saini-557829293/',
        email: 'dishantsaini2903@gmail.com'
      }
    },
    {
      name: 'Rohit',
      // role: 'FRONTEND DEVELOPER',
      image: '/ROHIT.jpg', // Using Rohit's actual photo
      bio: 'Frontend specialist and creative designer, building robust and scalable campus solutions with modern UI/UX.',
      social: { 
        instagram: 'https://www.instagram.com/hr__rohit/', // Add Instagram link when available
        linkedin: 'https://www.linkedin.com/in/rohit-verma-9981072ba/',
        email: 'rohitverma343536@gmail.com'
      }
    },
    {
      name: 'Nishant',
      // role: 'FULLSTACK DEVELOPER',
      image: '/Nishu.jpg', // Placeholder image
      bio: 'Full stack developer and map specialist skilled in building end-to-end web solutions with interactive geolocation features.',
      social: {
        instagram: 'https://www.instagram.com/nishant.offi/', // Add Instagram link when available
        linkedin: 'https://www.linkedin.com/in/nishant-raj-nsut27/',
        email: 'nishantraj30488@gmail.com'
      }
    },
    {
      name: 'Shubham',
      // role: 'FRONTEND DEVELOPER',
      image: '/Shubhu.jpg', // Using Shubham's actual photo
      bio: 'Frontend developer and data collector with expertise in Canva, delivering scalable solutions with clean design and impactful visuals.',
      social: {
        instagram: 'https://www.instagram.com/viper.charlie/', // Add Instagram link when available
        linkedin: 'https://www.linkedin.com/in/shubham-prakash-708714294/',
        email: 'vipercharlie2@gmail.com'
      }
    }
  ]

  return (
    <section id="team" className="py-16 lg:py-24 bg-black relative overflow-hidden">
      {/* Floating gradient blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 -right-20 w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-amber-500 rounded-full blur-3xl opacity-15"></div>
      
      <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="tracking-tighter text-white font-sans text-4xl sm:text-5xl md:text-6xl mb-6">
            Meet the{' '}
            <span className="block font-serif text-5xl sm:text-6xl md:text-7xl italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
              team
            </span>
          </h2>
          <p className="font-sans text-lg font-normal leading-8 text-gray-400 max-w-3xl mx-auto">
            Meet the students who've lived it, struggled through it, and now want to fix it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 shadow-lg backdrop-blur-xl bg-white/5 group hover:shadow-2xl transition-all duration-300 min-h-[420px]"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-600/20 blur-2xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
              
              <div className="relative z-10 p-6 text-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative mb-6"
                >
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-white/20 shadow-xl">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md">
                  {member.name}
                </h3>
                
                <p className="text-cyan-400 font-semibold mb-3">
                  {/* {member.role} */}
                </p>
                
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {member.bio}
                </p>

                <div className="flex justify-center space-x-3">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href={member.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200 backdrop-blur-xl border border-white/20"
                  >
                    <Instagram className="w-4 h-4 text-white" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200 backdrop-blur-xl border border-white/20"
                  >
                    <Linkedin className="w-4 h-4 text-white" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href={`mailto:${member.social.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200 backdrop-blur-xl border border-white/20"
                  >
                    <Mail className="w-4 h-4 text-white" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team