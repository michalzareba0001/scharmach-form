'use client';

import { formatPrice } from '@/app/lib';
import type { Estimate } from '@/app/types';

interface EstimatePreviewProps {
  estimate: Estimate;
}

export function EstimatePreview({ estimate }: EstimatePreviewProps) {
  return (
    <div className="card bg-gradient-to-r from-[var(--bg-card)] to-[rgba(201,162,39,0.05)] border-[var(--primary)] border-opacity-30">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-[var(--text-muted)]">
            Szacunkowa wycena
          </div>
          <div className="text-2xl font-bold gradient-text">
            {formatPrice(estimate.min)} - {formatPrice(estimate.max)} PLN
          </div>
        </div>
        <div className="text-4xl">🦁</div>
      </div>
    </div>
  );
}
