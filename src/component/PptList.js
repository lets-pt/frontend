import React from 'react'
import { Container } from 'react-bootstrap'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PptCard from './PptCard';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        partialVisibilityGutter: -11
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const PptList = () => {
    return (
        <Container className='script-container'>
            <h1>다른 유저의 발표자료</h1>
            <Carousel responsive={responsive} partialVisible
        itemClass="carousel-item-padding-40-px">
                <PptCard/>
                <PptCard/>
                <PptCard/>
                <PptCard/>
                <PptCard/>
            </Carousel>
        </Container>

    )
}

export default PptList
