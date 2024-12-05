import React, { FC, useState, useEffect } from 'react';
//Bootstrap
import { Container, Row, Col, Button, Image, Badge } from 'react-bootstrap';
//Axios
import axios from 'axios';

interface JobsPanelProps {
    filters: string[];
    setFilters: (filters: string[]) => void;
}

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

const JobsPanel: FC<JobsPanelProps> = ({ filters, setFilters }) => {
    const [jobList, setJobList] = useState<JobListProps[]>([]);

    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/MrSeager/job-listings/refs/heads/main/src/data.json')
      .then((response) => {
        setJobList(response.data);
      });
    }, []);

    const handleAddFilter = (filter: string) => {
        if (!filters.includes(filter)) {
            setFilters([...filters, filter]);
        }
    }

    const filteredJobList = jobList.filter(job => {
        const jobFilters = [job.role, job.level, ...job.languages, ...job.tools];
        return filters.every(filter => jobFilters.includes(filter));
    })

    return(
        <Container className='cs-transition cs-w cs-z-index d-flex flex-column gap-3 py-3 px-0'> 
                {filteredJobList.length > 0 ? ( 
                    filteredJobList.map((job) => ( 
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
                                    <Button onClick={() => handleAddFilter(job.level)} className='cs-btn py-1 border-0 cs-fw-700 cs-transition'>{job.level}</Button>
                                    {job.tools.map((tool, index) => ( 
                                        <Button key={index} onClick={() => handleAddFilter(tool)} className='cs-btn py-1 border-0 cs-fw-700 cs-transition'>{tool}</Button> 
                                    ))}
                                    {job.languages.map((language, index) => ( 
                                        <Button key={index} onClick={() => handleAddFilter(language)} className='cs-btn py-1 border-0 cs-fw-700 cs-transition'>{language}</Button> 
                                    ))}
                                </Col>
                            </Row> 
                        </Container> 
                    )) 
                ) : ( <p>Loading...</p> )} 
            </Container>
    );
}

export default JobsPanel;