import { useParams, Link } from 'react-router-dom';
import { produtosPersonalizados } from '../data/products';

export default function DetalhesProduto() {
  const { id } = useParams();
  
  // Busca na sua lista local
  const produto = produtosPersonalizados.find((item) => item.id === parseInt(id));

  if (!produto) {
    return <div className="text-center py-20">Produto não encontrado!</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/" className="text-gray-500 hover:text-[#C92071] mb-8 inline-block">
        &larr; Voltar
      </Link>

      <div className="flex flex-col md:flex-row gap-12 bg-white p-8 rounded-xl shadow-sm">
        <div className="md:w-1/2">
          <img src={produto.image} alt={produto.title} className="w-full rounded-lg" />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{produto.title}</h1>
          <p className="text-4xl font-black text-[#C92071] mb-6">R$ {produto.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-8">{produto.description}</p>
          
          <button className="bg-[#C92071] text-white font-bold py-4 px-8 rounded-lg w-full uppercase">
            Comprar Agora
          </button>
        </div>
      </div>
    </div>
  );
}