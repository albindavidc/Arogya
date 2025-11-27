export interface Pose {
  sanskritName: string;
  englishName: string;
  pronunciation: string;
  benefit: string;
  imageUrl: string;
  howToDo: string[];
  howManyTimes: string;
  why: string[];
}

export interface PoseCategory {
  id: string;
  title: string;
  description: string;
  poses: Pose[];
}