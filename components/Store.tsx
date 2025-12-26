import React, { useState } from 'react';
import { ShoppingBag, ArrowLeft, Star } from 'lucide-react';

interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  inStock: boolean;
}

const Store: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const products: Product[] = [
    {
      id: 1,
      image: '/merch 1.jpg',
      title: 'JX Classic Tee',
      description: 'Premium cotton t-shirt featuring the iconic JX logo. Comfortable fit for everyday wear.',
      price: 29.99,
      category: 'Apparel',
      rating: 4.8,
      inStock: true
    },
    {
      id: 2,
      image: '/merch 2.jpg',
      title: 'Dancehall Energy Hoodie',
      description: 'Stay warm while representing the movement. Features unique artwork and high-quality fabric.',
      price: 59.99,
      category: 'Apparel',
      rating: 4.9,
      inStock: true
    },
    {
      id: 3,
      image: '/merch 3.jpg',
      title: 'Limited Edition Cap',
      description: 'Show your support with this exclusive cap. Adjustable fit for maximum comfort.',
      price: 24.99,
      category: 'Accessories',
      rating: 4.7,
      inStock: false
    },
    {
      id: 4,
      image: '/merch 4.jpg',
      title: 'Vintage Logo Sweatshirt',
      description: 'Retro-inspired design with modern comfort. Perfect for layering.',
      price: 49.99,
      category: 'Apparel',
      rating: 4.6,
      inStock: true
    },
    {
      id: 5,
      image: '/merch 5.jpg',
      title: 'Concert Tour Poster Set',
      description: 'Collectible poster set from the Neon Nights Tour. High-quality print on premium paper.',
      price: 19.99,
      category: 'Collectibles',
      rating: 4.5,
      inStock: true
    },
    {
      id: 6,
      image: '/merch 6.jpg',
      title: 'Artist Backpack',
      description: 'Durable backpack with custom artwork. Perfect for carrying your essentials.',
      price: 39.99,
      category: 'Accessories',
      rating: 4.8,
      inStock: true
    },
    {
      id: 7,
      image: '/merch 7.jpg',
      title: 'Signed Vinyl Record',
      description: 'Limited edition vinyl with artist signature. Includes digital download.',
      price: 79.99,
      category: 'Collectibles',
      rating: 5.0,
      inStock: false
    },
    {
      id: 8,
      image: '/merch 8.jpg',
      title: 'Merch Bundle Pack',
      description: 'Complete fan package with tee, cap, and exclusive stickers.',
      price: 89.99,
      category: 'Bundles',
      rating: 4.9,
      inStock: true
    }
  ];

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? 'text-gold-500 fill-current' : 'text-neutral-600'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-24">
      <div className="container mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={onBack}
            className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase tracking-wider">Back to Site</span>
          </button>

          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter">
              Official <span className="text-gold-500">Store</span>
            </h1>
            <p className="text-neutral-400 mt-2">Exclusive merchandise for true fans</p>
          </div>

          <div className="w-24"></div> {/* Spacer for centering */}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full border text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gold-500 text-black border-gold-500'
                  : 'bg-transparent text-neutral-500 border-neutral-800 hover:border-white hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-gold-500/50 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-bold uppercase tracking-wider bg-red-500 px-4 py-2 rounded">
                      Sold Out
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
                  {renderStars(product.rating)}
                  <span className="text-white text-xs ml-1">{product.rating}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-bold text-lg leading-tight">{product.title}</h3>
                  <span className="text-gold-500 font-bold text-xl">${product.price}</span>
                </div>

                <p className="text-neutral-400 text-sm mb-4 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-neutral-500">{product.category}</span>
                  <button
                    disabled={!product.inStock}
                    className={`px-4 py-2 rounded-lg font-bold uppercase text-sm tracking-wider transition-all ${
                      product.inStock
                        ? 'bg-gold-500 text-black hover:bg-white'
                        : 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                    }`}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <ShoppingBag size={64} className="mx-auto text-neutral-600 mb-4" />
            <p className="text-neutral-500 uppercase tracking-widest text-xl mb-2">No products found</p>
            <p className="text-neutral-600">Try selecting a different category</p>
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center mt-16 pt-8 border-t border-neutral-800">
          <p className="text-neutral-500 text-sm">
            All products ship within 3-5 business days. International shipping available.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Store;
