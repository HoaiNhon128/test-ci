export enum MetricType {
  // Camera
  FISH_DENSITY = 'f_d',
  FISH_ANALYZED_FOR_LICE = 'fa_l',
  FISH_ANALYZED_FOR_BIOMASS = 'fa_b',
  IMAGE_QUALITY = 'i_q',
  TEMPERATURE = 't',
  DEPTH = 'd',
  TILT = 'c_tilt',

  // Lice
  FEMALE_LICE_COUNT = 'f_ct',
  STATIONARY_LICE_COUNT = 'fi_ct',
  MOBILE_LICE_COUNT = 'm_ct',
  SCOTTISH_FEMALE_LICE_COUNT = 'sf_ct',
  LICE_FORECAST = 'l_f',
  LICE_HEAT_MAP = 'l_hm',

  // Biomass
  AVERAGE_WEIGHT = 'w_avg',
  INDIVIDUAL_WEIGHT = 'w_i',
  K_FACTOR = 'k_f',
  WEIGHT_CV = 'w_cv',
  WEIGHT_DIST = 'wd',
  WEIGHT_DIST_K_FACTOR = 'wd_kf',

  // Fish groups
  RAILWAY = 'rw',
  HISTORICAL_FISH_GROUPS = 'h_fg',

  // Health
  AVERAGE_SWIMMING_SPEED = 'ss_avg',
  PERCENT_WOUNDED = 'p_w',

  BODY_WOUND = 'bw_wf',
  SCALE_LOSS = 'sl_wf',
  SNOUT_DAMAGE = 'sd_wf',
  JAW_DEFORMITY = 'jd_wf',
  ANAL_FIN_DAMAGE = 'anfd_wf',
  CAUDAL_FIN_DAMAGE = 'cafd_wf',
  PECTORAL_FIN_DAMAGE = 'ptfd_wf',
  PELVIC_FIN_DAMAGE = 'pvfn_wf',
  DORSAL_FIN_DAMAGE = 'dofd_wf',
  SPINE_DEFORMITY = 'spd_wf',
  OPERCULAR_DAMAGE = 'opd_wf',
  EYE_CLOUDING = 'eyc_wf',
  EYE_BLEEDING = 'eyb_wf',
  EYE_EXOPHTHALMOS = 'eye_wf',
  MATURATION = 'mat_wf',

  ACTIVE_WOUND = 'act_wf',
  HEALED_WOUND = 'hea_wf',

  UPPER_JAW = 'upj_wf',
  LOWER_JAW = 'loj_wf',

  ACTIVE_1 = 'act_1',
  ACTIVE_2 = 'act_2',
  ACTIVE_3 = 'act_3',
  ACTIVE_TOTAL = 'act_t',
  HEALED_1 = 'hea_1',
  HEALED_2 = 'hea_2',
  HEALED_3 = 'hea_3',
  HEALED_TOTAL = 'hea_t',

  SCORE_0 = 'sc_0',
  SCORE_1 = 'sc_1',
  SCORE_2 = 'sc_2',
  SCORE_3 = 'sc_3',
  SCORE_TOTAL = 'sc_t',
  SCORE_DASH_0 = 'scd_0',
  SCORE_DASH_1 = 'scd_1',
  SCORE_DASH_2 = 'scd_2',
  SCORE_DASH_3 = 'scd_3',
  SCORE_DASH_TOTAL = 'scd_t',
}

export const WelfareSupportedMetric = [
  MetricType.BODY_WOUND,
  MetricType.SCALE_LOSS,
  MetricType.SNOUT_DAMAGE,
  MetricType.JAW_DEFORMITY,
  MetricType.ANAL_FIN_DAMAGE,
  MetricType.CAUDAL_FIN_DAMAGE,
  MetricType.PECTORAL_FIN_DAMAGE,
  MetricType.PELVIC_FIN_DAMAGE,
  MetricType.DORSAL_FIN_DAMAGE,
  MetricType.SPINE_DEFORMITY,
  MetricType.OPERCULAR_DAMAGE,
  MetricType.EYE_CLOUDING,
  MetricType.EYE_BLEEDING,
  MetricType.EYE_EXOPHTHALMOS,
  MetricType.MATURATION,
];
