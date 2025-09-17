#!/bin/bash

echo "🚀 Deploying Fox Creek HOA Website to Vercel..."

# Deploy to Vercel (staging)
echo "📦 Deploying to staging..."
vercel --prod=false --yes

echo "✅ Staging deployment complete!"
echo "🌐 Check your Vercel dashboard for the staging URL"

# Deploy to production
echo "🚀 Deploying to production..."
vercel --prod --yes

echo "✅ Production deployment complete!"
echo "🌐 Check your Vercel dashboard for the production URL"
