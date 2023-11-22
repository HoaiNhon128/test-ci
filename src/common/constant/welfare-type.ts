import { number } from 'prop-types';

export enum WelfareType {
  SKIN = 'SKIN_WELFARE',
  DEFORMITY = 'DEFORMITY',
  FIN_DAMAGE = 'FIN_DAMAGE',
  EYE = 'EYE_WELFARE',
  MATURATION = 'MATURATION',
  BLEEDING = 'BLEEDING',
  DAMAGE = 'DAMAGE',
}

export enum AnnotationIndicator {
  // skin welfare
  BODY_WOUNDS = 'body_wound',
  SCALE_LOSS = 'scale_loss',
  SNOUT_WOUND = 'snout_wound',
  // deformities
  OPERCULAR_DAMAGE = 'opercular_damage',
  JAW_DEFORMITY = 'jaw_deformity',
  JAW_UPPER = 'upper_jaw_deformity',
  JAW_LOWER = 'lower_jaw_deformity',
  BACK_DEFORMITY = 'back_deformity',
  // fin damage
  ANAL_FIN = 'anal_fin',
  CAUDAL_FIN = 'caudal_fin',
  PECTORAL_FIN = 'pectoral_fin',
  PELVIC_FIN = 'pelvic_fin',
  DORSAL_FIN = 'dorsal_fin',
  // eye welfare
  EYE_CLOUDING = 'eye_clouding',
  EYE_BLEEDING = 'eye_bleeding',
  EXOPHTHALMOS = 'exophthalmos',
  // maturation
  MATURATION = 'maturation',
}
export enum WelfareField {
  ACTIVE_1 = 'active1',
  ACTIVE_2 = 'active2',
  ACTIVE_3 = 'active3',
  ACTIVE_T = 'activet',
  HEALED_1 = 'healed1',
  HEALED_2 = 'healed2',
  HEALED_3 = 'healed3',
  HEALED_T = 'healedt',
  SCORE_0 = 'score0',
  SCORE_1 = 'score1',
  SCORE_2 = 'score2',
  SCORE_3 = 'score3',
  SCORE_T = 'scoret',
  SCORED_0 = 'scored0',
  SCORED_1 = 'scored1',
  SCORED_2 = 'scored2',
  SCORED_3 = 'scored3',
  SCORED_T = 'scoredt',
  TOTAL = 'total',
  TOTAL_1 = 'total1',
}

export interface DowngradeSettings {
  [indicator: string]: {
    score1: boolean;
    score2: boolean;
    score3: boolean;
    subCategory?: string;
  };
}
