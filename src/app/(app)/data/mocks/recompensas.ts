
export interface RecompensaMock {
  id: number;
  nome: string;
  descricao: string;
  custo: number;
  ativo: boolean;
  criadoEm: Date;
  imagens: string[];
}

export const recompensasMock: RecompensaMock[] = [
  {
    id: 1,
    nome: "30% OFF em Itens de Decoração",
    descricao:
      "Aproveite um desconto exclusivo de 30% em itens de decoração selecionados para renovar sua casa com estilo e economia. " +
      "Escolha entre vasos, quadros, luminárias e outros acessórios que vão transformar qualquer ambiente, deixando-o mais aconchegante e moderno.",
    custo: 10,
    ativo: true,
    criadoEm: new Date(),
    imagens: [
      "/decoracao/capa.jpg",
      "/decoracao/capa.jpg",
      "/decoracao/capa.jpg",
      "/decoracao/capa.jpg",
      "/decoracao/capa.jpg",
      "/decoracao/capa.jpg"
    ],
  },
  {
    id: 2,
    nome: "Luminária Relógio com Carregador",
    descricao:
      "Praticidade e inovação em um só produto. A Luminária Relógio com Carregador une iluminação aconchegante, despertador digital e carregamento sem fio para seus dispositivos. " +
      "Ideal para sua mesa de cabeceira ou escritório, trazendo tecnologia e design minimalista ao seu dia a dia.",
    custo: 20,
    ativo: true,
    criadoEm: new Date(),
    imagens: [
      "/luminaria/capa.jpg",
      "/luminaria/foto1.jpg",
      "/luminaria/foto2.jpg",
      "/luminaria/foto3.jpg",
      "/luminaria/foto4.jpg",
      "/luminaria/foto5.jpg",
    ],
  },
  {
    id: 3,
    nome: "Máquina de Café Expresso",
    descricao:
      "Desperte seus sentidos com um café de qualidade profissional no conforto da sua casa. " +
      "A Máquina de Café Expresso prepara bebidas encorpadas e saborosas com rapidez e praticidade, ideal para os amantes de café que buscam aroma e sabor em cada xícara.",
    custo: 40,
    ativo: true,
    criadoEm: new Date(),
    imagens: [
      "/maquina_cafe/capa_cafeteira.png",
      "/maquina_cafe/foto1_cafeteira.png",
      "/maquina_cafe/foto2_cafeteira.png",
      "/maquina_cafe/foto3_cafeteira.png",
      "/maquina_cafe/foto4_cafeteira.png"
    ],
  },
  {
    id: 4,
    nome: "iPhone 13",
    descricao:
      "O iPhone 13 oferece desempenho poderoso com o chip A15 Bionic, câmera dupla avançada e bateria de longa duração. " +
      "Com design elegante, tela Super Retina XDR e recursos inteligentes do iOS, é o smartphone perfeito para quem busca inovação, velocidade e qualidade em cada detalhe.",
    custo: 100,
    ativo: true,
    criadoEm: new Date(),
    imagens: [
      "/iphone/capa.jpg",
      "/iphone/foto1.jpg",
      "/iphone/foto2.jpg",
      "/iphone/foto3.jpg",
      "/iphone/foto4.jpg",
      "/iphone/foto5.jpg",
    ],
  },
];
