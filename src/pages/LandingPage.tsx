import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle2, ArrowRight, Leaf, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      icon: Calendar,
      title: "Seamless Scheduling",
      description: "Pick your perfect time with our intuitive calendar interface"
    },
    {
      icon: Clock,
      title: "Smart Time Management", 
      description: "Automatically sync with your availability and preferences"
    },
    {
      icon: CheckCircle2,
      title: "Instant Confirmation",
      description: "Get immediate confirmation with calendar invites"
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Organic Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 right-20 w-64 h-64 warm-gradient organic-blob opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 sage-gradient organic-blob-alt opacity-15"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 organic-blob opacity-10"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-10 h-10 warm-gradient rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gradient">WarmBook</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button 
              variant="outline" 
              className="border-primary/20 hover:bg-primary/5 transition-all duration-300"
              onClick={() => navigate('/book')}
            >
              Get Started
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
            <div className="space-y-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-flex items-center space-x-2 bg-[rgba(224,122,95,0.1)] px-4 py-2 rounded-full text-sm font-medium text-primary"
              >
                <Heart className="w-4 h-4" />
                <span>Made with care for busy people</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="text-gradient">Booking</span>
                <br />
                <span className="text-foreground">Made Simple</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Experience the warmth of seamless scheduling. Our organic approach to appointment booking makes connecting effortless and delightful.
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
                className="warm-gradient text-white px-8 py-6 text-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate('/book')}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="flex items-center space-x-2">
                  <span>Book Your Time</span>
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
                className="px-8 py-6 text-lg rounded-2xl border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                Watch Demo
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-gradient">WarmBook</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with intention, designed for connection. Every feature crafted to make scheduling feel natural and stress-free.
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
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto warm-gradient rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
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
            className="bg-[linear-gradient(to_right,rgba(224,122,95,0.1)_0%,rgba(168,218,220,0.1)_50%,rgba(129,178,154,0.1)_100%)] rounded-3xl p-12 backdrop-blur-sm border border-primary/10"
          >
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Transform Your Scheduling?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands who've discovered the joy of effortless appointment booking. Your time is precious – let's make every moment count.
              </p>
              <Button
                size="lg"
                className="warm-gradient text-white px-10 py-6 text-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 gentle-float"
                onClick={() => navigate('/book')}
              >
                Start Booking Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;