import React from 'react';
import { Segment, Grid, Icon, Button, Form } from 'semantic-ui-react';
// import { useTranslation } from 'react-i18next';
// import { languageOptions } from 'config/i18next';

const DefaultFooter = () => {
  const brandIcons = ['twitter', 'github'];
  // const { t, i18n } = useTranslation();
  // const language = i18n.language;
  // const options = languageOptions(t);

  return (
    <React.Fragment>
      <Segment inverted attached>
        <Grid container padded="vertically" stackable columns="equal">
          {/* <Form.Select
            options={options}
            defaultValue={language}
            onChange={(event, data) => i18n.changeLanguage(data)}
          /> */}
          <Grid.Row verticalAlign="middle">
            <span>Entwickelt von Maximilian Haindl</span>
          </Grid.Row>
          <Grid.Row>
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
          </Grid.Row>
        </Grid>
      </Segment>
    </React.Fragment>
  );
};

export default DefaultFooter;
