import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import img1 from '../assets/clubPhoto.png'

const Banner = () => {
    return (
         <Carousel 
         autoPlay={true}
         infiniteLoop={true}
         showThumbs={false}
         transitionTime={'1000'}
         
         >
                <div className='w-[900px] mx-auto'>
                    <img src='https://www.ncgrl.vic.gov.au/wp-content/uploads/2024/11/Book-Club-scaled.jpg' className="w-full h-100 object-cover rounded-lg" />
                    <p className="font-bold text-xl">Book Club</p>
                </div>
                <div className='w-[900px] mx-auto'>
                    <img src='https://3.files.edl.io/5473/22/10/31/141246-bce7e542-29db-4720-a4a1-d8204534c77f.jpg' className="w-full h-100 object-cover rounded-lg" />
                    <p className="font-bold text-xl">Tech Club</p>
                </div>
                <div className='w-[900px] mx-auto'>
                    <img src='https://images.squarespace-cdn.com/content/v1/5873ba6abebafb70ccf6656f/09949c5b-e26f-4e31-9ec1-7c1845558bfd/Photo+club+banner.jpg' className="w-full h-100 object-cover rounded-lg" />
                    <p className="font-bold text-xl">Photography Club</p>
                </div>
               
            </Carousel>
    );
};

export default Banner;