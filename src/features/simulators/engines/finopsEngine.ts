export type FinopsInput = {
  baselineMonthlyComputeUsd: number;
  pricingModel: 'on-demand' | 'reserved-1yr' | 'arm64-graviton-spot';
  natTrafficGb: number;
  useVpcGatewayEndpoint: boolean;
  crossRegionEgressGb: number;
  highCardinalityMetrics: boolean;
};

export type FinopsResult = {
  modelVersion: string;
  baselineTotalUsd: number;
  optimizedTotalUsd: number;
  savingsPct: number;
  disclaimer: string;
  steps: string[];
};

export function runFinopsEngine(input: FinopsInput): FinopsResult {
  const baselineCompute = input.baselineMonthlyComputeUsd;
  const baselineNat = input.natTrafficGb * 0.045;
  const baselineEgress = input.crossRegionEgressGb * 0.02;
  const baselineObs = input.highCardinalityMetrics ? 240 : 45;
  const baselineTotalUsd = Math.round(baselineCompute + baselineNat + baselineEgress + baselineObs);

  const computeFactor =
    input.pricingModel === 'arm64-graviton-spot'
      ? 0.42
      : input.pricingModel === 'reserved-1yr'
        ? 0.68
        : 1;
  const optCompute = baselineCompute * computeFactor;
  const optNat = input.useVpcGatewayEndpoint ? 0 : baselineNat;
  const optObs = input.highCardinalityMetrics ? 240 : 45;
  const optimizedTotalUsd = Math.round(optCompute + optNat + baselineEgress + optObs);

  const savingsPct =
    baselineTotalUsd > 0
      ? Math.max(0, Math.round(((baselineTotalUsd - optimizedTotalUsd) / baselineTotalUsd) * 100))
      : 0;

  return {
    modelVersion: 'finops-v1.0',
    baselineTotalUsd,
    optimizedTotalUsd,
    savingsPct,
    disclaimer:
      'Estimación de modelo hipotético educativo con supuestos unitarios fijos; no consulta precios oficiales en vivo.',
    steps: [
      `1. Cómputo (${input.pricingModel}): $${Math.round(optCompute)} vs base $${baselineCompute}.`,
      `2. Tráfico NAT (${input.natTrafficGb} GB): ${input.useVpcGatewayEndpoint ? '$0 vía VPC Gateway Endpoint' : `$${Math.round(optNat)} en NAT Gateway`}.`,
      `3. Egress inter-región (${input.crossRegionEgressGb} GB): $${Math.round(baselineEgress)} | Métricas: $${optObs}.`,
      `4. Total estimado: $${optimizedTotalUsd}/mes (ahorro ${savingsPct}%).`,
    ],
  };
}
