/**
 * Text chunking utilities for RAG system
 * Splits long content into semantic chunks suitable for embedding
 */

export interface TextChunk {
  text: string;
  startIndex: number;
  endIndex: number;
  wordCount: number;
}

/**
 * Split text into chunks of approximately targetWords, respecting sentence boundaries
 * @param text - Text to split
 * @param targetWords - Target number of words per chunk (default: 500)
 * @param overlap - Number of overlapping words between chunks (default: 50)
 * @returns Array of text chunks
 */
export function chunkText(
  text: string,
  targetWords: number = 500,
  overlap: number = 50
): TextChunk[] {
  if (!text || text.trim().length === 0) {
    return [];
  }

  // Normalize whitespace
  const normalizedText = text.replace(/\s+/g, ' ').trim();

  // Split into sentences (basic sentence detection)
  const sentences = splitIntoSentences(normalizedText);

  const chunks: TextChunk[] = [];
  let currentChunk: string[] = [];
  let currentWordCount = 0;
  let chunkStartIndex = 0;

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    const sentenceWords = countWords(sentence);

    // If adding this sentence would exceed target, save current chunk
    if (currentWordCount > 0 && currentWordCount + sentenceWords > targetWords) {
      const chunkText = currentChunk.join(' ');
      chunks.push({
        text: chunkText,
        startIndex: chunkStartIndex,
        endIndex: chunkStartIndex + chunkText.length,
        wordCount: currentWordCount
      });

      // Start new chunk with overlap
      const overlapSentences = getOverlapSentences(currentChunk, overlap);
      currentChunk = overlapSentences;
      currentWordCount = countWords(overlapSentences.join(' '));
      chunkStartIndex += chunkText.length - overlapSentences.join(' ').length;
    }

    currentChunk.push(sentence);
    currentWordCount += sentenceWords;
  }

  // Add remaining chunk
  if (currentChunk.length > 0) {
    const chunkText = currentChunk.join(' ');
    chunks.push({
      text: chunkText,
      startIndex: chunkStartIndex,
      endIndex: chunkStartIndex + chunkText.length,
      wordCount: currentWordCount
    });
  }

  return chunks;
}

/**
 * Split text into sentences using basic punctuation rules
 */
function splitIntoSentences(text: string): string[] {
  // Split on sentence-ending punctuation followed by space or end of string
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  return sentences.map(s => s.trim()).filter(s => s.length > 0);
}

/**
 * Count words in text
 */
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

/**
 * Get last N words worth of sentences for overlap
 */
function getOverlapSentences(sentences: string[], targetWords: number): string[] {
  const reversed = [...sentences].reverse();
  const overlap: string[] = [];
  let wordCount = 0;

  for (const sentence of reversed) {
    const sentenceWords = countWords(sentence);
    if (wordCount + sentenceWords > targetWords) {
      break;
    }
    overlap.unshift(sentence);
    wordCount += sentenceWords;
  }

  return overlap;
}

/**
 * Smart chunking for structured content (services, FAQs, etc.)
 * Keeps sections and FAQs together when possible
 */
export function chunkStructuredContent(
  title: string,
  sections: { title?: string; content: string }[],
  maxWordsPerChunk: number = 500
): TextChunk[] {
  const chunks: TextChunk[] = [];
  let currentIndex = 0;

  for (const section of sections) {
    const sectionTitle = section.title || '';
    const sectionContent = section.content;
    
    // Create section text with title
    const fullText = sectionTitle 
      ? `${sectionTitle}\n\n${sectionContent}`
      : sectionContent;

    const wordCount = countWords(fullText);

    // If section is small enough, keep as one chunk
    if (wordCount <= maxWordsPerChunk) {
      chunks.push({
        text: `${title}\n\n${fullText}`,
        startIndex: currentIndex,
        endIndex: currentIndex + fullText.length,
        wordCount: wordCount
      });
      currentIndex += fullText.length;
    } else {
      // Split large section into chunks
      const sectionChunks = chunkText(fullText, maxWordsPerChunk, 50);
      for (const chunk of sectionChunks) {
        chunks.push({
          text: `${title}\n\n${chunk.text}`,
          startIndex: currentIndex + chunk.startIndex,
          endIndex: currentIndex + chunk.endIndex,
          wordCount: chunk.wordCount
        });
      }
      currentIndex += fullText.length;
    }
  }

  return chunks;
}

/**
 * Chunk FAQ content - keeps Q&A pairs together
 */
export function chunkFAQs(
  title: string,
  faqs: { question: string; answer: string }[],
  maxPairsPerChunk: number = 5
): TextChunk[] {
  const chunks: TextChunk[] = [];
  let currentIndex = 0;

  for (let i = 0; i < faqs.length; i += maxPairsPerChunk) {
    const faqBatch = faqs.slice(i, i + maxPairsPerChunk);
    const faqText = faqBatch
      .map(faq => `Q: ${faq.question}\nA: ${faq.answer}`)
      .join('\n\n');
    
    const fullText = `${title}\n\n${faqText}`;
    
    chunks.push({
      text: fullText,
      startIndex: currentIndex,
      endIndex: currentIndex + fullText.length,
      wordCount: countWords(fullText)
    });

    currentIndex += fullText.length;
  }

  return chunks;
}

/**
 * Create a single chunk from short content (company info, testimonials, etc.)
 */
export function createSingleChunk(title: string, content: string): TextChunk {
  const fullText = title ? `${title}\n\n${content}` : content;
  return {
    text: fullText,
    startIndex: 0,
    endIndex: fullText.length,
    wordCount: countWords(fullText)
  };
}
