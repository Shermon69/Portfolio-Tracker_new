// import React, { useState, useEffect } from 'react';
// import { AppBar, Toolbar, Button, Box, Container, Typography, IconButton, Drawer, useScrollTrigger, Slide } from '@mui/material';
// import { Link as RouterLink } from 'react-router-dom';
// import { HashLink } from 'react-router-hash-link';
// import { styled, alpha } from '@mui/material/styles';
// import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';

// const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
//   backgroundColor: scrolled ? alpha(theme.palette.background.paper, 0.95) : "transparent",
//   backdropFilter: scrolled ? "blur(20px)" : "none",
//   borderBottom: scrolled ? `1px solid ${theme.palette.divider}` : "none",
//   boxShadow: scrolled ? theme.shadows[1] : "none",
//   transition: "all 0.3s ease-in-out",
// }));

// const NavButton = styled(Button)(({ theme }) => ({
//   color: theme.palette.text.primary,
//   textTransform: "none",
//   fontWeight: 500,
//   padding: theme.spacing(1, 2),
//   borderRadius: theme.shape.borderRadius * 2,
//   transition: "all 0.2s ease-in-out",
//   "&:hover": { 
//     backgroundColor: alpha(theme.palette.primary.main, 0.08), 
//     color: theme.palette.primary.main 
//   },
// }));

// const LogoText = styled(Typography)(({ theme }) => ({
//   fontWeight: "bold",
//   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//   backgroundClip: "text",
//   WebkitBackgroundClip: "text",
//   WebkitTextFillColor: "transparent",
//   cursor: "pointer",
// }));

// const MobileDrawer = styled(Drawer)(({ theme }) => ({
//   "& .MuiDrawer-paper": { 
//     width: 280, 
//     backgroundColor: theme.palette.background.paper, 
//     padding: theme.spacing(2) 
//   },
// }));

// function HideOnScroll({ children }) {
//   const trigger = useScrollTrigger();
//   // Wrap children in a plain div so MUI's Slide clones a real DOM element (prevents "style" undefined error)
//   return (
//     <Slide appear={false} direction="down" in={!trigger}>
//       <div>{children}</div>
//     </Slide>
//   );
// }

// const PublicNavigation = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

//   const navItems = [
//     { label: "Features", href: "/#features" },
//     { label: "How It Works", href: "/#how-it-works" },
//     { label: "Pricing", href: "/#pricing" },
//     { label: "Support", href: "/support" }
//   ];

//   const drawer = (
//     <Box>
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//         <LogoText variant="h5">InvestTracker</LogoText>
//         <IconButton onClick={handleDrawerToggle} edge="end">
//           <CloseIcon />
//         </IconButton>
//       </Box>
//       <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//         {navItems.map((item) => (
//           <Button 
//             key={item.label} 
//             component={item.href.startsWith("/#") ? HashLink : RouterLink} 
//             to={item.href}
//             fullWidth 
//             onClick={handleDrawerToggle} 
//             sx={{ 
//               justifyContent: "flex-start", 
//               textTransform: "none", 
//               py: 1.5, 
//               color: "text.primary",
//               "&:hover": { 
//                 backgroundColor: alpha('#1976d2', 0.08), 
//                 color: 'primary.main' 
//               }
//             }}
//           >
//             {item.label}
//           </Button>
//         ))}
//         <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 1 }}>
//           <Button 
//             component={RouterLink} 
//             to="/login" 
//             variant="outlined" 
//             fullWidth 
//             sx={{ textTransform: "none", py: 1.5 }}
//           >
//             Sign In
//           </Button>
//           <Button 
//             component={RouterLink} 
//             to="/signup" 
//             variant="contained" 
//             fullWidth 
//             sx={{ textTransform: "none", py: 1.5 }}
//           >
//             Get Started
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );

//   return (
//     <HideOnScroll>
//       <StyledAppBar position="fixed" elevation={0} scrolled={scrolled}>
//         <Container maxWidth="lg">
//           <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
//             <LogoText variant="h5" component={RouterLink} to="/">
//               InvestTracker
//             </LogoText>
            
//             <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
//               {navItems.map((item) => (
//                 <NavButton
//                   key={item.label}
//                   component={item.href.startsWith("/#") ? HashLink : RouterLink}
//                   to={item.href}
//                 >
//                   {item.label}
//                 </NavButton>
//               ))}
//             </Box>

//             <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
//               <Button 
//                 component={RouterLink} 
//                 to="/login" 
//                 sx={{ 
//                   textTransform: "none", 
//                   color: "text.primary",
//                   "&:hover": { 
//                     backgroundColor: alpha('#1976d2', 0.08) 
//                   }
//                 }}
//               >
//                 Sign In
//               </Button>
//               <Button 
//                 component={RouterLink} 
//                 to="/signup" 
//                 variant="contained" 
//                 sx={{ 
//                   textTransform: "none", 
//                   borderRadius: 2,
//                   px: 3 
//                 }}
//               >
//                 Get Started
//               </Button>
//             </Box>

//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="end"
//               onClick={handleDrawerToggle}
//               sx={{ display: { md: "none" }, color: "text.primary" }}
//             >
//               <MenuIcon />
//             </IconButton>
//           </Toolbar>
//         </Container>
//       </StyledAppBar>
//       <MobileDrawer
//         variant="temporary"
//         anchor="right"
//         open={mobileOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{ keepMounted: true }}
//       >
//         {drawer}
//       </MobileDrawer>
//     </HideOnScroll>
//   );
// };

// export default PublicNavigation;