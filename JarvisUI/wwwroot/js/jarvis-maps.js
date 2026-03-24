// ================================================================
//  JARVIS UI — UNIFIED MAPS INTEROP  v2
//  Handles Google Maps + Leaflet from Blazor Server.
// ================================================================

window.JarvisMaps = window.JarvisMaps || {};

JarvisMaps.getCssVar = n =>
  getComputedStyle(document.documentElement).getPropertyValue(n).trim() || '#00e5ff';

// ── Shared utilities ──────────────────────────────────────────
JarvisMaps.Shared = {
  resolveColor(c) {
    if (!c || !c.startsWith('var(')) return c || '#00e5ff';
    return JarvisMaps.getCssVar(c.slice(4,-1).trim());
  },

  buildMarkerSvg(style, color, pulse) {
    const c = color || '#00e5ff';
    const g = `filter:drop-shadow(0 0 5px ${c})`;
    style = (style||'Diamond').toLowerCase();
    switch(style) {
      case 'diamond': return `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="${g}"><polygon points="16,2 30,16 16,30 2,16" fill="${c}" fill-opacity="0.9" stroke="${c}" stroke-width="1"/><polygon points="16,7 25,16 16,25 7,16" fill="${c}" fill-opacity="0.35"/></svg>`;
      case 'hex':     return `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="${g}"><polygon points="16,2 28,9 28,23 16,30 4,23 4,9" fill="${c}" fill-opacity="0.85" stroke="${c}" stroke-width="1"/><polygon points="16,7 23,11 23,21 16,25 9,21 9,11" fill="${c}" fill-opacity="0.3"/></svg>`;
      case 'pulse':
      case 'dot':     return `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="${g}"><circle cx="16" cy="16" r="6" fill="${c}" fill-opacity="0.9"/><circle cx="16" cy="16" r="11" fill="none" stroke="${c}" stroke-width="1.5" stroke-opacity="0.5"/></svg>`;
      case 'pin':     return `<svg width="28" height="36" viewBox="0 0 28 36" xmlns="http://www.w3.org/2000/svg" style="${g}"><path d="M14 1C7 1 1 7 1 14c0 9 13 21 13 21s13-12 13-21C27 7 21 1 14 1z" fill="${c}" fill-opacity="0.9" stroke="${c}" stroke-width="1"/><circle cx="14" cy="14" r="5" fill="#020d18" fill-opacity="0.7"/></svg>`;
      default:        return `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="${g}"><rect x="4" y="4" width="24" height="24" rx="3" fill="${c}" fill-opacity="0.85" stroke="${c}" stroke-width="1" transform="rotate(45 16 16)"/></svg>`;
    }
  },

  buildInfoHtml(opts) {
    const a = opts.accent || JarvisMaps.getCssVar('--j-accent');
    const actions = (opts.actions||[]).map(ac =>
      `<button onclick="JarvisMaps.Shared._action('${opts.mapId}','${opts.markerId}','${ac.key}')"
        style="padding:5px 12px;background:${a}14;border:1px solid ${a}44;color:${a};font-family:'Courier New',monospace;font-size:9px;letter-spacing:.10em;text-transform:uppercase;cursor:pointer;clip-path:polygon(4px 0,100% 0,calc(100% - 4px) 100%,0 100%);"
        >${ac.icon?`<span>${ac.icon}</span> `:''}${ac.label}</button>`
    ).join('');

    let chart = '';
    if(opts.chartData?.values?.length){
      const max = Math.max(...opts.chartData.values,1);
      const bars = opts.chartData.values.map(v=>
        `<div style="width:5px;height:${Math.round(v/max*36)}px;background:${a};clip-path:polygon(0 15%,100% 0,100% 100%,0 85%);"></div>`
      ).join('');
      chart = `<div style="margin-top:8px;padding-top:8px;border-top:1px solid ${a}18;">
        <div style="font-size:8px;color:${a}66;letter-spacing:.10em;text-transform:uppercase;margin-bottom:3px;">${opts.chartData.label||'Chart'}</div>
        <div style="display:flex;align-items:flex-end;gap:2px;height:40px;">${bars}</div></div>`;
    }

    return `<div style="background:#030f1e;border:1px solid ${a}44;clip-path:polygon(14px 0%,100% 0%,100% calc(100% - 14px),calc(100% - 14px) 100%,0% 100%,0% 14px);font-family:'Courier New',monospace;min-width:${opts.width||'230px'};position:relative;overflow:hidden;">
      <div style="position:absolute;left:0;right:0;height:1px;top:0;background:linear-gradient(90deg,transparent,${a},transparent);box-shadow:0 0 8px ${a};"></div>
      <div style="position:absolute;top:0;left:0;border:14px solid transparent;border-top-color:${a};border-left-color:${a};opacity:.7;"></div>
      <div style="padding:10px 12px 10px 14px;">
        ${opts.subTitle?`<div style="font-size:8px;color:${a}88;letter-spacing:.14em;text-transform:uppercase;margin-bottom:2px;">${opts.subTitle}</div>`:''}
        <div style="font-size:12px;font-weight:600;color:#e0f7ff;letter-spacing:.08em;text-transform:uppercase;margin-bottom:4px;">${opts.title||''}</div>
        ${opts.body||''}
        ${chart}
        ${actions?`<div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:8px;padding-top:6px;border-top:1px solid ${a}22;">${actions}</div>`:''}
      </div>
      ${opts.closeBtn!==false?`<button onclick="JarvisMaps.Shared._close('${opts.mapId}')" style="position:absolute;top:4px;right:6px;background:transparent;border:none;color:${a}66;cursor:pointer;font-size:11px;">✕</button>`:''}
    </div>`;
  },

  _action(mapId, markerId, key) {
    const mL = JarvisMaps.Leaflet._m[mapId];
    if(mL) mL.ref.invokeMethodAsync('OnInfoActionClickJs', markerId, key);
    const mG = JarvisMaps.Google._m[mapId];
    if(mG) mG.ref?.invokeMethodAsync('OnInfoActionClickJs', markerId, key);
  },

  _close(mapId) {
    const mL = JarvisMaps.Leaflet._m[mapId];
    if(mL) { mL.map.closePopup(); return; }
    const mG = JarvisMaps.Google._m[mapId];
    if(mG) Object.values(mG.iw).forEach(w=>w.close());
  }
};

// ================================================================
//  GOOGLE MAPS
// ================================================================
JarvisMaps.Google = {
  _m: {},  // mapId → {map, markers, iw, ref}

  init(mapId, opts, dotNetRef) {
    if(!window.google?.maps) return false;
    const el = document.getElementById(mapId);
    if(!el) return false;
    const map = new google.maps.Map(el, {
      zoom: opts.zoom||5, center: opts.center||{lat:20.59,lng:78.96},
      mapTypeId: opts.mapTypeId||'roadmap',
      styles: opts.styles ? JSON.parse(opts.styles) : [],
      disableDefaultUI: true, gestureHandling:'greedy',
      backgroundColor:'#020d18', mapId: opts.mapId||undefined,
    });
    map.addListener('click', e => {
      dotNetRef.invokeMethodAsync('OnMapClickJs', e.latLng.lat(), e.latLng.lng());
    });
    JarvisMaps.Google._m[mapId] = {map, markers:{}, iw:{}, ref:dotNetRef};
    return true;
  },

  panTo:      (id,lat,lng) => { const m=JarvisMaps.Google._m[id]; if(m) m.map.panTo({lat,lng}); },
  setZoom:    (id,z)       => { const m=JarvisMaps.Google._m[id]; if(m) m.map.setZoom(z); },
  zoomIn:     (id)         => { const m=JarvisMaps.Google._m[id]; if(m) m.map.setZoom(m.map.getZoom()+1); },
  zoomOut:    (id)         => { const m=JarvisMaps.Google._m[id]; if(m) m.map.setZoom(m.map.getZoom()-1); },
  setStyle:   (id,sj)      => { const m=JarvisMaps.Google._m[id]; if(m) m.map.setOptions({styles:JSON.parse(sj)}); },
  setMapType: (id,t)       => { const m=JarvisMaps.Google._m[id]; if(m) m.map.setMapTypeId(t); },

  addMarker(mapId, mk) {
    const m = JarvisMaps.Google._m[mapId]; if(!m) return;
    const accent = JarvisMaps.getCssVar('--j-accent');
    const color  = mk.color || accent;
    const svg    = JarvisMaps.Shared.buildMarkerSvg(mk.style, color, mk.pulse);
    const gm = new google.maps.Marker({
      position: {lat:mk.lat, lng:mk.lng}, map: m.map, title: mk.title||'',
      icon: { url:'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svg),
              anchor: new google.maps.Point(16,16) },
      animation: mk.animated ? google.maps.Animation.DROP : null,
    });
    gm.addListener('click', () => {
      m.ref.invokeMethodAsync('OnMarkerClickJs', mk.id, mk.lat, mk.lng);
    });
    m.markers[mk.id] = gm;
  },

  removeMarker(mapId, id) {
    const m=JarvisMaps.Google._m[mapId]; if(!m?.markers[id]) return;
    m.markers[id].setMap(null); delete m.markers[id];
  },

  clearMarkers(mapId) {
    const m=JarvisMaps.Google._m[mapId]; if(!m) return;
    Object.values(m.markers).forEach(mk=>mk.setMap(null)); m.markers={};
  },

  openInfoWindow(mapId, markerId, opts) {
    const m=JarvisMaps.Google._m[mapId]; if(!m) return;
    Object.values(m.iw).forEach(w=>w.close());
    const iw = new google.maps.InfoWindow({
      content: JarvisMaps.Shared.buildInfoHtml({...opts, mapId, markerId}),
      disableAutoPan: false,
    });
    const target = m.markers[markerId];
    if(target) iw.open({anchor:target, map:m.map});
    m.iw[markerId] = iw;
  },

  closeInfoWindows(mapId) {
    const m=JarvisMaps.Google._m[mapId]; if(!m) return;
    Object.values(m.iw).forEach(w=>w.close());
  },

  fitBounds(mapId, markers) {
    const m=JarvisMaps.Google._m[mapId]; if(!m||!markers.length) return;
    const b = new google.maps.LatLngBounds();
    markers.forEach(mk=>b.extend({lat:mk.lat,lng:mk.lng}));
    m.map.fitBounds(b);
  },

  destroy(mapId) {
    JarvisMaps.Google.clearMarkers(mapId);
    delete JarvisMaps.Google._m[mapId];
  }
};

// ================================================================
//  LEAFLET MAPS
// ================================================================
JarvisMaps.Leaflet = {
  _m: {},

  _tiles: {
    Dark:         'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    DarkNoLabels: 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
    Satellite:    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    Terrain:      'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    OpenStreetMap:'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },

  init(mapId, opts, dotNetRef) {
    if(!window.L) return false;
    const el = document.getElementById(mapId);
    if(!el || el._leaflet_id) return false;
    const map = L.map(el, {
      center: opts.center||[20.59,78.96], zoom: opts.zoom||5,
      zoomControl:false, attributionControl:false,
    });
    const tileUrl = opts.customTileUrl || JarvisMaps.Leaflet._tiles[opts.tileLayer||'Dark'];
    L.tileLayer(tileUrl, {maxZoom:19}).addTo(map);
    map.on('click', e => dotNetRef.invokeMethodAsync('OnMapClickJs', e.latlng.lat, e.latlng.lng));
    JarvisMaps.Leaflet._m[mapId] = {map, ref:dotNetRef, markers:{}, geo:{}, tileLayer:null};
    return true;
  },

  panTo:     (id,lat,lng,z) => { const m=JarvisMaps.Leaflet._m[id]; if(m){ if(z!==undefined) m.map.setView([lat,lng],z); else m.map.panTo([lat,lng]); }},
  setZoom:   (id,z) => { const m=JarvisMaps.Leaflet._m[id]; if(m) m.map.setZoom(z); },
  zoomIn:    (id)   => { const m=JarvisMaps.Leaflet._m[id]; if(m) m.map.zoomIn(); },
  zoomOut:   (id)   => { const m=JarvisMaps.Leaflet._m[id]; if(m) m.map.zoomOut(); },

  changeTileLayer(mapId, tileLayer, customUrl) {
    const m=JarvisMaps.Leaflet._m[mapId]; if(!m) return;
    if(m.tileLayer) m.map.removeLayer(m.tileLayer);
    const url = customUrl || JarvisMaps.Leaflet._tiles[tileLayer||'Dark'];
    m.tileLayer = L.tileLayer(url, {maxZoom:19}).addTo(m.map);
  },

  addMarker(mapId, mk) {
    const m=JarvisMaps.Leaflet._m[mapId]; if(!m) return;
    const accent = JarvisMaps.getCssVar('--j-accent');
    const color  = mk.color||accent;
    const svg    = JarvisMaps.Shared.buildMarkerSvg(mk.style, color, mk.pulse);
    const pulseHtml = mk.pulse ? `<div class="j-pulse-ring" style="border-color:${color};"></div>` : '';
    const icon = L.divIcon({
      html: svg + pulseHtml,
      className: 'j-leaflet-marker' + (mk.animated?' j-marker-drop':''),
      iconSize:[32,32], iconAnchor:[16,16],
    });
    const lm = L.marker([mk.lat,mk.lng],{icon}).addTo(m.map);
    lm.on('click', ()=>m.ref.invokeMethodAsync('OnMarkerClickJs', mk.id, mk.lat, mk.lng));
    if(mk.title) lm.bindTooltip(`<div class="j-map-tooltip">${mk.title}</div>`,
      {permanent:false,className:'j-leaflet-tooltip',direction:'top'});
    m.markers[mk.id] = lm;
  },

  removeMarker(mapId, id) {
    const m=JarvisMaps.Leaflet._m[mapId]; if(!m?.markers[id]) return;
    m.map.removeLayer(m.markers[id]); delete m.markers[id];
  },

  clearMarkers(mapId) {
    const m=JarvisMaps.Leaflet._m[mapId]; if(!m) return;
    Object.values(m.markers).forEach(mk=>m.map.removeLayer(mk)); m.markers={};
  },

  openPopup(mapId, markerId, opts) {
    const m=JarvisMaps.Leaflet._m[mapId]; if(!m?.markers[markerId]) return;
    m.markers[markerId]
      .bindPopup(JarvisMaps.Shared.buildInfoHtml({...opts, mapId, markerId}),
        {maxWidth:340, className:'j-leaflet-popup', closeButton:false})
      .openPopup();
  },

  closePopups(mapId) {
    const m=JarvisMaps.Leaflet._m[mapId]; if(m) m.map.closePopup();
  },

  loadGeoJson(mapId, layerId, geoData, layerOpts, dotNetRef) {
    const m=JarvisMaps.Leaflet._m[mapId]; if(!m) return;
    if(m.geo[layerId]) m.map.removeLayer(m.geo[layerId]);
    const accent = JarvisMaps.getCssVar('--j-accent');
    const fill   = JarvisMaps.Shared.resolveColor(layerOpts.fillColor||'rgba(0,229,255,0.15)');
    const border = JarvisMaps.Shared.resolveColor(layerOpts.borderColor||accent);
    const data   = typeof geoData==='string' ? JSON.parse(geoData) : geoData;

    const layer = L.geoJSON(data, {
      style: () => ({
        fillColor: fill, fillOpacity: layerOpts.fillOpacity||0.25,
        color: border, weight: layerOpts.borderWeight||1.5, opacity:.85,
      }),
      onEachFeature: (feature, lyr) => {
        const nameProp = layerOpts.nameProperty||'NAME_1';
        const name = feature.properties?.[nameProp]
          || feature.properties?.name || feature.properties?.DISTRICT
          || feature.properties?.TEHSIL || 'Unknown';

        if(layerOpts.showTooltip)
          lyr.bindTooltip(`<div class="j-map-tooltip">${name}</div>`,
            {sticky:true,className:'j-leaflet-tooltip',direction:'top'});

        if(layerOpts.clickable)
          lyr.on('click', e => {
            L.DomEvent.stopPropagation(e);
            const props={};
            if(feature.properties) Object.assign(props, feature.properties);
            dotNetRef.invokeMethodAsync('OnGeoFeatureClickJs', name,
              feature.properties?.id||feature.id||'', JSON.stringify(props));
          });

        lyr.on('mouseover', ()=> lyr.setStyle({fillColor:accent,fillOpacity:.45,weight:2.5,color:accent}));
        lyr.on('mouseout',  ()=> layer.resetStyle(lyr));
      }
    }).addTo(m.map);

    m.geo[layerId] = layer;
    if(layerOpts.fitBounds && layer.getBounds().isValid())
      m.map.fitBounds(layer.getBounds(), {padding:[20,20]});
  },

  removeGeoLayer(mapId, layerId) {
    const m=JarvisMaps.Leaflet._m[mapId]; if(!m?.geo[layerId]) return;
    m.map.removeLayer(m.geo[layerId]); delete m.geo[layerId];
  },

  clearGeoLayers(mapId) {
    const m=JarvisMaps.Leaflet._m[mapId]; if(!m) return;
    Object.values(m.geo).forEach(l=>m.map.removeLayer(l)); m.geo={};
  },

  highlightFeature(mapId, layerId, name, nameProp) {
    const m=JarvisMaps.Leaflet._m[mapId]; const l=m?.geo[layerId]; if(!l) return;
    const accent=JarvisMaps.getCssVar('--j-accent');
    l.eachLayer(ly => {
      if(ly.feature?.properties?.[nameProp||'NAME_1']===name){
        ly.setStyle({fillColor:accent,fillOpacity:.5,color:accent,weight:3});
        ly.bringToFront();
      }
    });
  },

  fitBounds(mapId, sw, ne) {
    const m=JarvisMaps.Leaflet._m[mapId];
    if(m) m.map.fitBounds([[sw.lat,sw.lng],[ne.lat,ne.lng]]);
  },

  destroy(mapId) {
    const m=JarvisMaps.Leaflet._m[mapId]; if(!m) return;
    m.map.remove(); delete JarvisMaps.Leaflet._m[mapId];
  }
};
