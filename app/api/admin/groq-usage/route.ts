import { NextRequest, NextResponse } from 'next/server';
import { validateAdminToken } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

// Schema for tracking Groq API usage
const GroqUsageSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now, index: true },
  tokensUsed: { type: Number, required: true },
  requestType: { type: String, enum: ['chat', 'embedding'], default: 'chat' },
  model: { type: String, default: 'llama-3.3-70b-versatile' },
  success: { type: Boolean, default: true },
});

const GroqUsageModel = mongoose.models.GroqUsage || mongoose.model('GroqUsage', GroqUsageSchema);

/**
 * GET /api/admin/groq-usage
 * Get Groq API usage statistics and rate limit information
 */
export async function GET(req: NextRequest) {
  try {
    // Verify admin authentication
    const token = req.headers.get('authorization')?.replace('Bearer ', '') || null;
    const isValid = validateAdminToken(token);
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Non autorisé. Authentification admin requise.' },
        { status: 401 }
      );
    }

    await connectDB();

    // Get all-time statistics
    const totalRequests = await GroqUsageModel.countDocuments();
    const tokensAggregate = await GroqUsageModel.aggregate([
      {
        $group: {
          _id: null,
          totalTokens: { $sum: '$tokensUsed' }
        }
      }
    ]);
    const totalTokens = tokensAggregate[0]?.totalTokens || 0;

    // Get today's statistics (start of today in UTC)
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const todayRequests = await GroqUsageModel.countDocuments({
      timestamp: { $gte: startOfToday }
    });

    const todayTokensAggregate = await GroqUsageModel.aggregate([
      {
        $match: {
          timestamp: { $gte: startOfToday }
        }
      },
      {
        $group: {
          _id: null,
          totalTokens: { $sum: '$tokensUsed' }
        }
      }
    ]);
    const todayTokens = todayTokensAggregate[0]?.totalTokens || 0;

    // Get last request time
    const lastRequest = await GroqUsageModel.findOne().sort({ timestamp: -1 });

    // Get the most recently used model (current active model)
    const currentModel = lastRequest?.model || 'llama-3.3-70b-versatile';

    // Get model usage breakdown
    const modelBreakdown = await GroqUsageModel.aggregate([
      {
        $group: {
          _id: '$model',
          count: { $sum: 1 },
          tokens: { $sum: '$tokensUsed' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Get hourly breakdown for today (last 24 hours)
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const hourlyBreakdown = await GroqUsageModel.aggregate([
      {
        $match: {
          timestamp: { $gte: last24Hours }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d %H:00',
              date: '$timestamp'
            }
          },
          requests: { $sum: 1 },
          tokens: { $sum: '$tokensUsed' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Check availability of all models based on recent usage
    const GROQ_MODELS = [
      "llama-3.3-70b-versatile",
      "llama-3.1-8b-instant",
      "meta-llama/llama-4-scout-17b-16e-instruct",
      "meta-llama/llama-4-maverick-17b-128e-instruct",
      "qwen/qwen3-32b",
      "openai/gpt-oss-120b",
    ];

    // Check last 10 minutes of usage to determine model status
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    
    const modelAvailability = await Promise.all(
      GROQ_MODELS.map(async (modelId) => {
        // Check if this model was successfully used recently
        const recentSuccess = await GroqUsageModel.findOne({
          model: modelId,
          success: true,
          timestamp: { $gte: tenMinutesAgo }
        }).sort({ timestamp: -1 });

        // Check if there are recent failures (indicating rate limit or other issues)
        const recentFailures = await GroqUsageModel.countDocuments({
          model: modelId,
          success: false,
          timestamp: { $gte: tenMinutesAgo }
        });

        // Count successful uses in last hour
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const hourlyUses = await GroqUsageModel.countDocuments({
          model: modelId,
          timestamp: { $gte: oneHourAgo }
        });

        let status = 'Unknown';
        let available = false;

        // If this is the current model, it's available
        if (modelId === currentModel) {
          status = 'Available';
          available = true;
        }
        // If used successfully in last 10 minutes, it's available
        else if (recentSuccess) {
          status = 'Available';
          available = true;
        }
        // If there are recent failures, likely rate limited
        else if (recentFailures > 0) {
          status = 'Rate Limited';
          available = false;
        }
        // If heavily used in last hour, might be rate limited
        else if (hourlyUses > 50) {
          status = 'Possibly Rate Limited';
          available = false;
        }
        // If never used or not used recently, status unknown
        else if (hourlyUses === 0) {
          status = 'Not Used Recently';
          available = true;
        }
        else {
          status = 'Available';
          available = true;
        }

        return {
          model: modelId,
          available,
          status,
          lastTested: new Date().toISOString(),
          recentUses: hourlyUses,
        };
      })
    );

    // Fetch real-time rate limits from Groq API
    let rateLimits = null;
    try {
      // Make a real chat completion request to get accurate rate limit headers
      const Groq = require('groq-sdk').default;
      const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
      
      const response = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: 'Hi' }],
        max_tokens: 5,
      });

      // The response object has _request property with headers
      const headers = response._request?.headers;
      
      console.log('📊 Groq Rate Limit Headers:', {
        limit_requests: headers?.['x-ratelimit-limit-requests'],
        remaining_requests: headers?.['x-ratelimit-remaining-requests'],
        limit_tokens: headers?.['x-ratelimit-limit-tokens'],
        remaining_tokens: headers?.['x-ratelimit-remaining-tokens'],
      });

      rateLimits = {
        limit: {
          requests_per_minute: parseInt(headers?.['x-ratelimit-limit-requests'] || '30'),
          requests_per_day: parseInt(headers?.['x-ratelimit-limit-requests-daily'] || '14400'),
          tokens_per_minute: parseInt(headers?.['x-ratelimit-limit-tokens'] || '6000'),
        },
        remaining: {
          requests_per_minute: parseInt(headers?.['x-ratelimit-remaining-requests'] || '0'),
          requests_per_day: parseInt(headers?.['x-ratelimit-remaining-requests-daily'] || '0'),
          tokens_per_minute: parseInt(headers?.['x-ratelimit-remaining-tokens'] || '0'),
        },
        reset: {
          requests_per_minute: headers?.['x-ratelimit-reset-requests'] || new Date(Date.now() + 60000).toISOString(),
          requests_per_day: headers?.['x-ratelimit-reset-requests-daily'] || new Date(Date.now() + 86400000).toISOString(),
          tokens_per_minute: headers?.['x-ratelimit-reset-tokens'] || new Date(Date.now() + 60000).toISOString(),
        }
      };
    } catch (error) {
      console.error('Error fetching rate limits from Groq:', error);
      // Calculate estimated values based on MongoDB logs
      const now = new Date();
      const oneMinuteAgo = new Date(now.getTime() - 60000);
      const requestsLastMinute = await GroqUsageModel.countDocuments({
        timestamp: { $gte: oneMinuteAgo }
      });
      
      const tokensLastMinuteAgg = await GroqUsageModel.aggregate([
        { $match: { timestamp: { $gte: oneMinuteAgo } } },
        { $group: { _id: null, total: { $sum: '$tokensUsed' } } }
      ]);
      const tokensLastMinute = tokensLastMinuteAgg[0]?.total || 0;

      rateLimits = {
        limit: {
          requests_per_minute: 30,
          requests_per_day: 14400,
          tokens_per_minute: 6000,
        },
        remaining: {
          requests_per_minute: Math.max(0, 30 - requestsLastMinute),
          requests_per_day: Math.max(0, 14400 - todayRequests),
          tokens_per_minute: Math.max(0, 6000 - tokensLastMinute),
        },
        reset: {
          requests_per_minute: new Date(Math.ceil(now.getTime() / 60000) * 60000).toISOString(),
          requests_per_day: new Date(now.setHours(24, 0, 0, 0)).toISOString(),
          tokens_per_minute: new Date(Math.ceil(now.getTime() / 60000) * 60000).toISOString(),
        }
      };
    }

    return NextResponse.json({
      success: true,
      stats: {
        requests: totalRequests,
        tokensUsed: totalTokens,
        lastRequestTime: lastRequest?.timestamp || null,
        currentModel,
        todayRequests,
        todayTokens,
        hourlyBreakdown: hourlyBreakdown.map(h => ({
          hour: h._id,
          requests: h.requests,
          tokens: h.tokens
        })),
        modelBreakdown: modelBreakdown.map(m => ({
          model: m._id,
          requests: m.count,
          tokens: m.tokens
        }))
      },
      modelAvailability,
      rateLimits
    });

  } catch (error: any) {
    console.error('❌ Error fetching Groq usage stats:', error);

    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la récupération des statistiques',
      details: error.message || 'Unknown error'
    }, { status: 500 });
  }
}

/**
 * POST /api/admin/groq-usage
 * Log a Groq API usage event
 * This should be called from the chat endpoint after each Groq API call
 */
export async function POST(req: NextRequest) {
  try {
    // Verify admin authentication or internal call
    const token = req.headers.get('authorization')?.replace('Bearer ', '') || null;
    const internalKey = req.headers.get('x-internal-key');
    
    // Allow either admin token or internal API key
    const isValid = validateAdminToken(token) || internalKey === process.env.INTERNAL_API_KEY;
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Non autorisé.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { tokensUsed, requestType = 'chat', model = 'llama-3.3-70b-versatile', success = true } = body;

    if (!tokensUsed || typeof tokensUsed !== 'number') {
      return NextResponse.json(
        { error: 'tokensUsed est requis et doit être un nombre' },
        { status: 400 }
      );
    }

    await connectDB();

    // Create usage log
    const usage = new GroqUsageModel({
      tokensUsed,
      requestType,
      model,
      success,
      timestamp: new Date()
    });

    await usage.save();

    return NextResponse.json({
      success: true,
      message: 'Usage logged successfully'
    });

  } catch (error: any) {
    console.error('❌ Error logging Groq usage:', error);

    return NextResponse.json({
      success: false,
      error: 'Erreur lors de l\'enregistrement de l\'utilisation',
      details: error.message || 'Unknown error'
    }, { status: 500 });
  }
}
