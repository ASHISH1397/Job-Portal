import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from './ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './ui/carousel';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    const images = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGd3FENUL9-K5rMnIeOPknkx_yxkHktlJYk2EcTNY--gUBlewSdGzsF78&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGd3FENUL9-K5rMnIeOPknkx_yxkHktlJYk2EcTNY--gUBlewSdGzsF78&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGd3FENUL9-K5rMnIeOPknkx_yxkHktlJYk2EcTNY--gUBlewSdGzsF78&s",
        
        
    ];

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                {/* <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span> */}
                <Carousel className="relative w-[40%] mx-auto" opts={{ loop: true }}>
                    <CarouselContent className="flex">
                        {images.map((src, index) => (
                        <CarouselItem key={index} className="basis-1/2 flex-grow-0 flex-shrink-0">
                            <img src={src} alt={`Slide ${index + 1}`} className="w-full h-auto rounded-lg" />
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                 
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-0 rounded-full items-center gap-0 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className=' text-black font-bold outline-none border-none w-full h-10 rounded-l-full pl-3'

                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection