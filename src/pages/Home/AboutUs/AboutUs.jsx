
const AboutUs = () => {
    return (
        <div>
            <div className="bg-gray-100">
                <div className="container mx-auto p-8">
                    <div className="flex flex-wrap items-center">

                        <div className="w-full md:w-1/2">
                            <img src="../../../../public/aboutus.avif" alt="About Us Image" className="w-full rounded-md shadow-md" />
                        </div>

                        <div className="w-full md:w-1/2 md:pl-8 mt-4 md:mt-0 border border-gray-300 p-6 rounded-lg shadow-md">
                            <h2 className="text-3xl font-bold mb-4">About Us</h2>
                            <p className="mb-4">
                                We are providing a better facility Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                            </p>
                            <ul className="list-disc pl-6">
                                <li>Lorem ipsum dolor sit amet, consectetur domino act</li>
                                <li>eli orem ipsum dolor sit amet, consectetur advice</li>
                                <li>Iron man ipsum dolor sit amet, consectetur adipiscing</li>
                            </ul>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;