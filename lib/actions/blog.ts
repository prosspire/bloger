"use server";
import { createSupabaseServerClient } from "@/lib/supabase";
import { IBlog } from "@/lib/types";
import { revalidatePath,  } from "next/cache";
import {  BlogFormSchemaType,  } from "../../app/dashboard/blog/schema";
const DASHBOARD = "/dashboard/blog";

export async function createBlog(data: {
	content: string;
	title: string;
	image: string;
	author:string;
	meta_title: string;
	meta_description: string;
	slug: string;
	status: boolean;
	created_at: string;
	coments_enabled: boolean;
	
}) {

	const supabase = await createSupabaseServerClient();
	const blogResult = await supabase
		.from("blog")
		.insert(data)
		.single();

    return blogResult;
}

export async function savepdf(pdfFile: File) {
	const supabase = await createSupabaseServerClient();
	const filedata = await supabase.storage
		.from("pdffiles")
		.upload(`pdf/${pdfFile.name}`, pdfFile, {
			cacheControl: '3600',
			upsert: false 
		  
		  });

		  console.log(filedata);

    return filedata;
}


export async function listallimages() {
	const supabase = await createSupabaseServerClient();
	const { data, error } = await supabase.storage
    .from('images')
    .list('uploads', { limit: 100, offset: 0, sortBy: { column: 'name', order: 'asc' } });

  if (error) {
    console.error('Error fetching images:', error);
    return [];
  }

  return data;
}

export async function readCatogries() {
	await new Promise((resolve) => setTimeout(resolve, 2000));
	const supabase = await createSupabaseServerClient();
	return supabase
		.from("catagory")
		.select("*")
		.order("created_at", { ascending: true });
}




export async function readBlog() {
	const supabase = await createSupabaseServerClient();
	return supabase
		.from("blog")
		.select("*")
		.eq("status", true)
		.range(0, 7)
		.order("created_at", { ascending: true });
}



export async function readmoreblog() {
	const supabase = await createSupabaseServerClient();
	return supabase
		.from("blog")
		.select("*")
		.eq("status", true)
		.range(0, 35)
		.order("created_at", { ascending: true });
}



export async function readBlogAdmin() {
	await new Promise((resolve) => setTimeout(resolve, 2000));

	const supabase = await createSupabaseServerClient();
	const { data: { user } } = await supabase.auth.getUser()
	const id = user?.id



	return supabase
		.from("blog")
		.select("*")
		.eq('author', id || " " )
		.order("created_at", { ascending: true });
		
}

export async function readBlogById(blogId: number) {
	const supabase = await createSupabaseServerClient();
	return supabase.from("blog").select("*").eq("id", blogId).single();
}
export async function readBlogIds() {
	const supabase = await createSupabaseServerClient();
	return supabase.from("blog").select("id");
}

export async function readBlogDeatailById(id : string) {
	const supabase = await createSupabaseServerClient();
	return await supabase
		.from("blog")
		.select("*")
		.eq("slug", id)
		.single();
}



export async function getallimages() {
	const supabase = await createSupabaseServerClient();
	return await supabase.storage.from("images").list('images');
}

export async function updateBlogById(blogId: string, data: IBlog) {
	const supabase = await createSupabaseServerClient();
	const result = await supabase.from("blog").update(data).eq("id", blogId);
	revalidatePath(DASHBOARD);
	revalidatePath("/blog/" + blogId);
	return JSON.stringify(result);
}

export async function updateBlogDetail(
	id: string,
	data: BlogFormSchemaType
) {
	const supabase = await createSupabaseServerClient();
	const resultBlog = await supabase
		.from("blog")
		.update(data)
		.eq("id", id);
	if (resultBlog) {
		return (resultBlog);
	} else {
		revalidatePath(DASHBOARD);
	}
}



export async function deleteBlogById(blogId: string) {
	console.log("deleting blog post")
	const supabase = await createSupabaseServerClient();
	const result = await supabase.from("blog").delete().eq("id", blogId);
	console.log(result);
	revalidatePath(DASHBOARD);
	revalidatePath("/blog/" + blogId);	
	return JSON.stringify(result);
}
