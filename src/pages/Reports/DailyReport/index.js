import React from 'react';
import PageTitle from '../../../components/PageTitle';
import DailyReportConfig from './DailyReportConfig'
class Dailyreport extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Dailyreport', active: true },
                    ]}
                    title={'Dailyreport'}
                />
                <DailyReportConfig/>
            </>
        )
    }
}

export default Dailyreport