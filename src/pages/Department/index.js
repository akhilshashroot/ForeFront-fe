import React from 'react';
import PageTitle from '../../components/PageTitle';
import DepartmentsConfig from './DepartmentConfig'
class Departments extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Departments', active: true },
                    ]}
                    title={'Departments'}
                />
                <DepartmentsConfig/>
            </>
        )
    }
}

export default Departments