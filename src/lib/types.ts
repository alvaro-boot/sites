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

/** Paleta completa de la propuesta (se guarda en theme_config JSON por propuesta). */
export interface ThemeConfig {
  /* Marca */
  cootravirBlue?: string;
  cootravirBlueLight?: string;
  cootravirGold?: string;
  cootravirGoldLight?: string;
  /* Fondos */
  backgroundDeep?: string;
  backgroundMid?: string;
  backgroundCard?: string;
  backgroundCardStrong?: string;
  backgroundHeader?: string;
  /* Textos */
  text?: string;
  textTitle?: string;
  textSubtitle?: string;
  textMuted?: string;
  textAccent?: string;
  /* Iconos */
  iconColor?: string;
  iconAccent?: string;
  /* Bordes */
  borderPanel?: string;
  borderAccent?: string;
  /* Animaciones / efectos */
  accentAnimation?: string;
  accentAnimationAlt?: string;
  accentGlow?: string;
  /* Gráficos y barras */
  chartBarBlue?: string;
  chartBarMid?: string;
  chartBarGold?: string;
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
