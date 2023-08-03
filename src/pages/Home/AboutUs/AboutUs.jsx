import { Link } from 'react-router-dom';
import img from '../../../../public/aboutus.avif';
const AboutUs = () => {
    return (
        <div className="bg-white">
            <div className="container mx-auto p-8">
            <h2 className="text-4xl font-semibold  text-purple-800 text-center mb-20 mt-20">About Us</h2>
                <div className="flex flex-wrap items-center ">
                    <div className="w-full md:w-1/2">
                        <img src={img} alt="About Us Image" className="w-full rounded-md shadow-md md:h-[400px]" />
                    </div>
                    <div className="w-full md:w-1/2 md:pl-8 mt-4 md:mt-0 border p-6 rounded-lg shadow-md md:h-[400px]">
                        
                        <p className="mb-4 text-gray-700">
                            We are a company that provides a better facility Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                        </p>
                        <ul className="list-disc pl-6 text-gray-700">
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                            <li>Sed do eiusmod tempor incididunt ut labore</li>
                            <li>Ut enim ad minim veniam, quis nostrud exercitation</li>
                        </ul>
                        <Link
                            to={'/addTask'}
                            className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default AboutUs;