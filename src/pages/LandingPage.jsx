// src/pages/LandingPage.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
  Avatar,
  ListItemIcon,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  useScrollTrigger,
  Slide,
  Card,
  CardContent,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import {
  TrendingUp,
  ShowChart,
  UploadFile,
  Security,
  ArrowForward,
  CheckCircleOutline,
  BarChart,
  AccountBalanceWallet,
  NotificationsActive,
  Menu as MenuIcon,
  Close as CloseIcon,
  Insights,
  VerifiedUser,
  Assessment,
  AdminPanelSettings,
  Devices,
  LightbulbOutlined,
  Groups,
} from "@mui/icons-material";
import { Fade, Slide as RevealSlide } from "react-awesome-reveal";

import "./LandingPage.css";

/* ------------------------- Full-width container helper ------------------------- */
/** Full-bleed container with responsive side padding (design-only) */
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

/* ----------------------------- Data (unchanged) ---------------------------- */
const navItems = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Support", href: "/support" },
];

const features = [
  { icon: <UploadFile />, title: "Seamless Import", description: "Easily import your investment data from various brokers via CSV or direct integration (coming soon)." },
  { icon: <TrendingUp />, title: "Performance Insights", description: "Track your portfolio's growth, ROI, and performance metrics with interactive charts." },
  { icon: <ShowChart />, title: "Advanced Analytics", description: "Dive deep into your asset allocation, diversification, and risk exposure with powerful tools." },
  { icon: <Security />, title: "Bank-Grade Security", description: "Your data is encrypted and securely stored, ensuring privacy and peace of mind." },
];

const visualFeatures = [
  { title: "Best Portfolio Tracker", description: "Stay on top of your investments with real-time insights and analytics.", icon: <Assessment sx={{ fontSize: 80 }} /> },
  { title: "Secure and Private", description: "Your data is encrypted and protected with top-grade security.", icon: <AdminPanelSettings sx={{ fontSize: 80 }} /> },
  { title: "Multi-Device Access", description: "Use the app on desktop, tablet, or mobile – synced across all.", icon: <Devices sx={{ fontSize: 80 }} /> },
];

const howItWorksSteps = [
  { icon: <AccountBalanceWallet />, title: "Connect Your Accounts", description: "Link your brokerage accounts or upload your data in minutes." },
  { icon: <BarChart />, title: "Visualize Your Portfolio", description: "See all your investments in one clear, consolidated dashboard." },
  { icon: <NotificationsActive />, title: "Stay Informed", description: "Get insights, track goals, and make smarter investment decisions." },
];

const pricingData = {
  monthly: [
    { title: "Free", price: "$0", subtitle: "Perfect for getting started", features: ["1 Portfolio","Basic Performance Tracking","Limited Analytics","Email Support","Export to CSV"], popular: false },
    { title: "Premium", price: "$29", subtitle: "For serious investors", features: ["Unlimited Portfolios","Advanced Analytics","Real-time Alerts","Priority Support","Custom Reports","API Access"], popular: true },
  ],
  yearly: [
    { title: "Free", price: "$0", subtitle: "Perfect for getting started", features: ["1 Portfolio","Basic Performance Tracking","Limited Analytics","Email Support","Export to CSV"], popular: false },
    { title: "Premium", price: "$290", originalPrice: "$348", subtitle: "For serious investors", features: ["Unlimited Portfolios","Advanced Analytics","Real-time Alerts","Priority Support","Custom Reports","API Access"], popular: true },
  ],
};

const whyTrustUsItems = [
  { icon: <CheckCircleOutline color="primary" />, primary: "Holistic View", secondary: "Consolidate all your investments from different brokers into one comprehensive dashboard." },
  { icon: <CheckCircleOutline color="primary" />, primary: "Actionable Insights", secondary: "Go beyond simple tracking with analytics that help you understand performance drivers." },
  { icon: <CheckCircleOutline color="primary" />, primary: "User-Centric Design", secondary: "An intuitive and easy-to-navigate platform designed for investors of all levels." },
  { icon: <CheckCircleOutline color="primary" />, primary: "Dedicated Support", secondary: "Our team is here to help you get the most out of our platform." },
];

/* ----------------------------- Shared components --------------------------- */
const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 800,
  position: "relative",
  display: "inline-block",
  color: theme.palette.text.primary, // Explicit color
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
  color: theme.palette.text.secondary, // Explicit color
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
  "&:hover": { opacity: 0.8 },
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

/* ----------------------------------- Hero ---------------------------------- */
const HeroContainer = styled(Box)(() => ({
  backgroundColor: "#000",
  color: "#fff",
  paddingTop: 100, // Reduced from 120
  paddingBottom: 80, // Reduced from 120
  minHeight: "80vh", // Changed from calc(100vh - 64px) to reduce height
  position: "relative",
  overflow: "hidden",
  background: `
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.15), transparent),
    linear-gradient(180deg, #000 0%, #000 100%)
  `,
}));

const Hero = () => {
  return (
    <HeroContainer id="hero" className="lp-hero lp-hero--dark">
      <FullWidth>
        <Grid container spacing={6} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={10}>
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
                Your Financial Future,
                <Box component="span" sx={{ display: "block" }}>
                  Clearly Visualized.
                </Box>
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
                }}
              >
                Take control of your investments. Monitor performance, analyze strategies, and achieve your
                financial goals with our intuitive platform.
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
                  Get Started Free
                </HeroButton>
                <HeroButton
                  variant="outlined"
                  size="large"
                  component={RouterLink}
                  to="/login"
                  sx={{ 
                    color: "#fff", 
                    borderColor: alpha("#fff", 0.4),
                    "&:hover": {
                      borderColor: alpha("#fff", 0.8),
                      backgroundColor: alpha("#fff", 0.1),
                    }
                  }}
                >
                  Learn More
                </HeroButton>
              </Box>
            </RevealSlide>
          </Grid>
        </Grid>
      </FullWidth>
    </HeroContainer>
  );
};

/* ------------------------------- Features row ------------------------------ */
const FeatureItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  borderRadius: 20,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  transition: "all 0.3s ease",
  height: "100%",
  boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.15)}`,
    borderColor: alpha(theme.palette.primary.main, 0.2),
  },
}));

const IconTile = styled("div")(({ theme, bg }) => ({
  width: 70,
  height: 70,
  borderRadius: 20,
  display: "grid",
  placeItems: "center",
  marginBottom: theme.spacing(3),
  background: bg,
  color: "#fff",
  "& .MuiSvgIcon-root": { fontSize: 34 },
  boxShadow: `0 8px 20px ${alpha(theme.palette.common.black, 0.15)}`,
}));

const FeaturesSection = () => {
  const marketing = [
    { icon: <TrendingUp />, title: "Portfolio Analysis", desc: "Let tools help track your allocation and analyze recent performance using sophisticated algorithms.", bg: "linear-gradient(135deg,#3B82F6,#1D4ED8)" },
    { icon: <BarChart />, title: "Market Insights", desc: "Start your portfolio's growth with our data analytics and performance tracking tools.", bg: "linear-gradient(135deg,#A78BFA,#7C3AED)" },
    { icon: <LightbulbOutlined />, title: "Smart Recommendations", desc: "Effectively shape new market strategies by using data and investment performance insights.", bg: "linear-gradient(135deg,#34D399,#059669)" },
    { icon: <Groups />, title: "Community Insights", desc: "Your social conversation and investing ideas directly affect your total investment income.", bg: "linear-gradient(135deg,#FB923C,#F97316)" },
  ];

  return (
    <Box id="features" sx={{ py: 12, backgroundColor: "#f8fafc" }}> {/* Softer background */}
      <FullWidth>
        <Fade direction="up" triggerOnce>
          <Box textAlign="center">
            <SectionTitle variant="h3" component="h2" sx={{ color: '#1e293b' }}> {/* Dark color */}
              Unlock Powerful Investment Tools
            </SectionTitle>
            <SectionSubtitle variant="h6" sx={{ color: '#64748b' }}> {/* Medium gray */}
              Everything you need to track, analyze, and improve your portfolio.
            </SectionSubtitle>
          </Box>
        </Fade>

        <Grid container spacing={4}>
          {marketing.map((f, i) => (
            <Grid item xs={12} sm={6} md={3} key={f.title}>
              <Fade direction="up" delay={i * 120} triggerOnce>
                <FeatureItem elevation={0} className="lp-card">
                  <IconTile bg={f.bg}>{f.icon}</IconTile>
                  <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#1e293b' }}>
                    {f.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.6 }}> {/* Medium gray */}
                    {f.desc}
                  </Typography>
                </FeatureItem>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </FullWidth>
    </Box>
  );
};

/* ----------------------------- Visual features ----------------------------- */
const VisualFeatureCard = styled(Card)(({ theme }) => ({
  textAlign: "center",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  borderRadius: 20,
  transition: "all 0.3s ease",
  boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
  "&:hover": { 
    transform: "translateY(-8px)", 
    boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.15)}`,
  },
}));

const VisualFeaturesSection = () => {
  const theme = useTheme();
  return (
    <Box sx={{ py: 12, backgroundColor: "#ffffff" }}>
      <FullWidth>
        <Box textAlign="center">
          <Fade direction="up" triggerOnce>
            <SectionTitle variant="h3" component="h2" sx={{ color: '#1e293b' }}>
              Explore Our Powerful Features
            </SectionTitle>
            <SectionSubtitle variant="h6" sx={{ color: '#64748b' }}>
              Discover how we help you grow and manage your portfolio efficiently.
            </SectionSubtitle>
          </Fade>
        </Box>
        <Grid container spacing={4}>
          {visualFeatures.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Fade direction="up" delay={index * 150} triggerOnce>
                <VisualFeatureCard elevation={0} className="lp-card">
                  <Box
                    sx={{
                      color: "primary.main",
                      pt: 5,
                      pb: 3,
                      bgcolor: alpha(theme.palette.primary.main, 0.04),
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <CardContent sx={{ p: 4, flexGrow: 1 }}>
                    <Typography variant="h5" component="h3" fontWeight={800} gutterBottom sx={{ color: '#1e293b' }}>
                      {feature.title}
                    </Typography>
                    <Typography sx={{ color: '#64748b', lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </VisualFeatureCard>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </FullWidth>
    </Box>
  );
};

/* ------------------------------ How it works ------------------------------- */
const StepWrap = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(3),
}));

const NumberBadge = styled("div")(({ theme, color }) => ({
  width: 80,
  height: 80,
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  margin: "0 auto 16px",
  fontSize: "1.25rem",
  fontWeight: 900,
  background: color,
  color: "#fff",
  boxShadow: `0 8px 20px ${alpha(theme.palette.common.black, 0.2)}`,
}));

const IconBadge = styled("div")(({ theme }) => ({
  width: 50,
  height: 50,
  borderRadius: 14,
  display: "grid",
  placeItems: "center",
  margin: "0 auto 14px",
  background: alpha("#fff", 0.12),
  "& .MuiSvgIcon-root": { fontSize: 28, color: "#fff" },
}));

const HowItWorksSection = () => {
  return (
    <Box id="how-it-works" sx={{ py: 12, background: "linear-gradient(135deg, #000 0%, #1a1a2e 100%)", color: "#fff" }}>
      <FullWidth>
        <Fade direction="up" triggerOnce>
          <Box textAlign="center">
            <SectionTitle variant="h3" component="h2" sx={{ color: "#fff" }}>
              Get Started in 3 Simple Steps
            </SectionTitle>
            <SectionSubtitle variant="h6" sx={{ color: alpha("#fff", 0.8) }}>
              Connect, visualize, and stay informed—without friction.
            </SectionSubtitle>
          </Box>
        </Fade>

        <Grid container spacing={5} justifyContent="center">
          {howItWorksSteps.map((step, i) => {
            const colors = ["#2563EB", "#10B981", "#F97316"];
            return (
              <Grid item xs={12} sm={4} key={step.title}>
                <Fade direction="up" delay={i * 150} triggerOnce>
                  <StepWrap>
                    <NumberBadge color={colors[i]}>{i + 1}</NumberBadge>
                    <IconBadge>{step.icon}</IconBadge>
                    <Typography variant="h6" component="h3" gutterBottom fontWeight={700} sx={{ color: "#fff" }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: alpha("#fff", 0.8), lineHeight: 1.6 }}>
                      {step.description}
                    </Typography>
                  </StepWrap>
                </Fade>
              </Grid>
            );
          })}
        </Grid>
      </FullWidth>
    </Box>
  );
};

/* --------------------------------- Pricing -------------------------------- */
const PricingCard = styled(Paper)(({ theme, popular }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  borderRadius: 20,
  backgroundColor: "#1a1a2e", // Changed to dark background
  border: popular ? `2px solid ${theme.palette.primary.main}` : `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  position: "relative",
  transition: "all 0.3s ease-in-out",
  boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
  "& .MuiTypography-root": { // Added text color overrides
    color: "#fff !important"
  },
  "& .MuiListItemText-primary": {
    color: "#fff !important"
  },
  "&:hover": { 
    transform: "translateY(-8px)", 
    boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.15)}`,
  },
}));

const PopularBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: -12,
  left: "50%",
  transform: "translateX(-50%)",
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: "#fff",
  padding: theme.spacing(0.75, 3),
  borderRadius: 999,
  fontSize: "0.75rem",
  fontWeight: 800,
  textTransform: "uppercase",
  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
}));

const BillingToggle = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 999,
  padding: theme.spacing(0.5),
  justifyContent: "center",
  maxWidth: 400,
  margin: '0 auto',
}));

const ToggleButton = styled(Button)(({ theme, active }) => ({
  textTransform: "none",
  fontWeight: 700,
  padding: theme.spacing(1, 3),
  borderRadius: 999,
  backgroundColor: active ? theme.palette.primary.main : "transparent",
  color: active ? "#fff" : theme.palette.text.primary,
  transition: "all 0.2s ease",
  "&:hover": { 
    backgroundColor: active ? theme.palette.primary.dark : alpha(theme.palette.primary.main, 0.08),
  },
}));

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  return (
    <Box id="pricing" sx={{ py: 12, backgroundColor: "#f8fafc" }}> {/* Softer background */}
      <FullWidth>
        <Fade direction="up" triggerOnce>
          <Box textAlign="center">
            <SectionTitle variant="h3" component="h2" sx={{ color: '#1e293b' }}>
              Simple, Transparent Pricing
            </SectionTitle>
            <SectionSubtitle variant="h6" sx={{ color: '#64748b' }}>
              Choose the plan that fits your investment journey. Start free and upgrade as you grow.
            </SectionSubtitle>
          </Box>
        </Fade>

        <Fade direction="up" delay={100} triggerOnce>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
            <BillingToggle>
              <ToggleButton active={billingCycle === "monthly"} onClick={() => setBillingCycle("monthly")}>
                Monthly
              </ToggleButton>
              <ToggleButton active={billingCycle === "yearly"} onClick={() => setBillingCycle("yearly")}>
                Yearly
                <Box 
                  component="span" 
                  sx={{ 
                    ml: 1, 
                    px: 1, 
                    py: 0.25, 
                    bgcolor: "success.main", 
                    color: "#fff", 
                    borderRadius: 1, 
                    fontSize: "0.7rem", 
                    fontWeight: 800 
                  }}
                >
                  Save 17%
                </Box>
              </ToggleButton>
            </BillingToggle>
          </Box>
        </Fade>

        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          {pricingData[billingCycle].map((plan, index) => (
            <Grid item xs={12} sm={6} md={5} key={plan.title}>
              <Fade direction="up" delay={index * 150} triggerOnce>
                <PricingCard 
                  elevation={0} 
                  popular={plan.popular} 
                  className="lp-card" 
                  sx={{ 
                    height: "100%", 
                    display: "flex", 
                    flexDirection: "column",
                    borderColor: plan.popular ? 'primary.main' : 'divider',
                  }}
                >
                  {plan.popular && <PopularBadge>Most Popular</PopularBadge>}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h3" fontWeight={900} gutterBottom sx={{ color: '#1e293b' }}>
                      {plan.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
                      {plan.subtitle}
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                      <Typography 
                        variant="h3" 
                        component="div" 
                        fontWeight={900} 
                        sx={{ 
                          display: "flex", 
                          alignItems: "baseline", 
                          justifyContent: "center", 
                          letterSpacing: -0.5,
                          color: '#1e293b',
                        }}
                      >
                        {plan.price}
                        <Typography variant="h6" component="span" sx={{ color: '#64748b', ml: 1 }}>
                          /{billingCycle === "monthly" ? "month" : "year"}
                        </Typography>
                      </Typography>
                      {plan.originalPrice && (
                        <Typography variant="body2" sx={{ color: '#64748b', textDecoration: "line-through", mt: 0.5 }}>
                          {plan.originalPrice}/year
                        </Typography>
                      )}
                    </Box>
                    <List sx={{ mb: 3, p: 0 }}>
                      {plan.features.map((feature, i) => (
                        <ListItem key={i} sx={{ py: 0.5, px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleOutline 
                              sx={{ 
                                fontSize: 20, 
                                color: plan.popular ? "primary.main" : "success.main" 
                              }} 
                            />
                          </ListItemIcon>
                          <ListItemText 
                            primary={feature} 
                            primaryTypographyProps={{ 
                              variant: "body2",
                              color: '#1e293b',
                              fontWeight: 500,
                            }} 
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  <Button
                    variant={plan.popular ? "contained" : "outlined"}
                    color="primary"
                    fullWidth
                    size="large"
                    component={RouterLink}
                    to={plan.title === "Free" ? "/signup" : "/signup?plan=premium"}
                    sx={{ 
                      mt: "auto", 
                      textTransform: "none", 
                      fontWeight: 800, 
                      py: 1.5, 
                      borderRadius: 999,
                      background: plan.popular ? 'linear-gradient(135deg, #3B82F6, #1D4ED8)' : 'transparent',
                      color: plan.popular ? '#fff' : '#1e293b',
                      borderColor: plan.popular ? 'transparent' : '#cbd5e1',
                      "&:hover": {
                        background: plan.popular ? 'linear-gradient(135deg, #1D4ED8, #1E40AF)' : 'rgba(15, 23, 42, 0.04)',
                      }
                    }}
                  >
                    {plan.title === "Free" ? "Get Started Free" : "Start Premium Trial"}
                  </Button>
                </PricingCard>
              </Fade>
            </Grid>
          ))}
        </Grid>

        <Fade direction="up" delay={300} triggerOnce>
          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              All plans include a 30-day money-back guarantee. No questions asked.
            </Typography>
          </Box>
        </Fade>
      </FullWidth>
    </Box>
  );
};

/* --------------------------------- Trust us -------------------------------- */
const WhyTrustUsSection = () => {
  const theme = useTheme();
  return (
    <Box sx={{ py: 12, backgroundColor: "#1a1a2e" }}> 
      <FullWidth>
        <Fade direction="up" triggerOnce>
          <SectionTitle variant="h3" component="h2" align="center" sx={{ mb: 6, color: '#fff' }}>
            Why Investors Trust Us
          </SectionTitle>
        </Fade>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Fade direction="left" triggerOnce>
              <Paper 
                className="lp-card" 
                sx={{ 
                  display: "flex", 
                  justifyContent: "center", 
                  p: 4,
                  borderRadius: 4,
                  backgroundColor: alpha(theme.palette.primary.main, 0.03),
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                }}
              >
                <VerifiedUser
                  sx={{
                    fontSize: { xs: 200, sm: 240, md: 280 },
                    color: alpha(theme.palette.secondary.main, 0.15),
                  }}
                />
              </Paper>
            </Fade>
          </Grid>
          <Grid item xs={12} md={6}>
            <Fade direction="right" triggerOnce>
              <List>
                {whyTrustUsItems.map((item) => (
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
                        color: '#fff', // Changed to white
                        fontSize: '1.1rem',
                        mb: 0.5,
                      }}
                      secondaryTypographyProps={{
                        color: alpha('#fff', 0.7), // Changed to semi-transparent white
                        lineHeight: 1.6,
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Fade>
          </Grid>
        </Grid>
      </FullWidth>
    </Box>
  );
};

/* --------------------------------- CTA + footer ---------------------------- */
const CallToActionSection = () => (
  <Box sx={{ 
    py: 12, 
    background: "linear-gradient(135deg, #000 0%, #1a1a2e 100%)", 
    color: "#fff",
    position: 'relative',
    overflow: 'hidden',
  }}>
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(ellipse 80% 50% at 50% 50%, rgba(120, 119, 198, 0.1), transparent)
        `,
        zIndex: 1,
      }}
    />
    <FullWidth sx={{ textAlign: "center", position: 'relative', zIndex: 2 }}>
      <Fade direction="up" triggerOnce>
        <Typography variant="h3" component="h2" gutterBottom fontWeight={900} sx={{ color: "#fff" }}>
          Ready to Elevate Your Investment Strategy?
        </Typography>
      </Fade>
      <Fade direction="up" delay={100} triggerOnce>
        <Typography variant="h6" paragraph sx={{ mb: 4, color: alpha("#fff", 0.85), lineHeight: 1.6 }}>
          Join thousands of investors who are making smarter decisions. Sign up today and take the
          first step towards financial clarity.
        </Typography>
      </Fade>
      <Fade direction="up" delay={200} triggerOnce>
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
          Start Tracking for Free
        </HeroButton>
      </Fade>
    </FullWidth>
  </Box>
);

const PageFooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#f8fafc",
  padding: theme.spacing(4, 2),
  textAlign: "center",
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const PageFooter = () => (
  <PageFooterContainer className="lp-footer">
    <FullWidth>
      <Typography variant="body2" sx={{ color: '#64748b' }}>
        © {new Date().getFullYear()} InvestTracker. All rights reserved.
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Button component={RouterLink} to="/privacy" size="small" sx={{ textTransform: "none", mx: 1, color: '#64748b' }}>
          Privacy Policy
        </Button>
        <Button component={RouterLink} to="/terms" size="small" sx={{ textTransform: "none", mx: 1, color: '#64748b' }}>
          Terms of Service
        </Button>
        <Button component={RouterLink} to="/support" size="small" sx={{ textTransform: "none", mx: 1, color: '#64748b' }}>
          Support
        </Button>
      </Box>
    </FullWidth>
  </PageFooterContainer>
);

/* --------------------------------- Page ----------------------------------- */
const LandingPage = () => {
  return (
    <Box className="landing" sx={{ overflowX: "hidden" }}>
      <NavigationBar />
      <main>
        <Hero />
        <FeaturesSection />
        <VisualFeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <WhyTrustUsSection />
        <CallToActionSection />
      </main>
      <PageFooter />
    </Box>
  );
};

export default LandingPage;