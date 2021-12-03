import { useGetUsersQuery } from "../generated/graphql";

export const getUsers = (searchTerm: string) => {
  return useGetUsersQuery({
    pause: searchTerm.length < 2,
    variables: {
      searchTerm,
    },
  });
};

// export const useGetPostFromUrl = () => {
//   const intId = useGetIntId();
//   return usePostQuery({
//     skip: intId === -1,
//     variables: {
//       id: intId,
//     },
//   });
// };
