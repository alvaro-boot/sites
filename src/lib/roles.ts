import type { UserRole } from '@/lib/types';

export function canManageTemplates(role: UserRole): boolean {
  return role === 'ADMIN';
}

export function canEditProposals(role: UserRole): boolean {
  return role === 'ADMIN' || role === 'EDITOR';
}
