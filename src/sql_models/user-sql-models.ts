import pool from "./mysql-client";
export const sqlUserModal={
    async getAllUser(){
        const [userData]=await pool.query("select * from users")
        return userData
    },
    async getUserBYId(id:number){
        const [userData]=await pool.query("select * from users where id=?",[id])
        return userData
    },
    async createUser(user:{name:string,email:string}){
        const data=await pool.query("insert into users (name,email) values (?,?)",[user.name,user.email])
        
    },
    async UpdateUser(id:number,user:Partial<{name:string,email:string}>){
        const fields=[]
        const values=[]

        if(user.name !== undefined){
            fields.push("name=?")
            values.push(user.name)
        }
        if(user.email !== undefined){
            fields.push("email=?")
            values.push(user.email)
        }
        if(fields.length==0) return undefined
        console.log(values)
        await pool.query(`update users set ${fields.join(",")} where id=?`,[...values,id])
        
    },
    async deleteUser(id:number){

       await pool.query("delete from users where  id=?",[id])
      
    }
}