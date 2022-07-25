import React from 'react';
import PageTitle from '../../components/PageTitle';
import AnnouncementConfig from './AnnouncementConfig'
class Announcement extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Announcements', active: true },
                    ]}
                    title={'Announcements'}
                />
                <AnnouncementConfig/>
            </>
        )
    }
}

export default Announcement