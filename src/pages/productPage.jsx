import { useState, useEffect } from 'react'; // Adicionado o useEffect
import { products } from '../data/products';
import ProductListingList from '../components/AbaProdutos/productListingList';
import { Link, useLocation } from 'react-router-dom';

const ProductPage = () => {
  const [order, setOrder] = useState('menor-preco');
  const [filters, setFilters] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // --- MODIFICAÇÃO 1: LER O PARÂMETRO 'categoria' DA URL ---
  // Estava procurando por 'filter', agora procura por 'categoria'
  const categoryFromUrl = searchParams.get('categoria')?.toLowerCase() || '';

  // O filtro de busca (que não está sendo usado, mas podemos manter)
  const searchQuery = searchParams.get('filter')?.toLowerCase() || '';

  // --- NOVO: useEffect para definir o filtro inicial a partir da URL ---
  // Este efeito roda UMA VEZ quando a página carrega.
  useEffect(() => {
    // Se uma categoria veio da URL, definimos ela como o filtro inicial.
    if (categoryFromUrl) {
      // O nome da categoria precisa ser capitalizado corretamente para bater com as opções do filtro.
      // Ex: "tênis" -> "Tênis"
      const capitalizedCategory = categoryFromUrl.charAt(0).toUpperCase() + categoryFromUrl.slice(1);
      setFilters([capitalizedCategory]);
    }
  }, []); // O array vazio [] garante que isso rode apenas na montagem inicial do componente.


  const allFilters = [
    { label: 'Marca', options: ['Adidas', 'Balenciaga', 'K-Swiss', 'Nike', 'Puma', 'Stamp', 'OQVestir', 'JBL', 'MST'] },
    // Adicionado as categorias que você usa no seu app para o filtro funcionar
    { label: 'Categoria', options: ['Camisetas', 'Calças', 'Bonés', 'Headphones', 'Tênis'] },
    { label: 'Gênero', options: ['Masculino', 'Feminino', 'Unisex'] },
    { label: 'Estado', options: ['Novo', 'Usado'] },
  ];

  const handleFilterChange = (value) => {
    setFilters((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
  };

  const filteredProducts = products.filter((product) => {
    // A lógica de busca continua igual
    const matchesSearch =
      !searchQuery ||
      product.title.toLowerCase().includes(searchQuery) ||
      product.category?.toLowerCase().includes(searchQuery);

    // --- MODIFICAÇÃO 2: LÓGICA DE FILTRO ATUALIZADA ---
    // Agora o filtro de checkbox funciona em conjunto com o da URL.
    const matchesFilter =
      filters.length === 0 ||
      // Verificamos se alguma das opções marcadas no checkbox corresponde à categoria do produto.
      filters.some((f) => product.category === f || product.brand === f || product.gender === f || product.condition === f);

    return matchesSearch && matchesFilter;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (order === 'menor-preco') return a.price - b.price;
    if (order === 'maior-preco') return b.price - a.price;
    return 0;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-4 sm:px-6 md:px-10 py-6 w-full">

      <aside className="w-full lg:w-[280px] flex-shrink-0">
        <h3 className="text-gray-700 text-[16px] font-semibold mb-4">Filtrar por:</h3>
        {allFilters.map((filter) => (
          <div key={filter.label} className="mb-6">
            <h4 className="text-xs text-gray-600 font-semibold mb-2">{filter.label}</h4>
            <div className="flex flex-col gap-2">
              {filter.options.map((option) => (
                <label key={option} className="flex items-center gap-2 text-sm text-dark-gray-2">
                  <input
                    type="checkbox"
                    checked={filters.includes(option)}
                    onChange={() => handleFilterChange(option)}
                    className="w-4 h-4 accent-pink-500"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </aside>

      <main className="flex-1 w-full">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 w-full flex-wrap">
          <span className="text-sm text-gray-500">
            {filters.length === 0 ? (
              <>Todos os produtos – {sortedProducts.length} produto(s)</>
            ) : (
              <>
                Resultados para <strong>{filters.join(', ')}</strong> – {sortedProducts.length} produto(s)
              </>
            )}
          </span>
          <div className="flex items-center gap-2 ml-auto w-full sm:w-auto">
            <label htmlFor="order" className="text-sm text-gray-600">
              Ordenar por:
            </label>
            <select
              id="order"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="h-[40px] border border-light-gray-2 rounded px-3 text-sm text-dark-gray-2 w-full sm:w-auto"
            >
              <option value="menor-preco">Menor preço</option>
              <option value="maior-preco">Maior preço</option>
            </select>
          </div>
        </div>

        <ProductListingList products={sortedProducts} />

        <div className="flex justify-end mt-10 w-full">
          <Link to="/pedidos" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 py-3 bg-pink-700 hover:bg-pink-800 text-white font-semibold rounded text-center">
              Ir para o carrinho
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;