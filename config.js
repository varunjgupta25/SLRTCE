/**
 * =============================================================================
 * SHREE L. R. TIWARI COLLEGE OF ENGINEERING (SLRTCE)
 * Global Site Configuration & Helpers
 * =============================================================================
 */

const SLRTCE_CONFIG = {
  phone: 'TODO_PHONE',
  email: 'TODO_EMAIL',
  hours: 'TODO_HOURS',
  whatsappNumber: 'TODO_WHATSAPP_NUMBER',
  whatsappMessage: 'Hello SLRTCE, I would like to enquire about engineering admission.',
  facebookUrl: 'TODO_FB_URL',
  driveBrochureId: 'TODO_DRIVE_BROCHURE_ID'
};

/**
 * Helper: isSet(value)
 * Returns false when the value is empty, null, undefined, or starts with 'TODO_'.
 * Used to ensure visitors never see unpopulated placeholder strings.
 */
function isSet(value) {
  if (!value) return false;
  if (typeof value === 'string' && value.startsWith('TODO_')) return false;
  return true;
}
