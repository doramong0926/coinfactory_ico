import React from "react";
import Roadmap from "./../Roadmap";
import About from "./../About";
import Wallet from "./../Wallet";
import TokenSale from "./../TokenSale";
import TeamMember from "./../TeamMember";
import Partners from "../Partners";
import News from "../News";
import Faqs from "../Faqs";
import Contact from "../Contact";

const Home = (props, context) => (
    <React.Fragment>
        <About />
        <Wallet />
        <TokenSale />  
        <Roadmap />
        <TeamMember />
        <Partners />
        <News />
        <Faqs />
        <Contact />
    </React.Fragment>
)


export default Home;