import { Link } from 'react-router-dom';
// ATENÇÃO: Verifique se este caminho está correto para o seu card de produto.
// Seu arquivo se chama 'ProductCardList', mas ele funciona como um único 'ProductCard'.
import ProductCard from './AbaProdutos/productCardList'; 

const RelatedProducts = ({ currentProduct, allProducts }) => {
  // Filtra até 4 produtos da mesma categoria, excluindo o produto atual
  const related = allProducts.filter(p => 
    p.category === currentProduct.category && p.id !== currentProduct.id
  ).slice(0, 4); 

  if (related.length === 0) return null;

  return (
    <section className="mt-16 lg:mt-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Produtos Relacionados</h2>
        <Link to={`/produtos?categoria=${currentProduct.category}`} className="text-pink-600 font-semibold hover:underline">
          Ver todos →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map(product => (
          // Passando todas as props que o seu ProductCardList espera
          <ProductCard 
            key={product.id} 
            id={product.id}
            image={product.image}
            name={product.name}
            category={product.category}
            price={product.price}
            priceDiscount={product.priceDiscount}
            fullProduct={product} // Seu card espera o produto completo
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;