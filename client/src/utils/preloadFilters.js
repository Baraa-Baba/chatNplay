/*
 * Warm the browser HTTP cache with all assets the face-filter feature needs:
 *   - Jeeliz / three.js scripts
 *   - The neural-net JSON
 *   - The GLB mask models
 *
 * Run after the page settles so we don't compete with critical-path requests.
 * When the user later opens the filter UI, every asset is already cached and
 * the filter spins up nearly instantly instead of stalling on first click.
 */

const FILTER_ASSETS = [
  // Core scripts
  '/threedostuffoldpublic/filters2Scripts/three.min.js',
  '/threedostuffoldpublic/filters2Scripts/jeelizFaceFilter.js',
  '/threedostuffoldpublic/filters2Scripts/JeelizThreeHelper.js',
  '/threedostuffoldpublic/filters2Scripts/JeelizResizer.js',
  '/threedostuffoldpublic/filters2Scripts/filterMain.js',
  // Neural network weights
  '/threedostuffoldpublic/filters2Scripts/neuralNets/NN_STANDARD_2.json',
  // 3D mask models
  '/covidmaskglb.glb',
  '/models/drift_mask.glb',
  '/models/scary_mask.glb',
  '/models/3d_love_emoji.glb',
  '/models/bandana_mask.glb',
  '/models/welding_mask.glb',
  '/models/masquerade_cat_mask_3.glb',
  '/models/forest_mask.glb',
  '/models/clown_2_mask.glb',
  '/models/joker_mask.glb',
  '/models/batman_mask.glb',
  '/models/egypt_cat_mask.glb',
  '/models/samurai_mask.glb',
  '/models/bunnyEars.glb',
];

let started = false;

function whenIdle(cb) {
  if (typeof window === 'undefined') return;
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(cb, { timeout: 5000 });
  } else {
    setTimeout(cb, 1500);
  }
}

function whenStable(cb) {
  if (typeof window === 'undefined') return;
  if (document.readyState === 'complete') {
    whenIdle(cb);
  } else {
    window.addEventListener('load', () => whenIdle(cb), { once: true });
  }
}

export function preloadFilterAssets() {
  if (started || typeof window === 'undefined') return;
  started = true;

  whenStable(() => {
    // Also pre-load the lazy chunk so React.lazy resolves instantly.
    import('../Components/filters/Filters2').catch(() => {});

    FILTER_ASSETS.forEach((url, i) => {
      // Stagger slightly so the browser interleaves with anything else
      // the page is doing rather than firing a wall of requests at once.
      setTimeout(() => {
        fetch(url, { cache: 'force-cache', credentials: 'omit' }).catch(() => {});
      }, i * 50);
    });
  });
}
