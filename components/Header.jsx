import Link from "next/link";
import { getCategories } from '../Services';
import { useState,useEffect } from 'react';
const demo = [
			  { slug:'webdev' , title:'Web development'}, 
			  { slug:'anime' , title:'Anime' }
			];

const Header = () => {
	const [categories,setCategories] = useState([]);
   
    useEffect(() => {
    	getCategories()
    	 .then(res=>setCategories(res));
    },[])

	return (
		<div className="mx-auto  p-6 w-[90%] px-10">
		  <div className="w-full border-b pb-4 border-blue-400 flex items-center justify-between text-white">
		   <Link href="/"> 
		   <h2 className="font-bold cursor-pointer text-2xl">Wendi Blog</h2>
		   </Link>
		   <div className="flex items-center text-white">
		    {categories && categories.map((item ,id) => {
		    	return (
		    		<Link key={id} href={`/category/${item.slug}`}>
		    			<span className="ml-4 cursor-pointer hover:text-pink-600 transition duration-300 text-lg font-semibold">{item.name}</span>
		    		</Link>
		    	)
		    })}
		   </div>
		  </div>
		</div>
	)
}


export default Header;