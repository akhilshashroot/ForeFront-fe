import React from 'react';
import PageTitle from '../../components/PageTitle';
import EmployeesConfig from './EmployeeConfig'
class Employees extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Employees', active: true },
                    ]}
                    title={'Employees'}
                />
                <EmployeesConfig/>
            </>
        )
    }
}

export default Employees