
import React from 'react';
import { motion } from 'framer-motion';
import CategoryFilters from './CategoryFilters';
import ProductCard from './ProductCard';
import type { Category, Product, Banner } from '../types';
import { PageWrapper } from './pages';
import type { PageProps } from './pages';


interface MainContentProps {
  activeCategory: string;
  onCategoryClick: (label: string) => void;
  categories: Category[];
  products: Product[];
  banners: Banner[];
  theme: string;
  toggleTheme: () => void;
  onToggleSidebar: () => void;
  loading: boolean;
}

const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const gridItemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1 }
};

const MainContent: React.FC<MainContentProps> = ({ activeCategory, onCategoryClick, categories, products, banners, theme, toggleTheme, onToggleSidebar, loading }) => {
  const pageProps: PageProps = {
    theme,
    toggleTheme,
    onToggleSidebar,
    banners,
    products,
  };

  return (
    <PageWrapper pageName="Home" pageProps={pageProps}>
      <CategoryFilters 
        activeCategory={activeCategory}
        onCategoryClick={onCategoryClick}
        categories={categories}
      />
      {loading ? (
        <div className="flex justify-center items-center h-64 mt-8">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-violet-500"></div>
        </div>
      ) : (
        <motion.div
          key={activeCategory} // Animate when category changes
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mt-8"
          variants={gridContainerVariants}
          initial="hidden"
          animate="show"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} variants={gridItemVariants} />
          ))}
        </motion.div>
      )}
    </PageWrapper>
  );
};

export default MainContent;
