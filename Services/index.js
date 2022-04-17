import { request, gql } from "graphql-request";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINTS;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              photo {
                url
              }
            }
            featuredimage {
              url
            }
            slug
            title
            excerpt
            createdAt
          }
        }
      }
    }
  `;

  const result = await request(API_ENDPOINT, query);
  return result.postsConnection.edges;
};

export const getRecentPosts = async () => {
  const query = gql`
	  query GetRecentPost() {
	  	  posts(orderBy: createdAt_ASC, last: 4) {
    featuredimage {
      url
    }
     createdAt
    slug
    title
  }
	  }
	`;

  const result = await request(API_ENDPOINT, query);
  return result.posts;
};

export const getCategories = async () => {
  const query = gql`
    query Categories {
      categories {
        name
        slug
        id
      }
    }
  `;

  const result = await request(API_ENDPOINT, query);
  return result.categories;
};

export const getSimiliarPosts = async (slug, categories) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredimage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(API_ENDPOINT, query, { slug, categories });
  return result.posts;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          name
          photo {
            url
          }
        }
        featuredimage {
          url
        }
        slug
        title
        excerpt
        categories {
          name
          slug
        }
        content {
          raw
        }
        createdAt
      }
    }
  `;

  const result = await request(API_ENDPOINT, query, { slug });
  return result.post;
};

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredimage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(API_ENDPOINT, query, { slug });
  return result.postsConnection.edges;
};

export const HandleSubmitComment = async (data) => {
  const request = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        email
        createdAt
        comment
      }
    }
  `;

  const result = await request(API_ENDPOINT, query, { slug });
  return result.comments;
};


export const getFeaturedPosts = async () => {
	const query = gql`
	  query GetFeaturedPosts {
	  	  posts(where: {featuredPost: true}) {
    title
    slug
    createdAt
    featuredimage {
    	url
    }
    author {
    	name 
    	photo {
    		url
    	}
    }
  }
	  }
	`;
  const result = await request(API_ENDPOINT,query);
	return result.posts;
}

export const getAdjacentPosts = async (createdAt, slug) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!,$slug:String!) {
      next:posts(
        first: 1
        orderBy: createdAt_ASC
        where: {slug_not: $slug, AND: {createdAt_gte: $createdAt}}
      ) {
        title
        featuredimage {
          url
        }
        createdAt
        slug
      }
      previous:posts(
        first: 1
        orderBy: createdAt_DESC
        where: {slug_not: $slug, AND: {createdAt_lte: $createdAt}}
      ) {
        title
        featuredimage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(API_ENDPOINT, query, { slug, createdAt });

  return { next: result.next[0], previous: result.previous[0] };
};