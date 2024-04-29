import { gql } from "graphql-request";
import { gql_client } from "..";
import { InextFunction } from "@/types";
// Function to fetch all data from api
const fetchAllData = (next: InextFunction) => {
  // main root query
  const query = gql`
    query GetAllData {
      # Query to fetch all banners
      banners(orderBy: publishedAt_ASC) {
        id
        name
        url
        image {
          url
        }
      }
      # query to fetch all categories
      categories {
        id
        image {
          url
          id
        }
        name
      }

      # query to fetch all products
      products(orderBy: publishedAt_ASC) {
        categories {
          id
          name
          image {
            url
            id
          }
        }
        description
        discountPrice
        id
        images {
          id
          url
        }
        property
        originalPrice
        quantity
        ratings
        reviews {
          ... on Review {
            id
            email
            message
            star
          }
        }
        slug
        thumbnail {
          url
          id
        }
        title
        createdAt
      }
      # query to fetch all ads
      ads(orderBy: publishedAt_ASC) {
        adsTitle
        createdAt
        expiryData
        id
        isActive
        products {
          id
        }
      }
    }
  `;

  gql_client
    .request(query)
    .then((res: any) => {
      // Handle Responce
      return next(res);
    })
    .catch((err: any) => {
      if (err?.response?.errors[0].message) {
        const errmsg = err.response.errors[0].message;
        return next(errmsg);
      }
      console.log(err);
      return next(err);
    });
};

export { fetchAllData };
