import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
export default function Checkout() {
  const navigate = useNavigate();
  

  const [endereco, setEndereco] = useState({ 
    rua: '', 
    bairro: '', 
    cidade: '',
    numero: '',
    complemento: ''
  });

  const buscarCEP = async (cep) => {
    const cepLimpo = cep.replace(/\D/g, ''); 
    if (cepLimpo.length === 8) {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setEndereco(prev => ({ 
          ...prev, 
          rua: data.logradouro, 
          bairro: data.bairro, 
          cidade: data.localidade 
        }));
      }
    }
  };

  const handleFinalizarPedido = () => {
    if (!endereco.rua || !endereco.numero) {
      alert("Por favor, preencha seu endereço e o número da residência!");
      return;
    }

    alert("🎉 Pedido finalizado com sucesso! A Digital Store agradece.");
    navigate('/'); 
  };

  return (
    <div className="container mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="bg-white p-8 rounded-md shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-6 uppercase border-b pb-4">Finalizar Compra</h2>
        
        <input 
          type="text" 
          placeholder="Insira seu CEP (apenas números)" 
          maxLength="9"
          onChange={(e) => buscarCEP(e.target.value)}
          className="w-full p-4 bg-[#F5F5F5] rounded-md mb-4 outline-pink-700"
        />
      
        <input 
          type="text" 
          placeholder="Endereço (Rua/Avenida)" 
          value={endereco.rua} 
          onChange={(e) => setEndereco({ ...endereco, rua: e.target.value })}
          className="w-full p-4 bg-[#F5F5F5] rounded-md mb-4 outline-pink-700" 
        />
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input 
            type="text" 
            placeholder="Número" 
            value={endereco.numero} 
            onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })}
            className="p-4 bg-[#F5F5F5] rounded-md outline-pink-700" 
          />
          <input 
            type="text" 
            placeholder="Complemento" 
            value={endereco.complemento} 
            onChange={(e) => setEndereco({ ...endereco, complemento: e.target.value })}
            className="p-4 bg-[#F5F5F5] rounded-md outline-pink-700" 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input 
            type="text" 
            placeholder="Bairro" 
            value={endereco.bairro} 
            onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })}
            className="p-4 bg-[#F5F5F5] rounded-md outline-pink-700" 
          />
          <input 
            type="text" 
            placeholder="Cidade" 
            value={endereco.cidade} 
            onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })}
            className="p-4 bg-[#F5F5F5] rounded-md outline-pink-700" 
          />
        </div>
      </div>
      
      <aside className="bg-white p-8 rounded-md shadow-sm h-fit border border-gray-100">
        <h2 className="text-xl font-bold mb-6 uppercase border-b pb-4">Resumo</h2>
     
        <p className="text-gray-500 mb-8">Os itens do seu carrinho aparecerão aqui.</p>
        
        <button 
          onClick={handleFinalizarPedido}
          className="w-full bg-[#C92071] hover:bg-[#991956] text-white py-4 rounded-md font-bold mt-8 transition-colors"
        >
          FINALIZAR PEDIDO
        </button>
      </aside>
    </div>
  );
}