import React, { FC, useState } from 'react';
//Components
import './JobListPageStyle.css';
import FiltersPanel from './FiltersPanel.tsx';
import JobsPanel from './JobsPanel.tsx';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';

const JobListPage: FC = () => {
    const [filters, setFilters] = useState<string[]>([])

    return (
        <Container fluid className='cs-bg-image min-vh-100 d-flex flex-column align-items-center justify-content-top pt-5'>     
            <FiltersPanel 
                    filters={filters}
                    setFilters={setFilters}
            />
            <JobsPanel 
                filters={filters}
                setFilters={setFilters}
            />
        </Container>
    );
}

export default JobListPage;