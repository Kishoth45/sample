// Define the quote interface
export interface quote {
    id: number;           
    quote: string;       
    author: string;     
}

// Define the ApiResponse interface
export interface ApiResponse {
    quotes: quote[];
    users:user[];    
    comments:comment[];    
    todos:todo[];    
    total: number;     
    skip: number;        
    limit: number;  
}


export interface user {
    id: number;           
    firstName: string;       
    age: number; 
    gender: string;    
    email: string;    
    birthDate: number;    
    phone: number;    
}

export interface CommentUser {
    id: number;
    username: string;
    fullName: string;
  }
  
  export interface comment {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: CommentUser;
  }
  

export interface todo {
    id: number;           
    todo: string;       
    completed: boolean; 
    userId: number;   
}