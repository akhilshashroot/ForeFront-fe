import React from 'react';
import PageTitle from '../../components/PageTitle';
import InterviewConfig from './InterviewConfig'
class Interview extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Interviews', active: true },
                    ]}
                    title={'Interviews'}
                />
                <InterviewConfig/>
            </>
        )
    }
}

export default Interview