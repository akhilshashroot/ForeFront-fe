import React from 'react';
import PageTitle from '../../components/PageTitle';
import InformationConfig from './InformationConfig';
class Instructions extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Instructions', active: true },
                    ]}
                    title={'Instructions'}
                />
                <InformationConfig/>
            </>
        )
    }
}

export default Instructions