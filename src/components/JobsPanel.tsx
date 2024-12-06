import React, { FC, useState, useEffect } from 'react';
//Bootstrap
import { Container, Row, Col, Button, Image, Badge } from 'react-bootstrap';
//Axios
import axios from 'axios';
//Spring
import { useSpring, animated, useTrail } from '@react-spring/web';

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
    };

    const filteredJobList = jobList.filter(job => {
        const jobFilters = [job.role, job.level, ...job.languages, ...job.tools];
        return filters.every(filter => jobFilters.includes(filter));
    });

    const trail = useTrail(filteredJobList.length, {
        from: {
            marginLeft: -100,
            opacity: 0,
            transform: 'translate3d(-40px, -40px, 0)'
        },
        to: {
            marginLeft: 0,
            opacity: 1,
            transform: 'translate3d(0, 0px, 0)'
        },
    });

    return(
        <Container className='cs-w cs-z-index d-flex flex-column gap-lg-3 gap-5 py-3 px-0'> 
            {filteredJobList.length > 0 ? ( 
                trail.map((animation, index) => ( 
                    <animated.div key={filteredJobList[index].id} style={animation}>
                        <Container className={`${filteredJobList[index].featured ? 'cs-bc-start-featured' : 'cs-bc-start'} shadow py-3 px-4 rounded rounded-3 bg-white`}>
                            <Row className='gap-lg-0 gap-3'>
                                <Col lg={1} xs={12} className='d-flex flex-row align-items-center justify-content-center position-relative py-lg-0 py-2'> 
                                    <Image src={`https://raw.githubusercontent.com/MrSeager/job-listings/refs/heads/main/src${filteredJobList[index].logo.replace('.', '')}`} alt={`${filteredJobList[index].company} logo`} className='cs-img-logo' />
                                </Col>
                                <Col lg={5} xs={12} className='d-flex flex-column cs-border-bottom'>
                                    <h1 className='h6 cs-fw-700 cs-tc-dark-cyan'>{filteredJobList[index].company} {filteredJobList[index].new ? <Badge className='rounded-pill text-uppercase cs-badge-new'>New</Badge> : ''} {filteredJobList[index].featured ? <Badge bg='dark' className='rounded-pill text-uppercase'>Featured</Badge> : ''}</h1>
                                    <h2 className='h5 cs-fw-700'>{filteredJobList[index].position}</h2> 
                                    <h3 className='h6 cs-tc-dark-grayish-cyan'>{filteredJobList[index].postedAt} &middot; {filteredJobList[index].contract} &middot; {filteredJobList[index].location}</h3> 
                                </Col>
                                <Col lg={6} xs={12} className='d-flex flex-row align-items-center justify-content-lg-end justify-content-start flex-wrap gap-2'>
                                    <Button onClick={() => handleAddFilter(filteredJobList[index].role)} className='cs-btn py-1 border-0 cs-fw-700 cs-transition'>{filteredJobList[index].role}</Button>
                                    <Button onClick={() => handleAddFilter(filteredJobList[index].level)} className='cs-btn py-1 border-0 cs-fw-700 cs-transition'>{filteredJobList[index].level}</Button> 
                                    {filteredJobList[index].tools.map((tool, toolIndex) => ( 
                                        <Button key={toolIndex} onClick={() => handleAddFilter(tool)} className='cs-btn py-1 border-0 cs-fw-700 cs-transition'>{tool}</Button> 
                                    ))} 
                                    {filteredJobList[index].languages.map((language, languageIndex) => ( 
                                        <Button key={languageIndex} onClick={() => handleAddFilter(language)} className='cs-btn py-1 border-0 cs-fw-700 cs-transition'>{language}</Button> 
                                    ))} 
                                </Col> 
                            </Row> 
                        </Container> 
                    </animated.div> 
                )) 
            ) : ( 
                <p>Loading...</p> 
            )}
        </Container>
    );
}

export default JobsPanel;