interface Avatar {
  large: string;
  medium: string;
}

export interface Viewer {
  name: string;
  bannerImage: string;
  avatar: Avatar;
}

export interface Media {
  id: number;
  title: AnilistTitle;
  startDate: AnilistDate;
  status: string;
  chapters: number;
  volumes: number;
  coverImage: AnilistCoverImage;
  bannerImage: string;
  description: string;
  genres: string[];
}

export interface AnilistDate {
  year: number;
  month: number;
  day: number;
}

export interface AnilistTitle {
  romaji: string;
  english: string;
}

export interface AnilistCoverImage {
  large: string;
  medium: string;
  color: string;
}

export interface ProgressEntry {
  progress: number;
  completedAt: AnilistDate;
  startedAt: AnilistDate;
  notes: string;
  score: number;
  status: string;
  media: Media;
}

export interface MediaList {
  name: string;
  isCustomList: boolean;
  isSplitCompletedList: boolean;
  status: string;
  entries: ProgressEntry[];
}
