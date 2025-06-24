import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle2, ArrowRight, Coffee, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      icon: Calendar,
      title: "Cozy Scheduling",
      description: "Pick your perfect time in a warm, welcoming interface that feels like home"
    },
    {
      icon: Clock,
      title: "Gentle Time Flow", 
      description: "Seamlessly sync with your natural rhythm and favorite moments"
    },
    {
      icon: CheckCircle2,
      title: "Instant Comfort",
      description: "Get peaceful confirmation with a touch of warmth in every detail"
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFF9F5 0%, #FFEEE0 50%, #FFF0E6 100%)' }}>
      {/* Warm Cozy Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 right-20 w-64 h-64 cozy-gradient organic-blob opacity-20 gentle-float"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 peach-gradient organic-blob-alt opacity-15"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 soft-gradient organic-blob opacity-10"></div>
        <div className="absolute top-10 left-10 w-32 h-32 autumn-gradient organic-blob opacity-25"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-12 h-12 cozy-gradient rounded-2xl flex items-center justify-center shadow-cozy cozy-glow">
              <Coffee className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-serif font-semibold text-gradient">WarmBook</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button 
              variant="outline" 
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 font-medium rounded-2xl px-6 py-2.5 shadow-soft"
              onClick={() => navigate('/book')}
            >
              Get Cozy
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-flex items-center space-x-3 px-6 py-3 rounded-full text-sm font-medium text-warm-dark-brown border-2 border-accent/40 shadow-soft"
                style={{ backgroundColor: 'rgba(255, 182, 193, 0.15)' }}
              >
                <Heart className="w-4 h-4 text-primary" />
                <span>Crafted with love for meaningful connections</span>
              </motion.div>
              
              <h1 className="text-6xl md:text-8xl font-serif font-semibold leading-tight text-warm-dark-brown">
                <span className="text-gradient">Warm</span>
                <br />
                <span className="text-warm-brown">Booking</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-warm-brown max-w-3xl mx-auto leading-relaxed font-medium">
                Step into a world where scheduling feels as comfortable as your favorite sweater. Every appointment becomes a gentle moment of connection.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
            >
              <Button
                size="lg"
                className="cozy-gradient text-white px-10 py-6 text-lg rounded-3xl hover:shadow-2xl shadow-cozy transition-all duration-300 transform hover:scale-105 font-medium cozy-glow"
                onClick={() => navigate('/book')}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="flex items-center space-x-3">
                  <span>Book Your Moment</span>
                  <motion.div
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="px-10 py-6 text-lg rounded-3xl border-2 border-secondary text-warm-brown hover:bg-secondary hover:text-white transition-all duration-300 font-medium shadow-warm"
              >
                Feel the Warmth
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-semibold mb-6 text-warm-dark-brown">
              Why Choose <span className="text-gradient">WarmBook</span>?
            </h2>
            <p className="text-xl text-warm-brown max-w-2xl mx-auto font-medium leading-relaxed">
              Every feature designed with care, every interaction filled with warmth. This is scheduling that feels like a warm hug.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full border-0 shadow-warm bg-white/95 backdrop-blur-sm hover:shadow-2xl hover:bg-white transition-all duration-300 rounded-3xl overflow-hidden">
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="w-20 h-20 mx-auto cozy-gradient rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-cozy cozy-glow">
                      <feature.icon className="w-9 h-9 text-white" />
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-warm-dark-brown">
                      {feature.title}
                    </h3>
                    <p className="text-warm-brown leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="autumn-gradient rounded-[2rem] p-12 backdrop-blur-sm border-2 border-accent/20 shadow-warm cozy-glow"
          >
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-serif font-semibold text-white">
                Ready for Cozy Scheduling?
              </h2>
              <p className="text-xl text-white/95 max-w-2xl mx-auto font-medium leading-relaxed">
                Join our warm community where every booking feels personal, every moment matters, and scheduling becomes a delightful ritual.
              </p>
              <Button
                size="lg"
                className="bg-white text-primary px-12 py-6 text-lg rounded-3xl hover:shadow-2xl shadow-lg transition-all duration-300 transform hover:scale-105 gentle-float font-medium hover:bg-warm-cream"
                onClick={() => navigate('/book')}
              >
                Start Your Journey
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;