export enum FishGroupsStatus {
	ACTIVE = 'active',
	ARCHIVED = 'archived',
}

export enum FishGroupsEvent {
	NEW = 'new',
	EDIT = 'edit',
	ADD = 'add',
	MOVED = 'moved',
	PARTLY_MOVED = 'partly_moved',
	CREATED = 'created',
	SPLIT = 'split',
	SPLIT_CREATED = 'created_from_split',
	FULLY_HARVESTED = 'fully_harvested',
	PARTLY_HARVESTED = 'partly_harvested',
	MERGED = 'merged',
	MERGE_CREATED = 'created_from_merge',
	ADD_FISH = 'add_fish',
}
