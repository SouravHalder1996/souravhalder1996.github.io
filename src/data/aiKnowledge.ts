export interface FaqItem {
  id: string;
  category: string;
  // Natural variations and questions that match this item
  questions: string[];
  // Primary keyword triggers
  keywords: string[];
  // Crisp, directly tailored response answering the exact question
  answer: string;
}

export const FAQ_KNOWLEDGE: FaqItem[] = [
  // ==========================================
  // 1. RECRUITER ESSENTIALS & LOGISTICS
  // ==========================================
  {
    id: "contact_all_channels",
    category: "Contact",
    questions: [
      "how can i contact sourav",
      "how can i contact you",
      "contact channels",
      "how to reach you",
      "contact information",
      "how can i contact sourav for senior ai/ml roles",
      "how can i contact sourav for senior ai ml roles",
      "contact details",
      "get in touch",
      "contact sourav",
      "reach out to sourav",
      "contact info",
      "connect with sourav",
      "contact"
    ],
    keywords: ["contact", "reach", "email", "touch", "channels", "inquiry", "connect", "socials"],
    answer: `### 📬 Contact & Direct Connect
Sourav is actively open to senior opportunities, technical consulting, and architectural discussions:

* 📧 **Email**: [halder.sourav1996@gmail.com](mailto:halder.sourav1996@gmail.com)
* 💼 **LinkedIn**: [linkedin.com/in/sourav--halder](https://linkedin.com/in/sourav--halder)
* 🐙 **GitHub**: [github.com/SouravHalder1996](https://github.com/SouravHalder1996)
* 📥 **Resume**: [Download PDF](/Sourav_Halder_Resume.pdf)`
  },
  {
    id: "notice_and_relocation_combined",
    category: "Hiring & Logistics",
    questions: [
      "what is your notice period and relocation preference",
      "notice period and relocation",
      "notice period and location",
      "what is your notice period and location preference",
      "notice and relocation"
    ],
    keywords: ["notice", "relocation", "location", "period", "kolkata", "bangalore", "hyderabad", "pune", "90", "preference"],
    answer: `### ⏱️ Notice Period & Location Preferences

* **Official Notice Period**: **90 days** at Infosys Limited *(open to buyout / early joining discussions for senior leadership & AI engineering roles)*.
* **Current Base Location**: **Kolkata, India**.
* **Relocation Destinations**: Fully open and excited to relocate to **Bangalore**, **Hyderabad**, **Pune**, or **International** locations (US, Europe, Middle East, APAC).
* **Work Mode Flexibility**: Open to **Remote**, **Hybrid**, and **On-site** opportunities.
* **Direct Discussion**: Reach Sourav directly at [halder.sourav1996@gmail.com](mailto:halder.sourav1996@gmail.com).`
  },
  {
    id: "notice_period",
    category: "Hiring & Logistics",
    questions: [
      "what is your notice period",
      "notice period",
      "how long is your notice",
      "notice period duration",
      "serving notice",
      "official notice period",
      "can you join early",
      "notice period buyout",
      "joining time"
    ],
    keywords: ["notice", "period", "90", "days", "buyout", "negotiable", "serving", "joining time"],
    answer: `* **Official Notice Period**: **90 days** (at Infosys Limited).
* **Early Joining / Buyout**: Open to negotiation and buyout discussions depending on the role and organizational urgency.
* **Direct Connect**: To discuss timelines, reach Sourav directly at [halder.sourav1996@gmail.com](mailto:halder.sourav1996@gmail.com).`
  },
  {
    id: "location_and_relocation",
    category: "Hiring & Logistics",
    questions: [
      "where are you located",
      "current location",
      "base location",
      "are you open to relocate",
      "relocation",
      "which city do you live in",
      "bangalore relocation",
      "hyderabad relocation",
      "pune relocation",
      "international relocation",
      "are you open to remote",
      "remote work"
    ],
    keywords: ["location", "city", "kolkata", "bangalore", "hyderabad", "pune", "relocate", "relocation", "remote", "hybrid", "onsite", "international"],
    answer: `* **Current Base Location**: **Kolkata, India**.
* **Domestic Relocation**: Actively open and happy to relocate to **Bangalore**, **Hyderabad**, **Pune**, or other tech hubs across India.
* **International Relocation**: Fully open for **International opportunities** (US, Europe, Middle East, APAC).
* **Work Mode Flexibility**: Open to **Remote**, **Hybrid**, and **On-site** engagements.`
  },
  {
    id: "target_roles",
    category: "Hiring & Logistics",
    questions: [
      "what roles are you looking for",
      "target roles",
      "desired job title",
      "what positions do you target",
      "what job role do you want",
      "which role are you applying for"
    ],
    keywords: ["roles", "target", "positions", "title", "ai/ml engineer", "data scientist", "gen ai", "agentic ai"],
    answer: `Sourav is actively targeting senior technical roles in:
* **AI/ML Engineer**
* **Data Scientist**
* **Gen AI Developer / Engineer**
* **Agentic AI Engineer / Developer**
* **Cloud Data Architect (AWS / Databricks)**`
  },
  {
    id: "compensation_expected_ctc",
    category: "Hiring & Logistics",
    questions: [
      "what is your expected salary",
      "expected ctc",
      "compensation expectation",
      "salary expectation",
      "what is your budget",
      "18 lpa"
    ],
    keywords: ["ctc", "salary", "compensation", "package", "expected", "lpa", "18"],
    answer: `* **Expected CTC**: **~18 LPA** (INR 18,00,000 / year) for domestic roles in India.
* **International / Remote**: Commensurate with market standards for senior AI/ML & Data Science roles.
* **Open to Discussion**: Open to discussing total compensation structuring (base, performance bonus, equity).`
  },
  {
    id: "total_experience",
    category: "Hiring & Logistics",
    questions: [
      "how many years of experience do you have",
      "total experience",
      "years of experience",
      "how long have you been working",
      "experience duration",
      "overall experience"
    ],
    keywords: ["years", "experience", "total", "tenure", "duration", "3+"],
    answer: `* **Total Enterprise Experience**: **3+ years** of full-time enterprise experience (since October 2021) as a Senior Associate Consultant at **Infosys Limited**.
* **Academic Research Experience**: **2 years** of intensive research in Robotics & Intelligent Automation during his M.Tech at **Jadavpur University** (2018–2021).`
  },
  {
    id: "current_company_role",
    category: "Hiring & Logistics",
    questions: [
      "what is your current role",
      "what is your current designation",
      "where do you work currently",
      "current company",
      "infosys role",
      "what do you do at infosys"
    ],
    keywords: ["current", "designation", "role", "job", "infosys", "senior associate consultant", "company"],
    answer: `* **Current Company**: **Infosys Limited** (*October 2021 – Present*).
* **Current Designation**: **Senior Associate Consultant**.
* **Core Responsibilities**: Designing serverless **AWS Glue & Apache Iceberg Lakehouses**, orchestrating ML pipelines, and optimizing data delivery for 14 enterprise Redshift data marts.`
  },
  {
    id: "phone_number",
    category: "Contact",
    questions: ["what is your phone number", "phone", "mobile number", "call you", "contact number", "cell", "telephone"],
    keywords: ["phone", "mobile", "call", "number", "telephone"],
    answer: `Sourav is best reached directly via **Email** or **LinkedIn**:

* 📧 **Email**: [halder.sourav1996@gmail.com](mailto:halder.sourav1996@gmail.com)
* 💼 **LinkedIn**: [linkedin.com/in/sourav--halder](https://linkedin.com/in/sourav--halder)
* 🐙 **GitHub**: [github.com/SouravHalder1996](https://github.com/SouravHalder1996)
* 📥 **Resume**: [Download PDF](/Sourav_Halder_Resume.pdf)

*(Phone / direct calls can be coordinated over email upon mutual scheduling).*`
  },
  {
    id: "email_address",
    category: "Contact",
    questions: ["what is your email", "email address", "email id", "mail", "how to email you", "contact email"],
    keywords: ["email", "mail", "gmail", "inbox", "halder.sourav1996@gmail.com"],
    answer: `You can contact Sourav via email at:

📧 **[halder.sourav1996@gmail.com](mailto:halder.sourav1996@gmail.com)**`
  },
  {
    id: "linkedin_profile",
    category: "Contact",
    questions: ["what is your linkedin", "linkedin url", "linkedin link", "linkedin profile", "connect on linkedin"],
    keywords: ["linkedin", "social", "profile", "connect"],
    answer: `Connect with Sourav on LinkedIn:

💼 **[linkedin.com/in/sourav--halder](https://linkedin.com/in/sourav--halder)**`
  },
  {
    id: "github_profile",
    category: "Contact",
    questions: ["what is your github", "github profile", "github link", "github repo", "code repository", "open source github"],
    keywords: ["github", "git", "repos", "repositories", "code"],
    answer: `Explore Sourav's open-source repositories and code projects on GitHub:

🐙 **[github.com/SouravHalder1996](https://github.com/SouravHalder1996)**`
  },
  {
    id: "resume_download_link",
    category: "Resume",
    questions: ["where can i download your resume", "resume pdf", "cv pdf", "download cv", "can i get your resume", "give me your resume", "resume link"],
    keywords: ["resume", "cv", "download", "pdf", "file"],
    answer: `You can view and download Sourav's verified resume in PDF format:

📥 **[Download Sourav_Halder_Resume.pdf](/Sourav_Halder_Resume.pdf)**

* **Resume Contents**: Full 3+ year Infosys experience, 10+ Databricks/AWS certifications, Jadavpur M.Tech Distinction (90.36%), and architecture blueprints.`
  },

  // ==========================================
  // 2. PRODUCTION METRICS & QUANTIFIED IMPACT
  // ==========================================
  {
    id: "metric_93_75_volume_reduction",
    category: "Quantified Impact",
    questions: [
      "what is the 93.75% metric",
      "how did you achieve 93.75% data reduction",
      "how did you reduce data volume by 93.75%",
      "data extraction volume reduction",
      "8.5gb to 530mb"
    ],
    keywords: ["93.75%", "93.75", "slashed", "slashing", "extraction", "volume", "reduction", "8.5gb", "530mb", "sap", "erp"],
    answer: `### 🚀 93.75% Data Extraction Volume Reduction
* **Problem**: Legacy SAP ERP batch jobs extracted **8.5 GB of full tables daily**, causing heavy memory pressure on AWS Glue and slow Redshift refreshes.
* **Solution**: Re-architected direct ERP extracts into a **partition-aware incremental delta-load extraction** layer stored on **Apache Iceberg on S3**.
* **Result**: Daily extracted volume dropped from **8.5 GB down to 530 MB (93.75% reduction)**, and data delivery latency dropped from 24 hours to **under 15 minutes**.`
  },
  {
    id: "metric_76_cost_savings",
    category: "Quantified Impact",
    questions: [
      "how did you reduce glue cost by 76%",
      "76% compute cost reduction",
      "how did you save aws compute costs",
      "76% cost savings"
    ],
    keywords: ["76%", "76", "cost", "savings", "compute", "runtime", "glue cost"],
    answer: `By switching from heavy full-table extract scans to **Apache Iceberg incremental delta ingestion**, PySpark job execution runtimes were shortened dramatically, cutting **AWS Glue compute runtime costs by 76%** across 14 enterprise Redshift data marts.`
  },
  {
    id: "metric_40_mttr_anomaly",
    category: "Quantified Impact",
    questions: [
      "what was the 40% mttr reduction",
      "how did you reduce mttr by 40%",
      "mttr improvement in anomaly detection",
      "mean time to resolution"
    ],
    keywords: ["40%", "40", "mttr", "incident", "recovery", "anomaly", "telemetry"],
    answer: `In the **real-time streaming telemetry anomaly pipeline**, deploying an ensemble ML classification model reduced Mean Time to Resolution (**MTTR**) for industrial failures from **3.0 hours down to 1.8 hours (40% improvement)** and eliminated **91% of false-positive alarms**.`
  },
  {
    id: "metric_pipeline_reliability",
    category: "Quantified Impact",
    questions: [
      "what is your pipeline reliability sla",
      "99.5% uptime",
      "pipeline reliability",
      "how many pipelines did you build"
    ],
    keywords: ["99.5%", "99.5", "reliability", "uptime", "sla", "50+ pipelines", "50 pipelines"],
    answer: `Sourav engineered and maintained **50+ production ETL pipelines** on AWS achieving a **99.5% pipeline reliability SLA**, with automated failure alerting integrated into ServiceNow and AWS EventBridge.`
  },

  // ==========================================
  // 3. AGENTIC AI & AUTONOMOUS WORKFLOWS
  // ==========================================
  {
    id: "agentic_ai_systems",
    category: "Agentic AI",
    questions: [
      "what is your experience with agentic ai",
      "how do you build ai agents",
      "agentic ai workflows",
      "autonomous agents",
      "multi agent systems"
    ],
    keywords: ["agentic", "agent", "agents", "multi-agent", "autonomous", "state machine", "reasoning"],
    answer: `### ⚡ Agentic AI Systems Architecture
Sourav designs production **Agentic AI systems** leveraging modern cognitive architectures:
* **Multi-Agent State Machines**: Specialized agents (Planner, Researcher, Code Generator, Evaluator) collaborating to solve complex tasks using **LangChain** and custom runtimes.
* **Deterministic Tool Calling**: Safe execution sandboxes, structured JSON schema validation, and API dispatching.
* **State Persistence & Memory**: Short-term conversational buffers combined with long-term vector-backed episodic memory.
* **Reflection Loops**: Automated self-correction steps where agents validate and refine intermediate outputs before delivery.`
  },
  {
    id: "langchain_tool_calling",
    category: "Agentic AI",
    questions: [
      "do you know langchain",
      "what is your langchain experience",
      "how do you use langchain",
      "langchain agents"
    ],
    keywords: ["langchain", "chains", "lcel", "tools", "tool calling"],
    answer: `Yes. Sourav utilizes **LangChain** extensively in production for:
1. **Multi-Agent Orchestration**: Building stateful agent graphs and router chains.
2. **Tool Calling**: Integrating LLMs with SQL query runners, external APIs, and vector retrievers.
3. **Structured Outputs**: Using Pydantic parsers to enforce strict output schemas.`
  },
  {
    id: "langgraph_agentic_workflows",
    category: "Agentic AI",
    questions: [
      "do you know langgraph",
      "what is your langgraph experience",
      "how do you use langgraph",
      "langgraph multi-agent",
      "cyclic agent graphs",
      "stateful agent workflows"
    ],
    keywords: ["langgraph", "lang graph", "stategraph", "multi-agent", "cyclic", "human-in-the-loop", "checkpointer", "agentic workflows"],
    answer: `Yes. Sourav utilizes **LangGraph** to build complex, controllable agentic systems:
1. **Cyclic Multi-Agent Graphs**: Creating stateful cyclical agent graphs (StateGraph) with conditional branching and reflection loops for iterative self-refinement.
2. **State Management & Checkpointing**: Implementing persistent conversation states and time-travel debugging with SQLite / Postgres checkpointers.
3. **Human-in-the-Loop (HITL)**: Integrating breakpoint interruptions for critical decision approval before tool execution.
4. **Sub-Graphs & Hierarchical Supervision**: Architecting supervisor-worker hierarchies where a supervisor agent delegates sub-tasks to specialized domain agents.`
  },
  {
    id: "agent_evaluation_guardrails",
    category: "Agentic AI",
    questions: [
      "how do you evaluate ai agents",
      "agent guardrails",
      "how to prevent agent hallucination",
      "evaluating agent performance"
    ],
    keywords: ["evaluation", "evals", "guardrails", "hallucination", "ragas", "faithfulness"],
    answer: `Sourav implements multi-layer agent evaluation:
* **Output Validation**: Schema checkers and deterministic rule assertion.
* **RAG Triad Metrics**: Context Relevance, Groundedness, and Answer Faithfulness to detect hallucinations.
* **Safety Guardrails**: PII scrubbing, input prompt injection filters, and token budget limiters.`
  },

  // ==========================================
  // 4. GENERATIVE AI, LLMS, PORTKEY & RAG
  // ==========================================
  {
    id: "genai_llm_overview",
    category: "Generative AI",
    questions: [
      "tell me about your genai experience",
      "what is your generative ai background",
      "generative ai projects",
      "experience with llms",
      "large language models"
    ],
    keywords: ["genai", "generative ai", "llm", "large language model", "foundation models", "ai developer"],
    answer: `### 🤖 Enterprise Generative AI & LLM Systems
* **LLM Gateway Orchestration**: Production routing, semantic caching, and fallbacks using **Portkey AI**.
* **RAG Knowledge Engines**: Vector search indexing, contextual chunking, re-ranking, and grounded generation.
* **Prompt Engineering & Fine-Tuning**: Few-shot prompt templates, chain-of-thought prompting, and parameter-efficient fine-tuning (PEFT/LoRA).
* **Model Integrations**: OpenAI (GPT-4o), Anthropic (Claude 3.5 Sonnet), Google (Gemini 2.0), and Llama 3 on Hugging Face.`
  },
  {
    id: "portkey_ai_gateway",
    category: "Generative AI",
    questions: [
      "what is portkey ai",
      "how do you use portkey ai",
      "llm gateway",
      "portkey gateway",
      "semantic caching"
    ],
    keywords: ["portkey", "portkey ai", "gateway", "caching", "semantic cache", "fallbacks", "routing"],
    answer: `### 🛡️ Portkey AI Enterprise Gateway
Sourav implements **Portkey AI** for enterprise LLM operations:
* **Semantic Caching**: Saves API costs and cuts latency to under 50ms for repeated semantic queries.
* **Automatic Fallbacks**: Seamlessly routes requests to alternate models (e.g., GPT-4o $\to$ Claude $\to$ open-source) if an API suffers a timeout or rate limit.
* **Observability**: Real-time token tracking, cost analytics, and audit logging.`
  },
  {
    id: "rag_chatbots_and_knowledge_bases",
    category: "Generative AI",
    questions: [
      "have you built rag chatbots",
      "tell me about your rag knowledge bases",
      "rag chatbot experience",
      "how do you build knowledge base chatbots",
      "conversational rag",
      "rag based chatbot",
      "aws bedrock knowledge base"
    ],
    keywords: ["rag chatbot", "knowledge base", "conversational rag", "chatbots", "aws bedrock", "bedrock knowledge base", "paas", "document search", "citations", "semantic search"],
    answer: `### 🤖 RAG-Based Chatbots & AWS Bedrock Knowledge Bases
Sourav has extensive experience architecting **PaaS RAG chatbots and managed knowledge bases**:
* **AWS Bedrock Managed Knowledge Bases (PaaS)**: Built a Platform-as-a-Service model where users upload and ingest enterprise documentation (PDFs, text, manuals), and AWS Bedrock automatically handles chunking, vector embeddings, storage, and retrieval without manual vector DB overhead.
* **Automated Document Ingestion**: Seamless ingestion pipelines parsing enterprise files with metadata filtering and automated synchronization.
* **Conversational Memory & Source Citations**: Stateful multi-turn dialogs with conversational context and verified inline citation references.
* **Groundedness Guardrails**: Confident AI evaluations to prevent hallucinations and ensure responses strictly adhere to indexed company knowledge.`
  },
  {
    id: "rag_architecture_pipeline",
    category: "Generative AI",
    questions: [
      "how do you build rag pipelines",
      "what is your rag experience",
      "retrieval augmented generation",
      "vector databases",
      "embeddings"
    ],
    keywords: ["rag", "retrieval", "vector", "embeddings", "aws bedrock", "bedrock knowledge base", "chunking", "hybrid search"],
    answer: `### 🔍 AWS Bedrock Enterprise RAG Architecture
Sourav designs end-to-end **RAG (Retrieval-Augmented Generation)** systems:
* **Platform-as-a-Service Model**: Hosted managed knowledge bases on **AWS Bedrock**, providing a platform where users bring and ingest their data files while Bedrock manages embeddings and vector indexing automatically.
* **Context-Aware Retrieval**: Preserving document hierarchy and tables to avoid fragmented contexts.
* **Hybrid Search & Re-Ranking**: Combining semantic retrieval with keyword search for high relevance.
* **Guardrails & Evaluation**: Validating groundedness and response accuracy using Confident AI and Bedrock Guardrails.`
  },
  {
    id: "n8n_agentic_workflow_orchestration",
    category: "Agentic AI",
    questions: [
      "do you use n8n",
      "what is your n8n experience",
      "n8n agent orchestration",
      "workflow automation with n8n",
      "ai agent workflows in n8n"
    ],
    keywords: ["n8n", "workflow", "automation", "orchestration", "webhook", "agent workflow", "node-based"],
    answer: `### ⚡ n8n Workflow & Agent Orchestration
Sourav leverages **n8n** for orchestrating autonomous AI agent workflows and event-driven pipelines:
* **Visual Agent Graphs**: Connecting LangChain/OpenAI nodes, webhook triggers, and enterprise database actions into modular execution pipelines.
* **Custom Webhooks & Integrations**: Automating alerts, data synchronizations, and tool-calling dispatches between AWS services, Postgres, and external APIs.
* **Resilient Error Handling**: Setting up conditional retry logic, fallback routing, and human-in-the-loop validation triggers.`
  },
  {
    id: "aws_bedrock_knowledge_bases",
    category: "Generative AI",
    questions: [
      "what vector databases do you use",
      "how do you manage knowledge bases",
      "bedrock vector search",
      "managed knowledge bases",
      "knowledge base experience"
    ],
    keywords: ["vector database", "vector db", "bedrock", "aws bedrock", "knowledge base", "embeddings", "approximate nearest neighbor", "cosine similarity"],
    answer: `### 🗄️ Managed Knowledge Bases & Vector Indexing
Sourav architectures vector indexing and similarity search:
* **AWS Bedrock Knowledge Bases**: Fully managed vector embeddings and retrieval engine that automates data ingestion, chunking, and semantic search directly from Amazon S3.
* **Vector Search Mechanics**: Approximate nearest neighbor (ANN) retrieval using cosine similarity and dense vector embeddings.
* **Metadata Filtering & Re-Ranking**: Query-time metadata filtering and scoring to deliver high precision and low-latency responses.`
  },
  {
    id: "aws_cloud_serverless_stack",
    category: "Cloud Engineering",
    questions: [
      "what is your aws experience",
      "aws lambda ec2 ecs s3 api gateway cloudwatch",
      "serverless architecture on aws",
      "aws cloud services you use",
      "amazon rds dynamodb experience"
    ],
    keywords: ["aws", "lambda", "ec2", "ecs", "s3", "api gateway", "cloudwatch", "rds", "dynamodb", "serverless", "cloud architecture"],
    answer: `### ☁️ AWS Cloud & Serverless Infrastructure
Sourav designs scalable, highly available enterprise architectures on AWS:
* **Compute & Containers**: AWS Lambda for serverless microservices and event triggers; AWS EC2 and **Amazon ECS** for scalable containerized workloads and batch compute.
* **Storage & Databases**: AWS S3 for tiered data lakes; **Amazon RDS** for managed relational databases; **Amazon DynamoDB** for single-digit millisecond latency NoSQL key-value storage.
* **API & Observability**: AWS API Gateway for secure RESTful endpoints; AWS CloudWatch for distributed metrics, alarms, and centralized logging.`
  },
  {
    id: "aws_bedrock_sagemaker_ai",
    category: "Generative AI",
    questions: [
      "amazon bedrock experience",
      "aws sagemaker experience",
      "aws ai services",
      "how do you use bedrock and sagemaker"
    ],
    keywords: ["bedrock", "amazon bedrock", "sagemaker", "amazon sagemaker", "aws ai", "foundation models", "model deployment", "endpoints"],
    answer: `### 🧠 Amazon Bedrock & Amazon SageMaker
Sourav builds enterprise AI and ML solutions using AWS AI/ML services:
* **Amazon Bedrock**: Accessing leading Foundation Models (Claude, Titan, Llama) with enterprise-grade security, customized RAG pipelines, and automated guardrails.
* **Amazon SageMaker**: End-to-end ML lifecycle orchestration including distributed training, model fine-tuning, real-time inference endpoint deployment, and automated hyperparameter optimization.`
  },
  {
    id: "langsmith_llmops_monitoring",
    category: "Agentic AI",
    questions: [
      "what is langsmith",
      "how do you use langsmith",
      "llmops tracing",
      "langsmith debugging",
      "evaluating chains in langsmith"
    ],
    keywords: ["langsmith", "tracing", "llmops", "run tree", "latency breakdown", "token monitoring", "dataset evaluation"],
    answer: `### 🛠️ LangSmith LLMOps & Run Tracing
Sourav uses **LangSmith** for full-lifecycle observability and debugging of LLM chains:
* **Hierarchical Trace Trees**: Inspecting step-by-step latency, raw input/output prompts, and tool calling dispatches across nested agent workflows.
* **Feedback Loops & Annotation**: Curating golden datasets from production failures and logging evaluator feedback.
* **Cost & Token Monitoring**: Tracking prompt vs completion tokens and estimating per-user and per-feature API expenses in real time.`
  },
  {
    id: "confident_ai_metrics",
    category: "Agentic AI",
    questions: [
      "what is confident ai",
      "how do you evaluate llms",
      "llm unit testing",
      "confident ai evaluation metrics",
      "llm evaluation guardrails"
    ],
    keywords: ["confident ai", "llm evaluation", "hallucination metric", "faithfulness", "answer relevancy", "llm unit testing", "evals"],
    answer: `### 🎯 Confident AI LLM Evaluation
Sourav implements continuous evaluation and CI/CD testing with **Confident AI**:
* **Production LLM Unit Tests**: Writing deterministic test suites asserting accuracy before deploying prompt or model updates.
* **Rubric-Based Evaluation**: Evaluating custom metrics including Faithfulness, Answer Relevancy, Hallucination Reduction, and Output Guardrails.
* **Automated CI Regression Testing**: Integrating Confident AI suites directly into deployment pipelines to prevent regressions.`
  },
  {
    id: "foundation_models_supported",
    category: "Generative AI",
    questions: [
      "which foundation models have you worked with",
      "what llms do you use",
      "openai vs claude",
      "huggingface models",
      "open source vs proprietary llms"
    ],
    keywords: ["foundation", "models", "openai", "gpt-4o", "claude", "anthropic", "gemini", "huggingface", "llama 3", "mistral"],
    answer: `Sourav has production experience across both proprietary and open-source models:
* **Proprietary Frontier Models**: OpenAI (GPT-4o, GPT-4 Turbo), Anthropic (Claude 3.5 Sonnet), Google (Gemini 2.0).
* **Open-Source Models**: Meta Llama 3, Mistral 7B/8x7B, and Hugging Face transformer models for private enterprise deployments.`
  },

  // ==========================================
  // 5. DATA SCIENCE & MACHINE LEARNING
  // ==========================================
  {
    id: "data_science_expertise",
    category: "Data Science",
    questions: [
      "what is your data science background",
      "tell me about your data science skills",
      "are you a data scientist",
      "data science experience",
      "statistical modeling"
    ],
    keywords: ["data science", "data scientist", "statistics", "statistical", "modeling", "predictive", "clustering", "regression"],
    answer: `### 🧠 Data Science & Machine Learning
Sourav applies rigorous statistical and ML modeling to production data:
* **Supervised & Unsupervised Learning**: Random Forest, XGBoost, LightGBM, K-Means clustering, and Logistic/Linear regression.
* **MLflow Lifecycle on Databricks**: End-to-end experiment logging, hyperparameter search, and model registry governance under Unity Catalog.
* **Feature Engineering**: Automated feature transformations, scaling, outlier detection, and dimensionality reduction (PCA).`
  },
  {
    id: "ml_libraries_frameworks",
    category: "Data Science",
    questions: [
      "which machine learning libraries do you use",
      "what ml tools do you use",
      "scikit-learn and tensorflow",
      "dvc and mlflow",
      "matplotlib and seaborn",
      "pandas and numpy"
    ],
    keywords: ["scikit-learn", "tensorflow", "keras", "pandas", "numpy", "mlflow", "dvc", "libraries", "tools", "seaborn", "matplotlib"],
    answer: `Sourav's primary Data Science and Machine Learning toolkit includes:
* **Core ML & Deep Learning**: **Scikit-Learn, TensorFlow, Keras, MLflow, DVC**.
* **Data Visualization**: **Matplotlib, Seaborn, Plotly**.
* **Data Manipulation**: **Pandas, NumPy, PySpark**.
* **Inference & Serving**: **FastAPI, Docker, Databricks Model Serving**.`
  },
  {
    id: "streaming_anomaly_detection_details",
    category: "Data Science",
    questions: [
      "tell me about the anomaly detection project",
      "real time streaming anomaly detection",
      "how do you detect anomalies",
      "iot telemetry pipeline"
    ],
    keywords: ["anomaly", "telemetry", "streaming", "iot", "sub-second", "prometheus", "grafana", "ecs"],
    answer: `### 📡 Real-Time Streaming Anomaly Detection
* **Architecture**: High-Throughput Telemetry Ingestion $\to$ AWS ECS (Ensemble ML Classifier) $\to$ Prometheus & Grafana.
* **Impact**: Sub-second inference latency, **40% MTTR reduction** (3h down to 1.8h), and eliminated **91% of false-positive threshold alerts**.`
  },

  // ==========================================
  // 6. CLOUD & LAKEHOUSE (AWS, ICEBERG, DATABRICKS)
  // ==========================================
  {
    id: "apache_iceberg_deep_dive",
    category: "Lakehouse Engineering",
    questions: [
      "what is your apache iceberg experience",
      "why use apache iceberg",
      "iceberg table format",
      "delta lakehouse architecture"
    ],
    keywords: ["iceberg", "apache iceberg", "table format", "acid", "partitioning", "hidden partitioning", "snapshot"],
    answer: `### 🧊 Apache Iceberg Lakehouse Mastery
Sourav implements **Apache Iceberg** on Amazon S3 to overcome traditional data lake limitations:
* **ACID Transactions**: Reliable concurrent reads and writes with snapshot isolation.
* **Hidden Partitioning**: Automatic partition pruning without requiring query writers to supply physical partition columns.
* **Schema Evolution & Time Travel**: Safe column additions/renames and point-in-time auditing without rewriting data.`
  },
  {
    id: "aws_cloud_stack",
    category: "Cloud Architecture",
    questions: [
      "which aws services do you know",
      "what is your aws experience",
      "aws skills",
      "amazon web services experience",
      "cloud architect experience",
      "tell me about your cloud architecture background"
    ],
    keywords: ["aws", "amazon", "cloud architect", "glue", "redshift", "s3", "lambda", "ecs", "athena", "quicksight", "dynamodb", "iam", "vpc", "rds"],
    answer: `### ☁️ AWS Cloud Architecture (4x AWS Certified)
Sourav has comprehensive **enterprise cloud architecture and engineering experience on AWS**:
* **Serverless & Containers**: **AWS Lambda** for event-driven microservices, **Amazon ECS Fargate** for containerized ML inference and batch jobs.
* **Storage & Data Layer**: **Amazon S3** (data lakes, tiered storage, IAM bucket policies), **Amazon RDS**, **DynamoDB & DynamoDB Streams**, and **Amazon Redshift**.
* **Integration & Orchestration**: **Amazon EventBridge**, **AWS API Gateway**, **SQS/SNS**, **CloudWatch** alarms & distributed tracing.
* **Security & Network Architecture**: Least-privilege **IAM roles**, VPC private subnets, security groups, and multi-AZ high-availability architectures.`
  },
  {
    id: "databricks_unity_catalog_platform",
    category: "Databricks",
    questions: [
      "what is your databricks experience",
      "unity catalog experience",
      "delta lake optimization",
      "databricks skills"
    ],
    keywords: ["databricks", "unity catalog", "delta lake", "spark sql", "pyspark", "clustering", "z-ordering", "vacuum"],
    answer: `### 🧱 Databricks Lakehouse Mastery (3x Certified)
* **Unity Catalog Governance**: Centralized access control, column-level security, and automated end-to-end data lineage.
* **Delta Lake Tuning**: Liquid clustering, Z-Ordering, VACUUM, and time-travel querying for ultra-fast SQL performance.
* **Distributed Spark SQL**: High-throughput distributed PySpark transformations on multi-node Databricks clusters.`
  },
  {
    id: "pyspark_big_data_architecture",
    category: "Lakehouse Engineering",
    questions: [
      "what is your pyspark experience",
      "how do you use apache spark",
      "distributed data processing with spark",
      "spark optimization",
      "pyspark dataframes"
    ],
    keywords: ["pyspark", "spark", "apache spark", "dataframe", "rdd", "catalyst optimizer", "tungsten", "broadcast join"],
    answer: `### ⚡ Distributed PySpark & Apache Spark
Sourav engineers high-volume distributed data processing pipelines:
* **Spark Optimization**: Eliminating shuffle bottlenecks, tuning partition counts, utilizing Broadcast Joins for dimension tables, and caching intermediate stages.
* **Catalyst & Tungsten Engines**: Leveraging PySpark DataFrame APIs and Spark SQL for optimized execution plans and whole-stage code generation.
* **Batch & Micro-Batching**: Real-time event ingestion and stateful micro-batching processing thousands of events per second with checkpointing.`
  },
  {
    id: "observability_datadog_splunk",
    category: "Cloud Architecture",
    questions: [
      "what observability tools do you use",
      "datadog vs splunk",
      "apm and log monitoring",
      "datadog experience",
      "splunk experience",
      "log management"
    ],
    keywords: ["datadog", "splunk", "observability", "apm", "log monitoring", "dashboards", "distributed tracing", "alerting", "metrics", "logs"],
    answer: `### 📊 Enterprise Observability (Datadog & Splunk)
Sourav implements full-stack observability, application performance monitoring (APM), and log analytics:
* **Datadog**: Configuring APM distributed traces, custom metric gauges for inference latency/error rates, and proactive SLO/SLA alert monitors.
* **Splunk**: Designing SIEM and operations dashboards, writing complex SPL queries for audit log analysis, and correlating distributed system events.
* **Automated Incident Alerting**: PagerDuty and webhook triggers for automated self-healing workflows and immediate incident triage.`
  },

  // ==========================================
  // 7. CERTIFICATIONS BREAKDOWN (10+ BADGES)
  // ==========================================
  {
    id: "all_certifications_list",
    category: "Certifications",
    questions: [
      "which certifications do you have",
      "list all your certifications",
      "show credentials",
      "are you certified",
      "all certifications"
    ],
    keywords: ["certifications", "certs", "certified", "badges", "credentials", "exam", "solutions architect", "developer", "practitioner"],
    answer: `### 🏆 10+ Verified Industry Certifications

**Databricks (3 Certifications)**:
1. **Databricks Certified Machine Learning Engineer Associate** *(June 2026)*
2. **Databricks Certified Data Engineer Professional** *(Feb 2026)*
3. **Databricks Certified Data Engineer Associate** *(Oct 2025)*

**Amazon Web Services (4 Certifications)**:
4. **AWS Certified Solutions Architect – Associate** *(June 2023)*
5. **AWS Certified Developer – Associate** *(Oct 2023)*
6. **AWS Certified AI Practitioner** *(Sept 2024)*
7. **AWS Certified Cloud Practitioner** *(July 2023)*

**Collibra (3 Certifications)**:
8. **Collibra Certified Solution Architect** *(2024)*
9. **Collibra Certified Workflow Engineer** *(2024)*
10. **Collibra Certified Integration Engineer** *(2024)*

*(All certification badges on the portfolio feature verified Credly / issuer verification links).*`
  },
  {
    id: "databricks_certs_only",
    category: "Certifications",
    questions: [
      "which databricks certifications do you have",
      "are you databricks certified",
      "databricks ml certification",
      "databricks data engineer professional"
    ],
    keywords: ["databricks cert", "databricks certified", "ml associate", "data engineer professional", "data engineer associate"],
    answer: `Sourav holds **3x Databricks Certifications**:
1. **Databricks Certified Machine Learning Engineer Associate** *(June 2026)*: MLflow, AutoML, feature stores, model serving, and Unity Catalog ML governance.
2. **Databricks Certified Data Engineer Professional** *(Feb 2026)*: Advanced Delta Lake tuning, streaming data pipelines, and production architecture.
3. **Databricks Certified Data Engineer Associate** *(Oct 2025)*: Spark SQL, incremental ingestion, and data transformations.`
  },
  {
    id: "aws_certs_only",
    category: "Certifications",
    questions: [
      "which aws certifications do you have",
      "are you aws certified",
      "aws solutions architect associate",
      "aws ai practitioner"
    ],
    keywords: ["aws cert", "aws certified", "solutions architect", "developer associate", "ai practitioner", "cloud practitioner"],
    answer: `Sourav holds **4x AWS Certifications**:
1. **AWS Certified Solutions Architect – Associate** *(2023)*
2. **AWS Certified Developer – Associate** *(2023)*
3. **AWS Certified AI Practitioner** *(2024)*
4. **AWS Certified Cloud Practitioner** *(2023)*`
  },

  // ==========================================
  // 8. ACADEMICS, RESEARCH & PUBLICATIONS
  // ==========================================
  {
    id: "education_academics",
    category: "Education",
    questions: [
      "what is your educational background",
      "tell me about your education",
      "where did you study",
      "mtech degree",
      "btech degree",
      "jadavpur university",
      "academic qualifications"
    ],
    keywords: ["education", "degree", "jadavpur", "mtech", "btech", "university", "college", "grades", "score", "cgpa", "90.36%"],
    answer: `### 🎓 Academic Qualifications & Distinction
* **M.Tech in Intelligent Automation & Robotics** | **Jadavpur University** (2018 – 2021)
  * **Graduation Score**: **90.36% (First Class with Distinction)**
  * **Focus**: Intelligent Automation, Robotics Systems, Control Engineering & AI.
* **B.Tech in Electrical Engineering** | **Brainware Group of Institutions** (2013 – 2017)
  * **CGPA**: **8.49**
  * **Focus**: Circuit integration, signal processing, power systems, and control automation.`
  },
  {
    id: "research_publications",
    category: "Education",
    questions: [
      "do you have any research publications",
      "research papers",
      "ieee publications",
      "robotics research",
      "thesis publications",
      "patents or papers",
      "publication details"
    ],
    keywords: ["publications", "research", "paper", "papers", "ieee", "journal", "thesis", "robotics research", "published"],
    answer: `### 📚 Research Publications & Thesis
Yes. During his M.Tech at **Jadavpur University**, Sourav conducted academic research and authored peer-reviewed publications in **Intelligent Automation, Robotics, Control Systems & AI**. 

*(Full citation and paper title details can be provided upon request or explored in his academic profile).*`
  },

  // ==========================================
  // 9. TECHNICAL SKILLS & DOMAIN EXPERTISE
  // ==========================================
  {
    id: "core_skills_overview",
    category: "Skills",
    questions: [
      "skills",
      "what are your skills",
      "technical skills",
      "list your skills",
      "core skills",
      "skill set",
      "key skills",
      "what can you do technically",
      "show me your skills",
      "what are your technical competencies"
    ],
    keywords: ["skills", "skill", "skillset", "technical", "competencies", "expertise", "proficiencies", "stack"],
    answer: `### 🛠️ Core Technical Skills & Proficiencies

* ⚡ **Agentic AI & GenAI**: Multi-agent state machines, LangChain, LangGraph, n8n, Portkey AI Gateway, AWS Bedrock Knowledge Bases, Prompt Engineering.
* 🧠 **Data Science & ML**: Statistical modeling, ensemble classifiers, time-series forecasting, Scikit-Learn, TensorFlow, MLflow, DVC, Matplotlib, Seaborn.
* 🚀 **Lakehouse & Big Data**: Apache Iceberg, Databricks Unity Catalog, Delta Lake, AWS Glue (PySpark), Apache Spark, Amazon Redshift, Amazon RDS, DynamoDB.
* 📡 **Streaming & Ingestion**: Real-time IoT Ingestion Engine, DynamoDB Streams, AWS EventBridge, Kinesis Firehose.
* ☁️ **Cloud & Infrastructure**: AWS (4x Certified), Multi-AZ ECS Fargate, Docker, GitHub Actions, Linux CLI, CloudWatch.
* 💻 **Languages**: Python (Advanced PySpark & ML), SQL (Advanced CTEs & Window Functions), TypeScript, C.`
  },
  {
    id: "data_engineering_skills",
    category: "Skills",
    questions: [
      "data engineering skills",
      "etl skills",
      "pipeline skills",
      "big data skills",
      "what data engineering tools do you use",
      "data engineering expertise"
    ],
    keywords: ["data engineering", "etl", "pipeline", "pipelines", "pyspark", "glue", "iceberg", "redshift", "big data", "lakehouse"],
    answer: `### 🏗️ Data Engineering & ETL Expertise
* **Lakehouse Storage**: Apache Iceberg (partition-aware incremental delta loads), Delta Lake with Liquid clustering & Z-Ordering.
* **Distributed Processing**: AWS Glue (PySpark), Apache Spark on Databricks clusters.
* **Data Warehousing**: Amazon Redshift & Redshift Spectrum (multi-layer Medallion marts: Bronze raw $\to$ Silver cleaned $\to$ Gold business marts).
* **Governance**: Databricks Unity Catalog, automated data lineage, Collibra data intelligence.`
  },
  {
    id: "cloud_devops_skills",
    category: "Skills",
    questions: [
      "devops skills",
      "cloud skills",
      "infrastructure skills",
      "ci cd tools",
      "what devops tools do you use",
      "docker and aws ecs"
    ],
    keywords: ["devops", "cloud", "docker", "ecs", "infrastructure", "ci/cd", "github actions", "linux", "eventbridge"],
    answer: `### ⚙️ DevOps & Cloud Infrastructure Skills
* **Containerization & Compute**: Docker containers deployed on **AWS ECS Fargate** and AWS Lambda microservices.
* **Cloud Architecture & Networking**: Multi-AZ VPC networking, private subnets, security groups, and auto-scaling ECS task definitions.
* **CI/CD & Version Control**: **GitHub Actions** workflows for automated linting, container builds, and zero-downtime deployments.
* **Orchestration & Events**: **AWS EventBridge**, **CloudWatch alarms**, **Apache Airflow**, and **n8n** automation.`
  },
  {
    id: "database_skills",
    category: "Skills",
    questions: [
      "what databases do you know",
      "database skills",
      "sql vs nosql",
      "dynamodb experience",
      "relational databases"
    ],
    keywords: ["database", "databases", "dynamodb", "redshift", "postgresql", "nosql", "sql", "rds"],
    answer: `### 💾 Databases & Storage Engines
* **Analytical / Data Warehouse**: **Amazon Redshift & Redshift Spectrum** (columnar storage, MPP distributed queries), **Amazon Athena** (serverless Presto/Trino SQL).
* **NoSQL / Key-Value**: **Amazon DynamoDB** with DynamoDB Streams for real-time change data capture (CDC).
* **Relational / OLTP**: **PostgreSQL**, **Amazon RDS Multi-AZ** architectures.
* **Lakehouse Object Storage**: **Amazon S3** organized in Medallion architecture (Bronze, Silver, Gold).`
  },
  {
    id: "programming_languages_tools",
    category: "Skills",
    questions: [
      "what programming languages do you know",
      "do you know python and sql",
      "what languages do you code in",
      "tech stack",
      "developer tools",
      "programming languages"
    ],
    keywords: ["python", "sql", "typescript", "c", "languages", "coding", "fastapi", "docker", "git"],
    answer: `### 🛠️ Programming Languages & Developer Tools
* **Languages**: **Python** (Advanced PySpark, Pandas, Scikit-Learn, ML), **SQL** (Advanced CTEs, window functions, tuning), **TypeScript**, **C**.
* **AI & ML**: LangChain, LangGraph, Portkey AI, FastAPI, TensorFlow, Keras, Scikit-Learn, MLflow, DVC.
* **Data & Cloud**: AWS Glue, Apache Iceberg, Databricks, Amazon Redshift, Amazon RDS, DynamoDB, Amazon S3.
* **DevOps & Infrastructure**: Docker, GitHub Actions, Linux CLI, AWS EventBridge, n8n, Apache Airflow.`
  },
  {
    id: "python_skills",
    category: "Skills",
    questions: ["what is your python experience", "do you know python", "python libraries", "pyspark python", "python skills"],
    keywords: ["python", "pyspark", "pandas", "numpy", "scikit-learn", "fastapi"],
    answer: `**Python** is Sourav's primary daily programming language for:
1. **PySpark Big Data ETL**: Writing scalable AWS Glue and Databricks data ingestion jobs.
2. **Data Science & ML**: Statistical modeling with Scikit-Learn, TensorFlow, Pandas, and NumPy.
3. **Agentic AI & APIs**: Building LangChain agents, Portkey AI gateways, and FastAPI microservices.`
  },
  {
    id: "sql_skills",
    category: "Skills",
    questions: ["what is your sql experience", "do you know sql", "sql queries", "spark sql", "sql skills"],
    keywords: ["sql", "queries", "ctes", "window functions", "tuning", "spark sql", "redshift spectrum"],
    answer: `Sourav has deep expertise in **SQL**:
* **Advanced Analytics**: Complex Common Table Expressions (CTEs), window functions (\`ROW_NUMBER\`, \`RANK\`, \`LEAD/LAG\`), and multi-table joins.
* **Query Performance Tuning**: Optimizing execution plans on Amazon Redshift Spectrum and Spark SQL on Databricks.`
  },

  // ==========================================
  // 10. WHY HIRE SOURAV (VALUE PROPOSITION)
  // ==========================================
  {
    id: "why_hire_sourav",
    category: "Value Proposition",
    questions: [
      "why should we hire you",
      "why should our company hire sourav",
      "what are your strengths",
      "what makes you unique",
      "elevator pitch",
      "why hire sourav"
    ],
    keywords: ["why hire", "strengths", "value", "unique", "stand out", "elevator pitch", "why should we hire"],
    answer: `### 💡 Why Hire Sourav Halder?
1. **Bridges Data Engineering & AI/ML**: Uniquely skilled across both heavy Lakehouse data infrastructure (AWS Glue, Iceberg, Databricks) and intelligence systems (Agentic AI, GenAI, ML streaming).
2. **Proven Production ROI**: Track record of measurable business impact (**93.75% data extraction reduction**, **76% compute cost cut**, **40% MTTR improvement**).
3. **Verified Excellence**: **10+ industry certifications** from Databricks and AWS, backed by an M.Tech in Robotics with First Class Distinction (**90.36%**).
4. **Autonomous Problem Solving**: Proven capability to take complex architectural problems from whiteboarding to resilient production deployment.`
  },
  {
    id: "resume_pdf_viewer",
    category: "Resume",
    questions: [
      "where can i download your resume",
      "resume pdf",
      "cv pdf",
      "download cv",
      "can i get your resume",
      "give me your resume",
      "resume link",
      "how to download resume",
      "sourav resume"
    ],
    keywords: ["resume", "cv", "download", "pdf", "file", "curriculum vitae"],
    answer: `### 📄 Sourav's Verified Curriculum Vitae (PDF)
You can view and download Sourav's verified resume directly within the portfolio:

* 📥 **[View & Download Sourav_Halder_Resume.pdf](/Sourav_Halder_Resume.pdf)**
* **Highlights**: 4+ Yrs at Infosys Limited, M.Tech Distinction from Jadavpur University (90.36%), 4x AWS & Databricks Certifications, and ML/Agentic AI systems.`
  },
  {
    id: "network_security_project_faq",
    category: "Projects",
    questions: [
      "tell me about your network security system project",
      "network security project",
      "threat detection pipeline",
      "xgboost optuna project",
      "network intrusion detection"
    ],
    keywords: ["network security", "threat detection", "xgboost", "optuna", "smote", "mlflow", "docker", "evidently ai"],
    answer: `### 🛡️ Network Security System & Threat Detection
* **Stack**: Python, XGBoost, Random Forest, Stacking Classifiers, Optuna, SMOTE, MLflow, AWS (EC2/ECR), Docker, Evidently AI.
* **Architecture**: End-to-end threat detection pipeline utilizing SMOTE class balancing and Optuna hyperparameter optimization.
* **Performance**: Achieved **97.9% Test Recall** with **<15ms inference latency**.
* **MLOps & Deployment**: Containerized on AWS using CloudFormation IaC and CI/CD, integrated MLflow for Champion-Challenger model promotion and Evidently AI for live data drift alerts.`
  },
  {
    id: "kidney_disease_project_faq",
    category: "Projects",
    questions: [
      "tell me about your kidney disease classification project",
      "kidney disease project",
      "efficientnet ct scan project",
      "deep learning computer vision project",
      "tensorflow dvc project"
    ],
    keywords: ["kidney disease", "efficientnet", "tensorflow", "dvc", "dagshub", "mlops", "flask", "ct scan"],
    answer: `### 🔬 Kidney Disease Classification & MLOps Pipeline
* **Stack**: Python, TensorFlow, EfficientNetV2-B0, MLflow/DagsHub, DVC, Flask, Docker, AWS EC2, GitHub Actions.
* **Architecture**: Transfer learning vision classifier trained on 7.3K+ CT scans with label smoothing and 2-stage fine-tuning.
* **Performance**: Achieved **100% Validation Accuracy (1.00 AUC)** on clinical benchmark scans.
* **MLOps & Deployment**: End-to-end reproducible pipeline orchestrated via DVC and MLflow/DagsHub, deployed as a containerized Flask API via GitHub Actions on AWS EC2.`
  }
];
