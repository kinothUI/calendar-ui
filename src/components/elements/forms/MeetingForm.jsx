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
import { EntityDescriptions } from 'redux/reducers/entity';

function MeetingForm(ownProps) {
  const { modalState } = ownProps;

  const { t } = useTranslation();

  const {
    entities: { account, team, room },
    meeting,
  } = useSelector((state) => state);

  const attendeeOptions = populateMenuItems(
    []
      .concat(
        ...account.content.map((acc) => ({
          ...acc,
          description: EntityDescriptions.ACCOUNT,
        })),
        ...team.content.map((team) => ({
          ...team,
          description: EntityDescriptions.TEAM,
        })),
      )
      .sort((a, b) => (a.name > b.name ? 1 : -1)),
  );

  const roomOptions = populateMenuItems(room.content.sort((a, b) => (a.name > b.name ? 1 : -1)));

  const validateFormFields = (fields) => {
    const { name, time, room, attendees } = fields;

    /**
     * @type {Array}
     */
    const content = meeting.content;

    // meetings zur gleichen start-zeit
    const thisTime = moment(time);
    const meetingsAtThisTime = content.filter((item) => thisTime.isSame(item.time, 'hours'));
    const attendeesAtThisTime = meetingsAtThisTime.map((item) => item.attendees).flat(2);
    console.log('attendeesAtThisTime', attendeesAtThisTime);
    // ist meeting zur gleichen zeit im gleichen raum? ja: error.room `${room} ist belegt`
    const error = {};
    const saveButton = document.getElementById('save-button');

    if (name) {
      saveButton.removeAttribute('disabled');

      if (!name) {
        error.name = 'Um was solls es gehen?';
        saveButton.setAttribute('disabled', true);
        saveButton.setAttribute('z-index', -1);
      }
    }

    if (room && !!meetingsAtThisTime.length) {
      const roomAtSameTime = meetingsAtThisTime.find((item) => item.room.id === room.id);
      saveButton.removeAttribute('disabled');

      if (!!roomAtSameTime) {
        error.room = `${roomAtSameTime.room.name} ist schon belegt`;
        saveButton.setAttribute('disabled', true);
        saveButton.setAttribute('z-index', -1);
      }
    }

    if (attendees && !!meetingsAtThisTime.length) {
      // User hat schon einen Termin zu der Zeit
      const attendeeAtThisTime = attendees.filter((selectedAttendee, index, self) => {
        // const directlyOccupied = attendeesAtThisTime.find(
        //   (attendee) => attendee.identifier === selectedAttendee.identifier,
        // );
        const directlyOccupied = attendeesAtThisTime.includes(selectedAttendee);
        const groupsAtThisTime = attendeesAtThisTime.filter(
          (item) => item.description === EntityDescriptions.TEAM,
        );
        console.log('groupsAtThisTime', groupsAtThisTime);
        const usersAtThisTime = attendeesAtThisTime.filter(
          (item) => item.description === EntityDescriptions.ACCOUNT,
        );
        console.log('usersAtThisTime', usersAtThisTime);
        const occupiedByGroup = usersAtThisTime.filter((user) =>
          groupsAtThisTime.find(
            (group) =>
              user.teams &&
              user.teams.find((teamId) => {
                console.log('teamId', teamId);
                console.log('group.id', group);
                return group.id === teamId;
              }),
          ),
        );

        console.log('directlyOccupied', directlyOccupied);
        console.log('occupiedByGroup', occupiedByGroup);

        return directlyOccupied || !!occupiedByGroup.length;
      });

      saveButton.removeAttribute('disabled');

      console.log('attendeeAtThisTime', attendeeAtThisTime);

      if (!!attendeeAtThisTime.length) {
        const name = attendeeAtThisTime.map((item) => item.name).join(', ');
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
