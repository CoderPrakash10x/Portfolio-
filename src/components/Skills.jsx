import { skills } from '../content'

export default function Skills() {
  return (
    <section className="scene skills" id="skills" tabIndex={-1} data-say="skills" data-tone="dark" data-thread="r" data-at="0.25">
      <h2 className="huge">What I<br />work with.</h2>
      <div className="skills__grid">
        {skills.map((g) => (
          <div key={g.group}>
            <h3 className="mono">{g.group}</h3>
            <ul>{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  )
}
