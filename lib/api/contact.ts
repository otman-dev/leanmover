export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
}

export interface NewsletterFormData {
  email: string;
  name?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number (basic validation)
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\+\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.length >= 10;
}

// Sanitize input to prevent XSS
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 1000); // Limit length
}

// Validate contact form data
export function validateContactForm(data: ContactFormData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || data.name.length < 2) {
    errors.push('Le nom doit contenir au moins 2 caractères');
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Adresse email invalide');
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.push('Numéro de téléphone invalide');
  }

  if (!data.subject || data.subject.length < 3) {
    errors.push('Le sujet doit contenir au moins 3 caractères');
  }

  if (!data.message || data.message.length < 10) {
    errors.push('Le message doit contenir au moins 10 caractères');
  }

  if (!data.priority || !['low', 'normal', 'high', 'urgent'].includes(data.priority)) {
    errors.push('Priorité invalide');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

// Validate newsletter form data
export function validateNewsletterForm(data: NewsletterFormData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Adresse email invalide');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

// Mock email sending (replace with real implementation)
export async function sendContactEmail(data: ContactFormData): Promise<ApiResponse> {
  try {
    // Here you would integrate with your email service (SendGrid, Mailgun, etc.)
    // For now, we'll just log the data
    console.log('Contact form submission:', data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Une erreur est survenue lors de l\'envoi du message.',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Mock newsletter subscription (replace with real implementation)
export async function subscribeToNewsletter(data: NewsletterFormData): Promise<ApiResponse> {
  try {
    // Here you would integrate with your newsletter service (Mailchimp, SendinBlue, etc.)
    console.log('Newsletter subscription:', data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Vous êtes maintenant inscrit à notre newsletter!'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Une erreur est survenue lors de l\'inscription.',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
