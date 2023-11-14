import React, { useState } from 'react';

const InboxSidebar = ({ onSelectView }) => {
    const [activeView, setActiveView] = useState('Primary');

    const handleViewClick = (view, query, dataView, dataQuery) => {
        setActiveView(view);
        onSelectView(view, query, dataView, dataQuery);
      };

    const views = [
        { label: 'Primary', query: '((in:^i ((in:^smartlabel_personal) OR (in:^t))) OR (in:^i -in:^smartlabel_social -in:^smartlabel_promo))', view: 'itemlist-ViewType(SECTIONED_INBOX_PRIMARY_WITH_SECTION_TEASERS)-9' },
        { label: 'Social', query: 'in:^i in:^smartlabel_social', view: 'itemlist-ViewType(SECTIONED_INBOX_SOCIAL)-7' },
        { label: 'Promotion', query: 'in:^i in:^smartlabel_promo', view: 'itemlist-ViewType(SECTIONED_INBOX_PROMOS)-11' },
        { label: 'Starred', query: 'in:^t', view: 'itemlist-ViewType(STARRED)-13' },
        { label: 'Snoozed', query: 'in:^t_z -in:^i ((in:^t_recx) OR (-in:^t_rec))', view: 'itemlist-ViewType(SNOOZED)-15' },
        { label: 'Important', query: 'in:^io_im', view: 'itemlist-ViewType(IMPORTANT)-27' },
        { label: 'Sent', query: '((in:^f) OR (in:^pfg) OR (in:^f_clns))', view: 'itemlist-ViewType(SENT)-33' },
        { label: 'Scheduled', query: 'in:^scheduled', view: 'itemlist-ViewType(SCHEDULED_SEND)-35' },
        { label: 'Drafts', query: 'in:^r -in:^f_clns -in:^cr', view: 'itemlist-ViewType(DRAFTS)-37' },
        { label: 'All mail', query: 'in:^all', view: 'itemlist-ViewType(ALL_MAIL)-39' },
        { label: 'Spam', query: 'in:^s', view: 'itemlist-ViewType(SPAM)-41' },
        { label: 'Trash', query: 'in:^k', view: 'itemlist-ViewType(TRASH)-43' },
    ];

    return (
        <div className="inbox-sidebar">
            <ul className="nav-items">
            {views.map(({ label, query, view }) => (
          <li key={label} className={`nav-item ${activeView === label ? 'active' : ''}`}>
            <button
            className='nav-btn'
              type="button"
              onClick={() => handleViewClick(label, query, view, query)} 
              data-query={query}
              data-view={view}
            >
              {label}
            </button>
          </li>
        ))}
            </ul>
        </div>
    )
}

export default InboxSidebar