# AI Study Guide Maker Setup Guide

## 🚀 Perplexity API Integration

### Step 1: Get Perplexity API Key
1. Visit [perplexity.ai](https://www.perplexity.ai)
2. Sign up/Login to your account
3. Go to [API Settings](https://www.perplexity.ai/pplx-api)
4. Click "Generate API Key"
5. Copy your API key

### Step 2: Configure Environment Variables
Add to your `.env.local` file:
```bash
PERPLEXITY_API_KEY=your_perplexity_api_key_here
```

### Step 3: Install Dependencies (if needed)
```bash
npm install openai  # For compatibility with Perplexity API
```

## 🎯 API Features

### Current Implementation:
- **Real Perplexity API integration** when API key is provided
- **Fallback to sample generation** when no API key (for testing)
- **Bilingual support** (English & Hindi)
- **4 template types** with different prompting strategies
- **Error handling** with graceful fallbacks

### Supported Models:
- `mistral-7b-instruct` (default - good balance of quality/cost)
- `llama-2-70b-chat` (higher quality, more expensive)
- `codellama-34b-instruct` (for technical topics)

### API Costs (Approximate):
- **Perplexity**: ~$0.001-0.002 per 1K tokens
- **Much cheaper** than OpenAI GPT-4
- **Good for educational content** generation

## 🛠 Technical Details

### API Endpoint: `/api/generate-study-guide`
**Request:**
```json
{
  "topic": "Photosynthesis",
  "language": "english",
  "template": "comprehensive"
}
```

**Response:**
```json
{
  "studyGuide": "# Study Guide: Photosynthesis\n\n## Overview...",
  "note": "Generated using Perplexity AI"
}
```

### Template Types:
1. **Comprehensive**: Detailed with all sections
2. **Quick Review**: Concise bullet points
3. **Visual**: Diagram-focused explanations
4. **Exam Focused**: Practice questions + key points

### Language Support:
- **English**: Full support with academic terminology
- **Hindi**: Complete Hindi language study guides
- **Automatic prompting** based on selected language

## 🔧 Current Status

✅ **Frontend**: Fully functional UI with all features  
✅ **Backend**: API route created with Perplexity integration  
✅ **Fallback**: Works without API key (sample generation)  
✅ **Error Handling**: Graceful error management  
✅ **Bilingual**: Hindi and English support  
✅ **Templates**: 4 different study guide formats  
✅ **Download**: Export functionality  

## 🚀 Next Steps

1. **Get Perplexity API Key** from their website
2. **Add to environment variables**
3. **Test with real topics**
4. **Monitor usage and costs**
5. **Optimize prompts** based on results

## 💡 Alternative APIs

If you prefer other AI providers:

### OpenAI GPT-4:
```bash
OPENAI_API_KEY=your_openai_api_key
```

### Google Gemini:
```bash
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

The API route is designed to be easily switchable between different AI providers.

## 🎉 Ready to Use!

Your AI Study Guide Maker is now ready for production use with Perplexity API integration!
