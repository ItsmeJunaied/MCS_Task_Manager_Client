import React from 'react';
import img3 from '../../../../public/pexels-1.jpg';
import img from '../../../../public/parallax_about.jpg';
const AboutUs = () => {
    const divStyle = {
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '600px',

    };
    return (

        <div>
            <div style={divStyle}>
                <div className=' container mx-auto '>
                    <div className=' flex pt-20'>
                        <div className=' w-1/2'>
                            <p className=' text-amber-400 text-xl font-bold'>Our Camp</p>
                            <h2 className=' text-5xl font-extrabold text-white'>Avout Music Camp</h2>
                            <h2 className=' mt-10 w-[700px] text-2xl text-amber-400'>Integer in justo euismod nulla feugiat lacinia non porta velit. Vestibulum vulputate purus sit amet vestibulum ultrices mauris malesuada.</h2>
                            <p className=' text-white mt-5 w-[700px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum sem ligula. Phasellus eleifend vel justo sit amet volutpat. Duis vitae maximus ligula, nec mattis libero. Donec eget felis odio.</p>
                            <button className='btn w-28 mt-5 bg-[#EFCF4F]'>View More</button>
                        </div>
                        <div className='grid w-screen place-items-center' style={{ position: 'relative' }}>
                            <div className=' rounded-lg' style={{ position: 'absolute', top: 50, right: 200, width: '30%', height: '400px', backgroundColor: '#EFCF4F', zIndex: 1 }}></div>
                            <div style={{ position: 'relative', zIndex: 2 }}>
                                <img className=' rounded-lg' style={{ height: '400px' }} src={img3} alt='' />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className='bg-[#EFCF4F] h-[200px]'>
                <div className=' flex container mx-auto justify-center pt-10 gap-20'>
                    <div>
                        <h6 className=' text-7xl font-extrabold text-center text-white'>27</h6>
                        <h2 className='text-3xl font-bold text-cyan-900 text-center'>Professoinal</h2>
                        <h2 className='text-2xl font-bold text-orange-700 text-center'>Class</h2>
                    </div>
                    <div>
                        <h6 className=' text-7xl font-extrabold text-center text-white'>54</h6>
                        <h2 className='text-3xl font-bold text-cyan-900 text-center'>Learning</h2>
                        <h2 className='text-2xl font-bold text-orange-700 text-center'>Group</h2>
                    </div>
                    <div>
                        <h6 className=' text-7xl font-extrabold text-center text-white'>1K+</h6>
                        <h2 className='text-3xl font-bold text-cyan-900 text-center'>Happy</h2>
                        <h2 className='text-2xl font-bold text-orange-700 text-center'>Students</h2>
                    </div>
                    <div>
                        <h6 className=' text-7xl font-extrabold text-center text-white'>33</h6>
                        <h2 className='text-3xl font-bold text-cyan-900 text-center'>Music</h2>
                        <h2 className='text-2xl font-bold text-orange-700 text-center'>Class</h2>
                    </div>               
                </div>
            </div>
        </div>
    );
};

export default AboutUs;