/**
 * Paystack payment utilities for AutoHub Raffle
 */

// Constants
export const TICKET_PRICE_NGN = 10000; // ₦10,000
export const TICKET_PRICE_KOBO = TICKET_PRICE_NGN * 100; // In kobo (1 NGN = 100 kobo)

/**
 * Load the Paystack script dynamically
 * @returns {Promise} Resolves when script is loaded
 */
export function loadPaystackScript() {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (document.getElementById('paystack-js')) {
      resolve();
      return;
    }

    // Create and append script
    const script = document.createElement('script');
    script.id = 'paystack-js';
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = resolve;
    script.onerror = (error) => {
      console.error('Failed to load Paystack script:', error);
      reject(new Error('Failed to load payment provider script'));
    };
    document.head.appendChild(script);
  });
}

/**
 * Initialize Paystack payment popup
 * @param {Object} config - Payment configuration
 * @param {string} config.email - Customer email
 * @param {number} config.userId - User ID
 * @param {Function} config.onSuccess - Success callback function
 * @param {Function} config.onError - Error callback function
 * @param {Function} config.onClose - Close callback function
 * @returns {Promise} Resolved with payment result or rejected with error
 */
export async function initializePaystackPayment({
  email, 
  userId,
  onSuccess,
  onError,
  onClose
}) {
  try {
    // Ensure the Paystack script is loaded
    await loadPaystackScript();
    
    // Get public key from environment variable (injected via nuxt.config.js)
    const publicKey = process.env.PAYSTACK_PUBLIC_KEY;
    
    if (!publicKey) {
      throw new Error('Paystack public key not configured');
    }

    // Generate a unique reference
    const reference = `AUTOHUB_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

    // Initialize Paystack popup
    const handler = PaystackPop.setup({
      key: publicKey,
      email: email,
      amount: TICKET_PRICE_KOBO,
      currency: 'NGN',
      ref: reference,
      metadata: {
        user_id: userId,
        ticket_price: TICKET_PRICE_NGN
      },
      callback: (response) => {
        if (response.status === 'success') {
          onSuccess(response);
        } else {
          onError(new Error('Payment was not successful'));
        }
      },
      onClose: () => {
        onClose();
      }
    });

    // Open the payment popup
    handler.openIframe();
    
    return { reference };
  } catch (error) {
    console.error('Paystack initialization error:', error);
    onError(error);
    throw error;
  }
}