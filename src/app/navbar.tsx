'use client'


import React from "react";
import { useRouter } from "next/navigation";


const Navbar: React.FC = () =>{
    const router=useRouter()
    
    const handleUser=()=>{
        router.push('/pages/users')
    }

    const handleTodos=()=>{
        router.push('/pages/todos')
    }

    const handleComments=()=>{
        router.push('/pages/comments')
    }

    const handleQuotes=()=>{
        router.push('/')
    }

    return(
        <>
        <div className="layout">
             <div className="btn btn-user" onClick={handleUser}>
                <button>Users</button>
             </div>
             <div className="btn btn-todo" onClick={handleTodos}>
                <button>Todos</button>
             </div>
             <div className="btn btn-comment" onClick={handleComments}>
                <button>Comments</button>
             </div>
             <div className="btn btn-quote" onClick={handleQuotes}>
                <button>Quotes</button>
             </div>
        </div>
        </>
    )
}

export default Navbar;