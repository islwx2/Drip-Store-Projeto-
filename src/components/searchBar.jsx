import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/produtos?filter=${encodeURIComponent(search.trim())}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    // O container relativo não precisa de mudanças.
    <div className="relative w-full">
      <input
        type="text"
        // --- MUDANÇAS APLICADAS AQUI ---
        // 1. Removido: 'border' e 'border-gray-300' para um visual sem bordas.
        // 2. Adicionado: 'bg-gray-100' para o fundo cinza claro.
        // 3. Adicionado: 'border-transparent' para garantir que não apareça borda no foco.
        // 4. Corrigido: O padding 'pl-10 pr-4' foi trocado para 'pl-4 pr-10' para alinhar com o ícone à direita.
        // 5. Ajustado: 'py-2.5' para um pouco mais de altura e 'rounded-lg' para cantos mais suaves.
        className="w-full bg-gray-100 rounded-lg pl-4 pr-10 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 border-transparent"
        placeholder="Buscar produtos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      {/* O botão do ícone não precisa de mudanças, seu posicionamento já está correto. */}
      <button
        onClick={handleSearch}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-pink-600 transition"
        aria-label="Buscar"
      >
        <FiSearch className="text-lg" />
      </button>
    </div>
  );
};

export default SearchBar;