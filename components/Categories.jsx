import Link from 'next/link';
import { getCategories } from '../Services';
import { useState,useEffect } from 'react';

const Categories = () => {
	const [categories,setCategories] = useState([]);
	useEffect(() => {
		getCategories()
		 .then(res => setCategories(res));
	},[])
	return (
		<div className="bg-white p-4 rounded-lg shadow-lg">
		  <div className="pb-3 border-b">
		   <h2 className="font-bold text-xl">Categories</h2>
		  </div>
		  <div className="w-full pt-3">
            {categories.map((item ,id) => {
            	return <div key={id} className="w-full mt-3 border-b pb-3">
            	 <h5 className="font-medium text-gray-600 transition duration-200 hover:text-pink-600">
            	 	<Link href={`/category/${item.slug}`}>{item.name}</Link>
            	 </h5>
            	</div>
            })}
		  </div>
		</div>
	)
}

export default Categories;