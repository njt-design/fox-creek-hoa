// Style Loader - Automatically applies saved styles from localStorage
// This script should be included on all pages to ensure consistent styling

(function() {
    'use strict';
    
    // Function to update CSS custom properties
    function updateCSSVariable(property, value) {
        document.documentElement.style.setProperty(property, value);
    }
    
    // Set default styles if none are saved
    function setDefaultStyles() {
        updateCSSVariable('--rich-black', '#0D1321');
        updateCSSVariable('--mauve', '#BAA5FF');
        updateCSSVariable('--caribbean', '#38686A');
        updateCSSVariable('--ash-gray', '#A3B4A2');
        updateCSSVariable('--dun', '#CDC6AE');
        updateCSSVariable('--primary-font', "'Helvetica Neue', Helvetica, Arial, sans-serif");
        updateCSSVariable('--heading-font', "'Helvetica Neue', Helvetica, Arial, sans-serif");
        updateCSSVariable('--base-font-size', '16px');
        updateCSSVariable('--border-radius', '8px');
    }
    
    // Load saved styles from localStorage
    function loadSavedStyles() {
        try {
            const savedStyles = localStorage.getItem('foxCreekStyles');
            if (savedStyles) {
                const styleData = JSON.parse(savedStyles);
                
                // Update CSS variables with saved values
                updateCSSVariable('--rich-black', styleData.richBlack);
                updateCSSVariable('--mauve', styleData.mauve);
                updateCSSVariable('--caribbean', styleData.caribbean);
                updateCSSVariable('--ash-gray', styleData.ashGray);
                updateCSSVariable('--dun', styleData.dun);
                updateCSSVariable('--primary-font', styleData.primaryFont);
                updateCSSVariable('--heading-font', styleData.headingFont);
                updateCSSVariable('--base-font-size', styleData.baseFontSize + 'px');
                updateCSSVariable('--border-radius', styleData.borderRadius + 'px');
                
                console.log('✅ Saved styles loaded successfully');
            } else {
                // Set default styles if no saved styles exist
                setDefaultStyles();
                console.log('✅ Default styles applied');
            }
        } catch (error) {
            console.error('❌ Error loading saved styles:', error);
            // Fallback to default styles on error
            setDefaultStyles();
        }
    }
    
    // Load styles when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadSavedStyles);
    } else {
        loadSavedStyles();
    }
    
    // Force reload styles every 5 seconds to catch updates
    setInterval(loadSavedStyles, 5000);
    
    // Also listen for storage events to update styles when changed from another tab
    window.addEventListener('storage', function(e) {
        if (e.key === 'foxCreekStyles') {
            loadSavedStyles();
        }
    });
    
})();
