import { API } from 'aws-amplify';
import { listProducts } from '../graphql/queries';

export async function fetchAllProducts() {
  const response = await API.graphql({ query: listProducts });

  return response.data;
}
