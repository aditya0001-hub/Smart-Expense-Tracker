declare function registerUser(userData: {
    name: string;
    email: string;
    password: string;
}): Promise<{
    id: number;
    email: string;
    name: string;
    createdAt: Date;
    updatedAT: Date;
}>;
declare function loginUser(data: {
    email: string;
    password: string;
}): Promise<{
    token: string;
    user: {
        id: number;
        email: string;
        name: string;
        createdAt: Date;
        updatedAT: Date;
    };
}>;
export { registerUser, loginUser };
//# sourceMappingURL=auth.services.d.ts.map