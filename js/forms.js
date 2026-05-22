'use strict';

document.addEventListener('DOMContentLoaded', function () {

  /* ==========================================================
     FORM VALIDATION & SUBMISSION
     Auto-initializes all forms with class .js-validated-form
     Preserves FormSubmit.co action URL integration
     ========================================================== */

  // Validation patterns
  var patterns = {
    email: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
    name: /^[a-zA-Z\s.\-']+$/,
    phone: /^[0-9]{10}$/
  };

  // Error messages
  var messages = {
    required: 'This field is required.',
    email: 'Please enter a valid email address.',
    name: 'Please enter a valid name (letters, spaces, dots, hyphens only).',
    phone: 'Please enter a valid 10-digit phone number.',
    consent: 'You must agree before submitting.',
    minLength: 'This field must be at least {min} characters.',
    maxLength: 'This field must not exceed {max} characters.'
  };


  /* ---------- Utility Functions ---------- */

  /**
   * Mark a field as invalid
   */
  function setInvalid(field, message) {
    field.classList.add('is-invalid');
    field.classList.add('border-red-500');

    // Show error message if a sibling .form-error-msg exists
    var errorEl = field.parentElement.querySelector('.form-error-msg');
    if (errorEl) {
      errorEl.textContent = message || '';
      errorEl.style.display = 'block';
    }
  }

  /**
   * Remove invalid state from a field
   */
  function clearInvalid(field) {
    field.classList.remove('is-invalid');
    field.classList.remove('border-red-500');

    var errorEl = field.parentElement.querySelector('.form-error-msg');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.style.display = 'none';
    }
  }

  /**
   * Show form status message
   */
  function showStatus(form, type, message) {
    var statusEl = form.querySelector('[data-form-status]');
    if (!statusEl) return;

    statusEl.textContent = message;
    statusEl.className = 'form-status show ' + type;

    // Auto-hide after 5 seconds for success
    if (type === 'success') {
      setTimeout(function () {
        statusEl.classList.remove('show');
      }, 5000);
    }
  }

  /**
   * Validate a single field
   * Returns true if valid, false if invalid
   */
  function validateField(field) {
    var value = field.value.trim();
    var type = field.type;
    var isRequired = field.hasAttribute('required');
    var fieldName = field.getAttribute('data-validate') || field.getAttribute('name') || '';

    // Skip hidden or disabled fields
    if (field.offsetParent === null || field.disabled) {
      return true;
    }

    // Required check
    if (isRequired && value === '') {
      setInvalid(field, messages.required);
      return false;
    }

    // Skip further validation if empty and not required
    if (value === '') {
      clearInvalid(field);
      return true;
    }

    // Checkbox (consent) validation
    if (type === 'checkbox') {
      if (isRequired && !field.checked) {
        setInvalid(field, messages.consent);
        return false;
      }
      clearInvalid(field);
      return true;
    }

    // Email validation
    if (type === 'email' || fieldName === 'email') {
      if (!patterns.email.test(value)) {
        setInvalid(field, messages.email);
        return false;
      }
    }

    // Name validation
    if (fieldName === 'name' || fieldName === 'full-name' || fieldName === 'fullname') {
      if (!patterns.name.test(value)) {
        setInvalid(field, messages.name);
        return false;
      }
    }

    // Phone validation
    if (type === 'tel' || fieldName === 'phone' || fieldName === 'mobile') {
      var digits = value.replace(/\D/g, '');
      if (!patterns.phone.test(digits)) {
        setInvalid(field, messages.phone);
        return false;
      }
    }

    // Min length
    var minLength = field.getAttribute('minlength');
    if (minLength && value.length < parseInt(minLength, 10)) {
      setInvalid(field, messages.minLength.replace('{min}', minLength));
      return false;
    }

    // Max length
    var maxLength = field.getAttribute('maxlength');
    if (maxLength && value.length > parseInt(maxLength, 10)) {
      setInvalid(field, messages.maxLength.replace('{max}', maxLength));
      return false;
    }

    clearInvalid(field);
    return true;
  }


  /* ---------- Phone Number Input Formatting ---------- */

  function initPhoneInputs(form) {
    var phoneInputs = form.querySelectorAll('input[type="tel"], input[data-validate="phone"], input[data-validate="mobile"]');

    phoneInputs.forEach(function (input) {
      // Strip non-digits on input
      input.addEventListener('input', function () {
        var cursorPos = input.selectionStart;
        var beforeLen = input.value.length;
        input.value = input.value.replace(/\D/g, '').slice(0, 10);
        var afterLen = input.value.length;
        // Adjust cursor position
        var newPos = cursorPos - (beforeLen - afterLen);
        input.setSelectionRange(newPos, newPos);
      });

      // Validate on blur
      input.addEventListener('blur', function () {
        validateField(input);
      });
    });
  }


  /* ---------- Initialize Form Validation ---------- */

  function initForm(form) {
    var fields = form.querySelectorAll('input, textarea, select');

    // Phone input formatting
    initPhoneInputs(form);

    // Validate on blur for all fields
    fields.forEach(function (field) {
      if (field.type === 'hidden' || field.type === 'submit') return;

      field.addEventListener('blur', function () {
        validateField(field);
      });

      // Remove invalid state on input if now valid
      field.addEventListener('input', function () {
        if (field.classList.contains('is-invalid')) {
          validateField(field);
        }
      });

      // Handle checkbox change
      if (field.type === 'checkbox') {
        field.addEventListener('change', function () {
          validateField(field);
        });
      }
    });

    // Form submit handler
    form.addEventListener('submit', function (e) {
      var allValid = true;
      var firstInvalid = null;

      // Validate all visible fields
      fields.forEach(function (field) {
        if (field.type === 'hidden' || field.type === 'submit') return;

        var isValid = validateField(field);
        if (!isValid) {
          allValid = false;
          if (!firstInvalid) firstInvalid = field;
        }
      });

      if (!allValid) {
        e.preventDefault();
        showStatus(form, 'error', 'Please fix the highlighted errors before submitting.');

        // Focus and scroll to first invalid field
        if (firstInvalid) {
          firstInvalid.focus();
          firstInvalid.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
        return false;
      }

      // All valid — show success status and allow normal form submission (FormSubmit.co)
      showStatus(form, 'success', 'Submitting your form...');

      // Let the form submit normally to FormSubmit.co
      // The form's action attribute handles the endpoint
      return true;
    });
  }


  /* ---------- Auto-Initialize All Validated Forms ---------- */

  var validatedForms = document.querySelectorAll('.js-validated-form');

  validatedForms.forEach(function (form) {
    initForm(form);
  });

});
