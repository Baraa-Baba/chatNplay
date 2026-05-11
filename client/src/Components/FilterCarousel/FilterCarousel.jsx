import React, { useState, useMemo, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { FaTimes } from 'react-icons/fa';
import 'react-alice-carousel/lib/alice-carousel.css';
import './FilterCarousel.scss';

const FILTERS = [
  { name: 'none',                  src: '/assets/noSign.png',                   label: 'None' },
  { name: 'inverted',              src: '/assets/inveted-icon.png',              label: 'Mirror' },
  { name: 'laCasaMask',            src: '/assets/laCasaMask.jpg',                label: 'La Casa' },
  { name: 'AnoymnMask',            src: '/assets/anomny.png',                    label: 'Anonymous' },
  { name: 'covidMask',             src: '/assets/covidMask.png',                 label: 'Medical' },
  { name: 'scaryMask',             src: '/assets/scaryIconMask.png',             label: 'Scary' },
  { name: 'heartEmoji',            src: '/assets/hearteyesIcon.jfif',            label: 'Heart' },
  { name: 'bandana_mask',          src: '/assets/bandanaIcon.png',               label: 'Bandana' },
  { name: 'welding_mask',          src: '/assets/welding_maskIcon.png',          label: 'Welding' },
  { name: 'masquerade_cat_mask_3', src: '/assets/masquerade_cat_mask_3icon.png', label: 'Cat Mask' },
  { name: 'forest_mask',           src: '/assets/forestmaskIcon.png',            label: 'Forest' },
  { name: 'clown_2_mask',          src: '/assets/clownIconMask.png',             label: 'Clown' },
  { name: 'magicHat',              src: '/assets/noenglassesIcon.png',           label: 'Glasses' },
  { name: 'joker_mask',            src: '/assets/jokerMaskIcon.png',             label: 'Joker' },
  { name: 'batman_mask',           src: '/assets/batmanMaskIcon.png',            label: 'Batman' },
  { name: 'egypt_cat_mask',        src: '/assets/egypt_cat_maskIcon.png',        label: 'Egypt Cat' },
  { name: 'samurai_mask',          src: '/assets/samuraMaskIcon.png',            label: 'Samurai' },
  { name: 'bunnyEars',             src: '/assets/bunnyEars.png',                 label: 'Bunny' },
];

const RESPONSIVE = {
  0:   { items: 3 },
  400: { items: 3 },
  560: { items: 4 },
  860: { items: 5 },
};

const handleDrag = e => e.preventDefault();

export default function FilterCarousel({ filter, setFilter, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Stable items — never recreated, so carousel position never resets
  const items = useMemo(() => FILTERS.map(f => (
    <button
      key={f.name}
      id={`fc-item-${f.name}`}
      className="filter-item"
      onClick={() => setFilter(f.name)}
      title={f.label}
    >
      <img
        onDragStart={handleDrag}
        src={f.src}
        alt={f.label}
        width={100}
        height={100}
        className="filter-thumb"
        loading="lazy"
      />
      <span className="filter-label">{f.label}</span>
    </button>
  )), []); // eslint-disable-line react-hooks/exhaustive-deps

  // Apply active class via DOM — avoids recreating items and resetting carousel
  useEffect(() => {
    FILTERS.forEach(f => {
      const el = document.getElementById(`fc-item-${f.name}`);
      if (el) el.classList.toggle('filter-item--active', f.name === filter);
    });
  }, [filter]);

  return (
    <div className="filter-carousel">
      <button className="filter-close" onClick={onClose} title="Close filters">
        <FaTimes size={14} />
      </button>
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={RESPONSIVE}
        disableDotsControls
        activeIndex={activeIndex}
        onSlideChanged={e => setActiveIndex(e.item)}
        renderPrevButton={() => <button className="filter-nav filter-nav--prev">‹</button>}
        renderNextButton={() => <button className="filter-nav filter-nav--next">›</button>}
      />
    </div>
  );
}
