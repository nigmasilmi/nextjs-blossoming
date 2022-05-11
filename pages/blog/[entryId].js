const BlogEntryPage = (props) => {
  const { id } = props;
  return <div>BlogEntryPage with id: {id}</div>;
};
export default BlogEntryPage;

export async function getServerSideProps(context) {
  const { params } = context;
  return {
    props: {
      id: `uuid-${params.entryId}`,
    },
  };
}
