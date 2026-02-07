import bcrypt from 'bcryptjs';
async function hashPassword(password) {
    const hashed_pass = await bcrypt.hash(password, 8);
    return hashed_pass;
}
async function comparePassword(password, user_password) {
    const compar_pass = await bcrypt.compare(password, user_password);
    return compar_pass;
}
export { hashPassword, comparePassword };
