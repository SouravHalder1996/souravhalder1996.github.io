const fs = require('fs');

// Read the FAQ knowledge data
const faqContent = fs.readFileSync('src/data/aiKnowledge.ts', 'utf8');

// Test suite for granular FAQ matching
const testSuite = [
  { q: "what is your notice period", expectedCat: "Hiring & Logistics" },
  { q: "where are you located", expectedCat: "Hiring & Logistics" },
  { q: "are you open to relocate to bangalore or hyderabad", expectedCat: "Hiring & Logistics" },
  { q: "what is your expected salary", expectedCat: "Hiring & Logistics" },
  { q: "what roles are you looking for", expectedCat: "Hiring & Logistics" },
  { q: "how many years of experience do you have", expectedCat: "Hiring & Logistics" },
  { q: "what is your phone number", expectedCat: "Contact" },
  { q: "what is your email address", expectedCat: "Contact" },
  { q: "what is your linkedin profile", expectedCat: "Contact" },
  { q: "what is your github url", expectedCat: "Contact" },
  { q: "where can i download your resume", expectedCat: "Resume" },
  { q: "what is the 93.75% metric", expectedCat: "Quantified Impact" },
  { q: "how did you reduce glue cost by 76%", expectedCat: "Quantified Impact" },
  { q: "what was the 40% mttr reduction", expectedCat: "Quantified Impact" },
  { q: "what is your experience with agentic ai", expectedCat: "Agentic AI" },
  { q: "do you know langchain", expectedCat: "Agentic AI" },
  { q: "what is portkey ai", expectedCat: "Generative AI" },
  { q: "how do you build rag pipelines", expectedCat: "Generative AI" },
  { q: "which foundation models have you worked with", expectedCat: "Generative AI" },
  { q: "what is your data science background", expectedCat: "Data Science" },
  { q: "which machine learning libraries do you use", expectedCat: "Data Science" },
  { q: "tell me about the anomaly detection project", expectedCat: "Data Science" },
  { q: "what is your apache iceberg experience", expectedCat: "Lakehouse Engineering" },
  { q: "which aws services do you know", expectedCat: "Cloud Architecture" },
  { q: "what is your databricks experience", expectedCat: "Databricks" },
  { q: "which certifications do you have", expectedCat: "Certifications" },
  { q: "which databricks certifications do you have", expectedCat: "Certifications" },
  { q: "which aws certifications do you have", expectedCat: "Certifications" },
  { q: "what is your educational background", expectedCat: "Education" },
  { q: "do you have any research publications", expectedCat: "Education" },
  { q: "what programming languages do you know", expectedCat: "Skills" },
  { q: "why should we hire you", expectedCat: "Value Proposition" },
  { q: "hello there", expectedCat: "Conversational" },
  { q: "what is the weather in Paris today", expectedCat: "Fallback" }
];

console.log("Evaluation script ready with " + testSuite.length + " tests.");
