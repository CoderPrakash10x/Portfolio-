/** Illustrative UI sketches drawn in CSS. Placeholders until real screenshots are added. */
const Bars = ({ n = 4 }) => Array.from({ length: n }, (_, i) => <i key={i} style={{ width: `${88 - i * 14}%` }} />)

export function Browser({ kind, title }) {
  return (
    <div className="browser" role="img" aria-label={`Illustrative ${title} interface (placeholder)`}>
      <div className="browser__bar"><i /><i /><i /><span>{title} · illustrative</span></div>
      <div className={`browser__body mock mock--${kind}`}>
        {kind === 'terminal' && (<>
          <b className="m-big">LEVEL 04 / 10</b>
          <div className="m-cells">{Array.from({ length: 10 }, (_, i) => <i key={i} className={i < 4 ? 'on' : ''} />)}</div>
          <code>▓▒░ decrypt the sequence ░▒▓</code>
          <div className="m-lines"><Bars n={4} /></div>
        </>)}
        {kind === 'game' && (<>
          <b className="m-big">ROUND</b>
          <div className="m-teams">{[1, 2, 3, 4].map((n) => <div key={n}><span>Team {n}</span><i /></div>)}</div>
        </>)}
        {kind === 'dash' && (<>
          <div className="m-stats"><i /><i /><i /></div>
          <div className="m-table">{Array.from({ length: 5 }, (_, i) => <div key={i}><i /><i /><i /></div>)}</div>
        </>)}
        {kind === 'site' && (<>
          <b className="m-big">EVOLVERA</b>
          <div className="m-cards"><i /><i /><i /></div>
        </>)}
      </div>
    </div>
  )
}

export function Phone({ kind }) {
  return (
    <div className="phone" role="img" aria-label="Illustrative mobile view (placeholder)">
      <div className="phone__notch" />
      <div className={`phone__body mock mock--${kind}`}>
        <b>{kind === 'game' ? 'Your team' : kind === 'terminal' ? 'Level 04' : kind === 'dash' ? 'Overview' : 'Events'}</b>
        <div className="m-lines"><Bars n={3} /></div>
        <span className="m-btn" />
      </div>
    </div>
  )
}
