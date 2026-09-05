import { useState } from 'react';
import { Button } from './components/Button.jsx';

function SparkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M12 2.5l1.8 5.2L19 9.5l-5.2 1.8L12 16.5l-1.8-5.2L5 9.5l5.2-1.8L12 2.5z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M5 12h12m-5-5 5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function App() {
  const [controls, setControls] = useState({
    clicked: false,
    disabled: false,
    focused: false,
    hovered: false,
    pressed: false,
  });

  const [liveState, setLiveState] = useState({
    clicked: false,
    disabled: false,
    focusVisible: false,
    focused: false,
    hovered: false,
    pressed: false,
  });

  const updateControl = (key) => {
    setControls((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">React Aria Interaction Button</p>
        <h1>Controlled button states with optional icons and tag</h1>
        <p className="intro">
          This button uses React Aria interaction hooks so we can read native hover, focus,
          press, and click behavior, while still overriding those states externally when we want
          to preview or force a specific UI state.
        </p>

        <div className="button-row">
          <Button
            leftIcon={<SparkIcon />}
            rightIcon={<ArrowIcon />}
            tag="New"
            isHovered={controls.hovered}
            isFocused={controls.focused}
            isPressed={controls.pressed}
            isClicked={controls.clicked}
            isDisabled={controls.disabled}
            onClick={() => {
              console.log('Button clicked');
            }}
            onStateChange={setLiveState}
          >
            Launch flow
          </Button>

          <Button isDisabled leftIcon={<SparkIcon />}>
            Disabled sample
          </Button>
        </div>

        <div className="panel-grid">
          <section className="control-panel">
            <h2>Force states</h2>
            <div className="toggle-list">
              {['hovered', 'focused', 'pressed', 'clicked', 'disabled'].map((key) => (
                <label key={key} className="toggle">
                  <input
                    type="checkbox"
                    checked={controls[key]}
                    onChange={() => updateControl(key)}
                  />
                  <span>{key}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="state-panel">
            <h2>Live state payload</h2>
            <pre>{JSON.stringify(liveState, null, 2)}</pre>
          </section>
        </div>
      </section>
    </main>
  );
}
