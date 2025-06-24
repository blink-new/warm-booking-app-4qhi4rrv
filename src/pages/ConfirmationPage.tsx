import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, Clock, User, Mail, Home, Download, Leaf } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BookingData {
  date: string;
  time: string;
  name: string;
  email: string;
  message: string;
}

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bookingData = localStorage.getItem('booking');
    if (bookingData) {
      setBooking(JSON.parse(bookingData));
    } else {
      navigate('/');
    }
    setIsLoading(false);
  }, [navigate]);

  const handleDownloadCalendar = () => {
    if (!booking) return;
    
    // Create a simple ICS file for demo
    const startDate = new Date(booking.date);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour later
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//WarmBook//EN
BEGIN:VEVENT
UID:${Date.now()}@warmbook.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:Appointment with WarmBook
DESCRIPTION:${booking.message || 'Your appointment has been confirmed.'}
LOCATION:Online
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'warmbook-appointment.ics';
    link.click();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[rgba(253,247,240,0.8)] flex items-center justify-center">
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
    <div className="min-h-screen bg-[rgba(253,247,240,0.8)]">
      {/* Organic Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 sage-gradient organic-blob opacity-10 gentle-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 warm-gradient organic-blob-alt opacity-15"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6 border-b border-border/50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 warm-gradient rounded-full flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gradient">WarmBook</span>
          </div>
          
          <Button
            variant="outline"
            className="flex items-center space-x-2 hover:bg-[rgba(224,112,95,0.05)]"
            onClick={() => navigate('/')}
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center"
          >
            <div className="w-24 h-24 sage-gradient rounded-full flex items-center justify-center shadow-2xl">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-gradient">Booking Confirmed!</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your appointment has been successfully scheduled. We've sent a confirmation email with all the details.
            </p>
          </motion.div>

          {/* Booking Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="border-0 shadow-2xl bg-[rgba(253,247,240,0.8)] backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl text-center">Appointment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-[rgba(224,122,95,0.05)] rounded-xl">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">Date</div>
                        <div className="text-sm text-muted-foreground">
                          {format(new Date(booking.date), 'EEEE, MMMM d, yyyy')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 bg-[rgba(129,178,154,0.05)] rounded-xl">
                      <Clock className="w-5 h-5 text-secondary" />
                      <div>
                        <div className="font-medium">Time</div>
                        <div className="text-sm text-muted-foreground">{booking.time}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-[rgba(168,218,220,0.05)] rounded-xl">
                      <User className="w-5 h-5 text-accent" />
                      <div>
                        <div className="font-medium">Name</div>
                        <div className="text-sm text-muted-foreground">{booking.name}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 bg-[rgba(242,204,143,0.05)] rounded-xl">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-sm text-muted-foreground">{booking.email}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {booking.message && (
                  <div className="p-4 bg-[rgba(253,247,240,0.5)] rounded-xl border border-primary/10">
                    <div className="font-medium mb-2">Your Message</div>
                    <p className="text-sm text-muted-foreground">{booking.message}</p>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 justify-center pt-4">
                  <Badge variant="secondary" className="px-3 py-1">
                    ✅ Confirmed
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1">
                    📧 Email Sent
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1">
                    🔔 Reminder Set
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <Button
              onClick={handleDownloadCalendar}
              size="lg"
              className="warm-gradient text-white px-8 py-6 text-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Download className="w-5 h-5 mr-2" />
              Add to Calendar
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/book')}
              className="px-8 py-6 text-lg rounded-2xl border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
            >
              Book Another Appointment
            </Button>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="pt-12 text-center"
          >
            <p className="text-muted-foreground mb-4">
              Need to make changes or have questions?
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <a href="mailto:hello@warmbook.com" className="text-primary hover:underline">
                hello@warmbook.com
              </a>
              <span className="text-muted-foreground">•</span>
              <a href="tel:+1234567890" className="text-primary hover:underline">
                (123) 456-7890
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConfirmationPage;