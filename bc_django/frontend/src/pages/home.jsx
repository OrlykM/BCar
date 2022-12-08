import React from 'react';
import Header from "../components/header";
import HeroSection from "../components/HomePageComponents/heroSection";
import ServiceSection from "../components/HomePageComponents/servicesSection";
import PortfolioSection from "../components/HomePageComponents/portfolioSection";
import FeaturesSection from "../components/HomePageComponents/featuresSection";
import PricingSection from "../components/HomePageComponents/pricingSection";
import CtaSection from "../components/HomePageComponents/ctaSection";
import FooterSection from "../components/HomePageComponents/footerSection";

const Home = () => {
    return (
        <div>
            <Header/>
            <HeroSection/>
            <ServiceSection/>
            <PortfolioSection/>
            <FeaturesSection/>
            <PricingSection/>
            <CtaSection/>
            <FooterSection/>
        </div>
    );
};

export default Home;