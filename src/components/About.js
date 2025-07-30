import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000"></div>

      {/* Company Overview */}
      <motion.div 
        className="mb-20 bg-white shadow-xl p-8 rounded-2xl backdrop-blur-sm bg-opacity-60"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-extrabold text-purple-700 mb-4">About Us</h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          Aagya's Pearl Export is proud to be Nagpur's first pearl farming enterprise. Established with a passion for sustainable aquaculture, our mission is to deliver premium-quality freshwater pearls while upholding eco-friendly practices. We believe in the fusion of tradition and innovation to create pearls that are not only beautiful but also responsibly farmed.
        </p>
      </motion.div>

      {/* Founder's Note */}
      <motion.div 
        className="mb-20 bg-white shadow-xl p-8 rounded-2xl backdrop-blur-sm bg-opacity-60"
        initial={{ opacity: 0, x: -100 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-pink-700 mb-3">Founder's Note</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Hello! I’m Aagya, the founder of Aagya’s Pearl Export. What started as a dream rooted in curiosity for pearl cultivation has grown into a thriving enterprise. 
          With dedication and deep research, I ventured into the world of freshwater pearl farming and created a space that values sustainability, innovation, 
          and the beauty of natural pearls. We hope to share this journey and passion with the world—one pearl at a time.
        </p>
      </motion.div>

      {/* Why Choose Us */}
      <motion.div 
        className="bg-white shadow-xl p-8 rounded-xl backdrop-blur-sm bg-opacity-60"
        initial={{ opacity: 0, x: 100 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-green-700 mb-6">Why Choose Us?</h2>
        <ul className="list-disc list-inside space-y-4 text-gray-700 text-lg">
          <li className="hover:text-green-900 transition duration-300">Sustainably farmed pearls using ethical practices</li>
          <li className="hover:text-green-900 transition duration-300">High-quality, lustrous freshwater pearls</li>
          <li className="hover:text-green-900 transition duration-300">Trained team with years of experience in aquaculture</li>
          <li className="hover:text-green-900 transition duration-300">Customized pearl orders and export services</li>
          <li className="hover:text-green-900 transition duration-300">Workshops and training programs for aspiring pearl farmers</li>
        </ul>
      </motion.div>
    </section>
  );
};

export default AboutUs;
