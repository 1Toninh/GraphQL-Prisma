/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @typedef { import("@prisma/client").UserCreateArgs } UserCreateArgs
 */

const { gql } = require('apollo-server');


const typeDefs = gql`

type Query {
    allMunicipios: [Municipio]
    municipioByID(id: ID!): Municipio
    municipioByNome(nome: String!): Municipio

    allMicrorregioes: [Microrregiao]
    microrregiaoByID(id: ID!): Microrregiao
    
    allMesorregioes: [Mesorregiao]
    mesorregiaoByID(id: ID!): Mesorregiao

    allRegioes: [Regiao]
    regiaoByID(id: ID!): Regiao

    allUFs: [UF]
    ufByID(id: ID!): UF

    countMunic: Int
}

type Municipio {
    id: ID
    nome: String
    microrregiao: Microrregiao
}

type Microrregiao {
    id: ID
    nome: String
    mesorregiao: Mesorregiao
}

type Mesorregiao {
    id: ID
    nome: String
    uf: UF
}

type UF {
    id: ID
    sigla: String
    nome: String
    regiao: Regiao
}

type Regiao {
    id: ID
    sigla: String
    nome: String
}
`

const resolvers = {
    Query: {
        /**
        * @param {any} _parent
        * @param {any} _args
        * @param {{ prisma: Prisma }} context
        */
        allMunicipios: async (_parent, _args, context) => {
            var allMunicipio = await context.prisma.municipio.findMany();
            allMunicipio.forEach(element => {
                element.id = parseInt(element.id);
            });
            return allMunicipio;
        },
        allUFs: async (_parent, _args, context) => {
            var allUf = await context.prisma.uf.findMany();
            allUf.forEach(element => {
                element.id = parseInt(element.id);
            });
            return allUf;
        },
        allMicrorregioes: async (_parent, _args, context) => {
            var allMicro = await context.prisma.microrregiao.findMany();
            allMicro.forEach(element => {
                element.id = parseInt(element.id);
            });
            return allMicro;
        },
        allMesorregioes: async (_parent, _args, context) => {
            var allMeso = await context.prisma.mesorregiao.findMany();
            allMeso.forEach(element => {
                element.id = parseInt(element.id);
            });
            return allMeso;
        },
        allRegioes: async (_parent, _args, context) => {
            var allRegiao = await context.prisma.regiao.findMany();
            allRegiao.forEach(element => {
                element.id = parseInt(element.id);
            });
            return allRegiao;
        },
        countMunic: async (_parent, _args, context) => {
            var countMun = await context.prisma.municipio.count();
            return countMun;
        },
        
        /**
        * @param {any} args
        */
        
        municipioByNome: async (_parent, args, context) => {
            var municipioID = await context.prisma.municipio.findFirst({
                where: { nome: args.nome },
                include: {
                    microrregiao: {
                        include: {
                            mesorregiao: {
                                include: {
                                    uf: {
                                        include: {
                                            regiao: true,
                                        }
                                    }
                                }
                            }
                        },
                    }
                }
            })
            municipioID.id = parseInt(municipioID.id);
            municipioID.microrregiao.id = parseInt(municipioID.microrregiao.id);
            municipioID.microrregiao.mesorregiao.id = parseInt(municipioID.microrregiao.mesorregiao.id);
            municipioID.microrregiao.mesorregiao.uf.id = parseInt(municipioID.microrregiao.mesorregiao.uf.id);
            municipioID.microrregiao.mesorregiao.uf.regiao.id = parseInt(municipioID.microrregiao.mesorregiao.uf.regiao.id);
            return municipioID;
        },
        municipioByID: async (_parent, args, context) => {
            var municipioID = await context.prisma.municipio.findUnique({
                where: { id: parseInt(args.id) },
                include: {
                    microrregiao: {
                        include: {
                            mesorregiao: {
                                include: {
                                    uf: {
                                        include: {
                                            regiao: true,
                                        }
                                    }
                                }
                            }
                        },
                    }
                }
            })
            municipioID.id = parseInt(municipioID.id);
            municipioID.microrregiao.id = parseInt(municipioID.microrregiao.id);
            municipioID.microrregiao.mesorregiao.id = parseInt(municipioID.microrregiao.mesorregiao.id);
            municipioID.microrregiao.mesorregiao.uf.id = parseInt(municipioID.microrregiao.mesorregiao.uf.id);
            municipioID.microrregiao.mesorregiao.uf.regiao.id = parseInt(municipioID.microrregiao.mesorregiao.uf.regiao.id);
            return municipioID;
        },
        microrregiaoByID: async (_parent, args, context) => {
            var microrregiaoID = await context.prisma.microrregiao.findUnique({
                where: { id: parseInt(args.id) },
                include: {
                    mesorregiao: {
                        include: {
                            uf: {
                                include: {
                                    regiao: true,
                                }
                            }
                        }
                    }
                },
            })
            microrregiaoID.id = parseInt(microrregiaoID.id);
            microrregiaoID.mesorregiao.id = parseInt(microrregiaoID.mesorregiao.id);
            microrregiaoID.mesorregiao.uf.id = parseInt(microrregiaoID.mesorregiao.uf.id);
            microrregiaoID.mesorregiao.uf.regiao.id = parseInt(microrregiaoID.mesorregiao.uf.regiao.id);
            return microrregiaoID;
        },
        mesorregiaoByID: async (_parent, args, context) => {
            var mesorregiaoID = await context.prisma.mesorregiao.findUnique({
                where: { id: parseInt(args.id) },
                include: {
                    uf: {
                        include: {
                            regiao: true
                        },
                    }
                },
            })
            mesorregiaoID.id = parseInt(mesorregiaoID.id);
            mesorregiaoID.uf.id = parseInt(mesorregiaoID.uf.id);
            mesorregiaoID.uf.regiao.id = parseInt(mesorregiaoID.uf.regiao.id);
            return mesorregiaoID;
        },
        ufByID: async (_parent, args, context) => {
            var ufID = await context.prisma.uf.findUnique({
                where: { id: parseInt(args.id) },
                include: {
                    regiao: true,
                },
            })
            ufID.id = parseInt(ufID.id);
            ufID.regiao.id = parseInt(ufID.regiao.id);
            return ufID;
        },
        regiaoByID: async (_parent, args, context) => {
            var regiaoID = await context.prisma.regiao.findUnique({
                where: { id: parseInt(args.id) },
            })
            regiaoID.id = parseInt(regiaoID.id);
            return regiaoID;
        },
    }
}

module.exports = {
    resolvers,
    typeDefs
}