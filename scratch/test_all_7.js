const fs = require('fs');

const code = fs.readFileSync('src/data/aiKnowledge.ts', 'utf8');

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
  "you", "your", "yours", "yourself", "yourselves", "tell", "show", "give", "know", "sourav", "souravs"
]);

// Evaluate aiKnowledge
let FAQ_KNOWLEDGE = eval(`
  (function() {
    ${code.replace(/export interface[^{]+{[^}]+}/g, '').replace(/export const FAQ_KNOWLEDGE: FaqItem\[\] =/g, 'return')}
  })()
`);

function scoreQuery(rawQuery) {
  const query = rawQuery.toLowerCase().replace(/['’]/g, "").trim();
  const rawTokens = query.replace(/[^\w\s-]/g, " ").split(/\s+/).filter(Boolean);
  const meaningfulTokens = rawTokens.filter((token) => !stopWords.has(token) || token === "ai" || token === "ml");

  const scoredItems = FAQ_KNOWLEDGE.map((item) => {
    let score = 0;

    // 1. Exact or Substring match in item.questions (+35 pts)
    for (const q of item.questions) {
      const cleanQ = q.toLowerCase().replace(/['’]/g, "").trim();
      if (query === cleanQ || query.includes(cleanQ) || cleanQ.includes(query)) {
        score += 35;
      }

      // Token overlap with question
      const qTokens = cleanQ.replace(/[^\w\s-]/g, " ").split(/\s+/).filter(t => !stopWords.has(t) || t === "ai" || t === "ml");
      if (qTokens.length > 0) {
        const matchCount = qTokens.filter(t => rawTokens.includes(t)).length;
        if (matchCount === qTokens.length) {
          score += 25;
        } else if (matchCount / qTokens.length >= 0.65) {
          score += 15;
        }
      }
    }

    // 2. Keyword matches (+8 pts)
    for (const kw of item.keywords) {
      const cleanKw = kw.toLowerCase().trim();
      if (query.includes(cleanKw)) {
        score += 8;
      }
    }

    // 3. Meaningful token match (+4 pts)
    for (const token of meaningfulTokens) {
      if (item.keywords.some(k => k.includes(token))) {
        score += 4;
      }
    }

    return { item, score };
  });

  scoredItems.sort((a, b) => b.score - a.score);
  return scoredItems;
}

const suggestedPrompts = [
  "What is your experience with Agentic AI & GenAI?",
  "How did you achieve the 93.75% data reduction with Iceberg?",
  "What are your core Data Science & ML skills?",
  "Which 10+ Databricks & AWS certifications do you hold?",
  "What is your notice period and relocation preference?",
  "Why should our company hire Sourav?",
  "How can I contact Sourav or download his resume?",
];

console.log("=== EVALUATING 7 REFINED PROMPTS ===");
suggestedPrompts.forEach(prompt => {
  console.log("-----------------------------------------");
  console.log("PROMPT:", prompt);
  const top = scoreQuery(prompt);
  top.slice(0, 2).forEach((t, i) => console.log(`  #${i+1} [${t.item.id}] (Score: ${t.score}): ${t.item.category}`));
});
