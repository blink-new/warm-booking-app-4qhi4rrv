import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Clock, User, Mail, MessageSquare, Home, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const BookingPage = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedTime && formData.name && formData.email) {
      const booking = {
        date: selectedDate.toISOString(),
        time: selectedTime,
        ...formData
      };
      localStorage.setItem('booking', JSON.stringify(booking));
      navigate('/confirmed');
    }
  };

  const isFormValid = selectedDate && selectedTime && formData.name && formData.email;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F3] via-[#FFEFE6] to-[#FFF0E6]">
      {/* Cozy Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 peach-gradient organic-blob opacity-25 gentle-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 soft-gradient organic-blob-alt opacity-20"></div>
        <div className="absolute top-10 right-10 w-40 h-40 cozy-gradient organic-blob opacity-30"></div>
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
            className="flex items-center space-x-2 hover:bg-[rgba(255,138,101,0.1)] border-primary/40 text-muted rounded-2xl shadow-soft"
            onClick={() => navigate('/')}
          >
            <Home className="w-4 h-4" />
            <span>Back to Cozy Home</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">
              <span className="text-gradient">Book Your</span>{' '}
              <span className="text-muted">Cozy Moment</span>
            </h1>
            <p className="text-lg text-muted/80 max-w-2xl mx-auto font-medium">
              Choose a time that feels right for you. Every appointment is a chance to connect warmly.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Calendar Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="border-0 shadow-warm bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-serif text-muted">
                      {format(currentDate, 'MMMM yyyy')}
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                        className="border-secondary/40 text-secondary hover:bg-secondary/10 rounded-xl"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                        className="border-secondary/40 text-secondary hover:bg-secondary/10 rounded-xl"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-sm font-medium text-muted/60 py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {days.map(day => (
                      <motion.button
                        key={day.toISOString()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDateSelect(day)}
                        className={`
                          p-3 text-sm rounded-2xl transition-all duration-200 font-medium
                          ${isToday(day) 
                            ? 'bg-primary text-white shadow-cozy cozy-glow' 
                            : selectedDate && isSameDay(day, selectedDate)
                            ? 'bg-accent text-white shadow-soft'
                            : 'hover:bg-secondary/20 text-muted hover:scale-105'
                          }
                        `}
                      >
                        {format(day, 'd')}
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Time Selection */}
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="border-0 shadow-warm bg-white/80 backdrop-blur-sm rounded-3xl">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-muted font-serif">
                        <Clock className="w-5 h-5 text-primary" />
                        <span>Available Times</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        {availableTimes.map(time => (
                          <motion.button
                            key={time}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setSelectedTime(time)}
                            className={`
                              p-4 rounded-2xl transition-all duration-200 font-medium
                              ${selectedTime === time
                                ? 'cozy-gradient text-white shadow-cozy'
                                : 'bg-secondary/10 text-muted hover:bg-secondary/20 border border-secondary/20'
                              }
                            `}
                          >
                            {time}
                          </motion.button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Contact Form */}
              {selectedTime && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="border-0 shadow-warm bg-white/80 backdrop-blur-sm rounded-3xl">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-muted font-serif">
                        <User className="w-5 h-5 text-primary" />
                        <span>Your Cozy Details</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-muted font-medium">Full Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="Your wonderful name"
                            className="rounded-2xl border-secondary/30 focus:border-primary bg-white/80 py-3"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-muted font-medium flex items-center space-x-2">
                            <Mail className="w-4 h-4" />
                            <span>Email Address</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="your@email.com"
                            className="rounded-2xl border-secondary/30 focus:border-primary bg-white/80 py-3"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-muted font-medium flex items-center space-x-2">
                            <MessageSquare className="w-4 h-4" />
                            <span>Warm Message (Optional)</span>
                          </Label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            placeholder="Share what brings you joy or what you'd like to discuss..."
                            className="rounded-2xl border-secondary/30 focus:border-primary bg-white/80 min-h-[100px]"
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={!isFormValid}
                          className={`
                            w-full py-6 text-lg rounded-3xl font-medium transition-all duration-300
                            ${isFormValid
                              ? 'cozy-gradient text-white shadow-cozy hover:shadow-2xl transform hover:scale-[1.02] cozy-glow'
                              : 'bg-muted/20 text-muted/50 cursor-not-allowed'
                            }
                          `}
                        >
                          Confirm Your Cozy Appointment
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingPage;