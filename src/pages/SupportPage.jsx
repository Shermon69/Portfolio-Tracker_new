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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  useScrollTrigger,
  Slide,
} from "@mui/material";
import { styled } from "@mui/material/styles";
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
  CheckCircleOutline,
  Menu as MenuIcon,
  Close as CloseIcon,
  ArrowForward,
  AccessTime,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { Fade, Slide as RevealSlide } from "react-awesome-reveal";
import emailjs from '@emailjs/browser';

/* ------------------------- Full-width container helper ------------------------- */
const FullWidth = ({ children, ...rest }) => (
  <Container
    maxWidth={false}
    disableGutters
    sx={{
      px: { xs: 2, sm: 4, md: 6, lg: 10, xl: 14 },
      mx: "auto",
      width: "100%",
    }}
    {...rest}
  >
    {children}
  </Container>
);

/* ----------------------------- Shared components --------------------------- */
const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 800,
  position: "relative",
  display: "inline-block",
  color: theme.palette.text.primary,
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -theme.spacing(1.5),
    left: "50%",
    transform: "translateX(-50%)",
    width: 60,
    height: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: theme.shape.borderRadius,
    opacity: 0.9,
  },
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  maxWidth: 700,
  margin: "0 auto",
  paddingBottom: theme.spacing(6),
  opacity: 0.9,
  color: theme.palette.text.secondary,
  fontWeight: 400,
}));

const HeroButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.6, 5),
  borderRadius: 999,
  fontWeight: 800,
  fontSize: "1.05rem",
  margin: theme.spacing(1),
  textTransform: "none",
  boxShadow: `0 10px 25px ${alpha(theme.palette.primary.main, 0.25)}`,
  transition: "all 0.3s ease",
  "&:hover": { 
    transform: "translateY(-2px)",
    boxShadow: `0 15px 35px ${alpha(theme.palette.primary.main, 0.35)}`,
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  transition: "all 0.3s ease-in-out",
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  borderRadius: 20,
  backgroundColor: "#1a1a2e",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.15)}`,
    borderColor: alpha(theme.palette.primary.main, 0.2),
  },
}));

/* ------------------------------- Navigation ------------------------------- */
const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: "#000",
  borderBottom: `1px solid rgba(255,255,255,0.08)`,
  boxShadow: "none",
  backdropFilter: "blur(10px)",
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  textTransform: "none",
  fontWeight: 600,
  padding: theme.spacing(1, 1.5),
  borderRadius: 10,
  transition: "all 0.2s ease",
  "&:hover": { 
    backgroundColor: alpha("#fff", 0.08),
    transform: "translateY(-1px)",
  },
}));

const LogoText = styled(Typography)(() => ({
  color: "#fff",
  fontWeight: 900,
  letterSpacing: -0.5,
  cursor: "pointer",
  transition: "opacity 0.2s ease",
  textDecoration: 'none',
  "&:hover": { 
    opacity: 0.8,
    textDecoration: 'none',
  },
}));

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": { 
    width: 280, 
    backgroundColor: theme.palette.background.paper, 
    padding: theme.spacing(2),
    background: theme.palette.background.default,
  },
}));

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const NavigationBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const navItems = [
    { label: "Features", href: "/#features" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Support", href: "/support" },
  ];

  const renderNavButton = (item) => {
    const isAnchor = item.href.startsWith("#");
    return (
      <NavButton
        key={item.label}
        component={isAnchor ? "a" : RouterLink}
        href={isAnchor ? item.href : undefined}
        to={isAnchor ? undefined : item.href}
        size="small"
      >
        {item.label}
      </NavButton>
    );
  };

  const drawer = (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <LogoText variant="h5">Portfolio Tracker</LogoText>
        <IconButton onClick={handleDrawerToggle} edge="end">
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {navItems.map((item) => (
          <Button
            key={item.label}
            component={item.href.startsWith("#") ? "a" : RouterLink}
            to={item.href}
            href={item.href}
            fullWidth
            onClick={handleDrawerToggle}
            sx={{ 
              justifyContent: "flex-start", 
              textTransform: "none", 
              py: 1.5,
              color: 'text.primary',
              fontWeight: 600,
            }}
          >
            {item.label}
          </Button>
        ))}
        <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 1 }}>
          <Button 
            component={RouterLink} 
            to="/login" 
            variant="outlined" 
            fullWidth 
            sx={{ 
              textTransform: "none", 
              py: 1.5,
              borderColor: 'divider',
              color: 'text.primary',
            }}
          >
            Sign In
          </Button>
          <Button 
            component={RouterLink} 
            to="/signup" 
            variant="contained" 
            fullWidth 
            sx={{ 
              textTransform: "none", 
              py: 1.5,
              background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
            }}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <StyledAppBar position="fixed" elevation={0}>
          <FullWidth>
            <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
              <LogoText variant="h6" component={RouterLink} to="/">
                Portfolio Tracker
              </LogoText>
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}>
                {navItems.map(renderNavButton)}
              </Box>
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
                <Button
                  component={RouterLink}
                  to="/login"
                  sx={{ 
                    textTransform: "none", 
                    borderRadius: 2, 
                    color: "#fff", 
                    borderColor: alpha("#fff", 0.4),
                    fontWeight: 600,
                  }}
                  variant="outlined"
                >
                  Sign In
                </Button>
                <Button
                  component={RouterLink}
                  to="/signup"
                  variant="contained"
                  sx={{ 
                    textTransform: "none", 
                    borderRadius: 999, 
                    px: 2.5,
                    background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                    fontWeight: 700,
                  }}
                >
                  Get Started
                </Button>
              </Box>
              <IconButton 
                color="inherit" 
                aria-label="open drawer" 
                edge="end" 
                onClick={handleDrawerToggle} 
                sx={{ display: { md: "none" }, color: "#fff" }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </FullWidth>
        </StyledAppBar>
      </HideOnScroll>

      <MobileDrawer 
        variant="temporary" 
        anchor="right" 
        open={mobileOpen} 
        onClose={handleDrawerToggle} 
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </MobileDrawer>
    </>
  );
};

/* ------------------------------- Hero Section ------------------------------ */
const HeroSection = styled(Box)(() => ({
  backgroundColor: "#000",
  color: "#fff",
  paddingTop: 120,
  paddingBottom: 80,
  minHeight: "60vh",
  position: "relative",
  overflow: "hidden",
  background: `
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.15), transparent),
    linear-gradient(180deg, #000 0%, #000 100%)
  `,
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
      alert('Email service is not configured. Please email us directly at support@portfolioTracker.com');
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
        to_email: 'support@portfolioTracker.com',
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
      window.location.href = `mailto:support@portfolioTracker.com?subject=${subject}&body=${body}`;
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
      icon: <UploadFile sx={{ fontSize: 48, color: "#3B82F6" }} />,
      title: "Seamless Data Import",
      description: "Import transactions from multiple brokers via CSV or manual entry. Supports various formats including Sharesight, 180 Markets, HSBC Australia, and more."
    },
    {
      icon: <Assessment sx={{ fontSize: 48, color: "#A78BFA" }} />,
      title: "Portfolio Dashboard",
      description: "Centralized view of all your investments with real-time transaction tracking, filtering, and comprehensive portfolio overview."
    },
    {
      icon: <ShowChart sx={{ fontSize: 48, color: "#10B981" }} />,
      title: "Performance Analytics",
      description: "Advanced charts and metrics to track portfolio growth, diversification, and performance across different time periods and asset classes."
    },
    {
      icon: <BarChart sx={{ fontSize: 48, color: "#F59E0B" }} />,
      title: "Detailed Reporting",
      description: "Generate comprehensive reports for capital gains, taxable income, exposure analysis, and investment activities for better decision making."
    }
  ];

  // Platform Features
  const platformFeatures = [
    {
      icon: <AccountBalanceWallet sx={{ fontSize: 40, color: "#3B82F6" }} />,
      title: "Multi-Broker Support",
      description: "Consolidate data from multiple brokerage accounts into one unified platform"
    },
    {
      icon: <NotificationsActive sx={{ fontSize: 40, color: "#A78BFA" }} />,
      title: "Goal Tracking",
      description: "Set and monitor investment goals with progress tracking and contribution limits"
    },
    {
      icon: <Devices sx={{ fontSize: 40, color: "#10B981" }} />,
      title: "Cross-Platform Access",
      description: "Access your portfolio from any device with responsive web design"
    },
    {
      icon: <AdminPanelSettings sx={{ fontSize: 40, color: "#F59E0B" }} />,
      title: "Customizable Settings",
      description: "Personalize base currency, themes, exchange rates, and account preferences"
    }
  ];

  const whyChooseItems = [
    { icon: <CheckCircleOutline color="primary" />, primary: "Multi-Broker Support", secondary: "Consolidate data from 180 Markets, HSBC, Sharesight formats and more in one platform" },
    { icon: <CheckCircleOutline color="primary" />, primary: "Enterprise Security", secondary: "Bank-grade encryption with Supabase Auth and Row-Level Security protection" },
    { icon: <CheckCircleOutline color="primary" />, primary: "Comprehensive Reporting", secondary: "Generate capital gains, taxable income, and exposure reports for better decisions" },
    { icon: <CheckCircleOutline color="primary" />, primary: "Performance Tracking", secondary: "Monitor portfolio growth, diversification, and performance across all your investments" },
  ];

  // Security features data
  const securityFeatures = [
    "Bank-Grade Encryption: All data encrypted in transit and at rest",
    "Secure Authentication: Supabase Auth with secure session management",
    "Row-Level Security: Database-level protection ensuring data privacy",
    "Regular Audits: Continuous security monitoring and compliance checks"
  ];

  return (
    <Box className="support-page" sx={{ overflowX: "hidden" }}>
      <NavigationBar />
      
      {/* Hero Section */}
      <HeroSection>
        <FullWidth>
          <RevealSlide direction="up" triggerOnce>
            <Typography
              variant="h2"
              component="h1"
              align="center"
              sx={{ 
                mb: 2, 
                lineHeight: 1.15, 
                fontWeight: 900, 
                letterSpacing: -0.5,
                background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              About portfolio Tracker
            </Typography>

            <Typography 
              variant="h6" 
              align="center" 
              sx={{ 
                mb: 3, 
                opacity: 0.9, 
                color: alpha("#fff", 0.85),
                fontWeight: 400,
                lineHeight: 1.6,
                maxWidth: 800,
                margin: "0 auto",
              }}
            >
              Your comprehensive solution for investment portfolio management. We empower investors with 
              professional-grade tools to track, analyze, and optimize their financial journey.
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
              <HeroButton 
                variant="contained" 
                color="primary" 
                size="large" 
                component={RouterLink} 
                to="/signup" 
                endIcon={<ArrowForward />}
                sx={{
                  background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                }}
              >
                Start Your Journey
              </HeroButton>
              <HeroButton
                variant="outlined"
                size="large"
                component="a"
                href="/#features"
                sx={{ 
                  color: "#fff", 
                  borderColor: alpha("#fff", 0.4),
                  "&:hover": {
                    borderColor: alpha("#fff", 0.8),
                    backgroundColor: alpha("#fff", 0.1),
                  }
                }}
              >
                Explore Features
              </HeroButton>
            </Box>
          </RevealSlide>
        </FullWidth>
      </HeroSection>

      {/* Mission & Vision */}
      <Box sx={{ py: 12, backgroundColor: "#f8fafc" }}>
        <FullWidth>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade direction="left" triggerOnce>
                <SectionTitle variant="h3" component="h2" sx={{ color: '#1e293b', textAlign: 'left', '&::after': { left: 0, transform: 'none' } }}>
                  Our Mission
                </SectionTitle>
                <Typography variant="h6" color="#64748b" sx={{ mb: 3, lineHeight: 1.6 }}>
                  To democratize investment management by providing individuals with sophisticated portfolio 
                  tracking tools that were previously available only to financial professionals.
                </Typography>
                <Typography variant="body1" color="#64748b" sx={{ lineHeight: 1.7, mb: 3 }}>
                  Founded by financial experts and technology innovators, portfolio Tracker bridges the gap between 
                  complex financial data and actionable insights. We believe every investor deserves clear, 
                  comprehensive tools to make informed decisions about their financial future.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <HeroButton 
                    variant="contained" 
                    component={RouterLink} 
                    to="/signup"
                    sx={{
                      background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                    }}
                  >
                    Get Started Free
                  </HeroButton>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Fade direction="right" triggerOnce>
                <Box sx={{ 
                  display: "flex", 
                  justifyContent: "center",
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                  borderRadius: 4,
                  p: 6
                }}>
                  <Assessment sx={{ fontSize: 200, color: alpha(theme.palette.primary.main, 0.3) }} />
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </FullWidth>
      </Box>

      {/* Core Features */}
      <Box sx={{ py: 12, backgroundColor: "#ffffff" }}>
        <FullWidth>
          <Fade direction="up" triggerOnce>
            <Box textAlign="center">
              <SectionTitle variant="h3" component="h2" sx={{ color: '#1e293b' }}>
                Powerful Portfolio Management
              </SectionTitle>
              <SectionSubtitle variant="h6" sx={{ color: '#64748b' }}>
                Everything you need to take control of your investments in one platform
              </SectionSubtitle>
            </Box>
          </Fade>

          <Grid container spacing={4}>
            {coreFeatures.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Fade direction="up" delay={index * 150} triggerOnce>
                  <FeatureCard elevation={0} className="lp-card">
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                        <Box sx={{ flexShrink: 0 }}>
                          {feature.icon}
                        </Box>
                        <Box>
                          <Typography variant="h5" component="h3" gutterBottom fontWeight={800} sx={{ color: '#ffffff' }}>
                            {feature.title}
                          </Typography>
                          <Typography variant="body1" sx={{ color: alpha('#fff', 0.7), lineHeight: 1.6 }}>
                            {feature.description}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </FeatureCard>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </FullWidth>
      </Box>

      {/* Platform Capabilities */}
      <Box sx={{ py: 12, backgroundColor: "#f8fafc" }}>
        <FullWidth>
          <Fade direction="up" triggerOnce>
            <Box textAlign="center">
              <SectionTitle variant="h3" component="h2" sx={{ color: '#1e293b' }}>
                Platform Capabilities
              </SectionTitle>
              <SectionSubtitle variant="h6" sx={{ color: '#64748b' }}>
                Built with modern technology for reliable, secure, and scalable performance
              </SectionSubtitle>
            </Box>
          </Fade>

          <Grid 
            container 
            spacing={4} 
            justifyContent="center"
            sx={{ 
              maxWidth: '1200px',
              margin: '0 auto'
            }}
          >
            {platformFeatures.map((feature, index) => (
              <Grid item xs={12} sm={6} key={index} sx={{ maxWidth: '500px' }}>
                <Fade direction="up" delay={index * 120} triggerOnce>
                  <Card sx={{ 
                    height: '100%',
                    textAlign: "center", 
                    p: 4, 
                    borderRadius: 3,
                    backgroundColor: "#1a1a2e",
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    transition: "all 0.3s ease",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minHeight: 260,
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.15)}`,
                    }
                  }}>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2
                    }}>
                      {feature.icon}
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        gutterBottom 
                        fontWeight={800} 
                        sx={{ color: '#ffffff' }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: alpha('#fff', 0.7), 
                          lineHeight: 1.6,
                          maxWidth: '300px',
                          margin: '0 auto'
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </Box>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </FullWidth>
      </Box>

      {/* Why Choose portfolioTracker */}
      <Box sx={{ py: 12, backgroundColor: "#1a1a2e" }}>
        <FullWidth>
          <Fade direction="up" triggerOnce>
            <SectionTitle variant="h3" component="h2" align="center" sx={{ mb: 6, color: '#fff' }}>
              Why Choose Portfolio Tracker?
            </SectionTitle>
          </Fade>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade direction="left" triggerOnce>
                <List>
                  {whyChooseItems.map((item) => (
                    <ListItem key={item.primary} sx={{ py: 2 }}>
                      <ListItemIcon sx={{ minWidth: 44 }}>
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 2,
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {item.icon}
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={item.primary}
                        secondary={item.secondary}
                        primaryTypographyProps={{ 
                          fontWeight: 700, 
                          color: '#fff',
                          fontSize: '1.1rem',
                          mb: 0.5,
                        }}
                        secondaryTypographyProps={{
                          color: alpha('#fff', 0.7),
                          lineHeight: 1.6,
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Fade direction="right" triggerOnce>
                <Box sx={{ 
                  display: "flex", 
                  justifyContent: "center",
                  background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
                  borderRadius: 4,
                  p: 6
                }}>
                  <Security sx={{ fontSize: 200, color: alpha(theme.palette.secondary.main, 0.3) }} />
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </FullWidth>
      </Box>

      {/* Enterprise-Grade Security Section */}
      <Box sx={{ 
        py: 12, 
        backgroundColor: "#0a0a1a",
        position: "relative",
        overflow: "hidden",
        background: `
          radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59, 130, 246, 0.15), transparent),
          linear-gradient(180deg, #0a0a1a 0%, #1a1a2e 100%)
        `,
      }}>
        <FullWidth>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade direction="left" triggerOnce>
                <Box sx={{ 
                  display: "flex", 
                  justifyContent: "center",
                  position: "relative"
                }}>
                  <Box sx={{
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: -20,
                      left: -20,
                      right: -20,
                      bottom: -20,
                      background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))",
                      borderRadius: "50%",
                      filter: "blur(40px)",
                    }
                  }}>
                    <Security sx={{ 
                      fontSize: 220, 
                      color: "#fff",
                      opacity: 0.9,
                      filter: "drop-shadow(0 0 30px rgba(59, 130, 246, 0.3))"
                    }} />
                  </Box>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Fade direction="right" triggerOnce>
                <Box>
                  <Typography 
                    variant="overline" 
                    sx={{ 
                      color: "#3B82F6",
                      fontWeight: 600,
                      letterSpacing: 1.5,
                      mb: 2,
                      display: "block"
                    }}
                  >
                    BUILT FOR TRUST
                  </Typography>
                  <SectionTitle 
                    variant="h3" 
                    component="h2" 
                    sx={{ 
                      color: '#fff', 
                      textAlign: 'left', 
                      '&::after': { 
                        left: 0, 
                        transform: 'none',
                        background: 'linear-gradient(90deg, #3B82F6, #9333EA)' 
                      } 
                    }}
                  >
                    Enterprise-Grade Security
                  </SectionTitle>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: alpha('#fff', 0.7), 
                      mb: 4, 
                      lineHeight: 1.6,
                      fontWeight: 400
                    }}
                  >
                    Your financial data is protected with state-of-the-art security measures and encryption
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {securityFeatures.map((feature, index) => (
                      <Box 
                        key={index} 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'flex-start', 
                          gap: 2,
                          backgroundColor: alpha('#fff', 0.05),
                          p: 2,
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: alpha('#fff', 0.08),
                            transform: 'translateX(8px)'
                          }
                        }}
                      >
                        <CheckCircleOutline sx={{ 
                          color: '#3B82F6',
                          fontSize: 24,
                          mt: 0.5
                        }} />
                        <Typography 
                          variant="body1"
                          sx={{ 
                            color: '#fff',
                            fontWeight: 500,
                            lineHeight: 1.6
                          }}
                        >
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </FullWidth>
      </Box>

      {/* Contact Section */}
      <Box sx={{ 
        py: 12, 
        backgroundColor: "#0a0a1a",
        position: "relative",
        overflow: "hidden",
        background: `
          radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59, 130, 246, 0.15), transparent),
          linear-gradient(180deg, #0a0a1a 0%, #1a1a2e 100%)
        `,
      }}>
        <FullWidth>
          <Fade direction="up" triggerOnce>
            <Box textAlign="center" sx={{ mb: 8 }}>
              <Typography 
                variant="overline" 
                sx={{ 
                  color: "#3B82F6",
                  fontWeight: 600,
                  letterSpacing: 1.5,
                  mb: 2,
                  display: "block"
                }}
              >
                CONTACT US
              </Typography>
              <SectionTitle variant="h3" component="h2" sx={{ color: '#fff' }}>
                Get In Touch
              </SectionTitle>
              <SectionSubtitle variant="h6" sx={{ color: alpha('#fff', 0.7) }}>
                Have questions about Portfolio Tracker? We're here to help you succeed.
              </SectionSubtitle>
            </Box>
          </Fade>

          <Paper sx={{ 
            maxWidth: 1200,
            margin: '0 auto',
            p: { xs: 3, sm: 4, md: 6 }, 
            borderRadius: 4,
            backgroundColor: "#ffffff",
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: `0 24px 60px ${alpha(theme.palette.common.black, 0.2)}`,
          }}>
            {!emailJSReady && (
              <Alert 
                severity="warning" 
                sx={{ 
                  mb: 4,
                  borderRadius: 2,
                  '& .MuiAlert-icon': { fontSize: 24 }
                }}
              >
                Email service is currently being configured. You can email us directly at support@portfolioTracker.com
              </Alert>
            )}

            {formSubmitted && (
              <Alert 
                severity="success" 
                sx={{ 
                  mb: 4,
                  borderRadius: 2,
                  '& .MuiAlert-icon': { fontSize: 24 }
                }}
              >
                Thank you for your message! We've received your request and will get back to you within 24 hours.
              </Alert>
            )}

            <Grid container spacing={6}>
              <Grid item xs={12} md={7}>
                <Box 
                  component="form" 
                  onSubmit={handleContactSubmit}
                  sx={{
                    '& .MuiTextField-root': {
                      width: '100%',
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: '#f8fafc',
                      }
                    }
                  }}
                >
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 700, 
                      color: '#3B82F6 ',
                      mb: 4
                    }}
                  >
                    Send us a Message
                  </Typography>

                  {/* Personal Information */}
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      color: '#475569',
                      mb: 2,
                      fontWeight: 600 
                    }}
                  >
                    Personal Information
                  </Typography>

                  <TextField
                    label="Your Name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    fullWidth
                  />

                  <TextField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    fullWidth
                  />

                  {/* Message Details */}
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      color: '#475569',
                      mb: 2,
                      fontWeight: 600,
                      mt: 2
                    }}
                  >
                    Message Details
                  </Typography>

                  <TextField
                    label="Category"
                    name="category"
                    select
                    value={contactForm.category}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    fullWidth
                  >
                    <MenuItem value="general">General Inquiry</MenuItem>
                    <MenuItem value="technical">Technical Support</MenuItem>
                    <MenuItem value="billing">Billing Question</MenuItem>
                    <MenuItem value="feature">Feature Request</MenuItem>
                    <MenuItem value="partnership">Partnership Opportunity</MenuItem>
                    <MenuItem value="feedback">Product Feedback</MenuItem>
                  </TextField>

                  <TextField
                    label="Subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    fullWidth
                  />

                  <TextField
                    label="Your Message"
                    name="message"
                    multiline
                    rows={6}
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    placeholder="Tell us more about your inquiry..."
                    fullWidth
                  />

                  {/* Submit Button */}
                  <Box sx={{ mt: 4 }}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      size="large"
                      disabled={isSubmitting || !emailJSReady}
                      sx={{ 
                        minWidth: 200,
                        borderRadius: 999,
                        background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                        opacity: (!emailJSReady) ? 0.7 : 1,
                        fontWeight: 700,
                        textTransform: 'none',
                        py: 1.5,
                        px: 4,
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: `0 15px 35px ${alpha(theme.palette.primary.main, 0.35)}`,
                        }
                      }}
                    >
                      {isSubmitting ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CircularProgress size={20} sx={{ color: 'white' }} />
                          Sending...
                        </Box>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                  </Box>
                </Box>
              </Grid>
              
              
              <Grid item xs={12} md={5}>
                <Box sx={{ 
                  height: '100%',
                  p: 4, 
                  borderRadius: 3,
                  backgroundColor: '#1a1a2e',
                  color: '#fff'
                }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                    Contact Information
                  </Typography>
                  <Typography variant="body2" sx={{ color: alpha('#fff', 0.7), mb: 4 }}>
                    Our team is here to support your financial journey.
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Box sx={{ 
                        p: 1.5, 
                        borderRadius: 2, 
                        backgroundColor: alpha('#fff', 0.1)
                      }}>
                        <Email sx={{ fontSize: 24, color: '#3B82F6' }} />
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ color: alpha('#fff', 0.7) }}>
                          Email
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          support@portfolioTracker.com
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Box sx={{ 
                        p: 1.5, 
                        borderRadius: 2, 
                        backgroundColor: alpha('#fff', 0.1)
                      }}>
                        <AccessTime sx={{ fontSize: 24, color: '#3B82F6' }} />
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ color: alpha('#fff', 0.7) }}>
                          Response Time
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          Within 24 hours
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ 
                    mt: 6,
                    p: 3, 
                    borderRadius: 3,
                    border: `1px solid ${alpha('#fff', 0.1)}`,
                    backgroundColor: alpha('#fff', 0.05),
                  }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                      Ready to Get Started?
                    </Typography>
                    <Typography variant="body2" sx={{ color: alpha('#fff', 0.7), mb: 3 }}>
                      Join thousands of investors already tracking their portfolios with Portfolio Tracker.
                    </Typography>
                    <Button 
                      component={RouterLink} 
                      to="/signup" 
                      variant="contained"
                      fullWidth
                      sx={{ 
                        py: 1.5,
                        borderRadius: 999,
                        background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                        textTransform: 'none',
                        fontWeight: 700,
                      }}
                    >
                      Create Free Account
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </FullWidth>
      </Box>
    </Box>
  );
};

export default SupportPage;