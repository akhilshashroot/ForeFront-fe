import React from 'react';
import PageTitle from '../../components/PageTitle';
import AttendanceConfig from './AttendanceConfig'
class Attendance extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Attendance', active: true },
                    ]}
                    title={'Attendance'}
                />
                <AttendanceConfig/>
            </>
        )
    }
}

export default Attendance