import { getCategories,getCategoryPost } from '../../Services';
import { PostWidget,PostCard,Categories } from "../../components";

const CategoryPost = ({ posts }) => {
   return (
      <div className="py-5 mx-auto w-[90%] px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
       <div className="col-span-8">
       	 {posts.map((item ,key) => (<PostCard post={item.node} key={key}/>))}
       </div>
       <div className="col-span-4">
       <PostWidget/>
       <Categories/>
       </div>
      </div>
      </div>
   	)
}

export async function getStaticPaths() {
   const data = await getCategories();
   const slugs = data.map((item) => ({params:{ slug:item.slug }}));
   return {
   	paths:slugs,
   	fallback:false 
   }
}

export async function getStaticProps({ params }) {
   const data = await getCategoryPost(params.slug);
   return {
   	props:{
   		posts:data 
   	}
   }
}

export default CategoryPost;