import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { CheckCircle2, Calendar, Clock, User, Mail, Home, Coffee, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface BookingData {
  date: string;
  time: string;
  name: string;
  email: string;
  message?: string;
}

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedBooking = localStorage.getItem('booking');
    if (savedBooking) {
      setBooking(JSON.parse(savedBooking));
    }
    setIsLoading(false);
  }, []);

  const handleNewBooking = () => {
    localStorage.removeItem('booking');
    navigate('/book');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFF9F5 0%, #FFEEE0 50%, #FFF0E6 100%)' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!booking) {
    return null;
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #FFF9F5 0%, #FFEEE0 50%, #FFF0E6 100%)' }}>
      {/* Cozy Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 soft-gradient organic-blob opacity-15 gentle-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 peach-gradient organic-blob-alt opacity-10"></div>
        <div className="absolute top-10 left-10 w-40 h-40 cozy-gradient organic-blob opacity-20"></div>
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
            <div className="w-10 h-10 cozy-gradient rounded-2xl flex items-center justify-center shadow-cozy">
              <Coffee className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-serif font-semibold text-gradient">WarmBook</span>
          </motion.div>
          
          <Button
            variant="outline"
            className="flex items-center space-x-2 hover:bg-secondary hover:text-white border-primary text-warm-dark-brown rounded-2xl shadow-soft transition-all duration-300"
            onClick={() => navigate('/')}
          >
            <Home className="w-4 h-4" />
            <span>Back to Cozy Home</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 cozy-gradient rounded-full mb-6 shadow-cozy cozy-glow">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl md:text-5xl font-serif font-semibold mb-4 text-warm-dark-brown"
            >
              <span className="text-gradient">Your Cozy</span>{' '}
              <span className="text-warm-brown">Moment</span>{' '}
              <span className="text-gradient">is Booked!</span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center justify-center space-x-2 text-lg text-warm-brown font-medium"
            >
              <Heart className="w-5 h-5 text-primary" />
              <span>We can't wait to connect with you warmly</span>
            </motion.div>
          </motion.div>

          {/* Booking Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="border-0 shadow-warm bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden">
              <CardHeader className="pb-6" style={{ background: 'linear-gradient(90deg, rgba(255,182,193,0.15) 0%, rgba(255,159,122,0.15) 100%)' }}>
                <CardTitle className="text-2xl text-center font-serif text-warm-dark-brown">Your Cozy Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-5 rounded-2xl border border-secondary/30" style={{ backgroundColor: 'rgba(255,159,122,0.15)' }}>
                      <div className="w-12 h-12 peach-gradient rounded-2xl flex items-center justify-center shadow-soft">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-warm-dark-brown">Date</div>
                        <div className="text-sm text-warm-brown font-medium">
                          {format(new Date(booking.date), 'EEEE, MMMM d, yyyy')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-5 rounded-2xl border border-accent/30" style={{ backgroundColor: 'rgba(255,182,193,0.15)' }}>
                      <div className="w-12 h-12 soft-gradient rounded-2xl flex items-center justify-center shadow-soft">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-warm-dark-brown">Time</div>
                        <div className="text-sm text-warm-brown font-medium">{booking.time}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-5 rounded-2xl border border-primary/30" style={{ backgroundColor: 'rgba(255,107,71,0.15)' }}>
                      <div className="w-12 h-12 cozy-gradient rounded-2xl flex items-center justify-center shadow-cozy">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-warm-dark-brown">Name</div>
                        <div className="text-sm text-warm-brown font-medium">{booking.name}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-5 rounded-2xl border border-green-300/50" style={{ backgroundColor: 'rgba(143,188,143,0.15)' }}>
                      <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-soft">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-warm-dark-brown">Email</div>
                        <div className="text-sm text-warm-brown font-medium">{booking.email}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {booking.message && (
                  <div className="p-6 rounded-2xl border border-secondary/20" style={{ background: 'linear-gradient(90deg, rgba(255,249,245,0.9) 0%, rgba(255,238,224,0.9) 100%)' }}>
                    <div className="font-semibold mb-3 text-warm-dark-brown">Your Warm Message</div>
                    <p className="text-sm text-warm-brown leading-relaxed font-medium italic">{booking.message}</p>
                  </div>
                )}

                <div className="pt-6 space-y-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center p-4 rounded-2xl border border-accent/30" style={{ background: 'linear-gradient(90deg, rgba(255,182,193,0.15) 0%, rgba(255,107,71,0.15) 100%)' }}
                  >
                    <p className="text-sm text-warm-brown font-medium">
                      📧 A cozy confirmation email is on its way to you
                    </p>
                  </motion.div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleNewBooking}
                      className="flex-1 cozy-gradient text-white py-4 rounded-2xl shadow-cozy hover:shadow-2xl transition-all duration-300 font-medium"
                    >
                      Book Another Cozy Moment
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate('/')}
                      className="flex-1 border-2 border-secondary text-warm-brown hover:bg-secondary hover:text-white py-4 rounded-2xl transition-all duration-300 font-medium shadow-soft"
                    >
                      Return to Warmth
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ConfirmationPage;