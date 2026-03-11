import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionar após a compra

export default function Checkout() {
  const navigate = useNavigate();
  
  // 1. Adicionamos 'numero' e 'complemento' ao estado
  const [endereco, setEndereco] = useState({ 
    rua: '', 
    bairro: '', 
    cidade: '',
    numero: '',
    complemento: ''
  });

  const buscarCEP = async (cep) => {
    // Tira o traço do CEP caso o usuário digite
    const cepLimpo = cep.replace(/\D/g, ''); 
    if (cepLimpo.length === 8) {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();
      if (!data.erro) {
        // Atualiza os dados, mas mantém o número que o usuário já tiver digitado
        setEndereco(prev => ({ 
          ...prev, 
          rua: data.logradouro, 
          bairro: data.bairro, 
          cidade: data.localidade 
        }));
      }
    }
  };

  // 2. Criamos a função que o botão vai chamar
  const handleFinalizarPedido = () => {
    // Faz uma checagem rápida se a pessoa não esqueceu a rua ou o número
    if (!endereco.rua || !endereco.numero) {
      alert("Por favor, preencha seu endereço e o número da residência!");
      return;
    }

    // Se estiver tudo certo, finaliza!
    alert("🎉 Pedido finalizado com sucesso! A Digital Store agradece.");
    navigate('/'); // Manda o usuário de volta para a Home
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
        
        {/* 3. Tiramos o readOnly e colocamos o onChange para liberar a digitação */}
        <input 
          type="text" 
          placeholder="Endereço (Rua/Avenida)" 
          value={endereco.rua} 
          onChange={(e) => setEndereco({ ...endereco, rua: e.target.value })}
          className="w-full p-4 bg-[#F5F5F5] rounded-md mb-4 outline-pink-700" 
        />
        
        {/* Novos campos para Número e Complemento */}
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
        
        {/* Aqui você vai puxar os dados do carrinho depois */}
        <p className="text-gray-500 mb-8">Os itens do seu carrinho aparecerão aqui.</p>
        
        {/* 4. Colocamos o onClick chamando a função */}
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