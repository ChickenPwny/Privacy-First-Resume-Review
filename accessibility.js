/**
 * Accessibility Manager for Resume Review Application
 * Provides comprehensive accessibility features for users with disabilities
 */

class AccessibilityManager {
    constructor() {
        this.settings = {
            fontSize: 16,
            highContrast: false,
            colorBlindFriendly: false,
            enhancedFocus: false
        };
        
        this.init();
    }

    init() {
        this.loadSettings();
        this.initializeEventListeners();
        this.applySettings();
        this.setupKeyboardNavigation();
        this.announcePageLoad();
    }

    initializeEventListeners() {
        // Font size slider
        const fontSizeSlider = document.getElementById('fontSizeSlider');
        const fontSizeValue = document.getElementById('fontSizeValue');
        
        if (fontSizeSlider && fontSizeValue) {
            fontSizeSlider.addEventListener('input', (e) => {
                this.settings.fontSize = parseInt(e.target.value);
                fontSizeValue.textContent = `${this.settings.fontSize}px`;
                this.applyFontSize();
                this.saveSettings();
            });
        }

        // High contrast toggle
        const contrastToggle = document.getElementById('contrastToggle');
        if (contrastToggle) {
            contrastToggle.addEventListener('click', () => {
                this.settings.highContrast = !this.settings.highContrast;
                this.updateToggleButton(contrastToggle, this.settings.highContrast);
                this.applyHighContrast();
                this.saveSettings();
                this.announceSettingChange('High contrast', this.settings.highContrast);
            });
        }

        // Color blind friendly toggle
        const colorBlindToggle = document.getElementById('colorBlindToggle');
        if (colorBlindToggle) {
            colorBlindToggle.addEventListener('click', () => {
                this.settings.colorBlindFriendly = !this.settings.colorBlindFriendly;
                this.updateToggleButton(colorBlindToggle, this.settings.colorBlindFriendly);
                this.applyColorBlindFriendly();
                this.saveSettings();
                this.announceSettingChange('Color blind friendly mode', this.settings.colorBlindFriendly);
            });
        }

        // Enhanced focus toggle
        const focusIndicator = document.getElementById('focusIndicator');
        if (focusIndicator) {
            focusIndicator.addEventListener('click', () => {
                this.settings.enhancedFocus = !this.settings.enhancedFocus;
                this.updateToggleButton(focusIndicator, this.settings.enhancedFocus);
                this.applyEnhancedFocus();
                this.saveSettings();
                this.announceSettingChange('Enhanced focus indicators', this.settings.enhancedFocus);
            });
        }

        // Reset button
        const resetButton = document.getElementById('resetAccessibility');
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                this.resetSettings();
                this.announceSettingChange('All accessibility settings', false);
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });

        // Focus management
        document.addEventListener('focusin', (e) => {
            this.handleFocusIn(e);
        });
    }

    updateToggleButton(button, isActive) {
        button.setAttribute('aria-pressed', isActive.toString());
        const toggleText = button.querySelector('.toggle-text');
        if (toggleText) {
            toggleText.textContent = isActive ? 'On' : 'Off';
        }
    }

    applySettings() {
        this.applyFontSize();
        this.applyHighContrast();
        this.applyColorBlindFriendly();
        this.applyEnhancedFocus();
    }

    applyFontSize() {
        // Remove existing font size classes
        document.body.classList.remove(
            'font-size-12', 'font-size-14', 'font-size-16', 
            'font-size-18', 'font-size-20', 'font-size-22', 'font-size-24'
        );
        
        // Add new font size class
        document.body.classList.add(`font-size-${this.settings.fontSize}`);
    }

    applyHighContrast() {
        if (this.settings.highContrast) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
    }

    applyColorBlindFriendly() {
        if (this.settings.colorBlindFriendly) {
            document.body.classList.add('color-blind-friendly');
        } else {
            document.body.classList.remove('color-blind-friendly');
        }
    }

    applyEnhancedFocus() {
        if (this.settings.enhancedFocus) {
            document.body.classList.add('enhanced-focus');
        } else {
            document.body.classList.remove('enhanced-focus');
        }
    }

    setupKeyboardNavigation() {
        // Add skip links
        this.addSkipLinks();
        
        // Enhance form navigation
        this.enhanceFormNavigation();
        
        // Add ARIA landmarks
        this.addAriaLandmarks();
    }

    addSkipLinks() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link sr-only';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: #fff;
            padding: 8px;
            text-decoration: none;
            z-index: 10000;
            border-radius: 4px;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    enhanceFormNavigation() {
        // Add proper labels and descriptions to form elements
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.setAttribute('aria-describedby', 'fileInputHelp');
        }

        // Enhance textarea navigation
        const jobDescription = document.getElementById('jobDescription');
        if (jobDescription) {
            jobDescription.setAttribute('aria-describedby', 'jobDescriptionHelp');
            const helpText = document.createElement('div');
            helpText.id = 'jobDescriptionHelp';
            helpText.className = 'sr-only';
            helpText.textContent = 'Optional job description to help customize the analysis';
            jobDescription.parentNode.appendChild(helpText);
        }
    }

    addAriaLandmarks() {
        // Add main landmark
        const main = document.querySelector('main');
        if (main) {
            main.id = 'main-content';
            main.setAttribute('role', 'main');
        }

        // Add navigation landmarks
        const templateSection = document.querySelector('.template-section');
        if (templateSection) {
            templateSection.setAttribute('role', 'navigation');
            templateSection.setAttribute('aria-label', 'Resume template selection');
        }

        // Add form landmarks
        const uploadSection = document.querySelector('.upload-section');
        if (uploadSection) {
            uploadSection.setAttribute('role', 'form');
            uploadSection.setAttribute('aria-label', 'Resume upload form');
        }

        // Add content landmarks
        const analysisSection = document.querySelector('.analysis-section');
        if (analysisSection) {
            analysisSection.setAttribute('role', 'region');
            analysisSection.setAttribute('aria-label', 'Resume analysis results');
        }
    }

    handleKeyboardNavigation(e) {
        // Alt + A: Focus accessibility toolbar
        if (e.altKey && e.key === 'a') {
            e.preventDefault();
            const toolbar = document.getElementById('accessibilityToolbar');
            if (toolbar) {
                toolbar.focus();
            }
        }

        // Alt + M: Focus main content
        if (e.altKey && e.key === 'm') {
            e.preventDefault();
            const main = document.getElementById('main-content');
            if (main) {
                main.focus();
            }
        }

        // Alt + U: Focus upload area
        if (e.altKey && e.key === 'u') {
            e.preventDefault();
            const uploadArea = document.getElementById('uploadArea');
            if (uploadArea) {
                uploadArea.focus();
            }
        }

        // Escape: Close any open modals or return focus
        if (e.key === 'Escape') {
            const activeElement = document.activeElement;
            if (activeElement && activeElement.blur) {
                activeElement.blur();
            }
        }
    }

    handleFocusIn(e) {
        // Announce when focus moves to important elements
        const target = e.target;
        
        if (target.classList.contains('template-btn') || target.classList.contains('template-btn-bottom')) {
            const templateName = target.querySelector('h4')?.textContent;
            if (templateName) {
                this.announceToScreenReader(`Selected ${templateName} template`);
            }
        }
        
        if (target.id === 'fileInput') {
            this.announceToScreenReader('File input selected. Press Enter to browse for files.');
        }
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    announcePageLoad() {
        this.announceToScreenReader('Resume Review Application loaded. Use Alt+A to access accessibility options.');
    }

    announceSettingChange(setting, isEnabled) {
        const status = isEnabled ? 'enabled' : 'disabled';
        this.announceToScreenReader(`${setting} ${status}`);
    }

    saveSettings() {
        try {
            localStorage.setItem('accessibilitySettings', JSON.stringify(this.settings));
        } catch (e) {
            console.warn('Could not save accessibility settings:', e);
        }
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('accessibilitySettings');
            if (saved) {
                this.settings = { ...this.settings, ...JSON.parse(saved) };
            }
        } catch (e) {
            console.warn('Could not load accessibility settings:', e);
        }
    }

    resetSettings() {
        this.settings = {
            fontSize: 16,
            highContrast: false,
            colorBlindFriendly: false,
            enhancedFocus: false
        };
        
        // Update UI elements
        const fontSizeSlider = document.getElementById('fontSizeSlider');
        const fontSizeValue = document.getElementById('fontSizeValue');
        
        if (fontSizeSlider && fontSizeValue) {
            fontSizeSlider.value = 16;
            fontSizeValue.textContent = '16px';
        }
        
        // Update toggle buttons
        const toggles = ['contrastToggle', 'colorBlindToggle', 'focusIndicator'];
        toggles.forEach(id => {
            const toggle = document.getElementById(id);
            if (toggle) {
                this.updateToggleButton(toggle, false);
            }
        });
        
        this.applySettings();
        this.saveSettings();
    }

    // Public methods for external use
    getSettings() {
        return { ...this.settings };
    }

    updateSetting(key, value) {
        if (key in this.settings) {
            this.settings[key] = value;
            this.applySettings();
            this.saveSettings();
        }
    }
}

// Initialize accessibility manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.accessibilityManager = new AccessibilityManager();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityManager;
}
