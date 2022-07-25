import React from 'react';
import PageTitle from '../../components/PageTitle';
import HashbookConfig from './HashbookConfig'
class Hashbook extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Hashbooks', active: true },
                    ]}
                    title={'Hashbooks'}
                />
                <HashbookConfig/>
            </>
        )
    }
}

export default Hashbook