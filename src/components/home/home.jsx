"use client";
import React from "react";
import Image from "next/image";
import Container from "../shared/Container";
import { useRouter } from "next/navigation";
import Header from "../header/header";
import Footer from "../footer/footer";
import { FaInstagram, FaFacebookMessenger, FaLine, FaWhatsapp } from 'react-icons/fa';

const HomePage = () => {
  const router = useRouter();
  const steps = [
    {
      badge: (
        <span className="inline-flex px-2.5 py-1 rounded-secondary text-xs text-red-800 bg-red-100 relative">
          Step 1
        </span>
      ),
      title: "Filter & Discover",
      description: "Smart filtering and suggestions make it easy to find",
      thumbnail: "/assets/home/steps/step-1.png",
    },
    {
      badge: (
        <span className="inline-flex px-2.5 py-1 rounded-secondary text-xs text-indigo-800 bg-indigo-100 relative">
          Step 2
        </span>
      ),
      title: "Add to bag",
      description: "Easily select the correct items and add them to the cart",
      thumbnail: "/assets/home/steps/step-2.png",
    },
    {
      badge: (
        <span className="inline-flex px-2.5 py-1 rounded-secondary text-xs text-yellow-800 bg-yellow-100 relative">
          Step 3
        </span>
      ),
      title: "Fast Shipping",
      description: "The carrier will confirm and ship quickly to you",
      thumbnail: "/assets/home/steps/step-3.png",
    },
    {
      badge: (
        <span className="inline-flex px-2.5 py-1 rounded-secondary text-xs text-purple-800 bg-purple-100 relative">
          Step 4
        </span>
      ),
      title: "Enjoy the product",
      description: "Have fun and enjoy your 5-star quality products",
      thumbnail: "/assets/home/steps/step-4.png",
    },
  ];

  return (
    <>
      <Header />
      <Container>
        <div
          className="bg-[#f8f0ea] h-full w-full rounded-primary relative flex flex-col gap-y-8 lg:p-10 pb-0 pt-10"
          style={{ backgroundImage: 'url(/assets/home/banner/bg_img_3.png), url(/assets/home/banner/dots.svg)', backgroundSize: "cover" }}
        >
          <Image
            src="/assets/home/banner/model1.png"
            alt="model"
            height={872}
            width={500}
            className="lg:absolute bottom-0 right-0 order-2 lg:w-[500px] lg:ml-0 md:ml-auto"
          />
          <article className="flex flex-col justify-start items-end order-1 lg:pt-24 lg:pb-12 lg:pr-24 lg:p-2">
            <div className="flex flex-col gap-y-4 max-w-lg z-20 mr-auto pl-6">
              <h6 className="flex flex-row gap-x-0.5 items-center text-lg"
                style={{ fontFamily: "'Figtree', sans-serif", fontWeight: 700, letterSpacing: "1px", color: "#7A65E8", fontSize: '14px', marginBottom: "8px" }}>
                CRAFTING SUCCESS IN EVERY POST
              </h6>
              <h1 className="md:text-5xl text-4xl"
                style={{ fontFamily: "'Figtree', sans-serif", fontWeight: 700, lineHeight: '1.2em', letterSpacing: "-1.2px", color: "#0D1F56", fontSize: '48px' }}>
                Probot: All-in-One Social Media Hub!
              </h1>
              <p className="flex flex-row gap-x-0.5 items-center text-lg"
                style={{ fontFamily: "'Inter', sans-serif", color: "#828AA4", fontSize: '16' }}>
                One destination to handle everything
              </p>
              <button
                className="px-8 py-4 border border-violet rounded-secondary bg-indigo-700 hover:bg-violet-500 text-white transition-colors drop-shadow w-fit mt-4"
                onClick={() => router.push("/auth/register")}
              >
                Start Your Journey
              </button>
            </div>
          </article>
        </div>
      </Container>
      <Container className="mt-10 mb-10">
        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 xl:gap-20">
          <picture className="hidden md:block absolute inset-x-0 top-5">
            <source srcSet="/assets/home/steps/step-bg.svg" type="image/svg+xml" />
            <Image src="/assets/home/steps/step-bg.svg" alt="vector" height={100} width={100} />
          </picture>
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col gap-y-8 items-center max-w-xs mx-auto"
            >
              <div className="max-w-[100px] mx-auto">
                <Image
                  src={step.thumbnail}
                  alt={step.title}
                  height={100}
                  width={100}
                  className="w-[100px] h-[100px] object-contain"
                />
              </div>
              <div className="flex flex-col gap-y-4 items-center justify-center">
                {step.badge}
                <h2 className="text-base">{step.title}</h2>
                <span className="block text-slate-600 dark:text-slate-400 text-sm leading-6 text-center">
                  {step.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <section className="flex items-center justify-center bg-white mt-16 mb-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="flex-1 flex justify-center items-center mb-10 md:mb-0">
            <div className="relative">
              <Image src="/assets/home/banner/social-network.jpg" alt="Group of people" width={400} height={300} className="rounded-lg shadow-lg" />
              <div className="absolute top-4 left-4 bg-purple-600 text-white text-lg font-bold py-2 px-4 rounded-full">15+ YEARS OF EXPERIENCE</div>
              <div className="absolute bottom-4 left-4 flex space-x-4">
                <FaInstagram className="text-pink-500 text-4xl" />
                <FaFacebookMessenger className="text-blue-500 text-4xl" />
                <FaLine className="text-green-500 text-4xl" />
                <FaWhatsapp className="text-green-500 text-4xl" />
              </div>
            </div>
          </div>
          <div className="flex-1 px-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">SocioAcademy&apos;s A-Z Guide to Social Media Proficiency.</h2>
            <p className="text-gray-700 mb-6">
              Ullamcorper auctor fermentum ante maximus justo pretium vulputate condimentum hac. Accumsan fusce consectetur pede molestie vehicula ultricies.
              Proin himenaeos semper adipiscing tempus nunc mi congue sagittis felis velit.
            </p>
            <button className="bg-purple-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300" onClick={() => router.push("/auth/register")}>Discover more</button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HomePage;
