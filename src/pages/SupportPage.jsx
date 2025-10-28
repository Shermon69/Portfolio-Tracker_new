// src/pages/SupportPage.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Alert,
  useTheme,
  alpha,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import {
  Email,
  Security,
  TrendingUp,
  Group,
  RocketLaunch,
  Assessment,
  ShowChart,
  UploadFile,
  AccountBalanceWallet,
  NotificationsActive,
  BarChart,
  Devices,
  AdminPanelSettings,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import emailjs from '@emailjs/browser';
import PublicNavigation from '../components/PublicNavigation';

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
  padding: theme.spacing(15, 0, 10, 0), // Increased top padding to account for navigation
  textAlign: "center",
  marginTop: theme.spacing(8), // Add margin to account for fixed navigation
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  transition: "all 0.3s ease-in-out",
  border: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[4],
    borderColor: theme.palette.primary.main,
  },
}));

const StatBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
}));

const SupportPage = () => {
  const theme = useTheme();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general"
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailJSReady, setEmailJSReady] = useState(false);

  // EmailJS Configuration
  const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_obr2nxj',
    TEMPLATE_ID: 'template_m5g7h7l',  
    PUBLIC_KEY: 'VycM8gpbceNhNOEBD'
  };

  useEffect(() => {
    const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = EMAILJS_CONFIG;

    const isConfigured = SERVICE_ID && SERVICE_ID.trim() !== '' && 
                        TEMPLATE_ID && TEMPLATE_ID.trim() !== '' && 
                        PUBLIC_KEY && PUBLIC_KEY.trim() !== '';

    if (isConfigured) {
      emailjs.init(PUBLIC_KEY);
      setEmailJSReady(true);
    } else {
      setEmailJSReady(false);
    }
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    if (!emailJSReady) {
      alert('Email service is not configured. Please email us directly at support@investtracker.com');
      return;
    }

    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: contactForm.name,
        from_email: contactForm.email,
        subject: `[${contactForm.category.toUpperCase()}] ${contactForm.subject}`,
        message: contactForm.message,
        category: contactForm.category,
        to_email: 'support@investtracker.com',
        date: new Date().toLocaleString()
      };

      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,  
        templateParams
      );

      if (result.status === 200) {
        setFormSubmitted(true);
        setContactForm({ 
          name: "", 
          email: "", 
          subject: "", 
          message: "", 
          category: "general" 
        });
        
        setTimeout(() => setFormSubmitted(false), 5000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Email sending error:', error);
      
      const subject = encodeURIComponent(`[${contactForm.category}] ${contactForm.subject}`);
      const body = encodeURIComponent(
        `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`
      );
      
      alert(`There was an issue sending your message. We've opened your email client instead. Please click send to complete your request.`);
      window.location.href = `mailto:support@investtracker.com?subject=${subject}&body=${body}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  // Core Features based on user manual
  const coreFeatures = [
    {
      icon: <UploadFile sx={{ fontSize: 48, color: "primary.main" }} />,
      title: "Seamless Data Import",
      description: "Import transactions from multiple brokers via CSV or manual entry. Supports various formats including Sharesight, 180 Markets, HSBC Australia, and more."
    },
    {
      icon: <Assessment sx={{ fontSize: 48, color: "secondary.main" }} />,
      title: "Portfolio Dashboard",
      description: "Centralized view of all your investments with real-time transaction tracking, filtering, and comprehensive portfolio overview."
    },
    {
      icon: <ShowChart sx={{ fontSize: 48, color: "success.main" }} />,
      title: "Performance Analytics",
      description: "Advanced charts and metrics to track portfolio growth, diversification, and performance across different time periods and asset classes."
    },
    {
      icon: <BarChart sx={{ fontSize: 48, color: "warning.main" }} />,
      title: "Detailed Reporting",
      description: "Generate comprehensive reports for capital gains, taxable income, exposure analysis, and investment activities for better decision making."
    }
  ];

  // Platform Features
  const platformFeatures = [
    {
      icon: <AccountBalanceWallet sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Multi-Broker Support",
      description: "Consolidate data from multiple brokerage accounts into one unified platform"
    },
    {
      icon: <NotificationsActive sx={{ fontSize: 40, color: "secondary.main" }} />,
      title: "Goal Tracking",
      description: "Set and monitor investment goals with progress tracking and contribution limits"
    },
    {
      icon: <Devices sx={{ fontSize: 40, color: "success.main" }} />,
      title: "Cross-Platform Access",
      description: "Access your portfolio from any device with responsive web design"
    },
    {
      icon: <AdminPanelSettings sx={{ fontSize: 40, color: "warning.main" }} />,
      title: "Customizable Settings",
      description: "Personalize base currency, themes, exchange rates, and account preferences"
    }
  ];

  return (
    <Box className="public-page">
      <PublicNavigation />
      <Box className="public-content">
        {/* Hero Section */}
        <HeroSection>
          <Container maxWidth="lg">
            <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom color="text.primary">
              About InvestTracker
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: 800, margin: "0 auto", lineHeight: 1.6 }}>
              Your comprehensive solution for investment portfolio management. We empower investors with 
              professional-grade tools to track, analyze, and optimize their financial journey.
            </Typography>
          </Container>
        </HeroSection>

        {/* Mission & Vision */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom color="text.primary">
                Our Mission
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                To democratize investment management by providing individuals with sophisticated portfolio 
                tracking tools that were previously available only to financial professionals.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
                Founded by financial experts and technology innovators, InvestTracker bridges the gap between 
                complex financial data and actionable insights. We believe every investor deserves clear, 
                comprehensive tools to make informed decisions about their financial future.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button variant="contained" component={RouterLink} to="/signup">
                  Start Your Journey
                </Button>
                <Button variant="outlined" component={RouterLink} to="/#features">
                  Explore Features
                </Button>
              </Box>
            </Grid>
            {/* <Grid item xs={12} md={6}>
              <Box sx={{ 
                display: "flex", 
                justifyContent: "center",
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                borderRadius: theme.shape.borderRadius * 3,
                p: 4
              }}>
                <Assessment sx={{ fontSize: 200, color: alpha(theme.palette.primary.main, 0.3) }} />
              </Box>
            </Grid> */}
          </Grid>
        </Container>

        {/* Core Features */}
        <Box sx={{ py: 8, bgcolor: "background.paper" }}>
          <Container maxWidth="lg">
            <Typography variant="h3" component="h2" fontWeight="bold" textAlign="center" gutterBottom color="text.primary">
              Powerful Portfolio Management
            </Typography>
            <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6, maxWidth: 600, margin: "0 auto" }}>
              Everything you need to take control of your investments in one platform
            </Typography>

            <Grid container spacing={4}>
              {coreFeatures.map((feature, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <FeatureCard>
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                        <Box sx={{ flexShrink: 0 }}>
                          {feature.icon}
                        </Box>
                        <Box>
                          <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                            {feature.title}
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            {feature.description}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </FeatureCard>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Platform Capabilities */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h3" component="h2" fontWeight="bold" textAlign="center" gutterBottom color="text.primary">
            Platform Capabilities
          </Typography>
          <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6, maxWidth: 600, margin: "0 auto" }}>
            Built with modern technology for reliable, secure, and scalable performance
          </Typography>

          <Grid container spacing={3}>
            {platformFeatures.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box sx={{ textAlign: "center", p: 3 }}>
                  {feature.icon}
                  <Typography variant="h6" component="h3" gutterBottom fontWeight="bold" sx={{ mt: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Stats Section */}
        {/* Why Choose InvestTracker - Based on Actual Documentation */}
          <Box sx={{ py: 8, bgcolor: "background.paper" }}>
            <Container maxWidth="lg">
              <Typography variant="h3" component="h2" fontWeight="bold" textAlign="center" gutterBottom color="text.primary">
                Why Choose InvestTracker?
              </Typography>
              
              <Grid container spacing={4} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                    <UploadFile color="primary" />
                    <Box>
                      <Typography variant="h6" gutterBottom fontWeight="bold">
                        Multi-Broker Support
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Consolidate data from 180 Markets, HSBC, Sharesight formats and more in one platform
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                    <Security color="primary" />
                    <Box>
                      <Typography variant="h6" gutterBottom fontWeight="bold">
                        Enterprise Security
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Bank-grade encryption with Supabase Auth and Row-Level Security protection
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                    <Assessment color="primary" />
                    <Box>
                      <Typography variant="h6" gutterBottom fontWeight="bold">
                        Comprehensive Reporting
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Generate capital gains, taxable income, and exposure reports for better decisions
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <TrendingUp color="primary" />
                    <Box>
                      <Typography variant="h6" gutterBottom fontWeight="bold">
                        Performance Tracking
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Monitor portfolio growth, diversification, and performance across all your investments
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>

        {/* Technology & Security */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                display: "flex", 
                justifyContent: "center",
                background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
                borderRadius: theme.shape.borderRadius * 3,
                p: 4
              }}>
                <Security sx={{ fontSize: 150, color: alpha(theme.palette.secondary.main, 0.3) }} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom color="text.primary">
                Enterprise-Grade Security
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                Your financial data is protected with bank-level security measures
              </Typography>
              <Box component="ul" sx={{ pl: 2, color: "text.secondary" }}>
                <Typography component="li" variant="body1" sx={{ mb: 2 }}>
                  <strong>Bank-Grade Encryption:</strong> All data encrypted in transit and at rest
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 2 }}>
                  <strong>Secure Authentication:</strong> Supabase Auth with secure session management
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 2 }}>
                  <strong>Row-Level Security:</strong> Database-level protection ensuring data privacy
                </Typography>
                <Typography component="li" variant="body1">
                  <strong>Regular Audits:</strong> Continuous security monitoring and compliance checks
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Contact Section */}
        <Box component="section" id="contact" sx={{ py: 8, bgcolor: "background.paper" }}>
          <Container maxWidth="lg">
            <Paper sx={{ p: 6, borderRadius: 3 }}>
              <Typography variant="h3" component="h2" fontWeight="bold" textAlign="center" gutterBottom color="text.primary">
                Get In Touch
              </Typography>
              <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
                Have questions about InvestTracker? We're here to help you succeed.
              </Typography>

              {!emailJSReady && (
                <Alert severity="warning" sx={{ mb: 3 }}>
                  Email service is currently being configured. You can email us directly at support@investtracker.com
                </Alert>
              )}

              {formSubmitted && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  ✅ Thank you for your message! We've received your request and will get back to you within 24 hours.
                </Alert>
              )}

              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  <Box component="form" onSubmit={handleContactSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Your Name"
                          name="name"
                          value={contactForm.name}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          name="email"
                          type="email"
                          value={contactForm.email}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Category"
                          name="category"
                          select
                          value={contactForm.category}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                        >
                          <MenuItem value="general">General Inquiry</MenuItem>
                          <MenuItem value="technical">Technical Support</MenuItem>
                          <MenuItem value="billing">Billing Question</MenuItem>
                          <MenuItem value="feature">Feature Request</MenuItem>
                          <MenuItem value="partnership">Partnership Opportunity</MenuItem>
                          <MenuItem value="feedback">Product Feedback</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Subject"
                          name="subject"
                          value={contactForm.subject}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                          placeholder="What can we help you with?"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Your Message"
                          name="message"
                          multiline
                          rows={6}
                          value={contactForm.message}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                          placeholder="Tell us more about your inquiry, questions, or how we can assist you with your investment tracking needs..."
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button 
                          type="submit" 
                          variant="contained" 
                          size="large"
                          disabled={isSubmitting || !emailJSReady}
                          sx={{ 
                            minWidth: 200,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            opacity: (!emailJSReady) ? 0.7 : 1,
                          }}
                        >
                          {isSubmitting ? (
                            <>
                              <CircularProgress size={20} sx={{ mr: 2, color: 'white' }} />
                              Sending...
                            </>
                          ) : (
                            'Send Message'
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                    <Email sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
                    <Typography variant="h5" gutterBottom fontWeight="bold">
                      Contact Information
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      We're committed to providing exceptional support:
                    </Typography>
                    
                    <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                      📧 Email: support@investtracker.com
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                      🌐 Website: www.investtracker.com
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, fontWeight: 500 }}>
                      🕒 Response Time: Within 24 hours
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Whether you're getting started with portfolio tracking or looking to optimize 
                      your investment strategy, our team is here to support your financial journey.
                    </Typography>

                    <Box sx={{ mt: 4, p: 3, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
                      <Typography variant="h6" gutterBottom fontWeight="bold">
                        Ready to Get Started?
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Join thousands of investors already tracking their portfolios with InvestTracker.
                      </Typography>
                      <Button 
                        component={RouterLink} 
                        to="/signup" 
                        variant="outlined" 
                        fullWidth
                        sx={{ mt: 1 }}
                      >
                        Create Your Account
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default SupportPage;