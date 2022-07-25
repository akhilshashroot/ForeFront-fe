import React from 'react';
import PageTitle from '../../components/PageTitle';
import LeaverequestConfig from './LeaverequestConfig'
class Leaverequest extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Leave Requests', active: true },
                    ]}
                    title={'Leave Requests'}
                />
                <LeaverequestConfig/>
            </>
        )
    }
}

export default Leaverequest