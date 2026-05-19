/** Contexto del mapa inyectado en el iframe de la diapositiva mapa-pereira. */
export interface MapSlideContext {
  proposalId: string;
  mapConfig: Record<string, unknown> | null;
  /** true si esta propuesta tiene map_config propio en BD (no usar fallback global). */
  mapConfigIsSet?: boolean;
  /** Si true, el mapa notifica al editor para guardar en BD + Supabase. */
  persist?: boolean;
}

export function buildMapContextScript(ctx: MapSlideContext): string {
  const payload = {
    proposalId: ctx.proposalId,
    mapConfig: ctx.mapConfig,
    mapConfigIsSet: ctx.mapConfigIsSet ?? ctx.mapConfig != null,
    persist: ctx.persist !== false,
  };
  return `<script>window.__COOTRAVIR_MAP_CTX__=${JSON.stringify(payload)};<\/script>`;
}
