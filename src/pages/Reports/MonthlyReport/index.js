import React from 'react';
import PageTitle from '../../../components/PageTitle';
import MonthlyReportConfig from './MonthlyReportConfig'
class Monthlyreport extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Monthlyreport', active: true },
                    ]}
                    title={'Monthlyreport'}
                />
                <MonthlyReportConfig/>
            </>
        )
    }
}

export default Monthlyreport