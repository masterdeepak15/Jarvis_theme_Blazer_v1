// ================================================================
//  JARVIS UI — LEAFLET MAP INTEROP
//  jarvis-leaflet.js
//
//  Handles all Leaflet.js calls from Blazor.
//  India maps: state/district/taluka/village drill-down via GeoJSON.
//  Full HUD theme — no default Leaflet styling.
// ================================================================

window.JarvisLeaflet = window.JarvisLeaflet || {};

JarvisLeaflet._maps      = {};
JarvisLeaflet._layers    = {};
JarvisLeaflet._markers   = {};
JarvisLeaflet._geoLayers = {};
JarvisLeaflet._dotNetRefs= {};
JarvisLeaflet._selected  = {};

// ── Get theme vars ────────────────────────────────────────────────
JarvisLeaflet._accent = () =>
  getComputedStyle(document.documentElement).getPropertyValue('--j-accent').trim() || '#00e5ff';
JarvisLeaflet._bg = () =>
  getComputedStyle(document.documentElement).getPropertyValue('--j-bg-card').trim() || '#030f1e';
JarvisLeaflet._bgMain = () =>
  getComputedStyle(document.documentElement).getPropertyValue('--j-bg').trim() || '#020d18';

// ================================================================
//  INITIALIZE LEAFLET MAP
// ================================================================
JarvisLeaflet.init = function(mapId, dotNetRef, options) {
  const el = document.getElementById(mapId);
  if (!el || typeof L === 'undefined') {
    console.warn('JarvisLeaflet: element or Leaflet not found', mapId);
    return false;
  }

  // Inject HUD CSS overrides for Leaflet
  JarvisLeaflet._injectStyles();

  const map = L.map(mapId, {
    center:             [options.lat || 20.5937, options.lng || 78.9629],
    zoom:               options.zoom  || 5,
    minZoom:            options.minZoom || 1,
    zoomControl:        false,   // We add our own HUD controls
    attributionControl: false,
    maxBounds:          options.maxBounds ? L.latLngBounds(options.maxBounds) : undefined,
    maxBoundsViscosity: 0.9,
  });

  JarvisLeaflet._maps[mapId]       = map;
  JarvisLeaflet._layers[mapId]     = {};
  JarvisLeaflet._markers[mapId]    = {};
  JarvisLeaflet._geoLayers[mapId]  = {};
  JarvisLeaflet._dotNetRefs[mapId] = dotNetRef;

  // Add tile layer
  const tileUrl = options.tileUrl || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const applyDarkFilter = () => {
    const te = el.querySelector('.leaflet-tile-pane');
    if (te) te.style.filter = 'invert(1) hue-rotate(180deg) saturate(0.4) brightness(0.5)';
  };
  if (options.useTheme !== false) {
    // Dark HUD tile with CSS filter
    const tileLayer = L.tileLayer(tileUrl, { opacity: 0.6 });
    tileLayer.addTo(map);
    // Apply filter once tile pane exists — defer so DOM has settled
    requestAnimationFrame(() => applyDarkFilter());
    tileLayer.on('tileloadstart', applyDarkFilter);
    tileLayer.on('tileload',      applyDarkFilter);
  } else {
    L.tileLayer(tileUrl, { opacity: 0.8 }).addTo(map);
  }

  // Map click
  map.on('click', (e) => {
    dotNetRef.invokeMethodAsync('JsMapClick', e.latlng.lat, e.latlng.lng);
  });

  map.on('zoomend', () => {
    dotNetRef.invokeMethodAsync('JsZoomChanged', map.getZoom());
  });

  // Invalidate size after a short delay — critical when map is inside
  // a flex layout where height resolves after initial render
  setTimeout(() => { map.invalidateSize(); }, 100);
  setTimeout(() => { map.invalidateSize(); }, 400);

  return true;
};

// ── Inject Leaflet HUD style overrides ───────────────────────────
JarvisLeaflet._injectStyles = function() {
  if (document.getElementById('j-leaflet-styles')) return;
  const accent = JarvisLeaflet._accent();
  const bg     = JarvisLeaflet._bg();
  const style  = document.createElement('style');
  style.id     = 'j-leaflet-styles';
  style.textContent = `
    .leaflet-container { background: var(--j-bg, #020d18) !important; font-family: 'Courier New', monospace; }
    .leaflet-popup-content-wrapper {
      background: var(--j-bg-card, #030f1e) !important;
      border: 1px solid var(--j-accent, #00e5ff) !important;
      border-radius: 0 !important;
      clip-path: polygon(12px 0%,100% 0%,100% calc(100% - 12px),calc(100% - 12px) 100%,0% 100%,0% 12px);
      color: var(--j-text-primary, #e0f7ff) !important;
      box-shadow: 0 0 20px var(--j-accent-25, rgba(0,229,255,.25)) !important;
      padding: 0 !important;
    }
    .leaflet-popup-content { margin: 0 !important; padding: 12px 14px !important; }
    .leaflet-popup-tip-container { display: none !important; }
    .leaflet-popup-close-button { display: none !important; }
    .leaflet-control-zoom { display: none !important; }
    .leaflet-control-attribution { display: none !important; }
    .leaflet-bar { background: transparent !important; border: none !important; }
    .j-tooltip {
      background: var(--j-bg-card, #030f1e) !important;
      border: 1px solid var(--j-accent, #00e5ff) !important;
      color: var(--j-text-primary, #e0f7ff) !important;
      border-radius: 0 !important;
      font-family: 'Courier New', monospace !important;
      font-size: 11px !important;
      box-shadow: 0 0 12px var(--j-accent-25, rgba(0,229,255,.25)) !important;
      clip-path: polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%);
    }
    .j-tooltip::before { display: none !important; }
  `;
  document.head.appendChild(style);
};

// ================================================================
//  MARKERS
// ================================================================
JarvisLeaflet.addMarker = function(mapId, markerJson) {
  const map = JarvisLeaflet._maps[mapId];
  if (!map) return;
  const m      = JSON.parse(markerJson);
  const accent = JarvisLeaflet._accent();
  const id     = m.id || ('m_' + Date.now() + '_' + Math.random().toString(36).slice(2,6));
  const color  = m.color || accent;
  const latlng = [m.lat, m.lng];

  let marker;

  if (m.type === 'pulse' || m.type === 'animated') {
    marker = JarvisLeaflet._pulseMarker(latlng, m, color);
  } else if (m.type === 'diamond' || m.type === 'hud') {
    marker = JarvisLeaflet._diamondMarker(latlng, m, color);
  } else if (m.type === 'cluster') {
    marker = JarvisLeaflet._clusterMarker(latlng, m, color);
  } else {
    marker = JarvisLeaflet._defaultMarker(latlng, m, color);
  }

  marker.addTo(map);

  if (m.popup) {
    const bg = JarvisLeaflet._bg();
    marker.bindPopup(m.popup);
  }

  if (m.tooltip) {
    marker.bindTooltip(m.tooltip, { className: 'j-tooltip', permanent: m.tooltipPermanent || false });
  }

  marker.on('click', () => {
    JarvisLeaflet._dotNetRefs[mapId]?.invokeMethodAsync('JsMarkerClick', id, m.lat, m.lng, m.title || '', m.data || '{}');
  });

  JarvisLeaflet._markers[mapId][id] = marker;
  return id;
};

JarvisLeaflet._pulseMarker = function(latlng, m, color) {
  const size = m.size || 16;
  const html = `
    <div style="position:relative;width:${size*2}px;height:${size*2}px;">
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
                  width:${size}px;height:${size}px;border-radius:50%;
                  background:${color};box-shadow:0 0 8px ${color};">
      </div>
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
                  width:${size}px;height:${size}px;border-radius:50%;
                  border:2px solid ${color};
                  animation:jlf-pulse 2s ease-out infinite;">
      </div>
    </div>`;
  JarvisLeaflet._ensurePulseAnimation();
  return L.marker(latlng, {
    icon: L.divIcon({ html, className: '', iconSize: [size*2, size*2], iconAnchor: [size, size] })
  });
};

JarvisLeaflet._diamondMarker = function(latlng, m, color) {
  const size = m.size || 14;
  const html = `
    <div style="width:${size}px;height:${size}px;background:${color};
                clip-path:polygon(50% 0%,100% 50%,50% 100%,0% 50%);
                box-shadow:0 0 10px ${color};
                animation:jlf-blink 2s ease-in-out infinite;">
    </div>`;
  return L.marker(latlng, {
    icon: L.divIcon({ html, className: '', iconSize: [size, size], iconAnchor: [size/2, size/2] })
  });
};

JarvisLeaflet._clusterMarker = function(latlng, m, color) {
  const count = m.count || 1;
  const size  = Math.min(50, 24 + count * 1.5);
  const html = `
    <div style="width:${size}px;height:${size}px;border-radius:50%;
                background:${color}22;border:1.5px solid ${color};
                display:flex;align-items:center;justify-content:center;
                color:${color};font-size:11px;font-weight:bold;
                font-family:'Courier New',monospace;
                box-shadow:0 0 12px ${color}44;">
      ${count}
    </div>`;
  return L.marker(latlng, {
    icon: L.divIcon({ html, className: '', iconSize: [size, size], iconAnchor: [size/2, size/2] })
  });
};

JarvisLeaflet._defaultMarker = function(latlng, m, color) {
  const size = m.size || 12;
  const html = `
    <div style="width:${size}px;height:${size}px;border-radius:50%;
                background:${color};box-shadow:0 0 8px ${color};
                border:2px solid ${color}88;">
    </div>`;
  return L.marker(latlng, {
    icon: L.divIcon({ html, className: '', iconSize: [size, size], iconAnchor: [size/2, size/2] })
  });
};

JarvisLeaflet._ensurePulseAnimation = function() {
  if (document.getElementById('jlf-anims')) return;
  const s = document.createElement('style');
  s.id = 'jlf-anims';
  s.textContent = `
    @keyframes jlf-pulse { 0%{transform:translate(-50%,-50%) scale(1);opacity:.8} 100%{transform:translate(-50%,-50%) scale(2.5);opacity:0} }
    @keyframes jlf-blink { 0%,100%{opacity:1} 50%{opacity:.3} }
  `;
  document.head.appendChild(s);
};

// ── Remove marker ─────────────────────────────────────────────────
JarvisLeaflet.removeMarker = function(mapId, markerId) {
  const m = JarvisLeaflet._markers[mapId]?.[markerId];
  if (m) { m.remove(); delete JarvisLeaflet._markers[mapId][markerId]; }
};

JarvisLeaflet.clearMarkers = function(mapId) {
  Object.values(JarvisLeaflet._markers[mapId] || {}).forEach(m => m.remove());
  JarvisLeaflet._markers[mapId] = {};
};

// ================================================================
//  GEOJSON LAYERS (India states / districts / talukas)
// ================================================================
JarvisLeaflet.addGeoJsonLayer = function(mapId, layerId, geoJsonStr, optionsJson) {
  const map = JarvisLeaflet._maps[mapId];
  if (!map) return;

  // Remove existing layer with same id (and its disputed overlay)
  if (JarvisLeaflet._geoLayers[mapId]?.[layerId]) {
    JarvisLeaflet._geoLayers[mapId][layerId].remove();
  }
  if (JarvisLeaflet._geoLayers[mapId]?.[layerId + '_claimed']) {
    JarvisLeaflet._geoLayers[mapId][layerId + '_claimed'].remove();
  }

  const accent  = JarvisLeaflet._accent();
  const opts    = JSON.parse(optionsJson || '{}');
  const geoData = typeof geoJsonStr === 'string' ? JSON.parse(geoJsonStr) : geoJsonStr;
  const dotNet  = JarvisLeaflet._dotNetRefs[mapId];

  // Pre-process: features with CLAIM_POLY property get a dashed disputed overlay.
  // The main geometry (real GADM data) is always rendered solid.
  // CLAIM_POLY = JSON string of a ring [lng,lat][] representing India's claimed territory.
  const realFeatures    = [];
  const claimedFeatures = [];
  (geoData.features || [geoData]).forEach(f => {
    realFeatures.push(f);  // always include real GADM geometry as-is
    const p = f.properties || {};
    if (p.CLAIM_POLY) {
      try {
        const claimRing = JSON.parse(p.CLAIM_POLY);
        // Create a separate feature for the claimed/disputed overlay
        claimedFeatures.push({
          type: 'Feature',
          properties: {
            NAME_1:      p.NAME_1,
            TYPE_1:      p.TYPE_1,
            CLAIM_NOTE:  p.CLAIM_NOTE  || '',
            DISPUTED_BY: p.DISPUTED_BY || '',
          },
          geometry: { type: 'Polygon', coordinates: [claimRing] }
        });
      } catch(e) { console.warn('CLAIM_POLY parse error', e); }
    }
  });
  const realGeoData    = { type: 'FeatureCollection', features: realFeatures };
  const claimedGeoData = claimedFeatures.length > 0
    ? { type: 'FeatureCollection', features: claimedFeatures } : null;

  const layer = L.geoJSON(realGeoData, {
    style: (feature) => {
      const props = feature?.properties || {};
      const isSelected = JarvisLeaflet._selected[mapId] === props.NAME_3
                      || JarvisLeaflet._selected[mapId] === props.NAME_2
                      || JarvisLeaflet._selected[mapId] === props.NAME_1
                      || JarvisLeaflet._selected[mapId] === props.name;
      // Disputed territories: dotted border, very light fill
      // DISPUTED property set on JK and Ladakh for PoK/Aksai Chin claimed areas
      if (props.DISPUTED || props.disputed) {
        return {
          color:       accent,
          weight:      1.5,
          opacity:     0.7,
          fillColor:   accent,
          fillOpacity: 0.04,
          dashArray:   '5, 5',   // dotted line = disputed/claimed boundary
          className:   'j-disputed',
        };
      }
      return {
        color:       opts.strokeColor   || accent,
        weight:      opts.strokeWeight  || 1,
        opacity:     opts.strokeOpacity || 0.8,
        fillColor:   isSelected ? accent : (opts.fillColor || accent),
        fillOpacity: isSelected ? 0.35   : (opts.fillOpacity || 0.12),
        dashArray:   opts.dashArray,
      };
    },
    onEachFeature: (feature, layer) => {
      const props  = feature.properties || {};
      // GADM hierarchy: NAME_3 = taluk, NAME_2 = district, NAME_1 = state
      // Always use the deepest (most specific) name available
      const name   = props.NAME_3 || props.NAME_2 || props.NAME_1 || props.name || props.NAME || '';
      // Code: use deepest available numeric ID, or explicit code fields
      const code   = props.STATE_CODE || props.DIST_CODE || props.code
                  || props.ID_3 || props.ID_2 || props.ID_1 || '';

      if (name) {
        // Tooltip — show disputed status if applicable
        const isDisputedFeature = props.DISPUTED || props.disputed;
        const claimNote = props.CLAIM_NOTE || props.claimNote || '';
        const disputedBy = props.DISPUTED_BY || props.administeredBy || 'Pakistan/China';
        const tooltipLabel = isDisputedFeature
          ? `<span style="font-size:10px;letter-spacing:.08em;">${name}</span>` +
            `<br/><span style="font-size:9px;opacity:.7;">India's claim · ${claimNote}</span>`
          : `<span style="font-size:10px;letter-spacing:.08em;">${name}</span>`;
        layer.bindTooltip(tooltipLabel, { className: 'j-tooltip', sticky: true });

        // Click
        layer.on('click', (e) => {
          L.DomEvent.stopPropagation(e);

          // Disputed/claimed territories — show claim popup AND allow drill-in
          if (isDisputedFeature) {
            const ac = JarvisLeaflet._accent();
            const html = `<div style="font-family:monospace;font-size:11px;">
              <div style="color:${ac};font-weight:600;letter-spacing:.10em;margin-bottom:4px;">${name}</div>
              <div style="font-size:9px;color:${ac};opacity:.8;margin-bottom:6px;">${props.TYPE_1 || 'Union Territory'}</div>
              <div style="margin-bottom:3px;">&#127470;&#127475; <b>India's Official Claim</b></div>
              <div style="font-size:9px;margin-bottom:2px;">Disputed with: ${disputedBy}</div>
              <div style="font-size:9px;margin-bottom:6px;opacity:.8;">${claimNote}</div>
              <div style="font-size:8px;opacity:.55;">As per Survey of India &amp; Govt. of India</div>
            </div>`;
            const center = layer.getBounds().getCenter();
            JarvisLeaflet.openPopup(mapId, center.lat, center.lng, html);
            // Fall through — still fire drill-in so clicking JK loads districts
          }

          JarvisLeaflet._selected[mapId] = name;
          JarvisLeaflet._geoLayers[mapId][layerId]?.resetStyle();

          // Zoom to clicked feature
          map.fitBounds(layer.getBounds(), { padding: [20, 20], maxZoom: opts.maxClickZoom || 8 });

          // Pass full props so Blazor can extract state/district/taluk names and IDs
          dotNet?.invokeMethodAsync('JsFeatureClick',
            layerId, name, String(code),
            JSON.stringify(props));
        });

        layer.on('mouseover', (e) => {
          layer.setStyle(
            isDisputedFeature
              ? { fillOpacity: 0.12, weight: 2, color: accent, dashArray: '6,4' }
              : { fillOpacity: 0.35, weight: 2, color: accent }
          );
          dotNet?.invokeMethodAsync('JsFeatureHover', layerId, name, JSON.stringify(props));
        });

        layer.on('mouseout', () => {
          JarvisLeaflet._geoLayers[mapId][layerId]?.resetStyle(layer);
        });
      }
    }
  });

  layer.addTo(map);
  if (!JarvisLeaflet._geoLayers[mapId]) JarvisLeaflet._geoLayers[mapId] = {};
  JarvisLeaflet._geoLayers[mapId][layerId] = layer;

  // Add claimed/disputed territory overlay (dashed border, no fill drill-in)
  if (claimedGeoData) {
    const claimedLayer = L.geoJSON(claimedGeoData, {
      style: () => ({
        color:       accent,
        weight:      1.5,
        opacity:     0.7,
        fillColor:   accent,
        fillOpacity: 0.04,
        dashArray:   '6 4',   // dashed = disputed/claimed boundary
      }),
      onEachFeature: (feature, clLayer) => {
        const props = feature.properties || {};
        const name  = props.NAME_1 || '';
        const note  = props.CLAIM_NOTE || '';
        const by    = props.DISPUTED_BY || '';
        clLayer.bindTooltip(
          `<span style="font-size:10px;">${name}</span>` +
          `<br/><span style="font-size:9px;opacity:.8;">India's claim · ${note}</span>`,
          { className: 'j-tooltip', sticky: true }
        );
        clLayer.on('click', (e) => {
          L.DomEvent.stopPropagation(e);
          const ac = JarvisLeaflet._accent();
          const html = `<div style="font-family:monospace;font-size:11px;">
            <div style="color:${ac};font-weight:600;letter-spacing:.10em;margin-bottom:4px;">${name}</div>
            <div style="font-size:9px;color:${ac};margin-bottom:6px;">Union Territory</div>
            <div style="margin-bottom:3px;">&#127470;&#127475; <b>India's Official Claim</b></div>
            <div style="font-size:9px;margin-bottom:2px;">Disputed with: ${by}</div>
            <div style="font-size:9px;margin-bottom:6px;opacity:.8;">${note}</div>
            <div style="font-size:8px;opacity:.55;">As per Survey of India &amp; Govt. of India</div>
          </div>`;
          const center = clLayer.getBounds().getCenter();
          JarvisLeaflet.openPopup(mapId, center.lat, center.lng, html);
        });
        clLayer.on('mouseover', () => clLayer.setStyle({ fillOpacity: 0.12, weight: 2 }));
        clLayer.on('mouseout',  () => clLayer.setStyle({ fillOpacity: 0.04, weight: 1.5 }));
      }
    });
    claimedLayer.addTo(map);
    JarvisLeaflet._geoLayers[mapId][layerId + '_claimed'] = claimedLayer;
  }

  // Fit to layer bounds if requested
  if (opts.fitBounds !== false) {
    const bounds = layer.getBounds();
    if (bounds.isValid()) map.fitBounds(bounds, { padding: [10, 10] });
  }
};

JarvisLeaflet.removeGeoJsonLayer = function(mapId, layerId) {
  const l = JarvisLeaflet._geoLayers[mapId]?.[layerId];
  if (l) { l.remove(); delete JarvisLeaflet._geoLayers[mapId][layerId]; }
};

JarvisLeaflet.clearGeoJsonLayers = function(mapId) {
  Object.values(JarvisLeaflet._geoLayers[mapId] || {}).forEach(l => l.remove());
  JarvisLeaflet._geoLayers[mapId] = {};
  JarvisLeaflet._selected[mapId]  = null;
};

JarvisLeaflet.removeGeoJsonLayer = function(mapId, layerId) {
  const l = JarvisLeaflet._geoLayers[mapId]?.[layerId];
  if (l) { l.remove(); delete JarvisLeaflet._geoLayers[mapId][layerId]; }
  const lc = JarvisLeaflet._geoLayers[mapId]?.[layerId + '_claimed'];
  if (lc) { lc.remove(); delete JarvisLeaflet._geoLayers[mapId][layerId + '_claimed']; }
};

JarvisLeaflet.highlightFeature = function(mapId, layerId, featureName) {
  JarvisLeaflet._selected[mapId] = featureName;
  JarvisLeaflet._geoLayers[mapId]?.[layerId]?.resetStyle();
};

// ================================================================
//  MAP CONTROLS
// ================================================================
JarvisLeaflet.addCustomControls = function(mapId, controlsJson) {
  const map    = JarvisLeaflet._maps[mapId];
  if (!map) return;
  const controls = JSON.parse(controlsJson);
  const accent   = JarvisLeaflet._accent();
  const bg       = JarvisLeaflet._bg();

  controls.forEach(ctrl => {
    const ControlClass = L.Control.extend({
      onAdd: function() {
        const btn = L.DomUtil.create('button', '');
        btn.innerHTML  = ctrl.icon || ctrl.label || '';
        btn.title      = ctrl.tooltip || ctrl.label || '';
        btn.style.cssText = `
          background:${bg}; color:${accent}; border:1px solid ${accent}44;
          font-family:'Courier New',monospace; font-size:12px; font-weight:600;
          letter-spacing:.10em; text-transform:uppercase;
          padding:6px 10px; cursor:pointer; margin:2px; display:block;
          clip-path:polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%);
          transition:all .15s; outline:none;
        `;
        btn.onmouseover = () => { btn.style.background = accent + '22'; };
        btn.onmouseout  = () => { btn.style.background = bg; };
        btn.onclick     = (e) => {
          L.DomEvent.stopPropagation(e);
          JarvisLeaflet._dotNetRefs[mapId]?.invokeMethodAsync('JsControlClick', ctrl.id || ctrl.label);
        };
        return btn;
      }
    });
    const pos = ctrl.position || 'topright';
    new ControlClass({ position: pos }).addTo(map);
  });
};

// ── Map navigation ────────────────────────────────────────────────
JarvisLeaflet.setView    = function(mapId, lat, lng, zoom) { JarvisLeaflet._maps[mapId]?.setView([lat, lng], zoom); };
JarvisLeaflet.fitBounds  = function(mapId, boundsJson) {
  const b = JSON.parse(boundsJson);
  JarvisLeaflet._maps[mapId]?.fitBounds([[b.south, b.west],[b.north, b.east]]);
};
JarvisLeaflet.zoomIn     = function(mapId) { JarvisLeaflet._maps[mapId]?.zoomIn(); };
JarvisLeaflet.zoomOut    = function(mapId) { JarvisLeaflet._maps[mapId]?.zoomOut(); };
JarvisLeaflet.resetZoom  = function(mapId) {
  const map = JarvisLeaflet._maps[mapId];
  if (!map) return;
  JarvisLeaflet._selected[mapId] = null;
  // Reset all GeoJSON styles
  Object.values(JarvisLeaflet._geoLayers[mapId] || {}).forEach(l => l.resetStyle());
};

// ── Popup ─────────────────────────────────────────────────────────
JarvisLeaflet.openPopup = function(mapId, lat, lng, contentHtml) {
  const map = JarvisLeaflet._maps[mapId];
  if (!map) return;
  L.popup({ className: '' }).setLatLng([lat, lng]).setContent(contentHtml).openOn(map);
};

// ── Circle ───────────────────────────────────────────────────────
JarvisLeaflet.addCircle = function(mapId, lat, lng, radiusMeters, optionsJson) {
  const map  = JarvisLeaflet._maps[mapId];
  if (!map) return;
  const opts   = JSON.parse(optionsJson || '{}');
  const accent = JarvisLeaflet._accent();
  return L.circle([lat, lng], {
    radius:  radiusMeters,
    color:       opts.color || accent,
    weight:      opts.weight || 1,
    opacity:     opts.opacity || 0.8,
    fillColor:   opts.fillColor || accent,
    fillOpacity: opts.fillOpacity || 0.15,
  }).addTo(map);
};

// ── Destroy ──────────────────────────────────────────────────────
JarvisLeaflet.destroy = function(mapId) {
  JarvisLeaflet.clearMarkers(mapId);
  JarvisLeaflet.clearGeoJsonLayers(mapId);
  JarvisLeaflet._maps[mapId]?.remove();
  delete JarvisLeaflet._maps[mapId];
  delete JarvisLeaflet._layers[mapId];
  delete JarvisLeaflet._dotNetRefs[mapId];
};

// ── Invalidate size ─────────────────────────────────────────────
// Call after layout changes (flex resize, panel toggle, etc.)
JarvisLeaflet.invalidateSize = function(mapId) {
  const map = JarvisLeaflet._maps[mapId];
  if (!map) return;
  map.invalidateSize({ animate: false, pan: false });
};

// ── Re-apply theme ───────────────────────────────────────────────
JarvisLeaflet.applyTheme = function(mapId) {
  const style = document.getElementById('j-leaflet-styles');
  if (style) style.remove();
  JarvisLeaflet._injectStyles();
};
