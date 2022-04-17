import React,{ useState,useEffect } from 'react';
import { getAdjacentPosts } from '../Services';
import { AdjacentPostCard } from '../components';

const AdjacentPost = ({ createdAt,slug}) => {
	const [adjacentPosts,setAdjacentPosts] = useState(null);

	useEffect(() => {
		getAdjacentPosts(createdAt,slug)
		 .then(res=>setAdjacentPosts(res));
	},[slug])

	return (
		<div className="grid grid-cols-1 lg:grid-cols-8 mb-8">
		 <>
		   {adjacentPosts && adjacentPosts.previous && (
            <div className={`${adjacentPosts.next ? 'col-span-1 lg:col-span-4' : 'col-span-1 lg:col-span-8'} adjacent-post rounded-lg relative h-72`}>
              <AdjacentPostCard post={adjacentPosts.previous} position="LEFT" />
            </div>
          )}
          {adjacentPosts && adjacentPosts.next && (
            <div className={`${adjacentPosts.previous ? 'col-span-1 lg:col-span-4' : 'col-span-1 lg:col-span-8'} adjacent-post rounded-lg relative h-72`}>
              <AdjacentPostCard post={adjacentPosts.next} position="RIGHT" />
            </div>
          )}
		 </>
		</div>
	)
}

export default AdjacentPost;