
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
      "A decoração do quarto de hotel com champagne, chocolate e velas é um convite ao romance e à celebração. Luz suave, aromas doces e o brilho delicado das velas criam um cenário único, onde cada detalhe exala carinho. É mais que uma estadia, é uma experiência.",
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
      "A luminária relógio com carregador embutido é o equilíbrio perfeito entre funcionalidade e elegância. Ela ilumina seus momentos, marca o tempo com precisão e ainda recarrega seus dispositivos , tudo em um só design moderno e inteligente. Ideal para quem valoriza praticidade sem abrir mão de estilo, transforma qualquer ambiente em um espaço de conforto e inovação.",

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
      "A máquina de fazer café é o início de grandes momentos em um simples toque. Com aroma envolvente e sabor encorpado, ela transforma grãos em experiências, silêncio em aconchego e rotina em ritual. Cada xícara é um abraço quente, preparado com precisão e paixão. Porque não é só café ,é energia, pausa e inspiração.",
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
