export interface SmartItem {
  editable: boolean;
  label: string;
  link: string;
  state: string;
  type: string;
  name: string;
  category: string;
  tags?: string[];
  groups?: string[];
}
