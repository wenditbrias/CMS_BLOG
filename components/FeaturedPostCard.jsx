import moment from 'moment';
import { useEffect,useState } from 'react';
import Link from 'next/link';

const FeaturedPostCard = ({ post }) => {
	const { author } = post;
	return (
		<div className="relative w-full h-64 rounded-lg text-white flex items-center justify-center flex-col" style={{ backgroundImage:`url(${post.featuredimage.url})`,backgroundPosition:'center' }}>
		 <h5 className="font-normal text-base">{moment(post.createdAt).format('MMM DD,YYYY')}</h5>
		 <h3 className="font-bold text-xl mt-3 mb-5 hover:text-pink-600 transition duration-300">
		 	<Link href={`/post/${post.slug}`}>{post.title}</Link>
		 </h3>
		 <div className="flex items-center justify-center">
		  <img src={author.photo.url} className="w-[34px] h-[34px] rounded-full" alt={author.name}/>
		  <span className="text-white font-medium ml-3">{author.name}</span>
		 </div>
		</div>
	)
}

export default FeaturedPostCard;