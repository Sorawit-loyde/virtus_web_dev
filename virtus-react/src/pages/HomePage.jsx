import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Stats } from '../components/sections/Stats';
import { ProductSlideshow } from '../components/sections/ProductSlideshow';
import { Partners } from '../components/sections/Partners';

export const Home = () => {
    return (
        <>
            <Hero />
            <About />
            <ProductSlideshow />
            <Stats />
            <Partners />
        </>
    );
};
