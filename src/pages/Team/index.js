import React from 'react';
import PageTitle from '../../components/PageTitle';
import TeamsConfig from './TeamConfig'
class Teams extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Teams' , active:true},
                    ]}
                    title={'Teams'}
                />
                <TeamsConfig/>
            </>
        )
    }
}

export default Teams