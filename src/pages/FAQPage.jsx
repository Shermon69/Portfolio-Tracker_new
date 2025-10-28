// src/pages/FAQPage.jsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  useTheme,
  alpha,
} from "@mui/material";
import {
  ExpandMore,
  Search,
  OpenInNew,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
  padding: theme.spacing(8, 0, 6, 0),
  textAlign: "center",
}));

const SearchContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  maxWidth: 600,
  margin: "0 auto",
  borderRadius: theme.shape.borderRadius * 3,
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: `${theme.shape.borderRadius}px !important`,
  "&:before": { display: "none" },
  border: `1px solid ${theme.palette.divider}`,
}));

const ArticleCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${theme.palette.divider}`,
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
    textDecoration: 'none',
    color: 'inherit',
  }
}));

// FAQ Data (from your original SupportPage)
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

// Real Educational Articles with External Links
const educationalArticles = [
  {
    title: "Beginner's Guide to Portfolio Diversification",
    description: "Learn why diversification is crucial for managing investment risk and how to properly allocate your assets across different sectors and markets.",
    category: "Investment Basics",
    link: "https://www.investopedia.com/articles/03/072303.asp",
    readTime: "8 min read",
    source: "Investopedia"
  },
  {
    title: "Understanding Risk Management in Investing",
    description: "A comprehensive guide to assessing your risk tolerance and implementing strategies to protect your portfolio from market volatility.",
    category: "Risk Management",
    link: "https://www.nerdwallet.com/article/investing/investing-101-portfolio-diversification",
    readTime: "6 min read",
    source: "NerdWallet"
  },
  {
    title: "How to Read Financial Statements",
    description: "Learn the basics of balance sheets, income statements, and cash flow statements to make informed investment decisions.",
    category: "Financial Analysis",
    link: "https://corporatefinanceinstitute.com/resources/accounting/reading-financial-statements/",
    readTime: "10 min read",
    source: "Corporate Finance Institute"
  },
  {
    title: "The Power of Compound Interest",
    description: "Discover how compound interest works and why starting early can significantly impact your long-term investment growth.",
    category: "Wealth Building",
    link: "https://www.thebalance.com/how-compound-interest-works-315242",
    readTime: "5 min read",
    source: "The Balance"
  },
  {
    title: "Asset Allocation Strategies by Age",
    description: "Guidelines for adjusting your investment portfolio allocation based on your age, risk tolerance, and financial goals.",
    category: "Portfolio Strategy",
    link: "https://www.schwab.com/learn/story/asset-allocation-strategies-by-age",
    readTime: "7 min read",
    source: "Charles Schwab"
  },
  {
    title: "Tax-Efficient Investing Strategies",
    description: "Learn how to structure your investments to minimize tax liabilities and maximize after-tax returns.",
    category: "Tax Planning",
    link: "https://www.fidelity.com/learning-center/investment-products/mutual-funds/tax-efficient-investing-strategies",
    readTime: "9 min read",
    source: "Fidelity"
  }
];

const FAQPage = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(0);

  // Create a comprehensive search index
  const searchIndex = faqCategories.flatMap(category => 
    category.questions.map(question => ({
      ...question,
      category: category.title,
      type: 'faq'
    }))
  ).concat(educationalArticles.map(article => ({
    question: article.title,
    answer: article.description,
    category: article.category,
    type: 'article',
    link: article.link,
    readTime: article.readTime,
    source: article.source
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

  const handleArticleClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Filter FAQs based on search query
  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom color="text.primary">
            Help Center & FAQs
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, margin: "0 auto" }}>
            Find answers to common questions and explore educational resources to enhance your investment knowledge.
          </Typography>
          
          <SearchContainer elevation={1}>
            <Box sx={{ position: "relative" }}>
              <Search sx={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "text.secondary" }} />
              <TextField
                fullWidth
                placeholder="Search FAQs and articles (e.g., 'portfolio', 'billing', 'diversification')..."
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
              <Paper 
                key={index} 
                sx={{ 
                  p: 3, 
                  mb: 2, 
                  borderRadius: 2, 
                  border: `1px solid ${theme.palette.divider}`,
                  cursor: result.type === 'article' ? 'pointer' : 'default',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': result.type === 'article' ? {
                    borderColor: theme.palette.primary.main,
                    boxShadow: theme.shadows[2],
                  } : {}
                }}
                onClick={result.type === 'article' ? () => handleArticleClick(result.link) : undefined}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6" fontWeight="medium" color="primary">
                    {result.question}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ 
                    bgcolor: alpha(
                      result.type === 'article' ? theme.palette.success.main : theme.palette.primary.main, 
                      0.1
                    ), 
                    px: 1, 
                    borderRadius: 1 
                  }}>
                    {result.type === 'article' ? 'Educational Article' : 'FAQ'}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {result.answer}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    Category: {result.category}
                    {result.source && ` • Source: ${result.source}`}
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
              No results found for "{searchQuery}". Try different keywords.
            </Typography>
          )}
        </Container>
      )}

      {/* Educational Articles Section */}
      {!searchQuery && (
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom color="text.primary" sx={{ mb: 1 }}>
            Educational Resources
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Expand your investment knowledge with these carefully selected articles from trusted financial sources.
          </Typography>

          <Grid container spacing={3}>
            {educationalArticles.map((article, index) => (
              <Grid item xs={12} md={6} key={index}>
                <ArticleCard 
                  component="a"
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleArticleClick(article.link);
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="caption" color="primary" fontWeight="bold" sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1
                    }}>
                      {article.category}
                    </Typography>
                    <OpenInNew sx={{ fontSize: 16, color: 'text.secondary' }} />
                  </Box>
                  
                  <Typography variant="h6" gutterBottom fontWeight="medium" sx={{ flexGrow: 1 }}>
                    {article.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                    {article.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                    <Typography variant="caption" color="text.secondary" fontWeight="medium">
                      {article.source}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {article.readTime}
                    </Typography>
                  </Box>
                </ArticleCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {/* FAQ Section */}
      {!searchQuery && (
        <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            <Typography variant="h4" component="h2" fontWeight="bold" textAlign="center" gutterBottom color="text.primary">
              Frequently Asked Questions
            </Typography>
            <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6, maxWidth: 600, margin: "0 auto" }}>
              Quick answers to the most common questions about using InvestTracker
            </Typography>
            
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((category, categoryIndex) => (
                <Box key={categoryIndex} sx={{ mb: 6 }}>
                  <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom color="text.primary" sx={{ mt: 4, mb: 3 }}>
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
                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                          {faq.answer}
                        </Typography>
                      </AccordionDetails>
                    </StyledAccordion>
                  ))}
                </Box>
              ))
            ) : null}
          </Container>
        </Box>
      )}

      {/* Support CTA */}
      {!searchQuery && (
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Paper sx={{ 
            p: 6, 
            borderRadius: 3, 
            textAlign: 'center',
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
          }}>
            <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom color="text.primary">
              Still Need Help?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, margin: '0 auto' }}>
              Can't find what you're looking for? Our support team is ready to assist you with any questions about your portfolio or investment strategy.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                📧 support@investtracker.com
              </Typography>
              <Typography variant="body1" color="text.secondary">
                • Typically respond within 24 hours
              </Typography>
            </Box>
          </Paper>
        </Container>
      )}
    </Box>
  );
};

export default FAQPage;