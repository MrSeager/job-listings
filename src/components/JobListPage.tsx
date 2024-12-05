import React, { FC, useState, useEffect } from 'react';
//Components
import './JobListPageStyle.css';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Button, Image, Badge, image } from 'react-bootstrap';
//Axios
import axios from 'axios';
//Spring
import { useSpring, animated } from '@react-spring/web';
//Images
import ImgRemove from '../images/icon-remove.svg';

interface JobListProps {
    id: number,
    company: string,
    logo: string,
    new: boolean,
    featured: boolean,
    position: string,
    role: string,
    level: string,
    postedAt: string,
    contract: string,
    location: string,
    languages: string[],
    tools: string[],
}

const JobListPage: FC = () => {
    const [jobList, setJobList] = useState<JobListProps[]>([]);
    const [filters, setFilters] = useState<string[] | null>(['Frontend', 'JavaScript'])

    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/MrSeager/job-listings/refs/heads/main/src/data.json')
      .then((response) => {
        setJobList(response.data);
      });
    }, []);

    const handleAddFilter = (filter) => {
        
    }

    const handleRemoveFilter = (filter) => {
        
    }

    const handleClearFilters = () => {
        setFilters(null);
    }

    return (
        <Container fluid className='cs-bg-image min-vh-100 d-flex flex-column align-items-center justify-content-center pt-5'>
           {filters ? (
                <Container className='cs-w mt-5 cs-z-index shadow py-3 px-4 rounded rounded-3 bg-white d-flex flex-row align-items-center justify-content-between gap-3'>
                    <Container className='d-flex flex-row align-items-start gap-3'>
                        {filters.map((filter) => (
                            <Button className='cs-btn-2 py-0 pe-0 border-0 cs-fw-700 cs-transition'>{filter} <Badge className='p-2 cs-transition'><Image src={ImgRemove} alt='remove' /></Badge></Button>
                        ))}
                    </Container>
                    <Button onClick={handleClearFilters} className='cs-btn-clear px-0 border-0 bg-transparent cs-tc-dark-cyan'>Clear</Button>
                </Container>
            ) : ''}
           <Container className='cs-w cs-z-index d-flex flex-column gap-3 py-3 px-0'> 
                {jobList.length > 0 ? ( 
                    jobList.map((job) => ( 
                        <Container key={job.id} className={`${job.featured ? 'cs-bc-start-featured' : 'cs-bc-start'} shadow py-3 px-4 rounded rounded-3 bg-white`}> 
                            <Row> 
                                <Col xs={1} className='d-flex flex-row align-items-center justify-content-center'> 
                                    <Image src={`https://raw.githubusercontent.com/MrSeager/job-listings/refs/heads/main/src${job.logo.replace('.', '')}`} alt={`${job.company} logo`} /> 
                                </Col>
                                <Col xs={5} className='d-flex flex-column'>
                                    <h1 className='h6 cs-fw-700 cs-tc-dark-cyan'>{job.company} {job.new ? <Badge className='rounded-pill text-uppercase cs-badge-new'>New</Badge> : ''} {job.featured ? <Badge bg='dark' className='rounded-pill text-uppercase'>Featured</Badge> : ''}</h1>
                                    <h2 className='h5 cs-fw-700'>{job.position}</h2>
                                    <h3 className='h6 cs-tc-dark-grayish-cyan'>{job.postedAt} &middot; {job.contract} &middot; {job.location}</h3>
                                </Col>
                                <Col xs={6} className='d-flex flex-row align-items-center justify-content-end gap-2'>
                                    <Button onClick={() => handleAddFilter(job.role)} className='cs-btn py-1 border-0 cs-fw-700 cs-transition'>{job.role}</Button>
                                    <Button className='cs-btn py-1 border-0 cs-fw-700 cs-transition'>{job.level}</Button>
                                    {job.tools.map((tool, index) => ( 
                                        <Button key={index} className='cs-btn py-1 border-0 cs-fw-700 cs-transition'>{tool}</Button> 
                                    ))}
                                    {job.languages.map((language, index) => ( 
                                        <Button key={index} className='cs-btn py-1 border-0 cs-fw-700 cs-transition'>{language}</Button> 
                                    ))}
                                </Col>
                            </Row> 
                        </Container> 
                    )) 
                ) : ( <p>Loading...</p> )} 
            </Container>
        </Container>
    );
}

export default JobListPage;