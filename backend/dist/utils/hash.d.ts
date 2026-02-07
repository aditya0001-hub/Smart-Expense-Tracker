declare function hashPassword(password: string): Promise<string>;
declare function comparePassword(password: string, user_password: string): Promise<boolean>;
export { hashPassword, comparePassword };
//# sourceMappingURL=hash.d.ts.map