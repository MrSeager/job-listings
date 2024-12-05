import React, { FC } from 'react';
//Bootstrap
import { Container, Button, Image, Badge } from 'react-bootstrap';
//Images
import ImgRemove from '../images/icon-remove.svg';

interface FiltersPanelProps {
    filters: string[];
    setFilters: (filters: string[]) => void;
}

const FiltersPanel: FC<FiltersPanelProps> = ({ filters, setFilters }) => {
    const handleRemoveFilter = (filter: string) => {
        setFilters(filters.filter(f => f !== filter));
    }

    const handleClearFilters = () => {
        setFilters([]);
    }

    return(
        <Container className='cs-w mt-5 cs-z-index shadow py-3 px-4 rounded rounded-3 bg-white d-flex flex-row align-items-center justify-content-between gap-3'>
            <Container className='d-flex flex-row align-items-start gap-3'>
                {filters.map((filter) => (
                    <Button key={filter} onClick={() => handleRemoveFilter(filter)} className='cs-btn-2 py-0 pe-0 border-0 cs-fw-700 cs-transition'>{filter} <Badge className='ms-1 p-2 cs-transition'><Image src={ImgRemove} alt='remove' /></Badge></Button>
                ))}
            </Container>
            <Button onClick={handleClearFilters} className='cs-btn-clear px-0 border-0 bg-transparent cs-tc-dark-cyan'>Clear</Button>
        </Container>
    );
}

export default FiltersPanel;