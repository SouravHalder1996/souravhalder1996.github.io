const knowledgeCorpus = [
  // 1. Greetings & Chatbot Intro
  {
    id: "greetings",
    category: "Conversational",
    primaryKeywords: ["hi", "hello", "hey", "greetings", "good morning", "good evening", "who are you", "what can you do", "help"],
    secondaryKeywords: ["bot", "assistant", "start"],
    intentPhrases: ["who are you", "what can you do", "how can you help", "hello", "hi there", "hello there"],
    generate: () => `### Conversational Match`
  },

  // 2. Current Role & Experience at Infosys
  {
    id: "current_role_experience",
    category: "Experience",
    primaryKeywords: ["infosys", "current role", "current job", "experience", "senior associate consultant", "work history", "career", "employment", "years of experience", "company"],
    secondaryKeywords: ["job", "role", "work", "consultant"],
    intentPhrases: ["what is your current role", "tell me about your experience", "where do you work", "experience at infosys", "how many years of experience", "experience at your company"],
    generate: () => `### Experience Match`
  },

  // 3. Notice Period, Availability & Work Mode
  {
    id: "availability_notice",
    category: "Hiring & Availability",
    primaryKeywords: ["notice period", "notice", "availability", "available", "joining", "start date", "location", "relocate", "relocation", "remote", "hybrid", "onsite", "visa", "salary", "compensation", "start"],
    secondaryKeywords: ["hire", "joining time", "city", "where are you located", "when can you start"],
    intentPhrases: ["what is your notice period", "when can you join", "where are you located", "are you open to relocate", "are you available for hire", "when can you start", "start date", "earliest start date"],
    generate: () => `### Hiring & Availability Match`
  },

  // 4. Agentic AI & Autonomous Multi-Agent Systems
  {
    id: "agentic_ai",
    category: "Agentic AI",
    primaryKeywords: ["agentic", "agent", "agents", "multi-agent", "langchain", "autonomous", "tool calling", "agent memory", "eval", "evaluation", "workflow"],
    secondaryKeywords: ["tool", "orchestration", "state machine", "reasoning"],
    intentPhrases: ["what is your experience with agentic ai", "how do you build ai agents", "multi agent systems", "langchain agents", "agentic workflows"],
    generate: () => `### Agentic AI Match`
  },

  // 5. Generative AI, LLMs, Portkey & RAG
  {
    id: "genai_llms",
    category: "Generative AI",
    primaryKeywords: ["genai", "generative ai", "llm", "large language model", "large language models", "rag", "portkey", "embeddings", "vector", "vector database", "prompt", "prompt engineering", "openai", "anthropic", "claude", "huggingface", "fine-tuning", "foundation models", "foundation model"],
    secondaryKeywords: ["chat", "generative", "models", "retrieval"],
    intentPhrases: ["tell me about your genai experience", "how do you build rag pipelines", "portkey ai", "experience with llms", "foundation models"],
    generate: () => `### Generative AI Match`
  },

  // 6. Data Science, ML Models & Statistical Analytics
  {
    id: "data_science_ml",
    category: "Data Science",
    primaryKeywords: ["data science", "data scientist", "machine learning", "ml", "statistical", "statistics", "scikit-learn", "tensorflow", "keras", "pandas", "numpy", "clustering", "regression", "classification", "feature engineering", "mlflow", "machine learning models", "ml models", "ml libraries"],
    secondaryKeywords: ["modeling", "algorithms", "predictive", "deep learning", "libraries"],
    intentPhrases: ["what is your data science background", "machine learning experience", "what ml models do you use", "data science skills", "machine learning models and libraries"],
    generate: () => `### Data Science Match`
  },

  // 7. Streaming ML & Anomaly Detection (Kafka + Spark)
  {
    id: "streaming_anomaly",
    category: "Streaming & ML",
    primaryKeywords: ["anomaly", "anomaly detection", "streaming", "kafka", "spark streaming", "iot", "telemetry", "mttr", "real-time", "sub-second"],
    secondaryKeywords: ["latency", "prometheus", "grafana", "pipeline"],
    intentPhrases: ["tell me about anomaly detection", "kafka spark streaming", "real time streaming project", "iot anomaly detection", "mttr reduction"],
    generate: () => `### Streaming & ML Match`
  },

  // 8. Apache Iceberg, Delta Lakehouse & Glue Optimization
  {
    id: "iceberg_lakehouse",
    category: "Lakehouse Engineering",
    primaryKeywords: ["iceberg", "apache iceberg", "lakehouse", "delta", "delta load", "delta loads", "extraction", "93.75%", "glue", "redshift", "volume", "8.5gb", "530mb", "sap", "erp", "compute cost", "76%"],
    secondaryKeywords: ["storage", "partitioning", "bronze", "silver", "gold"],
    intentPhrases: ["tell me about apache iceberg", "how did you achieve 93.75% reduction", "lakehouse architecture at infosys", "delta extraction", "reduce aws glue compute cost by 76%"],
    generate: () => `### Lakehouse Engineering Match`
  },

  // 9. AWS Cloud Ecosystem & Services
  {
    id: "aws_cloud",
    category: "Cloud Architecture",
    primaryKeywords: ["aws", "amazon web services", "glue", "redshift", "s3", "lambda", "ecs", "eventbridge", "athena", "quicksight", "dynamodb", "iam", "vpc", "cloud architecture", "serverless"],
    secondaryKeywords: ["fargate", "cloudwatch", "cloud"],
    intentPhrases: ["what is your aws experience", "which aws services do you know", "aws architecture skills", "cloud engineering", "serverless data architectures on aws"],
    generate: () => `### Cloud Architecture Match`
  },

  // 10. Databricks Platform & Lakehouse
  {
    id: "databricks",
    category: "Databricks",
    primaryKeywords: ["databricks", "unity catalog", "delta lake", "spark sql", "pyspark", "mlflow", "auto lakehouse", "databricks cert"],
    secondaryKeywords: ["workspace", "cluster", "photon", "jobs"],
    intentPhrases: ["what is your databricks experience", "unity catalog experience", "databricks certifications", "delta lake", "optimize delta lake tables"],
    generate: () => `### Databricks Match`
  },

  // 11. Certifications & Verified Credentials
  {
    id: "certifications",
    category: "Certifications",
    primaryKeywords: ["certification", "certifications", "certs", "certified", "badges", "credentials", "exam", "solutions architect", "developer associate", "ai practitioner"],
    secondaryKeywords: ["verified", "accreditation", "licenses"],
    intentPhrases: ["what certifications do you have", "are you certified in databricks", "are you aws certified", "show credentials", "list all your aws certifications", "certified in databricks machine learning"],
    generate: () => `### Certifications Match`
  },

  // 12. Education & Robotics Research (Jadavpur University)
  {
    id: "education",
    category: "Education",
    primaryKeywords: ["education", "degree", "jadavpur", "mtech", "btech", "college", "university", "academic", "academics", "robotics", "grades", "score", "distinction", "thesis", "gpa", "cgpa"],
    secondaryKeywords: ["study", "graduated", "school"],
    intentPhrases: ["tell me about your education", "where did you study", "mtech degree", "jadavpur university robotics", "what is your educational background"],
    generate: () => `### Education Match`
  },

  // 13. Programming Languages & Developer Tools
  {
    id: "languages_tools",
    category: "Skills & Tooling",
    primaryKeywords: ["python", "sql", "typescript", "languages", "fastapi", "docker", "terraform", "git", "github actions", "linux", "n8n", "airflow", "tools", "tech stack", "c programming", "c language"],
    secondaryKeywords: ["coding", "frameworks", "bash", "cli"],
    intentPhrases: ["what programming languages do you know", "what tools do you use", "tech stack", "do you know python", "programming languages and developer tools"],
    generate: () => `### Skills & Tooling Match`
  },

  // 14. Projects Portfolio Showcase
  {
    id: "projects_showcase",
    category: "Projects",
    primaryKeywords: ["projects", "project", "portfolio projects", "showcase", "built", "spotify", "wildrydes", "audit table", "3 tier", "what have you built"],
    secondaryKeywords: ["github repo", "code", "work sample"],
    intentPhrases: ["what projects have you built", "show me your projects", "portfolio showcase", "tell me about your project", "spotify data pipeline"],
    generate: () => `### Projects Match`
  },

  // 15. Why Hire Sourav / Key Strengths
  {
    id: "why_hire",
    category: "Value Proposition",
    primaryKeywords: ["why hire", "why should i hire", "why should our company hire", "strengths", "value", "unique", "stand out", "elevator pitch", "summary", "best qualities", "technical strengths"],
    secondaryKeywords: ["advantage", "benefit", "qualities"],
    intentPhrases: ["why should we hire you", "what are your strengths", "what makes you unique", "elevator pitch", "why should our company hire sourav", "greatest technical strengths"],
    generate: () => `### Value Proposition Match`
  },

  // 16. Resume Download & Summary
  {
    id: "resume",
    category: "Resume",
    primaryKeywords: ["resume", "cv", "download resume", "pdf", "curriculum vitae", "profile"],
    secondaryKeywords: ["document", "file", "download"],
    intentPhrases: ["where can i download your resume", "give me your resume", "can i see your cv", "resume pdf"],
    generate: () => `### Resume Match`
  },

  // 17. Contact & Connect Info
  {
    id: "contact_info",
    category: "Contact",
    primaryKeywords: ["contact", "email", "phone", "linkedin", "github", "reach", "message", "call", "touch", "get in touch"],
    secondaryKeywords: ["inquiry", "connect", "socials"],
    intentPhrases: ["how can i contact you", "what is your email", "phone number", "linkedin profile", "github link"],
    generate: () => `### Contact Match`
  },
];

const stopWords = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are",
  "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but",
  "by", "can", "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from",
  "further", "had", "has", "have", "having", "he", "her", "here", "hers", "herself", "him",
  "himself", "his", "how", "i", "if", "in", "into", "is", "it", "its", "itself", "just", "me",
  "more", "most", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or",
  "other", "our", "ours", "ourselves", "out", "over", "own", "same", "she", "should", "so",
  "some", "such", "than", "that", "the", "their", "theirs", "them", "themselves", "then", "there",
  "these", "they", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was",
  "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "with", "would",
  "you", "your", "yours", "yourself", "yourselves", "tell", "show", "give", "know"
]);

function evaluateQuery(rawQuery) {
  const query = rawQuery.toLowerCase().trim();
  if (!query) return { matched: "Empty", score: 0 };

  const rawTokens = query.replace(/[^\w\s-]/g, " ").split(/\s+/).filter(Boolean);
  const meaningfulTokens = rawTokens.filter((token) => !stopWords.has(token) || token === "ai" || token === "ml");

  const scoredNodes = knowledgeCorpus.map((node) => {
    let score = 0;

    for (const phrase of node.intentPhrases) {
      if (query.includes(phrase)) score += 15;
    }

    for (const kw of node.primaryKeywords) {
      if (query.includes(kw)) score += 5;
    }

    for (const token of meaningfulTokens) {
      if (node.primaryKeywords.includes(token)) {
        score += 3;
      } else if (node.secondaryKeywords.includes(token)) {
        score += 1.5;
      }
    }

    return { node, score };
  });

  scoredNodes.sort((a, b) => b.score - a.score);
  const topMatch = scoredNodes[0];

  if (topMatch && topMatch.score >= 4.0) {
    const secondMatch = scoredNodes[1];
    if (secondMatch && secondMatch.score >= 8.0 && secondMatch.score >= topMatch.score * 0.65 && secondMatch.node.id !== topMatch.node.id) {
      return {
        matched: `${topMatch.node.category} + ${secondMatch.node.category}`,
        topId: topMatch.node.id,
        secondId: secondMatch.node.id,
        score: topMatch.score,
        isMulti: true
      };
    }
    return {
      matched: topMatch.node.category,
      topId: topMatch.node.id,
      score: topMatch.score,
      isMulti: false
    };
  }

  return { matched: "Fallback", score: topMatch ? topMatch.score : 0, isMulti: false };
}

// Run test suite
const testPrompts = [
  { query: "Tell me about your experience at Infosys", expected: "Experience" },
  { query: "What is your current job role?", expected: "Experience" },
  { query: "How many years of experience do you have?", expected: "Experience" },
  { query: "What is your notice period?", expected: "Hiring & Availability" },
  { query: "Where are you located and are you open to relocate?", expected: "Hiring & Availability" },
  { query: "When can you start?", expected: "Hiring & Availability" },
  { query: "What is your experience with Agentic AI?", expected: "Agentic AI" },
  { query: "How do you build LangChain multi-agent workflows?", expected: "Agentic AI" },
  { query: "Do you have experience with autonomous tool calling?", expected: "Agentic AI" },
  { query: "Tell me about your GenAI and LLM work", expected: "Generative AI" },
  { query: "How do you implement Portkey AI gateway and RAG?", expected: "Generative AI" },
  { query: "Which foundation models have you worked with?", expected: "Generative AI" },
  { query: "What is your background as a Data Scientist?", expected: "Data Science" },
  { query: "Which machine learning models and libraries do you use?", expected: "Data Science" },
  { query: "How do you use MLflow on Databricks?", expected: "Databricks" },
  { query: "Tell me about your real-time anomaly detection project", expected: "Streaming & ML" },
  { query: "How did you use Kafka and Spark Streaming?", expected: "Streaming & ML" },
  { query: "What was the MTTR reduction in your telemetry pipeline?", expected: "Streaming & ML" },
  { query: "What did you achieve with Apache Iceberg?", expected: "Lakehouse Engineering" },
  { query: "How did you achieve 93.75% data reduction in ERP extraction?", expected: "Lakehouse Engineering" },
  { query: "How did you reduce AWS Glue compute cost by 76%?", expected: "Lakehouse Engineering" },
  { query: "Which AWS services are you proficient in?", expected: "Cloud Architecture" },
  { query: "Tell me about your serverless data architectures on AWS", expected: "Cloud Architecture" },
  { query: "What is your experience with Databricks and Unity Catalog?", expected: "Databricks" },
  { query: "How do you optimize Delta Lake tables?", expected: "Databricks" },
  { query: "Which certifications do you hold?", expected: "Certifications" },
  { query: "Are you certified in Databricks Machine Learning?", expected: "Certifications" },
  { query: "List all your AWS certifications", expected: "Certifications" },
  { query: "What is your educational background?", expected: "Education" },
  { query: "Tell me about your M.Tech in Robotics at Jadavpur University", expected: "Education" },
  { query: "What programming languages and developer tools do you use?", expected: "Skills & Tooling" },
  { query: "Do you know Python and SQL?", expected: "Skills & Tooling" },
  { query: "Show me your featured portfolio projects", expected: "Projects" },
  { query: "Tell me about the Spotify data pipeline project", expected: "Projects" },
  { query: "Why should our company hire Sourav?", expected: "Value Proposition" },
  { query: "What are your greatest technical strengths?", expected: "Value Proposition" },
  { query: "Where can I download your resume?", expected: "Resume" },
  { query: "Can I get a copy of your CV in PDF?", expected: "Resume" },
  { query: "How can I contact or email Sourav?", expected: "Contact" },
  { query: "What is your phone number and LinkedIn?", expected: "Contact" },
  { query: "Hello there!", expected: "Conversational" },
  { query: "Who are you and what can you do?", expected: "Conversational" },
  { query: "Tell me about your AWS and Databricks experience", expected: "Cloud Architecture" },
  { query: "What is your GenAI and Data Science background?", expected: "Generative AI" },
  { query: "What is the weather in Tokyo today?", expected: "Fallback" },
  { query: "Can you bake a chocolate cake?", expected: "Fallback" },
];

let passed = 0;
let total = testPrompts.length;
const results = [];

for (const t of testPrompts) {
  const res = evaluateQuery(t.query);
  const isMatch = res.matched.includes(t.expected) || (t.expected.includes("+") && res.isMulti);
  if (isMatch) passed++;
  results.push({
    query: t.query,
    expected: t.expected,
    actual: res.matched,
    score: res.score,
    passed: isMatch
  });
}

console.log(JSON.stringify({ passed, total, accuracy: ((passed / total) * 100).toFixed(1) + "%", results }, null, 2));
