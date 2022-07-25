import React from 'react';
import PageTitle from '../../components/PageTitle';
import DesignationsConfig from './DesignationConfig'
class Designations extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Designations' ,active:true},
                    ]}
                    title={'Designations'}
                />
                <DesignationsConfig/>
            </>
        )
    }
}

export default Designations