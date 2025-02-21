import 'react';
import Fotodiri from '../assets/fotodiri.jpg';

const Hero = () => {

  const cvPath = "https://drive.google.com/file/d/1hHkGUe27BDd_JSoMB0Kts6zwtWSM3irR/view?usp=sharing";

  return (
    <div className="min-h-screen py-32 px-8 md:px-16 lg:px-32 flex items-center bg-gradient-to-br from-black via-[#4B0082] to-[#1E1E50]">
      <div className="container mx-auto flex flex-col md:flex-row items-center md:space-x-16">
        
        
        <div className="md:w-1/3 flex justify-center md:justify-end mb-8 md:mb-0">
          <div className="w-72 h-96 border-4 border-[#A020F0] rounded-full overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-[#A020F0]/50">
            <img 
              src={Fotodiri}
              alt="Profile"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

       
        <div className="md:w-2/3 text-center md:text-left">
          <h1 className="text-5xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#A020F0] to-[#FF00FF] drop-shadow-lg">
            I'm Bimo Ghanis Surya Putra Wibowo
          </h1>
          <h2 className="text-3xl font-semibold text-gray-200 mt-4 italic">
            Front-End Web Developer | Data Engineer
          </h2>
          <p className="mt-6 text-xl text-gray-300 leading-relaxed tracking-wide">
            "I’m a Front-End Web Developer and Data Engineer with hands-on experience in ETL and Big Data. I love building beautiful and responsive web applications, but I also thrive in optimizing data pipelines to handle massive datasets. Whether it’s designing user-friendly interfaces or managing data transformations, I enjoy creating impactful digital solutions."
          </p>
          
         
          <div className="mt-10 flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
           
            <a
              href="https://wa.me/6287781379800"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#A020F0] to-[#FF00FF] text-white 
                px-10 py-5 text-lg rounded-full font-semibold shadow-lg shadow-[#A020F0]/50 
                transition-all duration-300 hover:scale-110 hover:shadow-[#FF00FF]/80 text-center"
            >
              Contact With Me
            </a>

            
            <a
              href={cvPath}
              download="Bimo_Ghanis_CV.pdf"
              className="bg-gradient-to-r from-[#FF00FF] to-[#A020F0] text-white 
                px-10 py-5 text-lg rounded-full font-semibold shadow-lg shadow-[#FF00FF]/50 
                transition-all duration-300 hover:scale-110 hover:shadow-[#A020F0]/80 text-center"
            >
              Resume
            </a>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Hero;
