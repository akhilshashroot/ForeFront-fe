import React from 'react';
import PageTitle from '../../../components/PageTitle';
import NotificationConfig from './NotificationConfig'
class Notification extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Notification', active: true },
                    ]}
                    title={'Notification'}
                />
                <NotificationConfig/>
            </>
        )
    }
}

export default Notification