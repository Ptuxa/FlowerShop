import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS_BY_CATEGORY = gql`
    query GetProductsByCategory($categoriesIds: [ID!]!) {
        getAllProductsByCategoryIdsGraphQl(categoriesIds: $categoriesIds) {
            id
            name
            amount
            price
            categoryId
            imageName
        }
    }
`;
