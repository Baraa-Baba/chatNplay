import React, { useEffect, useRef } from 'react';

const SCRIPTS = [
  '/threedostuffoldpublic/filters2Scripts/three.min.js',
  '/threedostuffoldpublic/filters2Scripts/jeelizFaceFilter.js',
  '/threedostuffoldpublic/filters2Scripts/JeelizThreeHelper.js',
  '/threedostuffoldpublic/filters2Scripts/JeelizResizer.js',
];

const MODULE_SCRIPT = '/threedostuffoldpublic/filters2Scripts/filterMain.js';

function loadScript(src, type = 'text/javascript') {
  return new Promise(resolve => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement('script');
    s.src = src;
    s.type = type;
    s.onload = resolve;
    s.onerror = () => { console.warn('Could not load:', src); resolve(); };
    document.head.appendChild(s);
  });
}

export default function Filters2() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    (async () => {
      for (const src of SCRIPTS) await loadScript(src);
      await loadScript(MODULE_SCRIPT, 'module');
    })();
  }, []);

  return (
    <canvas
      id="jeeFaceFilterCanvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%', 
        pointerEvents: 'none',
        display: 'none',
      }}
    />
  );
}
