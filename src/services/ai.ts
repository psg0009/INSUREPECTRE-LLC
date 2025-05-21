import OpenAI from 'openai';
import { ServiceRecommendation } from '../types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getServiceRecommendations(query: string): Promise<ServiceRecommendation[]> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant that helps students find the best services based on their needs. 
          Analyze the query and provide relevant recommendations in a structured format.
          Focus on services like phone plans, insurance, banking, housing, travel, and legal aid.`
        },
        {
          role: "user",
          content: query
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    // Parse the AI response and transform it into ServiceRecommendation objects
    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error('No recommendations received from AI');
    }

    // For demo purposes, returning mock data
    // In production, we would parse the AI response and match it with real service data
    return [
      {
        id: '1',
        type: 'phone',
        provider: 'StudentMobile',
        plan: 'International Student Plan',
        cost: 29.99,
        features: [
          'Unlimited international calls to 60 countries',
          '5GB high-speed data',
          'Free WhatsApp usage',
          'No contract required'
        ],
        rating: 4.5,
        reviews: 128,
        link: 'https://example.com/student-mobile'
      },
      {
        id: '2',
        type: 'insurance',
        provider: 'UniCare',
        plan: 'Student Health Plus',
        cost: 75.00,
        features: [
          'Comprehensive health coverage',
          'Dental and vision included',
          'Mental health support',
          '24/7 telehealth access'
        ],
        rating: 4.8,
        reviews: 256,
        link: 'https://example.com/unicare'
      },
      {
        id: '3',
        type: 'banking',
        provider: 'StudentBank',
        plan: 'International Student Account',
        cost: 0,
        features: [
          'No monthly fees',
          'Free international transfers',
          'Student credit card option',
          'Mobile banking app'
        ],
        rating: 4.6,
        reviews: 512,
        link: 'https://example.com/student-bank'
      }
    ];
  } catch (error) {
    console.error('Error getting service recommendations:', error);
    throw error;
  }
}

export async function analyzeUserNeeds(description: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant that analyzes student needs and provides structured insights.
          Focus on understanding their requirements, constraints, and preferences.`
        },
        {
          role: "user",
          content: description
        }
      ],
      temperature: 0.5,
      max_tokens: 500,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing user needs:', error);
    throw error;
  }
}

export async function generateServiceComparison(services: ServiceRecommendation[]) {
  try {
    const servicesDescription = JSON.stringify(services);
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant that helps compare different services.
          Analyze the provided services and create a detailed comparison highlighting pros and cons.`
        },
        {
          role: "user",
          content: `Compare these services: ${servicesDescription}`
        }
      ],
      temperature: 0.5,
      max_tokens: 1000,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating service comparison:', error);
    throw error;
  }
} 