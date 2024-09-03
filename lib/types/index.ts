    export type IBlog = {
		author: string | null
		coments_enabled: boolean | null
		content: string 
		created_at: string
		id: string
		image: string | null
		meta_description: string | null
		meta_tiltle: string | null
		published_at: string
		slug: string
		status: boolean
		title: string | null
};


export type IBlogDetial = {
	created_at: string;
	id: string;
	image: string;
	title: string;
	status:boolean;
	meta_description: string;
	meta_tiltle: string;
	coments_enabled: boolean;
	published_at: string;
	slug:string;
	content:string;
	author:string;
};




export type IAuthor = {
	author: string 
	Bio: string | null
	created_at: string
	github: string 
	id: string
	instagram: string 
	linkdin: string 
	Name: string 
	twiter: string 
	profile:string
} ;

export type Coments ={
	coment: string;
    created_at: string;
    slug_id: string;
    user_id: string;
} ;
export type Catagories ={
	created_at: string
	description: string
	id: number
	name: string
  };


export type IBlogForm = {
	created_at: string;
	id: string;
	image: string;
	is_premium: boolean;
	is_published: boolean;
	title: string;
	blog_content: {
		blog_id: string;
		content: string;
		created_at: string;
	};
};

export type Iuser = {
	created_at: string;
	display_name: string;
	email: string;
	id: string;
	image_url: string;
	role: string;
	stripe_customer_id: string | null;
	stripe_subscriptoin_id: string | null;
	subscription_status: boolean;
} | null;
