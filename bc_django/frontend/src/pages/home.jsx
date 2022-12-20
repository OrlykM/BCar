import React from 'react';
import Header from "../components/header";
import HeroSection from "../components/HomePageComponents/heroSection";
import ServiceSection from "../components/HomePageComponents/servicesSection";
import PortfolioSection from "../components/HomePageComponents/portfolioSection";
import FeaturesSection from "../components/HomePageComponents/featuresSection";
import PricingSection from "../components/HomePageComponents/pricingSection";
import CtaSection from "../components/HomePageComponents/ctaSection";
import FooterSection from "../components/HomePageComponents/footerSection";
import {useState} from 'react';

const Home = () => {
    const [token] = useState(() => {
        return localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;
    });
    return (
        <div>
            <Header/>
            <HeroSection/>
            <ServiceSection/>
            <PortfolioSection/>
            {/*<FeaturesSection/>*/}
            {token ?
                (<div style={{height: "1px", backgroundColor:"#1d1b1b"}}>
                </div>): null}
            {token ? null : (<><PricingSection/></>)}
            {token ? null : (<><CtaSection/></>)}
            {/*<CtaSection/>*/}
            <FooterSection/>
        </div>
    );
};

export default Home;