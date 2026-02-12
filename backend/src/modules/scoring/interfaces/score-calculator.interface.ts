export interface ScoreInput {
  [key: string]: any;
}

export interface ScoreResult {
  score: number; // 0 to 100
  details: Record<string, number | string>; // Breakdown of how the score was calculated
}

export interface IScoreCalculator<T extends ScoreInput> {
  calculate(input: T): ScoreResult;
}