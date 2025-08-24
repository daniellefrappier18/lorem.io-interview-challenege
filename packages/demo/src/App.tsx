import React, { useState } from 'react';
import { Header } from './components/header/Header';
import { Grid } from './components/grid/Grid';
import { Button, Input, Label, RadioButton, VisuallyHidden } from 'ui';
import { Card } from './components/card/Card';
import loremLogo from './assets/lorem-logo.svg';
import './App.css';

export default function App() {
  const [selectedRadioButtonValue, setSelectedRadioButtonValue] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form submitted');
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="App">
      <Header logo={<img src={loremLogo} alt="Lorem Logo" />} />
      <main>
        <Grid columns={2}>
          <section aria-labelledby="contact-sales-heading">
            <header>
              <a href="#" className="contact-link">
                Contact sales
              </a>
              <h1 id="contact-sales-heading">Elevate your nebulous digital life</h1>
            </header>

            <p>
              Fill out this form to connect with a lorem.io specialist. We'll reach out within 1
              business day to help you embrace the power of the undefined. In your first
              conversation you'll receive:
            </p>

            <ul>
              <li>
                Placeholder strategies perfectly matched to your unique use case for lorem, ipsum,
                dolor, and sit amet.
              </li>
              <li>A feasibility check to see just how vague your project can be.</li>
              <li>A high-level overview of timelines that may or may not ever solidify.</li>
              <li>
                Guidance on keeping your work delightfully undefined, compliant, and full of
                ellipses…
              </li>
            </ul>
            <Card>
              <article className="card">
                <h2>Free trial—no clarity required</h2>
                <p>
                  Jump in with a free trial to explore lorem.io's suite of placeholder solutions.
                  Generate gibberish, fuzz your deadlines, and blur the lines between real and
                  filler.
                </p>
                <Button variant="secondary"> Start being vague today</Button>
              </article>
            </Card>
          </section>

          <aside>
            <Card>
              <form
                onSubmit={handleSubmit}
                id="contact-sales-form"
                aria-labelledby="contact-sales-form-label"
                noValidate
              >
                <VisuallyHidden id="contact-sales-form-label">Contact sales form</VisuallyHidden>

                <fieldset>
                  <VisuallyHidden id="personal-info-label">Personal Information</VisuallyHidden>
                  <Grid columns={2}>
                    <Input type="text" label="First name" name="firstName" placeholder="" />
                    <Input type="text" label="Last name" name="lastName" placeholder="" />
                  </Grid>
                </fieldset>

                <fieldset>
                  <VisuallyHidden id="account-credentials-label">
                    Account Credentials
                  </VisuallyHidden>
                  <Grid columns={2}>
                    <Input type="password" label="Password" name="password" placeholder="" />
                    <Input type="email" label="Email address" name="email" placeholder="" />
                  </Grid>
                </fieldset>

                <fieldset>
                  <VisuallyHidden id="additional-info-label">Additional Information</VisuallyHidden>
                  <Grid>
                    <Input
                      type="text"
                      label="Favorite video game (describe)"
                      name="favoriteVideoGame"
                      placeholder=""
                    />
                  </Grid>
                </fieldset>

                <fieldset>
                  <VisuallyHidden id="favorite-tech-company-label">
                    Favorite Tech Company
                  </VisuallyHidden>
                  <Grid>
                    <div
                      className="radio-group"
                      role="radiogroup"
                      aria-labelledby="favorite-tech-company-label"
                    >
                      <Label id="favorite-company-label">
                        Which is your favorite tech company?
                      </Label>
                      <RadioButton
                        variant="card"
                        label="Aperture Science"
                        name="favoriteVideoGameSelect"
                        value="aperture-science"
                        checked={selectedRadioButtonValue === 'aperture-science'}
                        onChange={(e) => setSelectedRadioButtonValue(e.target.value)}
                      />
                      <RadioButton
                        variant="card"
                        label="Stark Industries"
                        name="favoriteVideoGameSelect"
                        value="stark-industries"
                        checked={selectedRadioButtonValue === 'stark-industries'}
                        onChange={(e) => setSelectedRadioButtonValue(e.target.value)}
                      />
                      <RadioButton
                        variant="card"
                        label="Weyland-Yutani Corporation"
                        name="favoriteVideoGameSelect"
                        value="wyland-yutani-corporation"
                        checked={selectedRadioButtonValue === 'wyland-yutani-corporation'}
                        onChange={(e) => setSelectedRadioButtonValue(e.target.value)}
                      />
                      <RadioButton
                        variant="card"
                        label="All of the above"
                        name="favoriteVideoGameSelect"
                        value="all-of-the-above"
                        checked={selectedRadioButtonValue === 'all-of-the-above'}
                        onChange={(e) => setSelectedRadioButtonValue(e.target.value)}
                      />
                    </div>
                  </Grid>
                </fieldset>
                <Grid>
                  <Button
                    type="submit"
                    variant="primary"
                    isFullWidth
                    disabled={isSubmitting}
                    aria-describedby="submit-help"
                  >
                    {isSubmitting ? 'Submitting...' : 'Contact sales'}
                  </Button>
                  <VisuallyHidden id="submit-help">
                    {isSubmitting
                      ? 'Form is being submitted, please wai'
                      : 'Submit the contact form to reach our sales team'}
                  </VisuallyHidden>
                </Grid>
              </form>
            </Card>
          </aside>
        </Grid>
      </main>
    </div>
  );
}
