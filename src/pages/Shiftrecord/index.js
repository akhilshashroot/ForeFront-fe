import React from 'react';
import PageTitle from '../../components/PageTitle';
import ShiftrecordConfig from './ShiftrecordConfig'
class Shiftrecord extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Shiftrecord', active: true },
                    ]}
                    title={'Shiftrecord'}
                />
                <ShiftrecordConfig/>
            </>
        )
    }
}

export default Shiftrecord