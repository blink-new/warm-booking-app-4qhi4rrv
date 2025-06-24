import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Mail, MessageSquare, Leaf } from 'lucide-react';
import { format, addDays, startOfWeek, addWeeks, isToday } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingForm {
  name: string;
  email: string;
  message: string;
}

const BookingPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));
  const [step, setStep] = useState<'date' | 'time' | 'details'>('date');
  const [form, setForm] = useState<BookingForm>({ name: '', email: '', message: '' });

  // Generate time slots
  const timeSlots: TimeSlot[] = [
    { time: '9:00 AM', available: true },
    { time: '9:30 AM', available: false },
    { time: '10:00 AM', available: true },
    { time: '10:30 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '11:30 AM', available: true },
    { time: '2:00 PM', available: true },
    { time: '2:30 PM', available: true },
    { time: '3:00 PM', available: false },
    { time: '3:30 PM', available: true },
    { time: '4:00 PM', available: true },
    { time: '4:30 PM', available: true },
  ];

  // Generate week days
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setStep('time');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep('details');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !form.name || !form.email) return;
    
    // Store booking data in localStorage for demo
    localStorage.setItem('booking', JSON.stringify({
      date: selectedDate,
      time: selectedTime,
      ...form
    }));
    
    navigate('/confirmation');
  };

  const handleInputChange = (field: keyof BookingForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const goToPreviousWeek = () => setCurrentWeek(addWeeks(currentWeek, -1));
  const goToNextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1));

  return (
    <div className="min-h-screen bg-background">
      {/* Organic Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-10 right-10 w-48 h-48 sage-gradient organic-blob opacity-15"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 warm-gradient organic-blob-alt opacity-10"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6 border-b border-border/50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            className="flex items-center space-x-2 hover:bg-primary/5"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 warm-gradient rounded-full flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gradient">WarmBook</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4 mb-8">
            {['date', 'time', 'details'].map((stepName, index) => (
              <div key={stepName} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step === stepName ? 'warm-gradient text-white shadow-lg' :
                  ['date', 'time', 'details'].indexOf(step) > index ? 'bg-primary text-white' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {stepName === 'date' && <Calendar className="w-4 h-4" />}
                  {stepName === 'time' && <Clock className="w-4 h-4" />}
                  {stepName === 'details' && <User className="w-4 h-4" />}
                </div>
                {index < 2 && (
                  <div className={`w-16 h-1 mx-4 rounded transition-all duration-300 ${
                    ['date', 'time', 'details'].indexOf(step) > index ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Date Selection */}
          {step === 'date' && (
            <motion.div
              key="date"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold">Select a Date</CardTitle>
                  <p className="text-muted-foreground">Choose your preferred day for the appointment</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Week Navigation */}
                  <div className="flex items-center justify-between mb-6">
                    <Button
                      variant="outline"
                      onClick={goToPreviousWeek}
                      className="hover:bg-primary/5"
                    >
                      ← Previous Week
                    </Button>
                    <div className="text-lg font-semibold">
                      {format(currentWeek, 'MMMM yyyy')}
                    </div>
                    <Button
                      variant="outline"
                      onClick={goToNextWeek}
                      className="hover:bg-primary/5"
                    >
                      Next Week →
                    </Button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-3">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                        {day}
                      </div>
                    ))}
                    
                    {weekDays.map((date, index) => {
                      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
                      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                      
                      return (
                        <motion.button
                          key={index}
                          whileHover={!isPast && !isWeekend ? { scale: 1.05 } : {}}
                          whileTap={!isPast && !isWeekend ? { scale: 0.95 } : {}}
                          onClick={() => !isPast && !isWeekend && handleDateSelect(date)}
                          disabled={isPast || isWeekend}
                          className={`
                            p-4 rounded-xl text-center transition-all duration-200 relative
                            ${isPast || isWeekend ? 
                              'text-muted-foreground cursor-not-allowed opacity-40' :
                              'text-foreground hover:bg-primary/10 hover:shadow-md cursor-pointer'
                            }
                            ${isToday(date) ? 'ring-2 ring-primary/50' : ''}
                          `}
                        >
                          <div className="text-lg font-medium">{format(date, 'd')}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {isWeekend ? 'Closed' : isPast ? '' : 'Available'}
                          </div>
                          {isToday(date) && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 warm-gradient rounded-full"></div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Time Selection */}
          {step === 'time' && selectedDate && (
            <motion.div
              key="time"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold">Select a Time</CardTitle>
                  <p className="text-muted-foreground">
                    Available slots for {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  </p>
                  <Button
                    variant="ghost"
                    onClick={() => setStep('date')}
                    className="text-primary hover:bg-primary/5 mt-2"
                  >
                    ← Change Date
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {timeSlots.map((slot, index) => (
                      <motion.button
                        key={index}
                        whileHover={slot.available ? { scale: 1.02 } : {}}
                        whileTap={slot.available ? { scale: 0.98 } : {}}
                        onClick={() => slot.available && handleTimeSelect(slot.time)}
                        disabled={!slot.available}
                        className={`
                          p-4 rounded-xl border-2 transition-all duration-200 text-center
                          ${slot.available ?
                            'border-border hover:border-primary hover:bg-primary/5 cursor-pointer' :
                            'border-muted bg-muted cursor-not-allowed opacity-50'
                          }
                        `}
                      >
                        <div className="font-medium">{slot.time}</div>
                        <Badge
                          variant={slot.available ? "secondary" : "destructive"}
                          className="mt-2 text-xs"
                        >
                          {slot.available ? 'Available' : 'Booked'}
                        </Badge>
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Details Form */}
          {step === 'details' && selectedDate && selectedTime && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold">Your Details</CardTitle>
                  <p className="text-muted-foreground">
                    Confirm your appointment for {format(selectedDate, 'EEEE, MMMM d')} at {selectedTime}
                  </p>
                  <Button
                    variant="ghost"
                    onClick={() => setStep('time')}
                    className="text-primary hover:bg-primary/5 mt-2"
                  >
                    ← Change Time
                  </Button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>Full Name *</span>
                        </Label>
                        <Input
                          id="name"
                          value={form.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Enter your full name"
                          required
                          className="border-2 focus:border-primary"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>Email Address *</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Enter your email"
                          required
                          className="border-2 focus:border-primary"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>Message (Optional)</span>
                      </Label>
                      <Textarea
                        id="message"
                        value={form.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us about your requirements or any special requests..."
                        rows={4}
                        className="border-2 focus:border-primary resize-none"
                      />
                    </div>
                    
                    <div className="pt-6">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full warm-gradient text-white py-6 text-lg rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        Confirm Booking
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookingPage;