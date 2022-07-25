import React from 'react';
import PageTitle from '../../components/PageTitle';
import ScoreConfig from './ScoreConfig'
class Score extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Scores', active: true },
                    ]}
                    title={'Scores'}
                />
                <ScoreConfig/>
            </>
        )
    }
}

export default Score