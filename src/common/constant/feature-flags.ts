export const FeatureFlags = {
  BIOMASS: 'biomass',
  BIOMASS_HARVEST_REPORTS: 'BIOMASS_HARVEST_REPORTS',
  FISH_ANALYZED_FOR_LICE_CHART: 'fishAnalyzedForLiceChart',
  GUT_LOSS: 'gutLoss',
  HIDE_CAMERA_CHART: 'hideCameraChart',
  HIDE_SITE_NAMES: 'hideSiteNames',
  IMAGE_QUALITY_CHART: 'imageQualityChart',
  INTERNAL_DASHBOARD_CONTRACTS: 'internalDashboardContracts',
  INTERNAL_DASHBOARD_DEVICE_MANAGEMENT: 'internalDashboardDeviceManagement',
  LICE_FORECAST: 'liceForecast',
  LICE_HEAT_MAPS: 'LICE_HEAT_MAPS',
  PARTIAL_FISH: 'partialFish',
  SCOTTISH_LICE: 'scottishLice',
  STATIONARY_LICE: 'fixedLice',
  STATIONARY_LICE_REPORT_ONLY: 'stationaryLiceReportOnly',
  TEMPERATURE: 'temperature',
  WHALESHARK_MFA_ENABLED: 'whalesharkMfaEnabled',
  WINCH_CONTROL_ENABLED: 'winchControlEnabled',
  FEEDING_AND_LIGHTS: 'FEEDING_AND_LIGHTS',
  CUSTOM_DOWNGRADING: 'customDowngrading',
  POWER_BI: 'powerBi',
};

export const DisableFeatureFlags = [
  // FeatureFlags.LICE_HEAT_MAPS,
  // FeatureFlags.TEMPERATURE,
  // FeatureFlags.BIOMASS_HARVEST_REPORTS,
  FeatureFlags.PARTIAL_FISH,
  FeatureFlags.IMAGE_QUALITY_CHART,
  FeatureFlags.HIDE_CAMERA_CHART,
  FeatureFlags.SCOTTISH_LICE,
  FeatureFlags.BIOMASS,
  FeatureFlags.GUT_LOSS,
  FeatureFlags.FISH_ANALYZED_FOR_LICE_CHART,
  'depth',
  'logDelousing',
];
