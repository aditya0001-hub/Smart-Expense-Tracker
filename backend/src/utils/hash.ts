import bcrypt from 'bcryptjs'
async function hashPassword(password:string): Promise<string>{
   const  hashed_pass =await bcrypt.hash(password,8)
  return hashed_pass;
}
async function comparePassword(password:string,user_password:string): Promise<boolean>{
   const compar_pass=await bcrypt.compare(password,user_password);
   return compar_pass;
}
export { hashPassword,comparePassword}