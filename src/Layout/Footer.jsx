import React from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';

import { LanguageDropdown } from 'components/elements/inputs';

const Footer = () => {
  const brandIcons = ['twitter', 'github'];

  return (
    <React.Fragment>
      <Segment inverted attached>
        <Grid container padded="vertically" stackable columns="equal">
          <Grid.Row verticalAlign="middle">
            <Grid.Column textAlign="left">
              <span>Entwickelt von Maximilian Haindl</span>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <LanguageDropdown />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="left">
              {brandIcons.map((name) => (
                <Button
                  key={name}
                  as="a"
                  href={`https://${name}.com/kinothUI`}
                  target="_blank"
                  icon
                  circular
                  color="olive"
                >
                  <Icon name={name} color="black" />
                </Button>
              ))}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </React.Fragment>
  );
};

export default Footer;
