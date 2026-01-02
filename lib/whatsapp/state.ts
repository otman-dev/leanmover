// WhatsApp Conversation State Management

export interface ConversationMessage {
  role: "user" | "ai" | "agent";
  content: string;
  timestamp: Date;
}

export interface ConversationState {
  userId: string; // Phone number
  status: "ai_active" | "pending_agent" | "agent_active";
  agentId?: string;
  createdAt: Date;
  lastActivity: Date;
  conversationHistory: ConversationMessage[];
  metadata?: {
    initialQuery?: string;
    detectedIntent?: string;
    source?: "website" | "whatsapp";
  };
}

// In-memory storage (use Redis in production for multiple instances)
const conversations = new Map<string, ConversationState>();

/**
 * Get or create conversation state for a user
 */
export function getConversationState(userId: string): ConversationState {
  if (!conversations.has(userId)) {
    conversations.set(userId, {
      userId,
      status: "ai_active",
      createdAt: new Date(),
      lastActivity: new Date(),
      conversationHistory: [],
    });
  }
  return conversations.get(userId)!;
}

/**
 * Update conversation state
 */
export function updateConversationState(
  userId: string,
  updates: Partial<ConversationState>
) {
  const state = getConversationState(userId);
  conversations.set(userId, {
    ...state,
    ...updates,
    lastActivity: new Date(),
  });
}

/**
 * Add message to conversation history
 */
export function addMessageToHistory(
  userId: string,
  message: ConversationMessage
) {
  const state = getConversationState(userId);
  state.conversationHistory.push(message);
  
  // Keep only last 20 messages
  if (state.conversationHistory.length > 20) {
    state.conversationHistory = state.conversationHistory.slice(-20);
  }
  
  updateConversationState(userId, state);
}

/**
 * Get all active conversations
 */
export function getAllConversations(): Map<string, ConversationState> {
  return conversations;
}

/**
 * Clear conversation state (e.g., after timeout)
 */
export function clearConversationState(userId: string) {
  conversations.delete(userId);
}
