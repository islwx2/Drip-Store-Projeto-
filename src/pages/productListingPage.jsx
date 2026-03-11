import { useState } from 'react';
import Section from '../components/section';
import ProductListingList from '../components/AbaProdutos/productListingList';
import { produtosPersonalizados } from '../data/products'; 
import { productsData } from './homePage';

const destaques = productsData.map(p => ({ 
  ...p, 
  id: `destaque_${p.id}` 
}));

const personalizados = produtosPersonalizados.map(p => ({ 
  ...p, 
  id: `pers_${p.id}`,
  name: p.title 
}));

const todosOsProdutos = [...destaques, ...personalizados];

const ProductListingPage = () => {
  const [order, setOrder] = useState('menor-preco');
  const [filters, setFilters] = useState([]);

  const categoryOptions = [
    { text: 'Tênis', value: 'Tênis' },
    { text: 'Sneakers', value: 'Sneakers' },
    { text: 'Camisetas', value: 'Camisetas' },
    { text: 'Roupas', value: 'Roupas' },
    { text: 'Calças', value: 'Calças' },
    { text: 'Bonés', value: 'Bonés' },
    { text: 'Acessórios', value: 'Acessórios' },
    { text: 'Headphones', value: 'Headphones' },
  ];

  const handleFilterChange = (value) => {
    if (filters.includes(value)) {
      setFilters(filters.filter(f => f !== value));
    } else {
      setFilters([...filters, value]);
    }
  };

  const filteredProducts = todosOsProdutos.filter(product => {
    if (filters.length === 0) return true;
    return filters.includes(product.category);
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (order === 'menor-preco') return a.price - b.price;
    if (order === 'maior-preco') return b.price - a.price;
    return 0;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 md:px-8 py-6 w-full bg-[#F9F8FE]">
      <aside className="w-full lg:w-[308px] flex-shrink-0">
        <label htmlFor="order-select" className="block mb-2 text-gray-700 text-sm font-bold">
          Ordenar por
        </label>
        <select
          id="order-select"
          className="w-full h-[48px] border border-gray-300 rounded px-3 text-gray-700 outline-pink-700"
          value={order}
          onChange={e => setOrder(e.target.value)}
        >
          <option value="menor-preco">Menor preço</option>
          <option value="maior-preco">Maior preço</option>
        </select>

        <div className="bg-white mt-6 p-4 border border-gray-200 rounded">
          <h3 className="text-gray-700 text-base font-bold mb-3 border-b pb-2">Filtrar por</h3>
          {categoryOptions.map(({ text, value }) => (
            <div key={value} className="flex items-center mb-3 mt-2">
              <input
                type="checkbox"
                id={value}
                checked={filters.includes(value)}
                onChange={() => handleFilterChange(value)}
                className="w-5 h-5 accent-[#C92071] mr-3 cursor-pointer"
              />
              <label htmlFor={value} className="text-gray-700 text-sm cursor-pointer">{text}</label>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 w-full">
        <Section 
          title={`Total de produtos encontrados: ${sortedProducts.length}`} 
          titleAlign="left"
        >
          <ProductListingList products={sortedProducts} />
        </Section>
      </main>
    </div>
  );
};

export default ProductListingPage;