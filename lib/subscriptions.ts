// lib/subscriptions.ts
export type Plan = 'basic' | 'elite' | 'pro';

export interface PlanSpec {
  id: Plan;
  name: string;
  price: number; // monthly
  features: string[];
  maxTrades?: number;   // undefined = unlimited
  maxBrokers?: number;
  aiAccess?: boolean;
  // You can extend with more quotas later
}

export const PLANS: PlanSpec[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 19.99,
    features: [
      'Journal, screenshots, calendar heatmap',
      'Basic analytics',
      '1 workspace'
    ],
    maxTrades: 500,
    maxBrokers: 2,
    aiAccess: false
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 29.99,
    features: [
      'All Basic features',
      '2–3 broker connections',
      'Advanced analytics',
      'Exports & shared dashboards',
      'Priority support'
    ],
    maxTrades: 1000,
    maxBrokers: 3,
    aiAccess: false
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 39.99,
    features: [
      'All Elite features',
      'AI features included',
      'Full broker auto-import (up to 5)',
      'Full Trade Replay Engine',
      'Prop firm analytics'
    ],
    // maxTrades is unlimited for Pro
    maxBrokers: 5,
    aiAccess: true
  }
];

// Utility: check if a plan has a named feature
export function planHasFeature(planId: Plan, feature: string): boolean {
  const p = PLANS.find((pl) => pl.id === planId);
  if (!p) return false;
  // Simple substring check (robust enough for now)
  return p.features.join(',').toLowerCase().includes(feature.toLowerCase());
}