# 🎨 Figma MCP Integration Setup Guide

## ✅ What I've Set Up For You

I've installed and configured the MCP Figma server for your Fox Creek HOA website project. Here's what's ready:

### 📦 Installed Packages
- `figma-mcp` - The Figma MCP server
- `@modelcontextprotocol/sdk` - MCP SDK for TypeScript/JavaScript
- `dotenv` - Environment variable management

### 📁 Files Created
- `.env` - Environment configuration (you need to add your tokens)
- `mcp-config.json` - MCP server configuration
- `figma-integration.js` - Main integration script
- `scripts/sync-figma.js` - Sync script for design updates
- `FIGMA_SETUP.md` - This setup guide

### 🚀 Available Commands
- `npm run figma:connect` - Test connection to Figma
- `npm run figma:sync` - Sync design changes from Figma
- `npm run dev` - Start your development server
- `npm run start` - Start your production server

## 🔑 Next Steps (You Need To Do These)

### 1. Get Your Figma Access Token
1. Go to [Figma Account Settings](https://www.figma.com/settings)
2. Click "Personal Access Tokens"
3. Click "Create new token"
4. Give it a name like "Fox Creek HOA"
5. Copy the token

### 2. Get Your Figma File Key
1. Open your Figma file in the browser
2. Look at the URL: `https://www.figma.com/file/FILE_KEY/File-Name`
3. Copy the `FILE_KEY` part

### 3. Update Your .env File
Open `.env` and replace the placeholder values:

```bash
FIGMA_ACCESS_TOKEN=your-actual-token-here
FIGMA_FILE_KEY=your-actual-file-key-here
```

### 4. Test the Connection
Run this command to test if everything works:

```bash
npm run figma:connect
```

## 🎯 How to Use

### Test Connection
```bash
npm run figma:connect
```

### Sync Design Changes
```bash
npm run figma:sync
```

### Start Development Server
```bash
npm run dev
```

## 🔧 What This Enables

Once set up, you can:
- **Extract design tokens** (colors, fonts, spacing) from Figma
- **Generate component code** from Figma components
- **Sync design changes** automatically
- **Create design-to-code workflows**

## 🆘 Troubleshooting

### Connection Issues
- Make sure your Figma token has the right permissions
- Check that the file key is correct
- Ensure you have access to the Figma file

### Token Permissions
Your Figma token needs these permissions:
- `file:read` - Read file contents
- `file:write` - Write to files (optional)

### File Access
Make sure you have access to the Figma file and the file key is correct.

## 📚 Next Steps

Once you've added your tokens, you can:
1. Test the connection with `npm run figma:connect`
2. Sync your designs with `npm run figma:sync`
3. Start building design-to-code workflows

The integration is ready to go - just add your Figma credentials! 🚀
