const M = new URL('./mocks.mjs', import.meta.url).href;
export async function resolve(spec, ctx, next) {
  if (spec === 'localforage') return { url: M, shortCircuit: true };
  return next(spec, ctx);
}
