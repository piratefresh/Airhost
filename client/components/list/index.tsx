import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface PostProps {
  name: string;
}

// posts will be populated at build time by getStaticProps()
function List() {
  const { data, error } = useSWR("https://swapi.dev/api/planets", fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  console.log(data);
  return (
    <ul>
      {data &&
        data.results.map((post: PostProps) => (
          <li key={post.name}>{post.name}</li>
        ))}
    </ul>
  );
}

export default List;
