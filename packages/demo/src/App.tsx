import React from 'react';
import { Header } from './components/header/Header';
import { Button } from 'ui';
import { Card } from './components/Card';
import loremLogo from './assets/lorem-logo.svg';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Header logo={<img src={loremLogo} alt="Lorem Logo" />} />

      <Card title="Button Examples with CSS Modules" highlighted>
        <p>Here are some buttons from our UI library using CSS modules:</p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '16px' }}>
          <Button>Default Button</Button>
          <Button>Another Button</Button>
          <Button>CSS Modules Button</Button>
        </div>
      </Card>

      <Card title="CSS Modules Benefits">
        <ul>
          <li>Scoped CSS classes prevent naming conflicts</li>
          <li>Better maintainability in large projects</li>
          <li>TypeScript support for class names</li>
          <li>Build-time optimization</li>
          <li>Automatic vendor prefixing</li>
          <li>Dead code elimination for unused styles</li>
        </ul>
      </Card>

      <Card title="CSS Modules Benefits">
        <ul>
          <li>Scoped CSS classes prevent naming conflicts</li>
          <li>Better maintainability in large projects</li>
          <li>TypeScript support for class names</li>
          <li>Build-time optimization</li>
          <li>Automatic vendor prefixing</li>
          <li>Dead code elimination for unused styles</li>
        </ul>
      </Card>
      <Card title="CSS Modules Benefits">
        <ul>
          <li>Scoped CSS classes prevent naming conflicts</li>
          <li>Better maintainability in large projects</li>
          <li>TypeScript support for class names</li>
          <li>Build-time optimization</li>
          <li>Automatic vendor prefixing</li>
          <li>Dead code elimination for unused styles</li>
        </ul>
      </Card>
      <Card title="CSS Modules Benefits">
        <ul>
          <li>Scoped CSS classes prevent naming conflicts</li>
          <li>Better maintainability in large projects</li>
          <li>TypeScript support for class names</li>
          <li>Build-time optimization</li>
          <li>Automatic vendor prefixing</li>
          <li>Dead code elimination for unused styles</li>
        </ul>
      </Card>
    </div>
  );
}
