import React from 'react';
import PageTitle from '../../components/PageTitle';
import RequestConfig from './RequestConfig'
class Requests extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Requests' ,active:true},
                    ]}
                    title={'Requests'}
                />
                <RequestConfig/>
            </>
        )
    }
}

export default Requests