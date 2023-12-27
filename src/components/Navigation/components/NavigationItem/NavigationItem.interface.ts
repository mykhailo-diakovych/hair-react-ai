export interface NavigationItemType {
  id: string;
  name: string;
  iconName: string;
  path?: string;
  href?: string;
  clickHandler?: () => unknown | void;
}
