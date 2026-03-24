// ================================================================
//  JARVIS UI — Google Maps Interop  (jarvis-gmap.js)
//  Loaded once per map instance via IJSRuntime.
//  All Google default UI removed — replaced with HUD controls.
// ================================================================

window.JarvisGMap = window.JarvisGMap || {};
JarvisGMap._getAccent = function() {
  return getComputedStyle(document.documentElement).getPropertyValue('--j-accent').trim() || '#00e5ff';
};


// ── Dark HUD map style ────────────────────────────────────────────
JarvisGMap.DARK_STYLE = [
  { elementType: "geometry",       stylers: [{ color: "#020d18" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#020d18" }] },
  { elementType: "labels.text.fill",   stylers: [{ color: "#475569" }] },
  { featureType: "road",           elementType: "geometry",       stylers: [{ color: "#0e2a3a" }] },
  { featureType: "road",           elementType: "geometry.stroke",stylers: [{ color: "#083048" }] },
  { featureType: "road",           elementType: "labels.text.fill",stylers: [{ color: "#334155" }] },
  { featureType: "road.highway",   elementType: "geometry",       stylers: [{ color: "#0e3a52" }] },
  { featureType: "road.highway",   elementType: "labels.text.fill",stylers: [{ color: "#475569" }] },
  { featureType: "water",          elementType: "geometry",       stylers: [{ color: "#010810" }] },
  { featureType: "water",          elementType: "labels.text.fill",stylers: [{ color: "#0e7490" }] },
  { featureType: "poi",            elementType: "geometry",       stylers: [{ color: "#030f1e" }] },
  { featureType: "poi",            elementType: "labels.text.fill",stylers: [{ color: "#334155" }] },
  { featureType: "poi.park",       elementType: "geometry",       stylers: [{ color: "#021308" }] },
  { featureType: "administrative", elementType: "geometry",       stylers: [{ color: "#0e3a52" }] },
  { featureType: "administrative.country",elementType:"labels.text.fill",stylers:[{color:"#22d3ee"}]},
  { featureType: "administrative.locality",elementType:"labels.text.fill",stylers:[{color:"#94a3b8"}]},
  { featureType: "transit",        elementType: "geometry",       stylers: [{ color: "#030f1e" }] },
  { featureType: "transit.station",elementType: "labels.text.fill",stylers: [{ color: "#475569" }] },
];

// ── Map instances store ───────────────────────────────────────────
const _maps    = {};
const _markers = {};
const _iws     = {};

// ── Init ─────────────────────────────────────────────────────────
JarvisGMap.init = function(mapId, dotnetRef, options) {
  const el = document.getElementById(mapId);
  if (!el || !window.google?.maps) return;

  const accentColor = JarvisGMap._getAccent();
  const style = options.useCustomStyle !== false
    ? JarvisGMap._buildStyle(accentColor)
    : [];

  const map = new google.maps.Map(el, {
    center:            { lat: options.lat || 20.5937, lng: options.lng || 78.9629 },
    zoom:              options.zoom || 5,
    styles:            style,
    disableDefaultUI:  true,   // ← remove ALL Google controls
    gestureHandling:   "greedy",
    backgroundColor:   "#020d18",
    mapTypeId:         options.mapType || "roadmap",
    keyboardShortcuts: false,
  });

  _maps[mapId]    = map;
  _markers[mapId] = {};
  _iws[mapId]     = null;

  // Map events → Blazor
  map.addListener("click", (e) => {
    dotnetRef.invokeMethodAsync("JsMapClick", e.latLng.lat(), e.latLng.lng());
  });
  map.addListener("zoom_changed", () => {
    dotnetRef.invokeMethodAsync("JsZoomChange", map.getZoom());
  });
  map.addListener("center_changed", () => {
    const c = map.getCenter();
    dotnetRef.invokeMethodAsync("JsCenterChange", c.lat(), c.lng());
  });
};

// ── Dynamic style building (respects accent color) ────────────────
JarvisGMap._buildStyle = function(accent) {
  const style = JSON.parse(JSON.stringify(JarvisGMap.DARK_STYLE));
  style.push({ featureType:"administrative.country", elementType:"labels.text.fill", stylers:[{color:accent}] });
  return style;
};

// ── Apply theme accent color live ────────────────────────────────
JarvisGMap.setTheme = function(mapId, accentColor) {
  const map = _maps[mapId];
  if (!map) return;
  map.setOptions({ styles: JarvisGMap._buildStyle(accentColor) });
};

// ── Markers ──────────────────────────────────────────────────────
JarvisGMap.addMarker = function(mapId, markerId, lat, lng, markerOpts) {
  const map = _maps[mapId];
  if (!map) return;

  // Remove existing
  if (_markers[mapId][markerId]) {
    _markers[mapId][markerId].setMap(null);
    delete _markers[mapId][markerId];
  }

  const accent = markerOpts.color || JarvisGMap._getAccent();
  const type    = markerOpts.type        || "diamond"; // diamond | pulse | svg | circle | hud
  const title   = markerOpts.title       || "";
  const label   = markerOpts.label       || "";
  const icon    = JarvisGMap._makeIcon(type, accent, label);

  const marker  = new google.maps.Marker({
    map, position: { lat, lng }, title, icon,
    animation: markerOpts.animated ? google.maps.Animation.DROP : null,
    optimized: false,
  });

  // Pulse ring — DOM element appended separately
  if (type === "pulse") {
    JarvisGMap._addPulseRing(mapId, marker, accent);
  }

  // Click → Blazor
  marker.addListener("click", () => {
    if (markerOpts.infoContent) {
      JarvisGMap.openInfoWindow(mapId, markerId, lat, lng, markerOpts.infoContent, accent);
    }
    if (markerOpts.dotnetRef) {
      markerOpts.dotnetRef.invokeMethodAsync("JsMarkerClick", markerId, lat, lng);
    }
  });

  _markers[mapId][markerId] = marker;
};

JarvisGMap._makeIcon = function(type, accent, label) {
  const hex = accent.replace("#", "");
  switch (type) {
    case "diamond":
      return {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <polygon points="12,2 22,12 12,22 2,12" fill="#020d18" stroke="#${hex}" stroke-width="1.5"/>
            <polygon points="12,6 18,12 12,18 6,12" fill="#${hex}" opacity="0.5"/>
            <polygon points="12,9 15,12 12,15 9,12" fill="#${hex}"/>
          </svg>`)}`,
        scaledSize: new google.maps.Size(24, 24),
        anchor:     new google.maps.Point(12, 12),
      };
    case "circle":
      return {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="8" fill="#020d18" stroke="#${hex}" stroke-width="1.5"/>
            <circle cx="10" cy="10" r="4" fill="#${hex}" opacity="0.8"/>
            <circle cx="10" cy="10" r="2" fill="#${hex}"/>
          </svg>`)}`,
        scaledSize: new google.maps.Size(20, 20),
        anchor:     new google.maps.Point(10, 10),
      };
    case "pulse":
      return {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="6" fill="#${hex}" opacity="0.9"/>
            <circle cx="8" cy="8" r="3" fill="#020d18"/>
          </svg>`)}`,
        scaledSize: new google.maps.Size(16, 16),
        anchor:     new google.maps.Point(8, 8),
      };
    case "hud":
      return {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
            <polygon points="16,2 30,12 30,28 16,38 2,28 2,12" fill="#020d18" stroke="#${hex}" stroke-width="1.5"/>
            <polygon points="16,8 24,14 24,24 16,30 8,24 8,14" fill="#${hex}" opacity="0.2"/>
            <line x1="16" y1="2" x2="16" y2="38" stroke="#${hex}" stroke-width="0.5" opacity="0.4"/>
            <line x1="2" y1="20" x2="30" y2="20" stroke="#${hex}" stroke-width="0.5" opacity="0.4"/>
            <circle cx="16" cy="20" r="3" fill="#${hex}"/>
            ${label ? `<text x="16" y="24" font-size="8" fill="#${hex}" text-anchor="middle" font-family="monospace">${label}</text>` : ""}
          </svg>`)}`,
        scaledSize: new google.maps.Size(32, 40),
        anchor:     new google.maps.Point(16, 38),
      };
    case "svg":
    default:
      return {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
            <path d="M14 2 C7 2 2 8 2 14 C2 22 14 34 14 34 C14 34 26 22 26 14 C26 8 21 2 14 2Z"
              fill="#020d18" stroke="#${hex}" stroke-width="1.5"/>
            <polygon points="14,8 20,14 14,20 8,14" fill="#${hex}" opacity="0.8"/>
            <polygon points="14,11 17,14 14,17 11,14" fill="#${hex}"/>
          </svg>`)}`,
        scaledSize: new google.maps.Size(28, 36),
        anchor:     new google.maps.Point(14, 34),
      };
  }
};

// Pulse ring animation — CSS keyframe injected once
JarvisGMap._pulseStyleInjected = false;
JarvisGMap._addPulseRing = function(mapId, marker, accent) {
  if (!JarvisGMap._pulseStyleInjected) {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes jmap-pulse {
        0%   { transform:scale(1);   opacity:0.8; }
        100% { transform:scale(3.5); opacity:0;   }
      }
      .jmap-pulse-ring {
        position:absolute; border-radius:50%;
        animation: jmap-pulse 1.8s ease-out infinite;
        pointer-events:none;
      }`;
    document.head.appendChild(style);
    JarvisGMap._pulseStyleInjected = true;
  }

  const overlay = new google.maps.OverlayView();
  overlay.onAdd = function() {
    const ring = document.createElement("div");
    ring.className = "jmap-pulse-ring";
    ring.style.cssText = `width:16px;height:16px;border:2px solid ${accent};background:transparent;margin-left:-8px;margin-top:-8px;`;
    this.getPanes().overlayMouseTarget.appendChild(ring);
    overlay._ring = ring;
  };
  overlay.draw = function() {
    const pos = this.getProjection().fromLatLngToDivPixel(marker.getPosition());
    if (pos && overlay._ring) {
      overlay._ring.style.left = pos.x + "px";
      overlay._ring.style.top  = pos.y + "px";
    }
  };
  overlay.onRemove = function() {
    if (overlay._ring) overlay._ring.parentNode?.removeChild(overlay._ring);
  };
  overlay.setMap(_maps[mapId]);
  marker._pulseOverlay = overlay;
};

// ── Info Windows ─────────────────────────────────────────────────
JarvisGMap.openInfoWindow = function(mapId, markerId, lat, lng, html, accent) {
  const map = _maps[mapId];
  if (!map) return;

  const accentColor = accent || JarvisGMap._getAccent();

  // Close existing
  if (_iws[mapId]) {
    _iws[mapId].close();
    _iws[mapId] = null;
  }

  const styledHtml = `
    <div style="
      background:#020d18;
      border:1px solid ${accentColor};
      clip-path:polygon(12px 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 12px);
      padding:12px 16px;min-width:180px;max-width:280px;
      font-family:'Courier New',monospace;
      box-shadow:0 0 20px ${accentColor}33;
      color:#e0f7ff;
      font-size:11px;
      position:relative;
    ">
      <div style="position:absolute;top:0;left:0;width:12px;height:12px;
        border-top:1px solid ${accentColor};border-left:1px solid ${accentColor};"></div>
      ${html}
    </div>`;

  const iw = new google.maps.InfoWindow({
    content:           styledHtml,
    position:          { lat, lng },
    disableAutoPan:    false,
    maxWidth:          300,
    pixelOffset:       new google.maps.Size(0, -10),
  });

  iw.open({ map });
  _iws[mapId] = iw;

  // Style the default InfoWindow chrome away
  iw.addListener("domready", () => {
    const iwOuter = document.querySelector(".gm-style .gm-style-iw-d");
    if (iwOuter) {
      iwOuter.style.background    = "transparent";
      iwOuter.style.overflow      = "visible";
      iwOuter.style.maxHeight     = "none";
    }
    const iwContainer = document.querySelector(".gm-style-iw-c");
    if (iwContainer) {
      iwContainer.style.background    = "transparent";
      iwContainer.style.border        = "none";
      iwContainer.style.boxShadow     = "none";
      iwContainer.style.padding       = "0";
    }
    const iwTail  = document.querySelector(".gm-style-iw-t::after");
    const closeBtn = document.querySelector(".gm-ui-hover-effect");
    if (closeBtn) {
      closeBtn.style.cssText = `
        position:absolute!important;top:4px!important;right:4px!important;
        width:18px!important;height:18px!important;
        background:#020d18!important;
        border:1px solid ${accentColor}!important;
        filter:none!important;opacity:1!important;
        clip-path:polygon(4px 0,100% 0,calc(100% - 4px) 100%,0 100%)!important;`;
      // Replace Google × icon with custom
      closeBtn.innerHTML = `<span style="color:${accentColor};font-size:10px;font-family:monospace;font-weight:bold;">✕</span>`;
    }
  });
};

JarvisGMap.closeInfoWindow = function(mapId) {
  if (_iws[mapId]) { _iws[mapId].close(); _iws[mapId] = null; }
};

// ── Map controls ─────────────────────────────────────────────────
JarvisGMap.zoomIn  = function(mapId) { const m=_maps[mapId]; if(m) m.setZoom(m.getZoom()+1); };
JarvisGMap.zoomOut = function(mapId) { const m=_maps[mapId]; if(m) m.setZoom(m.getZoom()-1); };
JarvisGMap.setZoom = function(mapId, z) { const m=_maps[mapId]; if(m) m.setZoom(z); };
JarvisGMap.setCenter = function(mapId, lat, lng, zoom) {
  const m = _maps[mapId];
  if (!m) return;
  if (zoom) m.setZoom(zoom);
  m.panTo({ lat, lng });
};
JarvisGMap.setMapType = function(mapId, type) {
  const m = _maps[mapId];
  if (m) m.setMapTypeId(type);
};
JarvisGMap.removeMarker = function(mapId, markerId) {
  const m = _markers[mapId]?.[markerId];
  if (m) {
    if (m._pulseOverlay) m._pulseOverlay.setMap(null);
    m.setMap(null);
    delete _markers[mapId][markerId];
  }
};
JarvisGMap.clearMarkers = function(mapId) {
  const ms = _markers[mapId];
  if (!ms) return;
  Object.values(ms).forEach(m => {
    if (m._pulseOverlay) m._pulseOverlay.setMap(null);
    m.setMap(null);
  });
  _markers[mapId] = {};
};
JarvisGMap.fitBounds = function(mapId, markers) {
  const map = _maps[mapId];
  if (!map || !markers?.length) return;
  const bounds = new google.maps.LatLngBounds();
  markers.forEach(m => bounds.extend({ lat: m.lat, lng: m.lng }));
  map.fitBounds(bounds);
};
JarvisGMap.getCurrentLocation = function(mapId) {
  navigator.geolocation?.getCurrentPosition(pos => {
    JarvisGMap.setCenter(mapId, pos.coords.latitude, pos.coords.longitude, 14);
  });
};
JarvisGMap.destroy = function(mapId) {
  JarvisGMap.clearMarkers(mapId);
  JarvisGMap.closeInfoWindow(mapId);
  delete _maps[mapId];
  delete _markers[mapId];
  delete _iws[mapId];
};
