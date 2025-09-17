// Simple Figma integration example
// This shows how to use the figma-mcp package

const { spawn } = require('child_process');
require('dotenv').config();

class SimpleFigmaIntegration {
    constructor() {
        this.figmaToken = process.env.FIGMA_ACCESS_TOKEN;
        this.figmaFileKey = process.env.FIGMA_FILE_KEY;
    }

    async testConnection() {
        console.log("🔍 Testing Figma connection...");
        
        if (!this.figmaToken || this.figmaToken === 'your-figma-token-here') {
            console.log("❌ Please set your FIGMA_ACCESS_TOKEN in the .env file");
            console.log("   Get it from: https://www.figma.com/developers/api#access-tokens");
            return false;
        }
        
        if (!this.figmaFileKey || this.figmaFileKey === 'your-figma-file-key-here') {
            console.log("❌ Please set your FIGMA_FILE_KEY in the .env file");
            console.log("   Get it from your Figma file URL");
            return false;
        }
        
        console.log("✅ Figma token and file key are configured");
        console.log(`📁 File Key: ${this.figmaFileKey}`);
        console.log(`🔑 Token: ${this.figmaToken.substring(0, 10)}...`);
        
        return true;
    }

    async runFigmaCommand(command, params = {}) {
        return new Promise((resolve, reject) => {
            const child = spawn('npx', ['figma-mcp'], {
                stdio: ['pipe', 'pipe', 'pipe'],
                env: {
                    ...process.env,
                    FIGMA_ACCESS_TOKEN: this.figmaToken
                }
            });

            let output = '';
            let error = '';

            child.stdout.on('data', (data) => {
                output += data.toString();
            });

            child.stderr.on('data', (data) => {
                error += data.toString();
            });

            child.on('close', (code) => {
                if (code === 0) {
                    resolve(output);
                } else {
                    reject(new Error(error || 'Command failed'));
                }
            });

            // Send the command
            child.stdin.write(JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: command,
                params: params
            }) + '\n');
            
            child.stdin.end();
        });
    }

    async getDocumentInfo() {
        try {
            console.log("📄 Getting document info...");
            const result = await this.runFigmaCommand('mcp_figma_get_document_info', {});
            console.log("✅ Document info retrieved");
            return JSON.parse(result);
        } catch (error) {
            console.error("❌ Failed to get document info:", error.message);
            return null;
        }
    }

    async getStyles() {
        try {
            console.log("🎨 Getting styles...");
            const result = await this.runFigmaCommand('mcp_figma_get_styles', {});
            console.log("✅ Styles retrieved");
            return JSON.parse(result);
        } catch (error) {
            console.error("❌ Failed to get styles:", error.message);
            return null;
        }
    }

    async getComponents() {
        try {
            console.log("🧩 Getting components...");
            const result = await this.runFigmaCommand('mcp_figma_get_local_components', {});
            console.log("✅ Components retrieved");
            return JSON.parse(result);
        } catch (error) {
            console.error("❌ Failed to get components:", error.message);
            return null;
        }
    }
}

// Usage example
async function main() {
    const figma = new SimpleFigmaIntegration();
    
    const isConfigured = await figma.testConnection();
    if (!isConfigured) {
        console.log("\n📝 To set up Figma integration:");
        console.log("1. Get your token from: https://www.figma.com/developers/api#access-tokens");
        console.log("2. Get your file key from your Figma file URL");
        console.log("3. Update the .env file with your credentials");
        return;
    }
    
    console.log("\n🚀 Running Figma commands...");
    
    try {
        // Test basic connection
        const docInfo = await figma.getDocumentInfo();
        if (docInfo) {
            console.log("📄 Document:", docInfo.name || "Unknown");
        }
        
        // Get styles
        const styles = await figma.getStyles();
        if (styles) {
            console.log(`🎨 Found ${styles.length} styles`);
        }
        
        // Get components
        const components = await figma.getComponents();
        if (components) {
            console.log(`🧩 Found ${components.length} components`);
        }
        
        console.log("\n✅ Figma integration test completed!");
        
    } catch (error) {
        console.error("❌ Error during test:", error.message);
    }
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = SimpleFigmaIntegration;
