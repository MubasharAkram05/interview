const M = new URL('./mocks.mjs', import.meta.url).href;
export async function resolve(spec, ctx, next) {
  if (['@capacitor/core', '@capacitor-community/speech-recognition'].includes(spec)) return { url: M, shortCircuit: true };
  return next(spec, ctx);
}
