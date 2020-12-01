import React from 'react';
import { Sidebar } from 'semantic-ui-react';

const CalendarSidebar = (ownProps) => {
  const {
    visibility: { visible, setVisible },
  } = ownProps;

  return (
    <Sidebar.Pushable>
      <Sidebar
        animation="uncover"
        direction="right"
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width="wide"
      >
        {/* ... single items to show in sidebar */}

        <div
          style={{
            height: '100%',
            width: '100%',
            padding: '10px',
            background: 'white',
          }}
        >
          <div className="pre-main-content">
            <h3>Deine nächsten Meetings:</h3>
          </div>
        </div>
      </Sidebar>
      <Sidebar.Pusher dimmed={visible} content={ownProps.children} />
    </Sidebar.Pushable>
  );
};

export default CalendarSidebar;
