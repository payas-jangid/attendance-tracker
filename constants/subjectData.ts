export interface SubjectItem {
  id: string;
  name: string;
  present: number;
  absent: number;
  scores: ScoreItem;
}
export interface ScoreItem {
  quiz1: string;
  quiz2: string;
  mid_sem: string;
  end_sem: string;
}
export type SubjectList = SubjectItem[];