import React from 'react';
import { Form, Field } from 'react-final-form';
import { Form as SemanticForm } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import {
  SimpleInput,
  SelectField,
  DateTimePicker,
  populateMenuItems,
} from 'components/elements/inputs';
// import { EntityDescriptions } from 'redux/reducers/entity';

function MeetingForm(ownProps) {
  // const { modalState } = ownProps;

  const { t } = useTranslation();

  const { entities, meeting } = useSelector((state) => state);

  const rawMenuItems = []
    .concat(...entities.account.content, ...entities.team.content)
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  const attendeeOptions = populateMenuItems(rawMenuItems);

  console.log('attendeeOptions', attendeeOptions);

  const roomOptions = populateMenuItems(
    entities.room.content.sort((a, b) => (a.name > b.name ? 1 : -1)),
  );

  const AccountsAndTeams = [].concat(...entities.account.content, ...entities.team.content);

  const validateFormFields = (fields) => {
    const { name, time, room } = fields;

    /**
     * @type {String[]}
     */
    const attendees = fields.attendees;

    /**
     * @type {Array}
     */
    const meetings = meeting.content;

    // meetings zur gleichen start-zeit
    const thisTime = moment(time);
    const meetingsAtThisTime = meetings.filter((item) => thisTime.isSame(item.time, 'hours'));
    const attendeesAtThisTime = meetingsAtThisTime.map((item) => item.attendees).flat(2);

    console.log('meetingsAtThisTime', meetingsAtThisTime);
    console.log('attendeesAtThisTime', attendeesAtThisTime);
    console.log('attendees', attendees);

    const error = {};
    const saveButton = document.getElementById('save-button');

    if (name) {
      saveButton.removeAttribute('disabled');

      if (!name) {
        error.name = 'Meeting-Thema ist zwigend!';
        saveButton.setAttribute('disabled', true);
        saveButton.setAttribute('z-index', -1);
      }
    }

    // meeting room occupied
    if (room && !!meetingsAtThisTime.length) {
      const roomAtThisTime = entities.room.content.filter((thisRoom) => {
        const roomResult = meetingsAtThisTime.find((meeting) => meeting.room === room);

        return undefined !== roomResult && thisRoom.identifier === roomResult.room;
      });

      saveButton.removeAttribute('disabled');

      if (!!roomAtThisTime.length) {
        error.room = `Raum "${roomAtThisTime[0].name}" ist schon belegt`;
        saveButton.setAttribute('disabled', true);
        saveButton.setAttribute('z-index', -1);
      }
    }

    // attendee occupied either directly or indirectly by group
    if (attendees && !!meetingsAtThisTime.length) {
      const directlyOccupied = meetingsAtThisTime.filter(
        (meeting) => !!meeting.attendees.filter((att) => attendees.includes(att)).length,
      );

      const indirectlyOccupied = meetingsAtThisTime.filter((meeting) => {
        const selectedAccountIdentifiers = attendees.filter((identifier) =>
          /a\d*/.test(identifier),
        );
        /**
         * @type {Array}
         */
        const selectedAccounts = entities.account.content
          .filter((account) => selectedAccountIdentifiers.includes(account.identifier))
          .map((account) => ({ ...account, teams: account.teams.map((num) => `t${num}`) }));
        console.log('%c selectedAccounts', 'color: #ffcc00', selectedAccounts);
      });

      const selectedTeams = attendees.filter((identifier) => /t\d*/.test(identifier));
      const hasTeamsSelected = !!selectedTeams.length;

      console.log('%c isTeam', 'color: #1d3f73', hasTeamsSelected);

      saveButton.removeAttribute('disabled');

      if (!!directlyOccupied.length) {
        const name = AccountsAndTeams.filter(
          (item) => item.identifier === attendees[attendees.length - 1],
        )
          .map((item) => item.name)
          .join(', ');

        error.attendees = `${name} hat keine Zeit`;
        saveButton.setAttribute('disabled', true);
        saveButton.setAttribute('z-index', -1);
      }
    }

    return error;
  };

  return (
    <Form
      onSubmit={ownProps.handleSubmit}
      initialValues={ownProps.initialValues}
      validate={validateFormFields}
    >
      {({ handleSubmit }) => (
        <SemanticForm onSubmit={handleSubmit} id="MeetingForm">
          <Field
            name="name"
            label={t('form-entities:meeting.form.topic.label')}
            placeholder={t('form-entities:meeting.form.topic.placeholder')}
            component={SimpleInput}
            required
          />
          <Field
            name="time"
            label={t('form-entities:meeting.form.time.label')}
            component={DateTimePicker}
            required
          />
          <Field
            name="room"
            label={t('form-entities:meeting.form.room.label')}
            placeholder={t('form-entities:meeting.form.room.placeholder')}
            component={SelectField}
            options={roomOptions}
            search
          />
          <Field
            name="attendees"
            label={t('form-entities:meeting.form.attendees.label')}
            placeholder={t('form-entities:meeting.form.attendees.placeholder')}
            component={SelectField}
            options={attendeeOptions}
            multiSelect
            search
          />
        </SemanticForm>
      )}
    </Form>
  );
}

export default MeetingForm;
