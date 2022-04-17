import Link from 'next/link';
import moment from 'moment';
import { AiOutlineCalendar } from 'react-icons/ai';

const PostCard = ({ post }) => {
	const { featuredimage,author } = post;
	return (
		<div className="bg-white mb-6 p-5 rounded-lg shadow-lg">
		<img src={featuredimage.url} className="object-cover w-full h-[220px]" alt={post.title}/>
	     <div className="py-4 text-center overflow-hidden">
	      <h2 className="font-bold text-2xl transition duration-200 hover:text-pink-600">
	      	<Link href={`/post/${post.slug}`}>{post.title}</Link>
	      </h2>
	       <div className="flex justify-center items-center mt-3">
	         <div className="flex items-center mr-3">
	         	<img src={author.photo.url} className="w-[34px] h-[34px] rounded-full" alt={author.name} />
	         	<span className="text-gray-500 font-medium ml-2">{author.name}</span>
	         </div>
	         <p className="flex items-center font-normal text-gray-600">
	         <AiOutlineCalendar size="1.1rem" className="text-pink-600 mr-2"/>
	         {moment(post.createdAt).format('MMM DD,YYYY')}
	         </p>
	       </div>
	       <p className="mt-3 mb-8 text-gray-700">{post.excerpt}</p>
	       <button className="bg-pink-600 text-white rounded-full py-2 px-4 font-medium cursor-pointer hover:bg-pink-700 text-base">
	       	<Link href={`/post/${post.slug}`}>Continue reading</Link>
	       </button>
	     </div>
		</div>
	)
}

export default PostCard;