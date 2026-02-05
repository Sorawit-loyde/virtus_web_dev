import { Hero } from '../components/sections/Hero';
import { Stats } from '../components/sections/Stats';
import { ProductSlideshow } from '../components/sections/ProductSlideshow';
import { Partners } from '../components/sections/Partners';

export const Home = () => {
    return (
        <>
            <Hero />
            <ProductSlideshow />
            <Stats />
            <Partners />
        </>
    );
};
