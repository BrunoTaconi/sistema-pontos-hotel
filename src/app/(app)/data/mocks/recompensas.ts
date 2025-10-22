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
    nome: "40% OFF em Itens de Decoração",
    descricao:
      "A decoração do quarto de hotel com champagne, chocolate e velas é um convite ao romance e à celebração. Luz suave, aromas doces e o brilho delicado das velas criam um cenário único, onde cada detalhe exala carinho. É mais que uma estadia, é uma experiência.",
    custo: 15,
    ativo: true,
    criadoEm: new Date(),
    imagens: [
      "/decoracao/capa.jpg",
      "/decoracao/capa.jpg",
      "/decoracao/capa.jpg",
      //"/decoracao/capa.jpg",
      "/decoracao/capa.jpg",
    ],
  },
  {
    id: 2,
    nome: "Luminária Relógio com Carregador",
    descricao:
      "A luminária relógio com carregador embutido é o equilíbrio perfeito entre funcionalidade e elegância. Ela ilumina seus momentos, marca o tempo com precisão e ainda recarrega seus dispositivos , tudo em um só design moderno e inteligente. Ideal para quem valoriza praticidade sem abrir mão de estilo, transforma qualquer ambiente em um espaço de conforto e inovação.",

    custo: 25,
    ativo: true,
    criadoEm: new Date(),
    imagens: [
      "/luminaria/capa.jpg",
      "/luminaria/foto2.jpg",
      "/luminaria/foto3.jpg",
      //"/luminaria/foto4.jpg",
      "/luminaria/foto5.jpg",
    ],
  },
  {
    id: 3,
    nome: "Máquina de Café Expresso",
    descricao:
      "A máquina de fazer café é o início de grandes momentos em um simples toque. Com aroma envolvente e sabor encorpado, ela transforma grãos em experiências, silêncio em aconchego e rotina em ritual. Cada xícara é um abraço quente, preparado com precisão e paixão. Porque não é só café ,é energia, pausa e inspiração.",
    custo: 35,
    ativo: true,
    criadoEm: new Date(),
    imagens: [
      "/maquina_cafe/capa_cafeteira.png",
      "/maquina_cafe/foto1_cafeteira.png",
      "/maquina_cafe/foto2_cafeteira.png",
      //"/maquina_cafe/foto3_cafeteira.png",
      "/maquina_cafe/foto4_cafeteira.png",
    ],
  },
  {
    id: 4,
    nome: "iPhone 16e - Branco",
    descricao:
      "O Futuro em Suas Mãos!O iPhone 16e chegou para transformar a maneira como você vive e interage com o mundo. Com design refinado, desempenho incomparável e recursos inovadores, ele é mais do que um smartphone – é uma experiência que vai além das suas expectativas." +
      "O futuro já chegou. Com o iPhone 16e, você não está apenas comprando um celular, você está investindo em tecnologia de ponta, estilo e inovação. Não perca a chance de viver a experiência de um iPhone como nunca antes.",
    custo: 100,
    ativo: true,
    criadoEm: new Date(),
    imagens: [
      "/iphone/capa.png",
      "/iphone/foto1.jpg",
      "/iphone/foto3.jpg",
      //"/iphone/foto4.jpg",
      "/iphone/foto5.jpg",
    ],
  },
];
