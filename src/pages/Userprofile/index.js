import React from 'react';
import PageTitle from '../../components/PageTitle';
import UserprofileDetails from './UserprofileDetails';
class UserProfile extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'User Profile', active: true },
                    ]}
                    title={'User Profile'}
                />
                <UserprofileDetails />
            </>
        )
    }
}

export default UserProfile