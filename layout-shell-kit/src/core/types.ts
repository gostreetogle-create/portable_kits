export interface LayoutNavItem {
  label: string;
  route: string;
  icon?: string;
}

export interface LayoutShellKitConfig {
  appTitle?: string;
  navItems?: LayoutNavItem[];
}
