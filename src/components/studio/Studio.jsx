import { useEffect, useRef, useState } from 'react';
import { FiArrowUpRight, FiArrowLeft, FiArrowRight, FiArrowUp, FiArrowDown, FiX, FiRotateCcw, FiMaximize2, FiMinimize2, FiSliders, FiNavigation, FiMousePointer, FiCheck, FiPlay } from 'react-icons/fi';
import About from '../About';
import Projects from '../Projects';
import Experience from '../Experience';
import Certificate from '../Certificate';
import TechArsenal from '../TechArsenal';
import TechmonGacha from '../TechmonGacha';
import Footer from '../Footer';
import { createRoom, stations } from './room';

const content = { about: About, projects: Projects, experience: Experience, certificates: Certificate, skills: TechArsenal, arcade: TechmonGacha, contact: Footer };
const tourNotes = {
  about: 'Meet the builder behind the work: software, data, and applied AI.',
  projects: 'Two screens, a world of ideas. Explore web apps, data projects, and machine learning.',
  experience: 'Follow my journey through engineering, data migration, and education.',
  certificates: 'A growing collection of courses, credentials, and things learned along the way.',
  skills: 'Explore the tools I use to build interfaces, data workflows, and machine learning projects.',
  arcade: 'Take a break. Discover and collect the Dev-Mon in my portfolio.',
  contact: 'Have an opportunity or an idea? Let’s talk about what we could build together.',
};

export default function Studio({ onClassic }) { // eslint-disable-line react/prop-types
  const host = useRef(null), root = useRef(null), engine = useRef(null);
  const dialog = useRef(null), closeButton = useRef(null);
  const [ready, setReady] = useState(false);
  const [exploring, setExploring] = useState(false);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(null);
  const [target, setTarget] = useState(null);
  const [position, setPosition] = useState({ x: -0.8, z: 3.9, yaw: 0 });
  const [visited, setVisited] = useState([]);
  const [tour, setTour] = useState(null);
  const [locked, setLocked] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [notice, setNotice] = useState('');
  const [quality, setQuality] = useState(() => window.matchMedia('(pointer: coarse)').matches ? 'lite' : 'high');
  useEffect(() => {
    engine.current = createRoom(host.current, {
      onReady: () => setReady(true), onError: () => setFailed(true),
      onSelect: setActive, onTarget: setTarget, onPosition: setPosition,
      onLockChange: setLocked, onNotice: setNotice,
    });
    return () => engine.current?.dispose();
  }, []);
  useEffect(() => { engine.current?.setQuality(quality); }, [quality]);
  useEffect(() => {
    const change = () => setFullscreen(document.fullscreenElement === root.current);
    document.addEventListener('fullscreenchange', change);
    return () => document.removeEventListener('fullscreenchange', change);
  }, []);
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(''), 6000);
    return () => window.clearTimeout(timer);
  }, [notice]);
  useEffect(() => {
    engine.current?.setPaused(Boolean(active) || failed);
    if (active) {
      setVisited(items => items.includes(active) ? items : [...items, active]);
      dialog.current.showModal();
      dialog.current.scrollTop = 0;
      closeButton.current?.focus();
    } else if (dialog.current.open) {
      dialog.current.close();
      engine.current?.focus();
    }
  }, [active, failed]);
  const Content = content[active];
  const targetStation = stations.find(item => item.id === target);
  const activeStation = stations.find(item => item.id === active);
  const tourStation = tour === null ? null : stations[tour];
  function travel(id) {
    if (engine.current?.travel(id)) {
      setExploring(true);
      setNotice(`Arrived at ${stations.find(station => station.id === id).object}. Click the object or press E to explore.`);
    }
  }
  function tourStep(index) {
    if (index >= stations.length) { setTour(null); setNotice('Tour complete. Make yourself at home and keep exploring.'); return; }
    setTour(index); travel(stations[index].id);
  }
  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (root.current.requestFullscreen) await root.current.requestFullscreen();
      else setNotice('Fullscreen is unavailable in this browser. The studio still works in this window.');
    } catch { setNotice('Fullscreen is unavailable here. You can keep exploring in this window.'); }
  }
  function reset() { setTour(null); engine.current?.reset(); }
  const hold = (event, key) => {
    event.preventDefault(); setExploring(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    engine.current?.keys.add(key);
  };
  const release = key => engine.current?.keys.delete(key);
  return (
    <main ref={root} className={`studio ${exploring ? 'is-exploring' : ''}`}>
      <div ref={host} className="studio-world" onFocus={() => setExploring(true)} />
      <div className="studio-vignette" />
      <header className="studio-header">
        <a className="studio-brand" href="#" onClick={event => { event.preventDefault(); reset(); }} aria-label="Bimo's studio, reset view">
          <span className="studio-monogram">BG</span>
          <span>Bimo Ghanis<small>INTERACTIVE PORTFOLIO</small></span>
        </a>
        <div className="studio-header-actions">
          <span className="studio-status"><i /> Open to opportunities</span>
          <button className="studio-classic" onClick={onClassic}>Classic portfolio <FiArrowUpRight /></button>
        </div>
      </header>
      {!exploring && <aside className="studio-intro">
        <span className="studio-eyebrow"><span /> MY SPACE, YOUR NEXT DISCOVERY</span>
        <h1>A little world.<br /><em>A lot to explore.</em></h1>
        <p>Step into my studio. Get to know the work,<br className="studio-desktop" /> the ideas, and the person behind the screen.</p>
        <div className="studio-intro-actions">
          <button className="studio-enter" onClick={() => engine.current?.focus()} disabled={!ready || failed}>Explore the studio <FiArrowUpRight /></button>
          <button className="studio-secondary" onClick={() => tourStep(0)} disabled={!ready || failed}><FiPlay /> Take a tour</button>
        </div>
        <span className="studio-hint"><span className="studio-desktop">WASD to walk · Drag to look · Click to discover</span><span className="studio-mobile">Drag to look · Arrow buttons to walk</span></span>
      </aside>}
      {exploring && !tourStation && <p className="studio-walk-hint">{locked ? 'Mouse to look · WASD to walk · E to interact · Esc to release' : 'WASD to walk · Drag to look · E to interact'}<span className="studio-mobile">Drag to look · Arrows to walk · Tap objects</span></p>}
      <aside className="studio-map" aria-label="Studio map and quick travel">
        <div className="studio-map-title"><span><FiNavigation /> THE STUDIO</span><span>01</span></div>
        <div className="studio-map-plan">
          <span className="studio-map-desk" /><span className="studio-map-sofa" /><span className="studio-map-shelf" />
          {stations.map((station, index) => <button key={station.id} className={`studio-map-dot ${visited.includes(station.id) ? 'is-visited' : ''}`} style={{ left: `${(station.position[0] + 6) / 12 * 100}%`, top: `${(station.position[2] + 5) / 10 * 100}%` }} aria-label={`Travel to ${station.label}`} title={`Travel to ${station.label}`} onClick={() => { setTour(null); travel(station.id); }}>{index + 1}</button>)}
          <span className="studio-map-player" style={{ left: `${(position.x + 6) / 12 * 100}%`, top: `${(position.z + 5) / 10 * 100}%`, transform: `translate(-50%, -50%) rotate(${-position.yaw}rad)` }} />
        </div>
        <p>Click a number to travel</p>
        <div className="studio-discovery"><span style={{ width: `${visited.length / stations.length * 100}%` }} /></div>
        <p>{visited.length === stations.length ? 'All spaces discovered ✦' : `${visited.length} / ${stations.length} spaces discovered`}</p>
      </aside>
      <div className={`studio-crosshair ${target ? 'is-active' : ''}`} aria-hidden="true" />
      {targetStation && !active && !tourStation && <button className="studio-target" onClick={() => setActive(target)}><span>{targetStation.object}</span><strong>{targetStation.label} <span className="studio-key">E</span></strong></button>}
      {tourStation && <aside className="studio-tour" aria-label="Guided studio tour">
        <div className="studio-tour-top"><span>STUDIO TOUR · {tour + 1} / {stations.length}</span><button aria-label="End tour" onClick={() => setTour(null)}><FiX /></button></div>
        <h2>{tourStation.object}</h2><p>{tourNotes[tourStation.id]}</p>
        <div className="studio-tour-actions"><button className="studio-secondary" onClick={() => setActive(tourStation.id)}>Open {tourStation.label} <FiArrowUpRight /></button><div><button className="studio-icon-button" aria-label="Previous stop" disabled={tour === 0} onClick={() => tourStep(tour - 1)}><FiArrowLeft /></button><button className="studio-icon-button" aria-label={tour === stations.length - 1 ? 'Finish tour' : 'Next stop'} onClick={() => tourStep(tour + 1)}>{tour === stations.length - 1 ? <FiCheck /> : <FiArrowRight />}</button></div></div>
      </aside>}
      <div className="studio-bottom">
        <div className="studio-bottom-meta"><span>SOFTWARE · DATA · APPLIED AI</span><span>Depok / Jakarta, Indonesia</span></div>
        <nav className="studio-dock" aria-label="Open portfolio sections">
          {stations.map((station, index) => <button key={station.id} onClick={() => setActive(station.id)}><span className={visited.includes(station.id) ? 'is-visited' : ''}>{visited.includes(station.id) ? <FiCheck /> : String(index + 1).padStart(2, '0')}</span>{station.label}</button>)}
        </nav>
        <div className="studio-tools">
          <button className="studio-icon-button" aria-label="Reset position" title="Reset position" onClick={reset}><FiRotateCcw /></button>
          <button className="studio-icon-button" aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} title="Fullscreen" onClick={toggleFullscreen}>{fullscreen ? <FiMinimize2 /> : <FiMaximize2 />}</button>
          <details className="studio-settings">
            <summary className="studio-icon-button" aria-label="Studio settings" title="Studio settings"><FiSliders /></summary>
            <div className="studio-settings-panel">
              <h2>Make yourself comfortable</h2>
              <label htmlFor="studio-quality">Graphics<select id="studio-quality" value={quality} onChange={event => setQuality(event.target.value)}><option value="high">Detailed · soft shadows</option><option value="lite">Lightweight · faster</option></select></label>
              <button className="studio-secondary studio-mouse-look" onClick={event => { event.currentTarget.closest('details').open = false; engine.current?.lockMouse(); }}><FiMousePointer /> {locked ? 'Release mouse' : 'Enable mouse look'}</button>
              <button className="studio-secondary" onClick={event => { event.currentTarget.closest('details').open = false; tourStep(0); }}><FiPlay /> Take the guided tour</button>
              <dl><div><dt>Walk</dt><dd>W A S D</dd></div><div><dt>Look</dt><dd>Drag / ← →</dd></div><div><dt>Move faster</dt><dd>Shift + walk</dd></div><div><dt>Open an object</dt><dd>Click / E</dd></div><div><dt>Quick travel</dt><dd>1–7 / minimap</dd></div><div><dt>Release mouse</dt><dd>Esc</dd></div></dl>
              <p>On a phone, drag to look around and hold the arrow buttons to move.</p>
            </div>
          </details>
        </div>
      </div>
      <div className="studio-touch" aria-label="Movement controls">
        {[['ArrowLeft', FiArrowLeft, 'Turn left'], ['KeyW', FiArrowUp, 'Walk forward'], ['ArrowRight', FiArrowRight, 'Turn right'], ['KeyA', FiArrowLeft, 'Step left'], ['KeyS', FiArrowDown, 'Walk backward'], ['KeyD', FiArrowRight, 'Step right']].map(([key, Icon, label]) => <button key={key} aria-label={label} onPointerDown={event => hold(event, key)} onPointerUp={() => release(key)} onPointerCancel={() => release(key)} onLostPointerCapture={() => release(key)}><Icon /></button>)}
      </div>
      {notice && <div className="studio-notice" role="status">{notice}</div>}
      {(!ready || failed) && <div className="studio-loading" role="status"><span className="studio-monogram">BG</span><h2>{failed ? 'Your portfolio is still right here.' : 'Opening the studio…'}</h2><p>{failed ? '3D is unavailable on this browser. Explore all my work in the classic portfolio.' : 'Getting the space ready for you.'}</p><button className="studio-enter" onClick={onClassic}>Open classic portfolio <FiArrowUpRight /></button></div>}
      <dialog ref={dialog} className="studio-dialog" aria-label={activeStation?.label || 'Portfolio details'} onCancel={event => { event.preventDefault(); setActive(null); }} onClose={() => setActive(null)} onClick={event => { if (event.target === dialog.current) setActive(null); }}>
        <div className="studio-dialog-inner">
          <div className="studio-dialog-bar"><span>{activeStation?.object} <b>/ {activeStation?.label}</b></span><button ref={closeButton} aria-label="Close and return to studio" onClick={() => setActive(null)}><FiX /></button></div>
          {Content && <Content />}
          <button className="studio-return" onClick={() => setActive(null)}><FiArrowLeft /> Back to the studio</button>
        </div>
      </dialog>
    </main>
  );
}
