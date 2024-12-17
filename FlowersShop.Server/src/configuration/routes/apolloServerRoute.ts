import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import { gql } from 'graphql-tag';
import { ProductService } from '../../service/impl/productService';
import { Product } from '../../model/entity/product';
import { DocumentNode } from 'graphql';

class ApolloServerRoute {
    private readonly productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }

    private async initResolvers(): Promise<any> {
        return {
            Query: {
                getAllProductsByCategoryIdsGraphQl: async (
                    _: unknown,
                    { categoriesIds }: { categoriesIds: string[] }
                ): Promise<Product[]> => {
                    try {
                        return await this.productService.getAllProductsByCategoryIdsGraphQl(categoriesIds);
                    } catch (error) {
                        throw new Error(`Error retrieving products: ${(error as Error).message}`);
                    }
                },
            },
        };
    }

    private async initTypeDefs(): Promise<DocumentNode> {
        return gql`
            type Product {
                id: ID!
                categoryId: ID
                name: String!
                amount: Int!
                price: Int!
                imageName: String
            }

            type Query {
                getAllProductsByCategoryIdsGraphQl(categoriesIds: [ID!]): [Product!]!
            }
        `;
    }

    public async initRoutes(app: express.Application): Promise<void> {
        const typeDefs = await this.initTypeDefs();
        const resolvers = await this.initResolvers();

        const apolloServer = new ApolloServer({
            typeDefs,
            resolvers,
            formatError: (err) => {
                console.error(err);
                return err;  // You can customize the error formatting if needed
            }
        });

        await apolloServer.start();

        app.use(
            '/graphql',
            express.json(),
            expressMiddleware(apolloServer) 
        );
    }
}

export default ApolloServerRoute;
