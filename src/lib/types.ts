export type UserRole = 'ADMIN' | 'EDITOR' | 'VIEWER';
export type ProposalStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
}

export interface Slide {
  id: string;
  proposalId: string;
  order: number;
  key: string;
  title: string;
  html: string;
  css: string | null;
  grapesData: Record<string, unknown> | null;
  scripts: Record<string, unknown> | null;
  enabled: boolean;
}

export interface ThemeConfig {
  cootravirBlue?: string;
  cootravirBlueLight?: string;
  cootravirGold?: string;
  cootravirGoldLight?: string;
  backgroundDeep?: string;
  backgroundMid?: string;
  text?: string;
}

export interface Proposal {
  id: string;
  slug: string;
  clientName: string;
  title: string;
  status: ProposalStatus;
  isTemplate?: boolean;
  templateId: string | null;
  mapConfig: Record<string, unknown> | null;
  themeConfig?: ThemeConfig | null;
  slides: Slide[];
  createdAt: string;
  updatedAt: string;
}
