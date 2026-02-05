import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Products } from '../components/sections/Products';
import { Stats } from '../components/sections/Stats';
import { Contact } from '../components/sections/Contact';

export const Home = () => {
    return (
        <>
            <Hero />
            {/* Partners banner can be added here */}
            <About />
            <Products />
            <Stats />
            <Contact />
        </>
    );
};
