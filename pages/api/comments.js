import { GraphQLClient, gql } from "graphql-request";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINTS;
const Token = process.env.TOKEN_PUBLIC_API;

const HandleCommentRequest = async (req, res) => {
  res.status(200).send(req.body);
  const graphClient = new GraphQLClient(API_ENDPOINT, {
    headers: {
      authorization: `Bearer ${Token}`,
    },
  });

  const query = gql`
    mutation createComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;

  try {
    const result = await graphClient.request(query, {
      name: req.body.name,
      email: req.body.email,
      comment: req.body.comment,
      slug: req.body.slug,
    });

    return result.status(200).send(result);
  } catch (error) {
    return error;
  }
};

export default HandleCommentRequest;
