import React from 'react';
import PageTitle from '../../../components/PageTitle';
import ProjectsConfig from './ProjectConfig'
class Projects extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Projects', active: true },
                    ]}
                    title={'Projects'}
                />
                <ProjectsConfig/>
            </>
        )
    }
}

export default Projects