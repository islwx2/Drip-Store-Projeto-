export const buscarEnderecoPorCep = async (cep) => {
  // Remove qualquer traço ou ponto que o usuário digitar
  const cepLimpo = cep.replace(/\D/g, '');
  
  if (cepLimpo.length !== 8) return null;

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    const dados = await resposta.json();
    
    if (dados.erro) return null;
    return dados;
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    return null;
  }
};