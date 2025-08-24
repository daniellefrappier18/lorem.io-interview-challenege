import React from 'react';
import { Header } from './components/header/Header';
import { Button } from 'ui';
import { Card } from './components/card/Card';
import loremLogo from './assets/lorem-logo.svg';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Header logo={<img src={loremLogo} alt="Lorem Logo" />} />

      <div className="App__columns">
        <section aria-labelledby="contact-sales-heading">
          <header>
            <a href="#" className="contact-link">
              Contact sales
            </a>
            <h1 id="contact-sales-heading">Elevate your nebulous digital life</h1>
          </header>

          <p>
            Fill out this form to connect with a lorem.io specialist. We’ll reach out within 1
            business day to help you embrace the power of the undefined. In your first conversation
            you’ll receive:
          </p>

          <ul>
            <li>
              Placeholder strategies perfectly matched to your unique use case for lorem, ipsum,
              dolor, and sit amet.
            </li>
            <li>A feasibility check to see just how vague your project can be.</li>
            <li>A high-level overview of timelines that may or may not ever solidify.</li>
            <li>
              Guidance on keeping your work delightfully undefined, compliant, and full of ellipses…
            </li>
          </ul>
          <Card>
            <article class="card">
              <h2>Free trial—no clarity required</h2>
              <p>
                Jump in with a free trial to explore lorem.io’s suite of placeholder solutions.
                Generate gibberish, fuzz your deadlines, and blur the lines between real and filler.
              </p>
              <p>
                <a href="/signup" class="button">
                  Start being vague today
                </a>
              </p>
            </article>
          </Card>
        </section>

        <div>
          <Card>
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
      </div>
    </div>
  );
}
