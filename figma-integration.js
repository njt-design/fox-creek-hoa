const { Client } = require('@modelcontextprotocol/sdk/client');
require('dotenv').config();

class FigmaIntegration {
    constructor() {
        this.client = new Client({
            name: "fox-creek-hoa",
            version: "1.0.0"
        });
    }

    async connect() {
        try {
            await this.client.connect({
                command: "npx",
                args: ["figma-mcp"],
                env: {
                    FIGMA_ACCESS_TOKEN: process.env.FIGMA_ACCESS_TOKEN
                }
            });
            console.log("✅ Connected to Figma MCP server");
            return true;
        } catch (error) {
            console.error("❌ Failed to connect to Figma:", error.message);
            return false;
        }
    }

    async getDocumentInfo() {
        try {
            const result = await this.client.request({
                method: "mcp_figma_get_document_info",
                params: {}
            });
            return result;
        } catch (error) {
            console.error("❌ Failed to get document info:", error.message);
            return null;
        }
    }

    async getSelection() {
        try {
            const result = await this.client.request({
                method: "mcp_figma_get_selection",
                params: {}
            });
            return result;
        } catch (error) {
            console.error("❌ Failed to get selection:", error.message);
            return null;
        }
    }

    async getStyles() {
        try {
            const result = await this.client.request({
                method: "mcp_figma_get_styles",
                params: {}
            });
            return result;
        } catch (error) {
            console.error("❌ Failed to get styles:", error.message);
            return null;
        }
    }

    async getLocalComponents() {
        try {
            const result = await this.client.request({
                method: "mcp_figma_get_local_components",
                params: {}
            });
            return result;
        } catch (error) {
            console.error("❌ Failed to get components:", error.message);
            return null;
        }
    }

    async createRectangle(x, y, width, height, name) {
        try {
            const result = await this.client.request({
                method: "mcp_figma_create_rectangle",
                params: {
                    x, y, width, height, name
                }
            });
            return result;
        } catch (error) {
            console.error("❌ Failed to create rectangle:", error.message);
            return null;
        }
    }

    async createText(x, y, text, fontSize = 14) {
        try {
            const result = await this.client.request({
                method: "mcp_figma_create_text",
                params: {
                    x, y, text, fontSize
                }
            });
            return result;
        } catch (error) {
            console.error("❌ Failed to create text:", error.message);
            return null;
        }
    }

    async disconnect() {
        try {
            await this.client.close();
            console.log("✅ Disconnected from Figma MCP server");
        } catch (error) {
            console.error("❌ Error disconnecting:", error.message);
        }
    }
}

// Usage example
async function main() {
    const figma = new FigmaIntegration();
    const connected = await figma.connect();
    
    if (!connected) {
        console.log("Please check your Figma token in the .env file");
        return;
    }
    
    try {
        // Get document info
        console.log("📄 Getting document info...");
        const docInfo = await figma.getDocumentInfo();
        if (docInfo) {
            console.log("Document info:", docInfo);
        }
        
        // Get current selection
        console.log("🎯 Getting current selection...");
        const selection = await figma.getSelection();
        if (selection) {
            console.log("Current selection:", selection);
        }
        
        // Get styles
        console.log("🎨 Getting styles...");
        const styles = await figma.getStyles();
        if (styles) {
            console.log("Styles found:", styles.length);
        }
        
        // Get components
        console.log("🧩 Getting components...");
        const components = await figma.getLocalComponents();
        if (components) {
            console.log("Components found:", components.length);
        }
        
    } catch (error) {
        console.error("❌ Error during operation:", error.message);
    } finally {
        await figma.disconnect();
    }
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = FigmaIntegration;
