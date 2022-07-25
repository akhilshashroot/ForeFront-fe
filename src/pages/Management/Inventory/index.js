import React from 'react';
import PageTitle from '../../../components/PageTitle';
import InventoryConfig from './InventoryConfig'
class Inventory extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Inventory', active: true },
                    ]}
                    title={'Inventory'}
                />
                <InventoryConfig/>
            </>
        )
    }
}

export default Inventory