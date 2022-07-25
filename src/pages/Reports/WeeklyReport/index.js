import React from 'react';
import PageTitle from '../../../components/PageTitle';
import WeeklyReportConfig from './WeeklyReportConfig'
class Weeklyreport extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Weeklyreport', active: true },
                    ]}
                    title={'Weeklyreport'}
                />
                <WeeklyReportConfig/>
            </>
        )
    }
}

export default Weeklyreport