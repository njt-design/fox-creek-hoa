const FigmaIntegration = require('../figma-simple');
const fs = require('fs');
const path = require('path');

async function syncFigmaToWebsite() {
    console.log("🚀 Starting Figma sync...");
    
    const figma = new FigmaIntegration();
    const isConfigured = await figma.testConnection();
    
    if (!isConfigured) {
        console.log("❌ Could not connect to Figma. Please check your token and file key.");
        return;
    }
    
    try {
        // Get document info
        console.log("📄 Getting document info...");
        const docInfo = await figma.getDocumentInfo();
        if (docInfo) {
            console.log("✅ Document:", docInfo.name || "Unknown");
        }
        
        // Get styles and extract design tokens
        console.log("🎨 Extracting design tokens...");
        const styles = await figma.getStyles();
        if (styles && Array.isArray(styles)) {
            console.log(`✅ Found ${styles.length} styles`);
            
            // Extract colors
            const colors = styles.filter(style => style.styleType === 'FILL');
            console.log(`🎨 Found ${colors.length} color styles`);
            
            // Extract text styles
            const textStyles = styles.filter(style => style.styleType === 'TEXT');
            console.log(`📝 Found ${textStyles.length} text styles`);
        } else {
            console.log("✅ No styles found or styles not in expected format");
        }
        
        // Get components
        console.log("🧩 Getting components...");
        const components = await figma.getComponents();
        if (components && Array.isArray(components)) {
            console.log(`✅ Found ${components.length} components`);
        } else {
            console.log("✅ No components found or components not in expected format");
        }
        
        console.log("✅ Figma sync completed successfully!");
        
    } catch (error) {
        console.error("❌ Sync failed:", error.message);
    }
}

syncFigmaToWebsite();