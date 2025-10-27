import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
  ExpandMore,
  Search,
  Email,
  Article,
  Forum,
  CheckCircle,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
  padding: theme.spacing(15, 0, 10, 0),
  textAlign: "center",
}));

const SearchContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  maxWidth: 600,
  margin: "0 auto",
  borderRadius: theme.shape.borderRadius * 3,
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

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: `${theme.shape.borderRadius}px !important`,
  "&:before": { display: "none" },
  border: `1px solid ${theme.palette.divider}`,
}));

// FAQ Data
const faqCategories = [
  {
    title: "Getting Started",
    questions: [
      {
        question: "How do I create my first portfolio?",
        answer: "To create your first portfolio, sign up for an account, then click on 'Create Portfolio' in your dashboard. Give your portfolio a name and start adding your investments by clicking 'Add Transaction'."
      },
      {
        question: "How do I add a cryptocurrency or stock?",
        answer: "You can add assets by going to your portfolio, clicking 'Add Transaction', selecting the asset type (crypto, stock, etc.), and entering the details like symbol, quantity, and purchase price."
      },
      {
        question: "How do I connect my exchange wallet?",
        answer: "We currently support manual CSV imports from most major exchanges. Go to the 'Brokers' section, select your exchange, and follow the upload instructions. API integrations are coming soon!"
      },
      {
        question: "Is my financial data secure?",
        answer: "Yes! We use bank-grade encryption and never store your exchange API keys. Your data is encrypted both in transit and at rest."
      }
    ]
  },
  {
    title: "Account & Billing",
    questions: [
      {
        question: "How do I reset my password?",
        answer: "Click on 'Sign In' then 'Forgot Password'. Enter your email address and we'll send you a password reset link. Check your spam folder if you don't see it within 5 minutes."
      },
      {
        question: "How do I upgrade or change my subscription plan?",
        answer: "Go to Settings > Subscription and click 'Upgrade Plan'. You can change between monthly and yearly billing at any time. Upgrading takes effect immediately."
      },
      {
        question: "How do I cancel my subscription?",
        answer: "You can cancel your subscription at any time in Settings > Subscription. Your premium features will remain active until the end of your billing period."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans."
      }
    ]
  },
  {
    title: "Features & Troubleshooting",
    questions: [
      {
        question: "Why are my portfolio stats not updating?",
        answer: "This is usually due to data feed issues. First, check our status page for any ongoing issues. If everything looks good, try refreshing your portfolio data manually from the settings menu."
      },
      {
        question: "How is my performance calculated?",
        answer: "Performance is calculated using the time-weighted return method, which eliminates the impact of cash flows and gives you a true measure of your investment skill."
      },
      {
        question: "The price for an asset seems incorrect. How can I fix it?",
        answer: "Prices are sourced from multiple reliable exchanges. If you notice a discrepancy, you can manually update the price by editing the asset in your portfolio or report it to our support team."
      },
      {
        question: "I'm missing a transaction type (e.g., staking, lending). How do I add it?",
        answer: "You can add custom transaction types in the 'Add Transaction' modal by selecting 'Other' and specifying the type. We're constantly adding new transaction types based on user feedback."
      }
    ]
  }
];

// Popular Articles
const popularArticles = [
  {
    title: "Getting Started Guide",
    description: "Learn how to set up your first portfolio and add your investments",
    category: "Getting Started",
    link: "/guide/getting-started",
    readTime: "5 min read"
  },
  {
    title: "Understanding Performance Metrics",
    description: "A deep dive into how we calculate your investment performance",
    category: "Features",
    link: "/guide/performance-metrics",
    readTime: "8 min read"
  },
  {
    title: "CSV Import Guide",
    description: "Step-by-step instructions for importing from popular exchanges",
    category: "Troubleshooting",
    link: "/guide/csv-import",
    readTime: "6 min read"
  },
  {
    title: "Subscription & Billing FAQ",
    description: "Everything you need to know about managing your subscription",
    category: "Billing",
    link: "/guide/billing",
    readTime: "4 min read"
  }
];

const SupportPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(0);
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

  // EmailJS Configuration - REPLACE THESE WITH YOUR ACTUAL CREDENTIALS
  const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_obr2nxj',     // Get from EmailJS dashboard
    TEMPLATE_ID: 'template_m5g7h7l',   // Get from EmailJS dashboard  
    PUBLIC_KEY: 'VycM8gpbceNhNOEBD'      // Get from EmailJS dashboard
  };

  useEffect(() => {
  const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = EMAILJS_CONFIG;

  // Check if credentials are properly configured (NOT the placeholder values)
  const isConfigured = SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY && 
                      !SERVICE_ID.includes('your_service_id') &&  // Check for placeholder, not actual
                      !TEMPLATE_ID.includes('your_template_id') && // Check for placeholder, not actual
                      !PUBLIC_KEY.includes('your_public_key');     // Check for placeholder, not actual

  if (isConfigured) {
    emailjs.init(PUBLIC_KEY);
    setEmailJSReady(true);
    console.log('EmailJS initialized successfully');
  } else {
    console.warn('EmailJS credentials not configured. Please add your actual EmailJS credentials.');
    console.log('Current config:', { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY });
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

      console.log('Email sent successfully:', result);

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
      
      // Fallback to mailto
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

  // Create a comprehensive search index
  const searchIndex = faqCategories.flatMap(category => 
    category.questions.map(question => ({
      ...question,
      category: category.title,
      type: 'faq'
    }))
  ).concat(popularArticles.map(article => ({
    question: article.title,
    answer: article.description,
    category: article.category,
    type: 'article',
    link: article.link,
    readTime: article.readTime
  })));

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    const results = searchIndex.filter(item =>
      item.question.toLowerCase().includes(query.toLowerCase()) ||
      item.answer.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(results);
  };

  const handleCategoryChange = (panel) => (event, isExpanded) => {
    setExpandedCategory(isExpanded ? panel : false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  // Quick Help Items
  const quickHelpItems = [
    {
      icon: <Article sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />,
      title: "Knowledge Base",
      description: "Browse our comprehensive documentation and guides",
      action: () => {
        // Scroll to FAQ section
        const faqSection = document.getElementById('faq-section');
        if (faqSection) {
          faqSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    {
      icon: <Email sx={{ fontSize: 48, color: "secondary.main", mb: 2 }} />,
      title: "Contact Support",
      description: "Get personalized help from our support team",
      action: () => {
        // Scroll to contact section
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    {
      icon: <Forum sx={{ fontSize: 48, color: "success.main", mb: 2 }} />,
      title: "Community Forum",
      description: "Join discussions with other investors",
      action: () => {
        // Open community forum in new tab
        window.open('https://community.investtracker.com', '_blank');
      }
    },
    {
      icon: <CheckCircle sx={{ fontSize: 48, color: "warning.main", mb: 2 }} />,
      title: "System Status",
      description: "Check system status and uptime",
      action: () => {
        // Navigate to status page
        navigate('/status');
      }
    },
  ];

  // Filter FAQs based on search query
  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pt: { xs: 12, md: 15 } }}>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom color="text.primary">
            How can we help you?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, margin: "0 auto" }}>
            Find answers to common questions, browse our documentation, or get in touch with our support team.
          </Typography>
          
          <SearchContainer elevation={2}>
            <Box sx={{ position: "relative" }}>
              <Search sx={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "text.secondary" }} />
              <TextField
                fullWidth
                placeholder="Search for answers (e.g., 'password reset', 'portfolio', 'billing')..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    pl: 6,
                    borderRadius: 2,
                  }
                }}
              />
            </Box>
            {searchQuery && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Found {searchResults ? searchResults.length : 0} results for "{searchQuery}"
              </Typography>
            )}
          </SearchContainer>
        </Container>
      </HeroSection>

      {/* Search Results */}
      {searchResults && searchQuery && (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom fontWeight="bold" color="text.primary">
            Search Results
          </Typography>
          {searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <Paper key={index} sx={{ p: 3, mb: 2, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6" fontWeight="medium" color="primary">
                    {result.question}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), px: 1, borderRadius: 1 }}>
                    {result.type === 'article' ? 'Article' : 'FAQ'}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {result.answer}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    Category: {result.category}
                  </Typography>
                  {result.readTime && (
                    <Typography variant="caption" color="text.secondary">
                      {result.readTime}
                    </Typography>
                  )}
                </Box>
              </Paper>
            ))
          ) : (
            <Typography textAlign="center" color="text.secondary" sx={{ py: 4 }}>
              No results found for "{searchQuery}". Try different keywords or contact our support team.
            </Typography>
          )}
        </Container>
      )}

      {/* Quick Help Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" fontWeight="bold" textAlign="center" gutterBottom color="text.primary">
          Quick Help
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 6, maxWidth: 600, margin: "0 auto" }}>
          Get instant answers to the most common questions
        </Typography>

        <Grid container spacing={4} sx={{ mb: 10 }}>
          {quickHelpItems.map((item, index) => (
            <Grid item xs={12} md={3} key={index}>
              <FeatureCard 
                onClick={item.action}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[8],
                  }
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 4 }}>
                  {item.icon}
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>

        {/* Popular Articles */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom color="text.primary">
            Popular Articles
          </Typography>
          <Grid container spacing={3}>
            {popularArticles.map((article, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper 
                  sx={{ 
                    p: 3, 
                    borderRadius: 2, 
                    border: `1px solid ${theme.palette.divider}`,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[4],
                    }
                  }}
                  onClick={() => {
                    // In a real app, this would navigate to the article
                    alert(`This would navigate to: ${article.link}\n\nIn a real application, this would open a detailed guide page.`);
                  }}
                >
                  <Typography variant="h6" gutterBottom fontWeight="medium">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {article.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="primary" fontWeight="medium">
                      {article.category}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {article.readTime}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* FAQ Section */}
        <Box id="faq-section" sx={{ mb: 10 }}>
          <Typography variant="h4" component="h2" fontWeight="bold" textAlign="center" gutterBottom color="text.primary">
            Frequently Asked Questions
          </Typography>
          
          {!searchQuery && filteredFAQs.length > 0 ? (
            filteredFAQs.map((category, categoryIndex) => (
              <Box key={categoryIndex} sx={{ mb: 4 }}>
                <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom color="text.primary" sx={{ mt: 4, mb: 2 }}>
                  {category.title}
                </Typography>
                {category.questions.map((faq, faqIndex) => (
                  <StyledAccordion 
                    key={faqIndex}
                    expanded={expandedCategory === `${categoryIndex}-${faqIndex}`}
                    onChange={handleCategoryChange(`${categoryIndex}-${faqIndex}`)}
                  >
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="h6" component="h4" fontWeight="medium">
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1" color="text.secondary">
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </StyledAccordion>
                ))}
              </Box>
            ))
          ) : searchQuery && filteredFAQs.length === 0 ? (
            <Typography textAlign="center" color="text.secondary" sx={{ py: 4 }}>
              No FAQ results found for "{searchQuery}". Try different keywords or contact our support team.
            </Typography>
          ) : null}
        </Box>

        {/* Contact Support Section */}
        <Box component="section" id="contact">
            <Paper sx={{ p: 6, borderRadius: 3 }}>
                <Typography variant="h4" component="h2" fontWeight="bold" textAlign="center" gutterBottom color="text.primary">
                Still Need Help?
                </Typography>
                <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
                Our support team is here to help you get the most out of our platform.
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
                            <MenuItem value="technical">Technical Issue</MenuItem>
                            <MenuItem value="billing">Billing Question</MenuItem>
                            <MenuItem value="feature">Feature Request</MenuItem>
                            <MenuItem value="bug">Bug Report</MenuItem>
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
                            placeholder="Brief description of your issue..."
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="How can we help you?"
                            name="message"
                            multiline
                            rows={6}
                            value={contactForm.message}
                            onChange={handleInputChange}
                            required
                            disabled={isSubmitting}
                            placeholder="Please provide as much detail as possible about your issue or question. The more information you provide, the better we can help you."
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
                        {!emailJSReady && (
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                            (Email service configuring...)
                            </Typography>
                        )}
                        </Grid>
                    </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                        Contact Information
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        You can also reach us directly at:
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        📧 support@investtracker.com
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        We typically respond within 24 hours.
                    </Typography>
                    </Box>
                </Grid>
                </Grid>
            </Paper>
            </Box>
      </Container>
    </Box>
  );
};

export default SupportPage;