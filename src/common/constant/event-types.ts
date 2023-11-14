export enum EventType {
	// Software
	AQUABYTE_SOFTWARE_UPDATE = 'AQUABYTE_SOFTWARE_UPDATE',
	SOFTWARE_FAILURE = 'SOFTWARE_FAILURE',
	SILENCE_AUTOMATED_EVENTS = 'SILENCE_AUTOMATED_EVENTS',

	// Hardware
	HARDWARE_FAILURE = 'HARDWARE_FAILURE',
	CAMERA_OUT_OF_WATER = 'CAMERA_OUT_OF_WATER',
	LOST_CONNECTION_TO_PEN = 'LOST_CONNECTION_TO_PEN',
	LOST_INTERNET_AT_SITE = 'LOST_INTERNET_AT_SITE',

	// Camera performance
	CAMERA_REPOSITION = 'CAMERA_REPOSITION',
	CALIBRATION_PERIOD = 'CALIBRATION_PERIOD',
	BAD_POSITION = 'BAD_POSITION',
	DIRTY_LENS = 'DIRTY_LENS',
	OBSTRUCTION = 'OBSTRUCTION',
	LOW_VISIBILITY = 'LOW_VISIBILITY',
	POOR_WATER_QUALITY = 'POOR_WATER_QUALITY',
	BAD_TILT = 'BAD_TILT',

	// Lice treatment
	DELOUSING = 'DELOUSING',
	BARGE_TREATMENT = 'BARGE_TREATMENT',
	WELLBOAT_TREATMENT = 'WELLBOAT_TREATMENT',
	ADDED_CLEANER_FISH = 'ADDED_CLEANER_FISH',
	REMOVED_CLEANER_FISH = 'REMOVED_CLEANER_FISH',
	LICE_SKIRT = 'LICE_SKIRT',
	FEED_TREATMENT = 'FEED_TREATMENT',
	SUBSEA_FEEDING = 'SUBSEA_FEEDING',

	// Fish movement
	PARTIAL_COHORT_MOVE = 'PARTIAL_COHORT_MOVE',
	FULL_COHORT_MOVE = 'FULL_COHORT_MOVE',
	ADD_FISH = 'ADD_FISH',

	// Biomass
	FULL_HARVEST = 'FULL_HARVEST',
	PARTIAL_HARVEST = 'PARTIAL_HARVEST',

	// Feeding
	PAUSED_FEEDING = 'PAUSED_FEEDING',
	STARVATION = 'STARVATION',
}

export const AquabyteEvents = [EventType.AQUABYTE_SOFTWARE_UPDATE];

export const ActiveLiceTreatmentEvents = [
	EventType.DELOUSING,
	EventType.BARGE_TREATMENT,
	EventType.WELLBOAT_TREATMENT,
	EventType.FEED_TREATMENT,
];

export const PassiveLiceTreatmentEvents = [
	EventType.ADDED_CLEANER_FISH,
	EventType.REMOVED_CLEANER_FISH,
	EventType.LICE_SKIRT,
	EventType.SUBSEA_FEEDING,
];

export const CohortMoveEvents = [EventType.FULL_COHORT_MOVE, EventType.PARTIAL_COHORT_MOVE];

export const OfflineOrBugEventTypes = [
	EventType.SOFTWARE_FAILURE,
	EventType.HARDWARE_FAILURE,
	EventType.LOST_CONNECTION_TO_PEN,
	EventType.LOST_INTERNET_AT_SITE,
];

export const CameraPositionEventTypes = [
	EventType.BAD_POSITION,
	EventType.DIRTY_LENS,
	EventType.OBSTRUCTION,
	EventType.BAD_TILT,
];

export const FishMovementEventTypes = [EventType.PARTIAL_COHORT_MOVE, EventType.FULL_COHORT_MOVE];

export const FishHarvestEventTypes = [EventType.FULL_HARVEST, EventType.PARTIAL_HARVEST];

export const FishGroupEventTypes = [...FishMovementEventTypes, ...FishHarvestEventTypes, EventType.ADD_FISH];

export enum StarvationReason {
	HARVEST = 'HARVEST',
	TREATMENT = 'TREATMENT',
	UNKNOWN = 'UNKNOWN',
}

export enum EventState {
	AUTO = 'auto',
	MANUAL = 'manual',
	SCHEDULE = 'schedule',
}

export const dataByEventType = {
	// Software
	[EventType.AQUABYTE_SOFTWARE_UPDATE]: {
		label: 'Aquabyte software update',
	},
	[EventType.SOFTWARE_FAILURE]: {
		label: 'Software failure',
	},

	// Hardware
	[EventType.HARDWARE_FAILURE]: {
		label: 'Hardware failure',
	},
	[EventType.CAMERA_OUT_OF_WATER]: {
		label: 'Camera out of water',
	},
	[EventType.LOST_CONNECTION_TO_PEN]: {
		label: 'Lost connection to pen',
	},
	[EventType.LOST_INTERNET_AT_SITE]: {
		label: 'Lost internet at site',
	},

	// Camera performance
	[EventType.CAMERA_REPOSITION]: {
		label: 'Camera reposition',
	},
	[EventType.CALIBRATION_PERIOD]: {
		label: 'Calibration period',
	},
	[EventType.BAD_POSITION]: {
		label: 'Bad position',
	},
	[EventType.DIRTY_LENS]: {
		label: 'Dirty lens',
	},
	[EventType.OBSTRUCTION]: {
		label: 'Obstruction',
	},
	[EventType.LOW_VISIBILITY]: {
		label: 'Low visibility',
	},
	[EventType.POOR_WATER_QUALITY]: {
		label: 'Poor water quality',
	},

	[EventType.BAD_TILT]: {
		label: 'Bad tilt',
	},

	// Lice treatment
	[EventType.DELOUSING]: {
		label: 'Delousing',
	},
	[EventType.BARGE_TREATMENT]: {
		label: 'Barge treatment',
	},
	[EventType.WELLBOAT_TREATMENT]: {
		label: 'Wellboat treatment',
	},
	[EventType.ADDED_CLEANER_FISH]: {
		label: 'Added cleaner fish',
	},
	[EventType.REMOVED_CLEANER_FISH]: {
		label: 'Removed cleaner fish',
	},
	[EventType.LICE_SKIRT]: {
		// TODO: not yet configurable in ID?
		label: 'Lice skirt',
	},
	[EventType.FEED_TREATMENT]: {
		label: 'Feed treatment',
	},
	[EventType.SUBSEA_FEEDING]: {
		// TODO: not yet configurable in ID?
		label: 'Subsea feeding',
	},

	// Fish movement
	[EventType.PARTIAL_COHORT_MOVE]: {
		label: 'Partial cohort move',
	},
	[EventType.FULL_COHORT_MOVE]: {
		label: 'Full cohort move',
	},

	// Biomass
	[EventType.FULL_HARVEST]: {
		label: 'Harvest',
	},
	[EventType.PARTIAL_HARVEST]: {
		label: 'Partial harvest',
	},

	// Feeding
	[EventType.PAUSED_FEEDING]: {
		label: 'Paused feeding',
	},
	[EventType.STARVATION]: {
		label: 'Starvation',
	},
	[EventType.ADD_FISH]: {
		label: `fish were added`,
	},
};
