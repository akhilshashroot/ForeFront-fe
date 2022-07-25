import React from 'react';
import PageTitle from '../../components/PageTitle';
import SettingsConfig from './SettingsConfig'
class Settings extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Settings', active: true },
                    ]}
                    title={'Settings'}
                />
                <SettingsConfig/>
            </>
        )
    }
}

export default Settings