import { HeroSlider } from '../../widgets/HeroSlider/HeroSlider';
import { PageLayout } from '../../shared/PageLayout';
import { Categories } from '../../widgets/Categories';
import { HotPricesCarousel }
  from '../../widgets/HotPricesCarousel/HotPricesCarousel';

export const Default = () => {
  return (
    <PageLayout>
      <HeroSlider />
      <HotPricesCarousel />
      <Categories />
    </PageLayout>
  );
};
